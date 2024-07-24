import { Component } from '@angular/core';
import { Pregunta } from '../../../models/pregunta';
import { PreguntaService } from '../../../services/pregunta.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pregunta-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './pregunta-list.component.html',
  styleUrl: './pregunta-list.component.css'
})
export class PreguntaListComponent {

  preguntas: Pregunta[] = [];
  encuestaId: number | undefined;

  constructor (private preguntaService: PreguntaService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit():void{
    this.route.paramMap.subscribe(params =>{
      this.encuestaId = Number(params.get('id'));
      this.listarPreguntas();
    })
  }

  listarPreguntas():void{
    if (this.encuestaId) {
      this.preguntaService.obtenerPreguntasPorEncuesta(this.encuestaId).subscribe(preguntas =>{
        this.preguntas = preguntas;
      })
    }
  }

  eliminarPregunta(preguntaId: number):void{
    this.preguntaService.eliminarPregunta(preguntaId).subscribe(()=>{
      this.listarPreguntas();
    })
  }

  verRespuestas(preguntaId: number):void{
    this.router.navigate(['/encuestas','preguntas', preguntaId,'respuestas']);
  }

}
