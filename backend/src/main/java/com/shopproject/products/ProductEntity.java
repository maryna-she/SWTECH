package com.shopproject.products;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.UUID;

@Entity
@Table(name = "products")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class ProductEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;          //Wird verwendet um Rundungsfehler bei float und double zu vermeiden

    @Column(nullable = false)
    private Integer stockQuantity;

//    /*
//    Implementiert einen Mechanismus des optimistischen Sperrens (Optimistic Locking),
//    der Race Conditions verhindert, wenn mehrere Transaktionen denselben Datensatz gleichzeitig ändern.
//    Bei einem Versionskonflikt bricht Hibernate die Operation ab und löst eine Ausnahme aus,
//    wodurch das Speichern veralteter Daten in der Datenbank verhindert wird.
//     */
//    @Version
//    private Long version; // Optimistic Locking zur Vermeidung von Race Conditions beim Kauf
//    /*
//    Setzt einen unveränderlichen Zeitstempel für die erstmalige Erstellung des Datensatzes
//    und verhindert auf JPA-Ebene strikt jede spätere Aktualisierung dieses Wertes.
//    Der Zeitstempel ist erforderlich für Geschäftsabfragen mit chronologischer Sortierung
//    sowie für die automatisierte Bereinigung veralteter Datenbestände.
//     */
//    @Column(nullable = false, updatable = false)
//    private LocalDateTime createdAt;
//    /*
//    Speichert den exakten Zeitpunkt der letzten erfolgreichen Änderung der Entität,
//    um einen Audit-Trail sowie die Logik zur Cache-Invalidierung zu unterstützen.
//    Das Feld dient außerdem als technische Grundlage für inkrementelle Exporte geänderter Daten
//    in externe Systeme oder Datenspeicher.
//     */
//    @Column(nullable = false)
//    private LocalDateTime updatedAt;
}

