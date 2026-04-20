import { Injectable, signal, computed } from '@angular/core';
import { ElementCataleg } from '../models/element.model';

@Injectable({
  providedIn: 'root',
})
export class PreferitsService {
  private readonly STORAGE_KEY = 'preferits-cataleg';

  private _preferits = signal<ElementCataleg[]>(this.carregarDeLocalStorage());

  preferits = this._preferits.asReadonly();
  totalPreferits = computed(() => this._preferits().length);

  private carregarDeLocalStorage(): ElementCataleg[] {
    try {
      const dades = localStorage.getItem(this.STORAGE_KEY);
      return dades ? JSON.parse(dades) : [];
    } catch (e) {
      return [];
    }
  }

  private guardar(elements: ElementCataleg[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(elements));
    } catch (e) {}
  }

  afegirPreferit(element: ElementCataleg): void {
    if (!this.esPreferit(element.id)) {
      this._preferits.update((actuals) => {
        const nous = [...actuals, element];
        this.guardar(nous);
        return nous;
      });
    }
  }

  eliminarPreferit(id: string): void {
    this._preferits.update((actuals) => {
      const nous = actuals.filter((e) => e.id !== id);
      this.guardar(nous);
      return nous;
    });
  }

  esPreferit(id: string): boolean {
    return this._preferits().some((e) => e.id === id);
  }

  actualitzarNotes(id: string, notes: string[]): void {
    this._preferits.update((actuals) => {
      const nous = actuals.map((e) => (e.id === id ? { ...e, notes } : e));
      this.guardar(nous);
      return nous;
    });
  }
}
