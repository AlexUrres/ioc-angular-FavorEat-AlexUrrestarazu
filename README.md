# FavorEat - Projecte de Gestió Gastronòmica
**Autor:** Alex Urrestarazu  
**Curs:** EAC Final - Desenvolupament en Frameworks JavaScript (Angular)

## Descripció del projecte
FavorEat és una aplicació web desenvolupada amb Angular 18 que permet als usuaris explorar un catàleg de restaurants, cercar per categories i gestionar una llista personalitzada de preferits amb anotacions privades.

## Mapa de Rutes
L'aplicació utilitza la tècnica de Lazy Loading per optimitzar la càrrega inicial de cada mòdul de l'aplicació.

| Ruta | Component | Tipus d'Accés |
| :--- | :--- | :--- |
| `/cataleg` | CatalegComponent | Públic |
| `/cerca` | CercaComponent | Públic |
| `/detall/:id` | DetallComponent | Públic |
| `/login` | LoginComponent | Públic |
| `/preferits` | PreferitsPanelComponent | Privat (Protegit amb AuthGuard) |

## Instruccions d'execució en local

1. **Instal·lació de dependències:**
   ```bash
   npm install
2. **Servidor de dades (API Mock):**
   L'aplicació requereix `json-server` per gestionar el fitxer `db.json`:
   ```bash
   npx json-server --watch db.json
3. **Execució de l'aplicació en desenvolupament:**
   ```bash
   ng serve

L'aplicació estarà disponible a: http://localhost:4200

## Build de Producció i Optimització
El projecte ha estat optimitzat per a un rendiment d'alta eficiència, complint amb els requisits d'estabilitat i velocitat:

* **Build de producció:** Generat amb el comandament `ng build --configuration production`.
* **Mida Initial Chunk:** 305.10 kB.
* **Mida Transferida (estimada):** 85.37 kB.

### Tècniques d'optimització aplicades:
* **Lazy Loading:** Implementat en totes les rutes principals.
* **OnPush Strategy:** Ús de `ChangeDetectionStrategy.OnPush` en components presentacionals.
* **Virtual Scrolling:** Ús d'Angular CDK en el catàleg principal per garantir la fluïdesa.

## Credencials de prova (Accés Privat)
Per provar les funcionalitats de la secció de Preferits i el sistema d'autenticació:

* **Email:** `admin@test.com`
* **Contrasenya:** `1234`