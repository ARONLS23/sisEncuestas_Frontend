import { Pregunta } from "./pregunta";

export class Encuesta {
    id: number;
    titulo: string;
    preguntas: Pregunta[];

    constructor (id: number, titulo: string, preguntas: Pregunta[]){
        this.id = id;
        this.titulo = titulo;
        this.preguntas = preguntas;
    }

}
