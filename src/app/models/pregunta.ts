import { Encuesta } from "./encuesta";
import { Respuesta } from "./respuesta";

export class Pregunta {
    id: number;
    contenido: string;
    encuesta: Encuesta;
    respuestas: Respuesta[]; 

    constructor (id: number, contenido: string, encuesta: Encuesta,respuestas: Respuesta[]){
        this.id = id;
        this.contenido = contenido;
        this.encuesta = encuesta;
        this.respuestas = respuestas;
    }


}
