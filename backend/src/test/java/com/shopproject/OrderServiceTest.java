package com.shopproject;

import com.shopproject.order.*;
import com.shopproject.products.ProductEntity;
import com.shopproject.products.ProductsRepository;
import com.shopproject.user.UserRepository;
import com.shopproject.user.model.UserEntity;
import com.shopproject.user.model.UserRole;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

/**
 * Unit-Tests für den OrderService.
 *
 * Die Tests prüfen die minimale Geschäftslogik für Bestellungen:
 * - Bestellung erfolgreich erstellen
 * - Gesamtpreis korrekt berechnen
 * - ungültige Bestellungen ablehnen
 * - nicht vorhandene Kunden korrekt behandeln
 * - Bestellhistorie eines Kunden abrufen
 *
 * Die Repositorys werden mit Mockito simuliert, damit keine echte Datenbank benötigt wird.
 */
@ExtendWith(MockitoExtension.class)
class OrderServiceTest {

    @Mock
    private ShopOrderRepository shopOrderRepository;

    @Mock
    private ProductsRepository productsRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private OrderService orderService;

    /**
     * Prüft, ob eine Bestellung erfolgreich erstellt wird
     * und der Gesamtpreis korrekt aus Produktpreis und Menge berechnet wird.
     */
    @Test
    void createOrder_withCorrectTotalPrice() {
        // Arrange: Testdaten für Kunde, Produkt und Bestellung vorbereiten
        UUID userId = UUID.randomUUID();
        UUID productID = UUID.randomUUID();

        UserEntity customer = new UserEntity(
                userId,
                "Peter",
                "Peterson",
                "peter.peterson@test.de",
                "hashed-password",
                UserRole.CUSTOMER,
                false
        );

        ProductEntity product = new ProductEntity(
                productID,
                "Outdoor Axt",
                "Eine Axt, die nicht nur für dein nächstes Survival Abenteuer reichen wird.",
                new BigDecimal("39.99"),
                20
        );

        CreateOrderRequest request = new CreateOrderRequest(
                "peter.peterson@test.de",
                List.of(new CreatedOrderItemRequest(productID, 2))
        );

        // Mock-Verhalten: Kunde und Produkt sollen gefunden werden
        when(userRepository.findByEmailAndIsDeletedFalse("peter.peterson@test.de"))
                .thenReturn(Optional.of(customer));

        when(productsRepository.findById(productID))
                .thenReturn(Optional.of(product));

        // Mock-Verhalten: Beim Speichern wird die übergebene Bestellung zurückgegeben
        when(shopOrderRepository.save(any(ShopOrder.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        // Act: Bestellung erstellen
        OrderResponse response = orderService.createOrder(request);

        // Assert: Ergebnis prüfen
        assertEquals(OrderStatus.CREATED, response.status());
        assertEquals(new BigDecimal("79.98"), response.totalPrice());
        assertEquals(1, response.items().size());
        assertEquals("Outdoor Axt", response.items().get(0).productName());
        assertEquals(2, response.items().get(0).quantity());
    }

    /**
     * Prüft, ob eine Bestellung abgelehnt wird,
     * wenn keine Bestellpositionen übergeben werden.
     */
    @Test
    void createOrder_throwBadRequest_whenItemsEmpty() {
        // Arrange: Request ohne Produkte vorbereiten
        CreateOrderRequest request = new CreateOrderRequest(
                "peter.peterson@test.de",
                List.of()
        );

        // Act + Assert: Es wird eine ResponseStatusException erwartet
        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> orderService.createOrder(request)
        );

        // Assert: Der HTTP-Statuscode muss 400 Bad Request sein
        assertEquals(400, exception.getStatusCode().value());
    }

    /**
     * Prüft, ob createOrder mit 404 Not Found abbricht,
     * wenn für die angegebene E-Mail-Adresse kein Kunde existiert.
     */
    @Test
    void createOrder_ThrowNotFound_whenCustomerNotExist() {
        // Arrange: Request mit nicht vorhandener Kunden-E-Mail vorbereiten
        UUID productId = UUID.randomUUID();

        CreateOrderRequest request = new CreateOrderRequest(
                "notPeter.Peterson@test.de",
                List.of(new CreatedOrderItemRequest(productId, 1))
        );

        // Mock-Verhalten: Zu dieser E-Mail wird kein Kunde gefunden
        when(userRepository.findByEmailAndIsDeletedFalse("notPeter.Peterson@test.de"))
                .thenReturn(Optional.empty());

        // Act + Assert: Es wird eine ResponseStatusException erwartet
        ResponseStatusException exception = assertThrows(
                ResponseStatusException.class,
                () -> orderService.createOrder(request)
        );

        // Assert: Der HTTP-Statuscode muss 404 Not Found sein
        assertEquals(404, exception.getStatusCode().value());
    }

    /**
     * Prüft, ob die Bestellhistorie eines Kunden korrekt zurückgegeben wird.
     */
    @Test
    void getOrdersByCustomerEmail_ReturnOrderHistory() {
        // Arrange: Testkunde und vorhandene Bestellung vorbereiten
        UUID userId = UUID.randomUUID();

        UserEntity customer = new UserEntity(
                userId,
                "Max",
                "Mustermann",
                "max@test.de",
                "hashed-password",
                UserRole.CUSTOMER,
                false
        );

        ShopOrder order = new ShopOrder();
        order.setCustomer(customer);
        order.setTotalPrice(new BigDecimal("79.99"));

        // Mock-Verhalten: Kunde und dessen Bestellung sollen gefunden werden
        when(userRepository.findByEmailAndIsDeletedFalse("max@test.de"))
                .thenReturn(Optional.of(customer));

        when(shopOrderRepository.findByCustomer(customer))
                .thenReturn(List.of(order));

        // Act: Bestellhistorie abrufen
        List<OrderResponse> response = orderService.getOrdersByCustomerEmail("max@test.de");

        // Assert: Bestellhistorie prüfen
        assertEquals(1, response.size());
        assertEquals(new BigDecimal("79.99"), response.get(0).totalPrice());
        assertEquals(OrderStatus.CREATED, response.get(0).status());
    }
}