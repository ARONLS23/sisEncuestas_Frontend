import { Component, Inject } from '@angular/core';
import { EncuestaService } from '../../../services/encuesta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Encuesta } from '../../../models/encuesta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta-form',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, FlexLayoutModule],
  templateUrl: './encuesta-form.component.html',
  styleUrl: './encuesta-form.component.css'
})
export class EncuestaFormComponent {

  form: FormGroup;
  id: number;
  operacion: string = '';

  constructor(private encuestaService: EncuestaService, private fb: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any){
    this.form = this.fb.group({
      titulo: ['', Validators.required],
    });
    this.id = this.data.encuestaId;
    this.operacion = this.data.operation;
  }

  ngOnInit():void{
    if (this.operacion ==='edit') {
      this.buscarEncuesta(this.id);
    }
  }

  buscarEncuesta(id: number){
    this.encuestaService.obtenerDetallesDeLaEncuesta(id).subscribe( (data: Encuesta) =>{
      this.form.patchValue({
        titulo: data.titulo
      })
    })
  }

  formEncuesta(): void {
    const encuesta: Encuesta = {
      id: this.id,
      titulo: this.form.value.titulo
    }

    if(this.operacion === 'edit'){
      this.encuestaService.actualizarEncuesta(this.id, encuesta).subscribe( () =>{
        Swal.fire("Encuesta actualizada!");
        this.dialog.closeAll();
      })
    }else{
      this.encuestaService.crearEncuesta(encuesta).subscribe( () => {
        Swal.fire("Encuesta registrada!");
        this.dialog.closeAll();
      })
    }
  }
}
