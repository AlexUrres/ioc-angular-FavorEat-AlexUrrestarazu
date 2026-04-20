import { ElementCataleg, ElementApiResponse } from '../models/element.model';

export function adaptarElementApi(
  apiResponse: ElementApiResponse,
): ElementCataleg {
  return {
    id: apiResponse.id,
    titol: apiResponse.nom,
    descripcio: apiResponse.descripcio,
    categoria: apiResponse.categoria,
    preu: apiResponse.preu,
    imatgeUrl: `https://loremflickr.com/600/400/restaurant,food?lock=${apiResponse.id}`,
    esPopular: apiResponse.popular,
    unitats: apiResponse.stock,
  };
}

export function adaptarElementsApi(
  apiResponses: ElementApiResponse[],
): ElementCataleg[] {
  return apiResponses.map((apiItem) => adaptarElementApi(apiItem));
}
