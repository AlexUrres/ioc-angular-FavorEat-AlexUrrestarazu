import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  of,
  delay,
  map,
  Observable,
} from 'rxjs';
import { ElementService } from '../../services/element.service';

@Component({
  selector: 'app-formulari-cerca',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulari-cerca.component.html',
  styleUrl: './formulari-cerca.component.scss',
})
export class FormulariCercaComponent implements OnInit {
  private fb = inject(FormBuilder);
  private elementService = inject(ElementService);

  formulari: FormGroup = this.fb.group({
    termeCerca: [
      '',
      [Validators.minLength(2), Validators.maxLength(50)],
      [this.codiDisponibleValidator()],
    ],
  });

  get tc() {
    return this.formulari.get('termeCerca');
  }

  get validantAsync(): boolean {
    return this.tc?.pending ?? false;
  }

  ngOnInit(): void {
    this.tc?.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((terme) => {
          if (!terme) {
            this.elementService.obtenirPopulars();
          } else if (this.tc?.valid || this.tc?.pending) {
            this.elementService.cercar(terme);
          }
          return of(null);
        }),
      )
      .subscribe();
  }

  netejar(): void {
    this.formulari.reset();
    this.elementService.obtenirPopulars();
  }

  private codiDisponibleValidator() {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value || control.value.length < 2) return of(null);

      return of(control.value).pipe(
        delay(500),
        map((valor) => {
          return valor.toLowerCase() === 'buit'
            ? { sensResultats: true }
            : null;
        }),
      );
    };
  }
}
