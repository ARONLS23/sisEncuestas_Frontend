import { Component } from '@angular/core';
import { Encuesta } from '../../../models/encuesta';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { EncuestaService } from '../../../services/encuesta.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-encuesta-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './encuesta-list.component.html',
  styleUrl: './encuesta-list.component.css'
})
export class EncuestaListComponent {

  encuestas: Encuesta[]= [];

  constructor(private route: ActivatedRoute, private router: Router, private encuestaService: EncuestaService){}

  ngOnInit():void{
    this.listarEncuesta();
  }

  listarEncuesta():void{
    this.encuestaService.obtenerTodasLasEncuestas().subscribe( encuestas =>{
      this.encuestas = encuestas;
    })
  }

  eliminarEncuesta(encuestaId: number):void{
    this.encuestaService.eliminarEncuesta(encuestaId).subscribe(()=>{
      this.listarEncuesta();
    })
  }

  verPreguntas(encuestaId: number):void{
    this.router.navigate(['/encuestas', encuestaId, 'preguntas']);
  }

}
