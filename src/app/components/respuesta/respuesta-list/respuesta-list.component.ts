import { Component, ViewChild } from '@angular/core';
import { Respuesta } from '../../../models/respuesta';
import { RespuestaService } from '../../../services/respuesta.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location, NgFor } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { RespuestaFormComponent } from '../respuesta-form/respuesta-form.component';

@Component({
  selector: 'app-respuesta-list',
  standalone: true,
  imports: [NgFor, RouterLink, FlexLayoutModule, MaterialModule],
  templateUrl: './respuesta-list.component.html',
  styleUrl: './respuesta-list.component.css',
})
export class RespuestaListComponent {
  respuestas: Respuesta[] = [];
  tituloPregunta: string = '';

  displayedColumns = ['contenido', 'accion'];
  dataSource = new MatTableDataSource<Respuesta>();

  @ViewChild(MatSort) ordenamiento?: MatSort;
  @ViewChild(MatPaginator) paginador?: MatPaginator;

  constructor(
    private respuestaService: RespuestaService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tituloPregunta = history.state.contenido;
    this.obtenerRespuestas();
  }

  obtenerRespuestas(): void {
    const preguntaId = Number(this.route.snapshot.paramMap.get('preguntaId'));
    this.respuestaService
      .obtenerRespuestasPorPregunta(preguntaId)
      .subscribe((respuestas) => {
        this.dataSource.data = respuestas;
      });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.ordenamiento ?? null;
    this.dataSource.paginator = this.paginador ?? null;
  }

  buscar(event: KeyboardEvent): void {
    const inputBuscar = event.target as HTMLInputElement;
    this.dataSource.filter = inputBuscar.value.trim().toLowerCase();
  }

  abrirDialog(operation: string, respuestaId?: number): void {
    const preguntaId = Number(this.route.snapshot.paramMap.get('preguntaId'));
    const dialogRef = this.dialog.open(RespuestaFormComponent, {
      width: '550px',
      data: { operation, respuestaId, preguntaId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.obtenerRespuestas();
    });
  }

  eliminarRespuesta(respuestaId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#716add',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.respuestaService.eliminarRespuesta(respuestaId).subscribe(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          }).then(() => {
            this.obtenerRespuestas();
          });
        });
      }
    });
  }

  verDetalleRespuesta(respuestaId: number): void {
    this.router.navigate(['/respuestas', respuestaId]);
  }

  back(): void {
    this.location.back();
  }
}
