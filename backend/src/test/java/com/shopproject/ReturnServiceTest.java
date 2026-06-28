package com.shopproject;

import com.shopproject.exception.ResourceNotFoundException;
import com.shopproject.exception.UnauthorizedException;
import com.shopproject.order.OrderItem;
import com.shopproject.order.OrderItemRepository;
import com.shopproject.order.ShopOrder;
import com.shopproject.returns.ReturnRequestEntity;
import com.shopproject.returns.ReturnsRepository;
import com.shopproject.returns.ReturnsService;
import com.shopproject.returns.ReturnStatus;
import com.shopproject.user.model.User;
import com.shopproject.user.model.UserEntity;
import com.shopproject.user.model.UserRole;
import com.shopproject.user.service.AuthService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

/**
 * Unit-Tests für den ReturnsService.
 * Die Tests prüfen die minimale Rücksende-Logik:
 * - Rücksendung erfolgreich anlegen
 * - Rücksendung nur für eigene Bestellungen erlauben
 * - Fehler bei nicht vorhandenem OrderItem
 * - Rücksendungen eines Benutzers abrufen
 * - einzelne Rücksendung abrufen
 * Repositorys und AuthService werden mit Mockito simuliert,
 * damit keine echte Datenbank und keine echte Token-Prüfung benötigt werden.
 */
@ExtendWith(MockitoExtension.class)
class ReturnServiceTest {

    @Mock
    private OrderItemRepository orderItemRepository;

    @Mock
    private ReturnsRepository returnsRepository;

    @Mock
    private AuthService authService;

    @InjectMocks
    private ReturnsService returnsService;

    /**
     * Prüft, ob eine Rücksendung erfolgreich gespeichert wird,
     * wenn der eingeloggte Benutzer Besitzer der Bestellung ist.
     */
    @Test
    void save_CreateReturnRequest_UserOwnsOrderItem() {
        // Arrange: Testdaten vorbereiten
        String authHeader = "Bearer test-token";
        UUID userId = UUID.randomUUID();
        UUID orderItemId = UUID.randomUUID();

        User user = new User(
                userId,
                "Peter",
                "Peterson",
                "peter.peterson@test.de",
                UserRole.CUSTOMER,
                false
        );

        UserEntity customer = new UserEntity(
                userId,
                "Peter",
                "Peterson",
                "peter.peterson@test.de",
                "hashed-password",
                UserRole.CUSTOMER,
                false
        );

        ShopOrder shopOrder = new ShopOrder();
        shopOrder.setCustomer(customer);

        OrderItem orderItem = new OrderItem();
        orderItem.setShopOrder(shopOrder);

        ReturnRequestEntity savedReturn = new ReturnRequestEntity(
                orderItem,
                "Produkt beschädigt"
        );

        // Mock-Verhalten: User ist eingeloggt
        when(authService.getCurrentUser(authHeader))
                .thenReturn(user);

        // Mock-Verhalten: OrderItem wird gefunden
        when(orderItemRepository.findById(orderItemId))
                .thenReturn(Optional.of(orderItem));

        // Mock-Verhalten: Rücksendung wird gespeichert
        when(returnsRepository.save(any(ReturnRequestEntity.class)))
                .thenReturn(savedReturn);

        // Act: Rücksendung speichern
        ReturnRequestEntity result = returnsService.save(
                authHeader,
                orderItemId,
                "Produkt beschädigt"
        );

        // Assert: Ergebnis prüfen
        assertEquals("Produkt beschädigt", result.getReturnReason());
        assertEquals(ReturnStatus.REQUESTED, result.getReturnStatus());
        assertEquals(orderItem, result.getOrderItem());

        // Assert: Prüfen, welches Objekt gespeichert wurde
        ArgumentCaptor<ReturnRequestEntity> captor =
                ArgumentCaptor.forClass(ReturnRequestEntity.class);

        verify(returnsRepository).save(captor.capture());

        ReturnRequestEntity capturedReturn = captor.getValue();

        assertEquals("Produkt beschädigt", capturedReturn.getReturnReason());
        assertEquals(ReturnStatus.REQUESTED, capturedReturn.getReturnStatus());
        assertEquals(orderItem, capturedReturn.getOrderItem());
    }

    /**
     * Prüft, ob eine Rücksendung abgelehnt wird,
     * wenn das angegebene OrderItem nicht existiert.
     */
    @Test
    void save_ThrowResourceNotFound_OrderItemDoesNotExist() {
        // Arrange: Testdaten vorbereiten
        String authHeader = "Bearer test-token";
        UUID userId = UUID.randomUUID();
        UUID orderItemId = UUID.randomUUID();

        User user = new User(
                userId,
                "Peter",
                "Peterson",
                "peter.peterson@test.de",
                UserRole.CUSTOMER,
                false
        );

        // Mock-Verhalten: User ist eingeloggt
        when(authService.getCurrentUser(authHeader))
                .thenReturn(user);

        // Mock-Verhalten: OrderItem wird nicht gefunden
        when(orderItemRepository.findById(orderItemId))
                .thenReturn(Optional.empty());

        // Act + Assert: Es muss ResourceNotFoundException geworfen werden
        assertThrows(
                ResourceNotFoundException.class,
                () -> returnsService.save(authHeader, orderItemId, "Produkt beschädigt")
        );

        // Assert: Es darf keine Rücksendung gespeichert werden
        verify(returnsRepository, never()).save(any(ReturnRequestEntity.class));
    }

    /**
     * Prüft, ob eine Rücksendung abgelehnt wird,
     * wenn der eingeloggte Benutzer nicht Besitzer des OrderItems ist.
     */
    @Test
    void save_ThrowUnauthorized_UserDoesNotOwnOrderItem() {
        // Arrange: Testdaten vorbereiten
        String authHeader = "Bearer test-token";
        UUID loggedInUserId = UUID.randomUUID();
        UUID otherUserId = UUID.randomUUID();
        UUID orderItemId = UUID.randomUUID();

        User loggedInUser = new User(
                loggedInUserId,
                "Peter",
                "Peterson",
                "peter.peterson@test.de",
                UserRole.CUSTOMER,
                false
        );

        UserEntity otherCustomer = new UserEntity(
                otherUserId,
                "Max",
                "Mustermann",
                "max@test.de",
                "hashed-password",
                UserRole.CUSTOMER,
                false
        );

        ShopOrder shopOrder = new ShopOrder();
        shopOrder.setCustomer(otherCustomer);

        OrderItem orderItem = new OrderItem();
        orderItem.setShopOrder(shopOrder);

        // Mock-Verhalten: User ist eingeloggt
        when(authService.getCurrentUser(authHeader))
                .thenReturn(loggedInUser);

        // Mock-Verhalten: OrderItem gehört einem anderen Kunden
        when(orderItemRepository.findById(orderItemId))
                .thenReturn(Optional.of(orderItem));

        // Act + Assert: Zugriff muss verweigert werden
        assertThrows(
                UnauthorizedException.class,
                () -> returnsService.save(authHeader, orderItemId, "Produkt beschädigt")
        );

        // Assert: Es darf keine Rücksendung gespeichert werden
        verify(returnsRepository, never()).save(any(ReturnRequestEntity.class));
    }

    /**
     * Prüft, ob nur Rücksendungen des eingeloggten Benutzers zurückgegeben werden.
     */
    @Test
    void findAllByUserId_ReturnOnlyReturnsOfLoggedInUser() {
        // Arrange: Testdaten vorbereiten
        String authHeader = "Bearer test-token";
        UUID loggedInUserId = UUID.randomUUID();
        UUID otherUserId = UUID.randomUUID();

        User loggedInUser = new User(
                loggedInUserId,
                "Peter",
                "Peterson",
                "peter.peterson@test.de",
                UserRole.CUSTOMER,
                false
        );

        UserEntity loggedInCustomer = new UserEntity(
                loggedInUserId,
                "Peter",
                "Peterson",
                "peter.peterson@test.de",
                "hashed-password",
                UserRole.CUSTOMER,
                false
        );

        UserEntity otherCustomer = new UserEntity(
                otherUserId,
                "Max",
                "Mustermann",
                "max@test.de",
                "hashed-password",
                UserRole.CUSTOMER,
                false
        );

        ShopOrder ownOrder = new ShopOrder();
        ownOrder.setCustomer(loggedInCustomer);

        OrderItem ownOrderItem = new OrderItem();
        ownOrderItem.setShopOrder(ownOrder);

        ReturnRequestEntity ownReturn = new ReturnRequestEntity(
                ownOrderItem,
                "Produkt beschädigt"
        );

        ShopOrder otherOrder = new ShopOrder();
        otherOrder.setCustomer(otherCustomer);

        OrderItem otherOrderItem = new OrderItem();
        otherOrderItem.setShopOrder(otherOrder);

        ReturnRequestEntity otherReturn = new ReturnRequestEntity(
                otherOrderItem,
                "Falsche Größe"
        );

        // Mock-Verhalten: User ist eingeloggt
        when(authService.getCurrentUser(authHeader))
                .thenReturn(loggedInUser);

        // Mock-Verhalten: Repository liefert eigene und fremde Rücksendungen
        when(returnsRepository.findAll())
                .thenReturn(List.of(ownReturn, otherReturn));

        // Act: Rücksendungen des Benutzers abrufen
        List<ReturnRequestEntity> result = returnsService.findAllByUserId(authHeader);

        // Assert: Nur eigene Rücksendung darf zurückgegeben werden
        assertEquals(1, result.size());
        assertEquals("Produkt beschädigt", result.get(0).getReturnReason());
    }

    /**
     * Prüft, ob eine einzelne Rücksendung gefunden wird,
     * wenn sie dem eingeloggten Benutzer gehört.
     */
    @Test
    void findByIdAndCustomerId_Return_UserOwnsReturn() {
        // Arrange: Testdaten vorbereiten
        String authHeader = "Bearer test-token";
        UUID loggedInUserId = UUID.randomUUID();
        UUID returnId = UUID.randomUUID();

        User loggedInUser = new User(
                loggedInUserId,
                "Peter",
                "Peterson",
                "peter.peterson@test.de",
                UserRole.CUSTOMER,
                false
        );

        UserEntity customer = new UserEntity(
                loggedInUserId,
                "Peter",
                "Peterson",
                "peter.peterson@test.de",
                "hashed-password",
                UserRole.CUSTOMER,
                false
        );

        ShopOrder shopOrder = new ShopOrder();
        shopOrder.setCustomer(customer);

        OrderItem orderItem = new OrderItem();
        orderItem.setShopOrder(shopOrder);

        ReturnRequestEntity returnRequest = new ReturnRequestEntity(
                orderItem,
                "Produkt beschädigt"
        );

        // Mock-Verhalten: User ist eingeloggt
        when(authService.getCurrentUser(authHeader))
                .thenReturn(loggedInUser);

        // Mock-Verhalten: Rücksendung wird gefunden
        when(returnsRepository.findById(returnId))
                .thenReturn(Optional.of(returnRequest));

        // Act: Einzelne Rücksendung abrufen
        ReturnRequestEntity result =
                returnsService.findByIdAndCustomerId(returnId, authHeader);

        // Assert: Rücksendung wird korrekt zurückgegeben
        assertEquals(returnRequest, result);
        assertEquals("Produkt beschädigt", result.getReturnReason());
    }
}