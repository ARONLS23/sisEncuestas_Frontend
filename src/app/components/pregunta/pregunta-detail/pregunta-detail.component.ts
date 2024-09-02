import { Component } from '@angular/core';
import { Pregunta } from '../../../models/pregunta';
import { PreguntaService } from '../../../services/pregunta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location, NgIf } from '@angular/common';
import { MaterialModule } from '../../../material.module';

@Component({
  selector: 'app-pregunta-detail',
  standalone: true,
  imports: [NgIf, MaterialModule],
  templateUrl: './pregunta-detail.component.html',
  styleUrl: './pregunta-detail.component.css',
})
export class PreguntaDetailComponent {
  pregunta: Pregunta | undefined;

  constructor(
    private preguntaService: PreguntaService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.obtenerDetallesPregunta();
  }

  obtenerDetallesPregunta(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    this.preguntaService
      .obtenerDetallesDeLaPregunta(id)
      .subscribe((pregunta) => {
        this.pregunta = pregunta;
      });
  }

  goBack(): void {
    this.location.back();
  }
}
