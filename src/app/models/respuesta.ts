import { Pregunta } from "./pregunta";

export class Respuesta {

    id: number;
    contenido: string;
    pregunta: Pregunta;

    constructor (id: number, contenido: string, pregunta: Pregunta){
        this.id = id;
        this.contenido = contenido;
        this.pregunta = pregunta;
    }
}
