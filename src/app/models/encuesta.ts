import { Pregunta } from "./pregunta";

export class Encuesta {
    id: number;
    titulo: string;
    preguntas?: Pregunta[];

    constructor (id: number, titulo: string){
        this.id = id;
        this.titulo = titulo;
    }

}
