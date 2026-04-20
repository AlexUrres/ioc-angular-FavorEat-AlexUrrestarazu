import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ElementCataleg, ElementApiResponse } from '../models/element.model';
import { adaptarElementsApi } from '../adaptadors/element.adaptador';

@Injectable({
  providedIn: 'root',
})
export class ElementService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private _elements = signal<ElementCataleg[]>([]);
  private _carregant = signal<boolean>(false);
  private _error = signal<string | null>(null);

  elements = this._elements.asReadonly();
  carregant = this._carregant.asReadonly();
  error = this._error.asReadonly();

  obtenirPopulars(): void {
    this._carregant.set(true);
    this._error.set(null);

    this.http
      .get<ElementApiResponse[]>(`${this.apiUrl}/elements?popular=true`)
      .subscribe({
        next: (data) => {
          const dadesAdaptades = adaptarElementsApi(data);
          this._elements.set(dadesAdaptades);
          this._carregant.set(false);
        },
        error: (err) => {
          this._error.set('Error en carregar els elements populars');
          this._carregant.set(false);
        },
      });
  }

  cercar(terme: string): void {
    this._carregant.set(true);
    this._error.set(null);

    this.http
      .get<ElementApiResponse[]>(`${this.apiUrl}/elements?nom_like=${terme}`)
      .subscribe({
        next: (data) => {
          const dadesAdaptades = adaptarElementsApi(data);
          this._elements.set(dadesAdaptades);
          this._carregant.set(false);
        },
        error: (err) => {
          this._error.set(`Error en cercar: ${terme}`);
          this._carregant.set(false);
        },
      });
  }
}
