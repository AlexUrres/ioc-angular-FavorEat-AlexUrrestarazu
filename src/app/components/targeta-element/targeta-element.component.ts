import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementCataleg } from '../../models/element.model';
import { PreferitsService } from '../../services/preferits.service';

@Component({
  selector: 'app-targeta-element',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './targeta-element.component.html',
  styleUrl: './targeta-element.component.scss',
})
export class TargetaElementComponent {
  @Input() restaurant!: ElementCataleg;

  private preferitsService = inject(PreferitsService);

  get esFavorit(): boolean {
    return this.preferitsService.esPreferit(this.restaurant.id);
  }

  togglePreferit(): void {
    if (this.esFavorit) {
      this.preferitsService.eliminarPreferit(this.restaurant.id);
    } else {
      this.preferitsService.afegirPreferit(this.restaurant);
    }
  }
}
