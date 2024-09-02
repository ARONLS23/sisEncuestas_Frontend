import { Component, ViewChild } from '@angular/core';
import { Encuesta } from '../../../models/encuesta';
import { ActivatedRoute, Route, Router, RouterLink } from '@angular/router';
import { EncuestaService } from '../../../services/encuesta.service';
import { NgFor } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EncuestaFormComponent } from '../encuesta-form/encuesta-form.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-encuesta-list',
  standalone: true,
  imports: [NgFor, RouterLink, MaterialModule, FlexLayoutModule],
  templateUrl: './encuesta-list.component.html',
  styleUrl: './encuesta-list.component.css'
})
export class EncuestaListComponent {

  encuestas: Encuesta[]= [];

  displayedColumns = ['titulo','accion'];
  dataSource = new MatTableDataSource<Encuesta>();

  @ViewChild(MatSort) ordenamiento?: MatSort;
  @ViewChild(MatPaginator) paginador?: MatPaginator;

  constructor(private encuestaService: EncuestaService, private dialog: MatDialog, private router: Router){}

  ngOnInit():void{
    this.listarEncuesta();
  }

  listarEncuesta():void{
    this.encuestaService.obtenerTodasLasEncuestas().subscribe( encuestas =>{
      this.dataSource.data = encuestas;
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.ordenamiento ?? null;
    this.dataSource.paginator = this.paginador ?? null;
  }

  abrirDialog(operation: string, encuestaId?: number): void {
    const dialogRef = this.dialog.open(EncuestaFormComponent, {
      width: '550px',
      data: { operation, encuestaId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.listarEncuesta();
    });
  }

  eliminarEncuesta(encuestaId: number):void{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#716add",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.encuestaService.eliminarEncuesta(encuestaId).subscribe(()=>{
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          }).then(() => {
            this.listarEncuesta();
          })
        });
      }
    });
  }

  buscar(event: KeyboardEvent):void{
    const inputBuscar = event.target as HTMLInputElement;
    this.dataSource.filter = inputBuscar.value.trim().toLowerCase();
  }

  verPreguntas(encuestaId: number, titulo: string):void{
    this.router.navigate(['/encuestas', encuestaId, 'preguntas'], { state: { titulo: titulo } });
  }

  verDetallePregunta(encuestaId: number):void{
    this.router.navigate(['/encuestas', encuestaId]);
  }

}
