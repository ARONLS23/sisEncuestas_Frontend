import { Component } from '@angular/core';
import { Pregunta } from '../../../models/pregunta';
import { PreguntaService } from '../../../services/pregunta.service';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-pregunta-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './pregunta-detail.component.html',
  styleUrl: './pregunta-detail.component.css'
})
export class PreguntaDetailComponent {

  pregunta: Pregunta | undefined;

  constructor(private preguntaService: PreguntaService, private route: ActivatedRoute){}

  ngOnInit():void{
    this.obtenerDetallesPregunta();
  }

  obtenerDetallesPregunta():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.preguntaService.obtenerDetallesDeLaPregunta(id).subscribe( pregunta =>{
      this.pregunta = pregunta;
    })
  }

}
