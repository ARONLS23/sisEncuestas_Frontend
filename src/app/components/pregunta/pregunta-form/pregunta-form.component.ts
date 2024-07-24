import { Component } from '@angular/core';
import { PreguntaService } from '../../../services/pregunta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pregunta-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pregunta-form.component.html',
  styleUrl: './pregunta-form.component.css'
})
export class PreguntaFormComponent {

  contenido: string ='';
  preguntaId: number | undefined;
  encuestaId: number | undefined;

  constructor (private preguntaService: PreguntaService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit():void{
    this.obtenerPregunta();
    this.route.paramMap.subscribe(params =>{
      this.encuestaId = Number(params.get('encuestaId'));
      this.preguntaId = Number(params.get('id'));
    })
  }

  obtenerPregunta():void{
    this.preguntaId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.preguntaId) {
      this.preguntaService.obtenerDetallesDeLaPregunta(this.preguntaId).subscribe( pregunta =>{
        this.contenido = pregunta.contenido
      })
    }
  }

  guardarPregunta():void{
    if (this.encuestaId) {
      if (this.preguntaId) {
        this.preguntaService.actualizarPregunta(this.preguntaId, this.contenido, this.encuestaId).subscribe(()=>{
          this.router.navigate(['/encuestas/'+this.encuestaId+'/preguntas'])
        })
      }else{
        this.preguntaService.agregarPreguntaAEncuesta(this.encuestaId, this.contenido).subscribe(()=>{
          this.router.navigate(['/encuestas/'+this.encuestaId+'/preguntas'])
        })
      }
    }
  }

}
