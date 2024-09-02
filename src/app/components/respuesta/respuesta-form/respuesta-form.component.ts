import { Component, Inject } from '@angular/core';
import { RespuestaService } from '../../../services/respuesta.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Respuesta } from '../../../models/respuesta';
import Swal from 'sweetalert2';
import { MaterialModule } from '../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'app-respuesta-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MaterialModule, FlexLayoutModule],
  templateUrl: './respuesta-form.component.html',
  styleUrl: './respuesta-form.component.css',
})
export class RespuestaFormComponent {
  form: FormGroup;
  respuestaId: number;
  preguntaId: number;
  operacion: string = '';

  constructor(
    private respuestaService: RespuestaService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      contenido: ['', Validators.required],
    });
    this.respuestaId = this.data.respuestaId;
    this.operacion = this.data.operation;
    this.preguntaId = this.data.preguntaId;
  }

  ngOnInit(): void {
    if (this.operacion === 'edit') {
      this.obtenerRespuestas(this.respuestaId);
    }
  }

  obtenerRespuestas(respuestaId: number): void {
    this.respuestaService
      .obtenerDetallesDeLaRespuesta(respuestaId)
      .subscribe((data: Respuesta) => {
        this.form.patchValue({
          contenido: data.contenido,
        });
      });
  }

  formRespuesta(): void {
    const respuesta: Respuesta = {
      id: this.respuestaId,
      contenido: this.form.value.contenido,
      pregunta: this.form.value.pregunta,
    };

    if (this.preguntaId) {
      if (this.respuestaId) {
        this.respuestaService
          .actualizarRespuesta(this.respuestaId, respuesta)
          .subscribe(() => {
            Swal.fire('Respuesta actualizada!');
            this.dialog.closeAll();
          });
      } else {
        this.respuestaService
          .agregarRespuestaAPregunta(this.preguntaId, respuesta)
          .subscribe(() => {
            Swal.fire('Respuesta registrada!');
            this.dialog.closeAll();
          });
      }
    }
  }
}
