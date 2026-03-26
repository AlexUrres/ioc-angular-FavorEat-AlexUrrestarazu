import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-barra-cerca',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="search-container">
    <div class="search-wrapper" role="search"> 
      <input 
        type="text" 
        placeholder="Cerca restaurant (mín. 3 lletres)..." 
        [(ngModel)]="termeCerca" 
        (ngModelChange)="onModelChange($event)"  #cercaModel="ngModel"
        minlength="3"
        required
        aria-label="Cercador de restaurants per nom" 
        aria-required="true"
        class="search-input" [class.is-invalid]="cercaModel.invalid && cercaModel.touched"
      />
      
      <button 
        class="search-button" 
        [disabled]="cercaModel.invalid" 
        (click)="onSearch()"
        aria-label="Executar cerca">
        Cercar
      </button>
    </div>

    <div *ngIf="cercaModel.invalid && cercaModel.touched" 
         class="error-container" 
         role="alert" 
         aria-live="polite"> 
      <small class="error-text" *ngIf="cercaModel.errors?.['minlength']">
        ⚠️ Calen almenys 3 caràcters per cercar.
      </small>
    </div>
  </div>
`,
styles: [`
  :host { display: block; width: 100%; }
  .search-container { display: flex; flex-direction: column; align-items: center; margin: 30px 0; padding: 0 20px; }
  .search-wrapper { display: flex; width: 100%; max-width: 600px; background-color: white; border-radius: 50px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); overflow: hidden; border: 1px solid #e2e8f0; transition: all 0.3s ease; }
  .search-wrapper:focus-within { box-shadow: 0 6px 20px rgba(0, 86, 179, 0.1); border-color: #0056b3; }
  .search-input { flex-grow: 1; border: none; padding: 15px 25px; font-size: 1rem; outline: none; background: transparent; }
  .search-input.is-invalid { background-color: #fff5f5; }
  .search-button { background-color: #0056b3; color: white; border: none; padding: 0 30px; font-size: 1rem; font-weight: 600; cursor: pointer; transition: background-color 0.3s; }
  .search-button:hover:not(:disabled) { background-color: #004494; }
  .search-button:disabled { background-color: #cbd5e1; cursor: not-allowed; }
  .error-container { width: 100%; max-width: 580px; margin-top: 10px; padding-left: 20px; text-align: left; }
  .error-text { color: #dc3545; font-weight: 500; font-size: 0.85rem; }
`]
})
export class BarraCercaComponent {
  termeCerca: string = '';
  
  @Output() cercadorEvent = new EventEmitter<string>();

  onSearch() {
    this.cercadorEvent.emit(this.termeCerca);
  }

  onModelChange(valor: string) {
    if (!valor || valor.trim().length === 0) {
      this.termeCerca = '';
      this.cercadorEvent.emit('');
    }
  }
}