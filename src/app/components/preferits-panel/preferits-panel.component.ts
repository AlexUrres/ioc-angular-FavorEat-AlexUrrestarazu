import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormArray,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PreferitsService } from '../../services/preferits.service';

@Component({
  selector: 'app-preferits-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './preferits-panel.component.html',
  styleUrl: './preferits-panel.component.scss', // Aquest és el fitxer que has de crear
})
export class PreferitsPanelComponent {
  private fb = inject(FormBuilder);
  preferitsService = inject(PreferitsService);

  formularis: { [key: string]: FormGroup } = {};

  constructor() {
    this.inicialitzarFormularis();
  }

  private inicialitzarFormularis(): void {
    const llista = this.preferitsService.preferits();
    if (!llista) return;

    llista.forEach((p) => {
      this.formularis[p.id] = this.fb.group({
        notes: this.fb.array(
          (p.notes || []).map((nota) =>
            this.fb.control(nota, [
              Validators.required,
              Validators.minLength(3),
            ]),
          ),
        ),
      });
    });
  }

  getNotes(id: string): FormArray {
    return this.formularis[id].get('notes') as FormArray;
  }

  afegirNota(id: string): void {
    this.getNotes(id).push(
      this.fb.control('', [Validators.required, Validators.minLength(3)]),
    );
    this.guardar(id);
  }

  eliminarNota(id: string, index: number): void {
    this.getNotes(id).removeAt(index);
    this.guardar(id);
  }

  guardar(id: string): void {
    if (this.formularis[id].valid) {
      const notesValors = this.getNotes(id).value;
      this.preferitsService.actualitzarNotes(id, notesValors);
    }
  }
}
