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

  crearEncuesta(encuesta: Encuesta): Observable<Encuesta> {
    //return this.http.post<Encuesta>(this.apiUrl, {titulo});
    return this.http.post<Encuesta>(this.apiUrl, encuesta);
  }

  obtenerTodasLasEncuestas(): Observable<Encuesta[]> {
    return this.http.get<Encuesta[]>(this.apiUrl);
  }

  obtenerDetallesDeLaEncuesta(encuestaId: number):Observable<Encuesta>{
    return this.http.get<Encuesta>(`${this.apiUrl}/${encuestaId}`);
  }

  actualizarEncuesta(encuestaId: number, encuesta: Encuesta):Observable<Encuesta>{
    //return this.http.put<Encuesta>(`${this.apiUrl}/${encuestaId}`, {id: encuestaId, titulo: nuevoTitulo});
    return this.http.put<Encuesta>(`${this.apiUrl}/${encuestaId}`, encuesta);
  }

  eliminarEncuesta(encuestaId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${encuestaId}`);
  }
}
