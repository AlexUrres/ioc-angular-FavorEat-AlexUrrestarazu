# Documentació de Navegació i Rutes

En aquest apartat es detalla la configuració del sistema de rutes de l'aplicació FavorEat.

## Mapa de Rutes
S'ha configurat un sistema de rutes dinàmic que inclou protecció de rutes i càrrega mandrosa (Lazy Loading).

| Path | Component | Descripció | Accés |
| :--- | :--- | :--- | :--- |
| `/cataleg` | CatalegComponent | Llistat principal de restaurants amb Virtual Scroll. | Públic |
| `/cerca` | CercaComponent | Cercador de restaurants per nom o categoria. | Públic |
| `/detall/:id` | DetallComponent | Vista detallada d'un restaurant mitjançant paràmetres de ruta. | Públic |
| `/login` | LoginComponent | Formulari d'autenticació d'usuaris. | Públic |
| `/preferits` | PreferitsPanelComponent | Gestió de restaurants preferits (Lazy Loaded). | Privat |
| `''` | (Redirecció) | Redirecciona automàticament a `/cataleg`. | Públic |
| `**` | PageNotFound | Ruta comodí per gestionar errors 404. | Públic |

## Decisions Tècniques
1. **Paràmetres de ruta:** S'utilitza `:id` a la ruta de detall per carregar la informació específica de cada restaurant de forma dinàmica.
2. **Guàrdies (Guards):** La ruta `/preferits` està protegida amb `authGuard`. Si un usuari no autenticat hi intenta accedir, és redirigit al `/login` guardant la URL d'intent a `returnUrl`.
3. **Lazy Loading:** S'ha implementat `loadComponent` a la ruta de preferits per reduir la mida del bundle inicial i millorar el rendiment.