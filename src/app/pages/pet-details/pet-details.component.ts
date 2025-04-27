import { Component, effect, inject, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PetsService } from '../../shared/services/pets.service';
import { Pet } from '../../pet';
import { catchError, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './pet-details.component.html',
  styleUrl: './pet-details.component.css'
})
export class PetDetailsComponent {
  petsService = inject(PetsService);
  pet = signal<Pet | null>(null);
  errorMsg = signal<string|null>(null);

  constructor(private route: ActivatedRoute, private router: Router) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    effect(() => {
      this.petsService.getPet(id).subscribe({
        next: (res) => {
          if(res)
            this.pet.set(res)
          else
            this.errorMsg.set("Pet not found. It may have been removed or never existed.")
        },
        error: (error) => {
          this.pet.set(null);
          this.errorMsg.set("Pet not found. It may have been removed or never existed.")
        }}
      )
    });
    console.log(this.pet(), this.errorMsg());
    
  }
}
