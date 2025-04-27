import { Component, Input } from '@angular/core';
import { PetCardComponent } from '../pet-card/pet-card.component';
import { Pet } from '../../pet';

@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [PetCardComponent],
  templateUrl: './pets-list.component.html',
  styleUrl: './pets-list.component.css'
})
export class PetsListComponent {
  @Input() pets: Pet[] = [];
}
