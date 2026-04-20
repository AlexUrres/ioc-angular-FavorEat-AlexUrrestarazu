import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ElementService } from '../../services/element.service';
import { PreferitsService } from '../../services/preferits.service';
import { TargetaElementComponent } from '../../components/targeta-element/targeta-element.component';
import { FormulariCercaComponent } from '../../components/formulari-cerca/formulari-cerca.component';

@Component({
  selector: 'app-cataleg',
  standalone: true,
  imports: [
    CommonModule,
    TargetaElementComponent,
    FormulariCercaComponent,
    RouterModule,
  ],
  templateUrl: './cataleg.component.html',
  styleUrl: './cataleg.component.scss',
})
export class CatalegComponent implements OnInit {
  private elementService = inject(ElementService);
  private preferitsService = inject(PreferitsService);

  elements = this.elementService.elements;
  carregant = this.elementService.carregant;
  error = this.elementService.error;
  totalPreferits = this.preferitsService.totalPreferits;

  ngOnInit(): void {
    this.carregarDades();
  }

  carregarDades(): void {
    this.elementService.obtenirPopulars();
  }

  reintentar(): void {
    this.carregarDades();
  }
}
