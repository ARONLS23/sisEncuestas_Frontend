import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Encuesta } from '../models/encuesta';

@Injectable({
  providedIn: 'root',
})
export class EncuestaService {
  private apiUrl = 'http://localhost:8080/api/encuestas';

  constructor(private http: HttpClient) {}

  crearEncuesta(titulo: string): Observable<Encuesta> {
    return this.http.post<Encuesta>(this.apiUrl, {titulo});
  }

  obtenerTodasLasEncuestas(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(this.apiUrl);
  }

  obtenerDetallesDeLaEncuesta(encuestaId: number):Observable<Encuesta>{
    return this.http.get<Encuesta>(`${this.apiUrl}/${encuestaId}`);
  }

  actualizarEncuesta(encuestaId: number, nuevoTitulo: string):Observable<Encuesta>{
    return this.http.put<Encuesta>(`${this.apiUrl}/${encuestaId}`, {id: encuestaId, titulo: nuevoTitulo});
  }

  eliminarEncuesta(encuestaId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${encuestaId}`);
  }
}
