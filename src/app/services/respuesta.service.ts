import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Respuesta } from '../models/respuesta';

@Injectable({
  providedIn: 'root'
})
export class RespuestaService {

  private apiUrl = 'http://localhost:8080/api/respuestas';

  constructor(private http: HttpClient) { }

  agregarRespuestaAPregunta(preguntaId: number, contenido: string):Observable<Respuesta>{
    return this.http.post<Respuesta>(`${this.apiUrl}/agregar/${preguntaId}`, {id:preguntaId, contenido: contenido});
  }

  obtenerRespuestasPorPregunta(preguntaId: number):Observable<Respuesta[]>{
    return this.http.get<Respuesta[]>(`${this.apiUrl}/por-pregunta/${preguntaId}`);
  }

  obtenerDetallesDeLaRespuesta(respuestaId: number):Observable<Respuesta>{
    return this.http.get<Respuesta>(`${this.apiUrl}/${respuestaId}`);
  }

  actualizarRespuesta(respuestaId: number,nuevoContenido: string):Observable<Respuesta>{
    return this.http.put<Respuesta>(`${this.apiUrl}/${respuestaId}`, {id:respuestaId, contenido: nuevoContenido});
  }

  eliminarRespuesta(respuestaId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${respuestaId}`);
  }

}
