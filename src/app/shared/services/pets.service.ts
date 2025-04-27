import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Pet } from '../../pet';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private http = inject(HttpClient);

  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>('https://pets-react-query-backend.eapi.joincoded.com/pets').pipe(
      catchError((error) => {
        console.error('Error fetching all pets:', error); // Log the error for debugging
        return of([]); // Return an empty array to prevent the app from breaking in case of an error
      }));
  }

  getPet(id: number): Observable<Pet | null> {
    return this.http.get<Pet>(`https://pets-react-query-backend.eapi.joincoded.com/pets/${id}`).pipe(
      catchError((error) => {
        console.error('Error fetching all pets:', error); // Log the error for debugging
        return of(null); // Return an empty array to prevent the app from breaking in case of an error
      }));
  }

  createPet(pet: Pet){
    return this.http.post<Pet>('https://pets-react-query-backend.eapi.joincoded.com/pets', pet).pipe(res => res);
  }
}
