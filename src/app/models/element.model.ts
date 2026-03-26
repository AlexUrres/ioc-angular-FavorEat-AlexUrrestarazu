export interface Element {
    id: number; // Identificador obligatori
    nom: string; // Nom del restaurant
    poblacio: string; // Ubicació
    preuMitja: number; // Valor numéric
    tipusCuina: string; // Característica del restaurant
    menuTancat?: boolean; // Propietat opcional
}