import { Component } from '@angular/core';
import { Respuesta } from '../../../models/respuesta';
import { RespuestaService } from '../../../services/respuesta.service';
import { ActivatedRoute } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-respuesta-detail',
  standalone: true,
  imports: [NgIf, MaterialModule],
  templateUrl: './respuesta-detail.component.html',
  styleUrl: './respuesta-detail.component.css',
})
export class RespuestaDetailComponent {
  respuesta: Respuesta | undefined;

  constructor(
    private respuestaServive: RespuestaService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.obtenerDetallesRespuesta();
  }

  obtenerDetallesRespuesta(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.respuestaServive
      .obtenerDetallesDeLaRespuesta(id)
      .subscribe((respuesta) => {
        this.respuesta = respuesta;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
