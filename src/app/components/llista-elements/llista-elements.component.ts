import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Element } from '../../models/element.model';
import { RESTAURANTS } from '../../mocks/dades-mock';
import { TargetaElementComponent } from '../targeta-element/targeta-element.component';
import { BarraCercaComponent } from '../barra-cerca/barra-cerca.component';

@Component({
  selector: 'app-llista-elements',
  standalone: true,
  imports: [CommonModule, TargetaElementComponent, BarraCercaComponent],
  templateUrl: './llista-elements.component.html',
  styleUrl: './llista-elements.component.scss'
})
export class LlistaElementsComponent {
  llistaOriginal: Element[] = RESTAURANTS;
  llistaFiltrada: Element[] = RESTAURANTS;

  filtrarRestaurants(text: string) {
    this.llistaFiltrada = this.llistaOriginal.filter(r => 
      r.nom.toLowerCase().includes(text.toLowerCase())
    );
  }
  // Dins de la classe LlistaElementsComponent
trackById(index: number, item: Element): number {
  return item.id;
}
}