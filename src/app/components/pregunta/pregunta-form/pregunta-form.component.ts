import { Component, Inject } from '@angular/core';
import { PreguntaService } from '../../../services/pregunta.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Pregunta } from '../../../models/pregunta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pregunta-form',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, FlexLayoutModule],
  templateUrl: './pregunta-form.component.html',
  styleUrl: './pregunta-form.component.css',
})
export class PreguntaFormComponent {
  form: FormGroup;
  id: number;
  encuestaId: number;
  operacion: string = '';

  constructor(
    private preguntaService: PreguntaService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      contenido: ['', Validators.required],
    });
    this.id = this.data.preguntaId;
    this.operacion = this.data.operation;
    this.encuestaId = this.data.encuestaId;
  }

  ngOnInit(): void {
    if (this.operacion === 'edit') {
      this.obtenerPregunta(this.id);
    }
  }

  obtenerPregunta(id: number): void {
    this.preguntaService
      .obtenerDetallesDeLaPregunta(id)
      .subscribe((data: Pregunta) => {
        this.form.patchValue({
          contenido: data.contenido,
        });
      });
  }

  formPregunta(): void {
    const pregunta: Pregunta = {
      id: this.id,
      contenido: this.form.value.contenido,
      encuesta: this.form.value.encuesta,
    };

    if (this.encuestaId) {
      if (this.operacion === 'edit') {
        this.preguntaService
          .actualizarPregunta(this.id, pregunta, this.encuestaId)
          .subscribe(() => {
            Swal.fire('Pregunta actualizada!');
            this.dialog.closeAll();
          });
      } else {
        this.preguntaService
          .agregarPreguntaAEncuesta(this.encuestaId, pregunta)
          .subscribe(() => {
            Swal.fire('Pregunta registrada!');
            this.dialog.closeAll();
          });
      }
    }
  }
}
