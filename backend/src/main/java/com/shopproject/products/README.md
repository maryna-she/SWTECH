## Architektur und Struktur

Die Anwendung folgt einer klassischen **Schichtenarchitektur (3-Tier-Architecture)**. Dies ermöglicht eine strikte Trennung der Verantwortlichkeiten (Separation of Concerns). Jede Schicht hat eine spezifische Aufgabe und kommuniziert nur mit der direkt darunterliegenden Schicht.

### Warum diese Hierarchie?
* **Wartbarkeit:** Änderungen in der Datenbank wirken sich nicht direkt auf die API aus.
* **Sicherheit:** Interne Datenbankstrukturen werden nicht nach außen sichtbar.
* **Testbarkeit:** Einzelne Klassen (z. B. der Service) können durch das Mocken des Repositories isoliert getestet werden.

### Klassen- und Schichtenübersicht

| Schicht | Klasse / Komponente | Verantwortung |
| :--- | :--- | :--- |
| **API / Presentation** | `ProductsController` | Nimmt HTTP-Requests entgegen, wertet URL-Parameter/Bodies aus, ruft den Service auf und liefert HTTP-Responses (JSON + Statuscodes) via `@RestController`. |
| **Business Logic** | `ProductsService` | Enthält die Kernlogik. Prüft Geschäftsbedingungen, fordert Daten vom Repository an und nutzt den Mapper zur Konvertierung. |
| **Data Access** | `ProductsRepository` | Kapselt den Datenbankzugriff. Nutzt `JpaRepository` für fertige CRUD-Operationen (Save, Find, Delete) ohne manuelle SQL-Queries. |
| **Mapping** | `ProductMapper` | Übersetzer-Klasse. Konvertiert Datenbank-Objekte (`ProductEntity`) in API-Objekte (`Product`) und umgekehrt. |
| **Data Models** | `ProductEntity` | Repräsentiert exakt die Tabellenstruktur in der relationalen Datenbank inkl. JPA-Metadaten. |
| | `Product` | DTO (Data Transfer Object) und reines Domänenmodell. Repräsentiert die Datenstrukturen, die der Client sieht. |

### Das DTO-Prinzip (Data Transfer Object)

Ein DTO ist ein Objekt, das ausschließlich dem Transport von Daten dient. In dieser Architektur fungiert der Java-Record `Product` als DTO.

**Warum trennen wir `Product` (DTO) von `ProductEntity` (Datenbank)?**
1. **Entkopplung der API von der Datenbank:** Die Datenbankstruktur (`ProductEntity`) kann sich ändern (z. B. Umbenennung von Spalten, Hinzufügen technischer Felder wie `@Version` oder `updatedAt`), ohne dass sich die JSON-Struktur der REST-API (`Product`) ändert.
2. **Datenschutz und Sicherheit:** Eine Entität enthält oft Felder, die der Client nicht sehen darf (z. B. interne IDs, Passwörter, Metadaten). Das DTO enthält exakt nur die Daten, die für den Client bestimmt sind.
3. **Verhinderung von Over-Posting (Mass Assignment):** Wenn ein Client Daten sendet, verhindert die Nutzung eines DTOs, dass manipulierte JSON-Payloads versehentlich sensible Datenbankfelder überschreiben.