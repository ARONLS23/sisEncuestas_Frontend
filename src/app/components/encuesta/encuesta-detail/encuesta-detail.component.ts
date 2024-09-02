import { Component } from '@angular/core';
import { Encuesta } from '../../../models/encuesta';
import { ActivatedRoute, Router } from '@angular/router';
import { EncuestaService } from '../../../services/encuesta.service';
import { Location, NgIf } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-encuesta-detail',
  standalone: true,
  imports: [NgIf, MaterialModule, FlexLayoutModule],
  templateUrl: './encuesta-detail.component.html',
  styleUrl: './encuesta-detail.component.css'
})
export class EncuestaDetailComponent {

  encuesta: Encuesta | undefined;

  constructor(private route: ActivatedRoute, private encuestaSerive: EncuestaService, private location: Location){}

  ngOnInit():void{
    this.obtenerDetallesEncuesta();
  }

  obtenerDetallesEncuesta():void{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.encuestaSerive.obtenerDetallesDeLaEncuesta(id).subscribe(encuesta =>{
      this.encuesta = encuesta;
      console.log('Encuesta recibida:', this.encuesta);
    })
  }

  goBack():void{
    this.location.back();
  }

}
