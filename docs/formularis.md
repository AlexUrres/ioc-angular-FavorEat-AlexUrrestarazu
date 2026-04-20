# Documentació de Formularis - EAC3

S'ha implementat un formulari reactiu per a la cerca de restaurants amb les següents característiques:

## Validadors Implementats

### Validadors Síncrons

- **MinLength (2):** El camp requereix un mínim de 2 caràcters per ser considerat vàlid.
- **MaxLength (50):** Es limita l'entrada a un màxim de 50 caràcters per evitar peticions excessives o errors de format.

### Validador Asíncron (`codiDisponibleValidator`)

- **Funció:** Simula una validació de disponibilitat de resultats a l'API.
- **Retard:** S'ha aplicat un `delay(500)` per simular la latència de xarxa.
- **Error:** Retorna l'objecte `{ sensResultats: true }` si el terme introduït no retorna coincidències (simulació controlada).

## Comportament Reactiu

- **DebounceTime (400ms):** S'utilitza per esperar que l'usuari deixi d'escriure abans d'executar la cerca, optimitzant així el nombre de crides al servei.
- **DistinctUntilChanged:** Evita processar cerques idèntiques consecutives.
- **Estat Pending:** Mentre el validador asíncron està en curs, es mostra l'indicador visual "Validant..." mitjançant la propietat `pending` del control.
