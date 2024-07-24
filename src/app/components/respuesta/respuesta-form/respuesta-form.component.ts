import { Component } from '@angular/core';
import { RespuestaService } from '../../../services/respuesta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-respuesta-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './respuesta-form.component.html',
  styleUrl: './respuesta-form.component.css'
})
export class RespuestaFormComponent {

  contenido: string = '';
  respuestaId: number | undefined;
  preguntaId: number | undefined;

  constructor(private respuestaService: RespuestaService, private route: ActivatedRoute, private router: Router){}

  ngOnInit():void{
    this.obtenerRespuestas();
    this.route.paramMap.subscribe(params =>{
      this.preguntaId = Number(params.get('preguntaId'));
      this.respuestaId = Number(params.get('id'));
    })
  }

  obtenerRespuestas():void{
    this.respuestaId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.respuestaId) {
      this.respuestaService.obtenerDetallesDeLaRespuesta(this.respuestaId).subscribe(respuesta =>{
        this.contenido = respuesta.contenido
      })
    }
  }

  guardarRespuesta():void{
    if (this.preguntaId) {
      if (this.respuestaId) {
        this.respuestaService.actualizarRespuesta(this.respuestaId, this.contenido).subscribe(()=>{
          this.router.navigate(['/encuestas/preguntas', this.preguntaId, 'respuestas']);
        })
      }else{
        this.respuestaService.agregarRespuestaAPregunta(this.preguntaId, this.contenido).subscribe(()=>{
          this.router.navigate(['/encuestas/preguntas', this.preguntaId, 'respuestas']);
        })
      }
    }
  }

}
