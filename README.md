# Online-Shop Projekt – SWSYS Sommersemester 2026

Eine maßgeschneiderte E-Commerce-Plattform, entwickelt im Rahmen des Moduls **SWSYS** (Sommersemester 2026).

---

## Tech Stack

| Bereich  | Technologie               |
|----------|---------------------------|
| Backend  | Java 21 + Spring Boot 3.x |
| Frontend | React 18 + TypeScript     |
| Datenbank| PostgreSQL                |
| API      | REST (JSON)  (maybe?)     |
| Auth     | Spring Security + JWT (maybe?)    |

---

## Pflichtfunktionen (Mindestanforderungen)

Folgende Features **müssen** vollständig implementiert und testbar sein:

### 1. Kundenkonto registrieren (Selbstregistrierung)
- Registrierungsformular im Frontend (Name, E-Mail, Passwort)
- Validierung der Eingaben (Frontend + Backend)
- Passwort-Hashing (BCrypt)
- Speicherung des Nutzers in der Datenbank
- Eindeutige E-Mail-Prüfung

### 2. Authentifizierung & Autorisierung
- Login mit E-Mail + Passwort
- JWT-Token-Ausgabe bei erfolgreichem Login
- Logout (Token client-seitig entfernen)
- Rollenbasierte Zugriffskontrolle: `CUSTOMER`, `ADMIN`
- Geschützte API-Endpunkte (nur mit gültigem Token zugänglich)

### 3. Bestellung aufgeben
- Produktliste anzeigen
- Warenkorb: Produkte hinzufügen / entfernen / Menge ändern
- Checkout-Prozess mit Bestellbestätigung
- Bestellung wird in der Datenbank gespeichert (Status, Timestamp, Positionen)

### 4. Bestellhistorie einsehen
- Eingeloggter Kunde sieht seine vergangenen Bestellungen
- Anzeige von: Bestelldatum, Positionen, Gesamtpreis, Status
- API gibt nur Bestellungen des authentifizierten Nutzers zurück

### 5. Rücksendung anfordern
- Kunde kann eine Bestellung zur Rücksendung markieren
- Rücksendeanfrage wird mit Status (`REQUESTED`, `APPROVED`, `REJECTED`) gespeichert
- Admin kann Rücksendungen einsehen und den Status ändern

---

## Projektstruktur (geplant)

```
/
├── backend/                        # Spring Boot Projekt
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/shopproject/
│   │   │   │   ├── auth/           # Login, JWT, Security Config
│   │   │   │   ├── user/           # User Entity, Service, Controller
│   │   │   │   ├── product/        # Produkt Entity, Service, Controller
│   │   │   │   ├── order/          # Bestellung Entity, Service, Controller
│   │   │   │   └── returns/        # Rücksendung Entity, Service, Controller
│   │   │   └── resources/
│   │   │       └── application.yml # DB-Config, Server-Port etc.
│   │   └── test/                   # Unit- & Integrationstests
│   └── pom.xml
│
├── frontend/                       # React + TypeScript Projekt
│   ├── src/
│   │   ├── components/             # Wiederverwendbare UI-Komponenten
│   │   ├── pages/                  # Seiten (Login, Register, Shop, Orders, …)
│   │   ├── services/               # API-Calls (axios)
│   │   ├── context/                # Auth-Context (JWT verwalten)
│   │   └── types/                  # TypeScript Interfaces & Types
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                           # L01 Pflichtenheft + L02 Technische Doku (PDF)
└── README.md
```

---

## Datenbank – Entitäten (Übersicht)

```
Customer       (id, email, password_hash, name, created_at, role)
Product        (id, name, description, price, stock)
Order          (id, customer_id, created_at, status, total_price)
OrderItem      (id, order_id, product_id, quantity, unit_price)
ReturnRequest  (id, order_id, customer_id, reason, status, created_at)
```

---

## API-Endpunkte (Übersicht)

### Auth
| Methode | Endpunkt             | Beschreibung               |
|---------|----------------------|----------------------------|
| POST    | `/api/auth/register` | Neuen Kunden registrieren  |
| POST    | `/api/auth/login`    | Login, JWT zurückgeben     |

### Customers
| Methode | Endpunkt            | Beschreibung           |
|---------|---------------------|------------------------|
| GET     | `/api/customers/me` | Eigenes Profil abrufen |

### Products
| Methode | Endpunkt             | Beschreibung           |
|---------|----------------------|------------------------|
| GET     | `/api/products`      | Alle Produkte abrufen  |
| GET     | `/api/products/{id}` | Einzelnes Produkt      |

### Orders
| Methode | Endpunkt          | Beschreibung                          |
|---------|-------------------|---------------------------------------|
| POST    | `/api/orders`     | Neue Bestellung aufgeben              |
| GET     | `/api/orders`     | Bestellhistorie des eingeloggten Nutzers |
| GET     | `/api/orders/{id}`| Einzelne Bestellung abrufen           |

### Returns
| Methode | Endpunkt                   | Beschreibung                   |
|---------|----------------------------|--------------------------------|
| POST    | `/api/returns`             | Rücksendung anfordern          |
| GET     | `/api/returns`             | Eigene Rücksendungen anzeigen  |
| PATCH   | `/api/returns/{id}/status` | Status ändern (nur Admin)      |

---

## Testing

- **Unit-Tests:** JUnit 5 + Mockito (Service-Schicht)
- **Manuell:** Postman-Collection für alle API-Endpunkte

---

## Lokales Setup

TODO
---
