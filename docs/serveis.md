# Serveis - FavorEat

L'aplicació utilitza serveis d'Angular per centralitzar la lògica de dades, la comunicació amb l'API i la gestió de l'estat local.

## 1. ElementService (Comunicació HTTP)

Aquest servei gestiona totes les peticions al servidor extern mitjançant `HttpClient`.

- **Endpoint principal**: `https://api-demo-angular.vercel.app/api/elements`
- **Mètode**: `GET`
- **Gestió d'Estats (Signals)**:
  - `elements`: Emmagatzema la llista de restaurants obtinguda i mapada.
  - `carregant`: Signal booleà que indica si la petició està en curs (per mostrar l'spinner).
  - `error`: Signal que emmagatzema el missatge d'error en cas de fallada en la comunicació.
- **Mètode `obtenirPopulars()`**: Realitza la crida a l'API i aplica el mapatge de dades definit a `models.md`.

## 2. PreferitsService (Gestió d'Estat i Persistència)

Servei encarregat de gestionar la llista de restaurants preferits de l'usuari i les seves notes.

- **Signals**:
  - `_preferits`: Estat privat que conté l'array d'objectes `ElementCataleg`.
  - `totalPreferits`: Signal computat (`computed`) que retorna la quantitat d'elements seleccionats.
- **Persistència (LocalStorage)**:
  - S'utilitza el `localStorage` amb la clau `preferits-cataleg`.
  - En iniciar el servei, es carreguen les dades guardades.
  - Cada modificació (afegir, eliminar o actualitzar notes) dispara una actualització del `localStorage` per garantir que les dades no es perdin en refrescar la pàgina (F5).
- **Mètodes clau**:
  - `afegirPreferit()` / `eliminarPreferit()`: Gestió de la llista.
  - `actualitzarNotes()`: Permet guardar les notes del `FormArray` dins de l'objecte del restaurant corresponent.
