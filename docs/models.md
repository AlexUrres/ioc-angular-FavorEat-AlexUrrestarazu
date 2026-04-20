# Documentació de Models - EAC3

Aquesta taula mostra el mapeig entre l'estructura de dades retornada per l'API (JSON) i el model intern utilitzat en l'aplicació Angular.

| ElementApiResponse (API) | ElementCataleg (Intern) | Tipus TypeScript |
| :----------------------- | :---------------------- | :--------------- |
| id                       | id                      | string           |
| nom                      | titol                   | string           |
| descripcio               | descripcio              | string           |
| categoria                | categoria               | string           |
| preu                     | preu                    | number           |
| imatge                   | imatgeUrl               | string           |
| popular                  | esPopular               | boolean          |
| stock                    | unitats                 | number           |

**Adaptadors utilitzats:**

- `adaptarElementApi`: Transforma una entrada individual de l'API al model intern.
- `adaptarElementsApi`: Transforma una col·lecció d'entrades per a la seva visualització al catàleg.
