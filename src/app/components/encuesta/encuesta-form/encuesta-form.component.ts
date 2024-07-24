import { Component } from '@angular/core';
import { EncuestaService } from '../../../services/encuesta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-encuesta-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './encuesta-form.component.html',
  styleUrl: './encuesta-form.component.css'
})
export class EncuestaFormComponent {

  titulo: string = '';
  encuestaId: number | undefined;

  constructor(private encuestaService: EncuestaService, private route: ActivatedRoute, private router: Router){}

  ngOnInit():void{
    this.obtenerEncuesta();
  }

  obtenerEncuesta():void{
    this.encuestaId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.encuestaId) {
      this.encuestaService.obtenerDetallesDeLaEncuesta(this.encuestaId).subscribe(encuesta =>{
        this.titulo = encuesta.titulo;
      })
    }
  }

  guardarEncuesta():void{
    if (this.encuestaId) {
      this.encuestaService.actualizarEncuesta(this.encuestaId, this.titulo).subscribe(() =>{
        this.router.navigate(['/encuestas']);
      })
    }else{
      this.encuestaService.crearEncuesta(this.titulo).subscribe(()=>{
        this.router.navigate(['/encuestas']);
      })
    }
  }
}
