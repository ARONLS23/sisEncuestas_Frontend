import { Component, ViewChild } from '@angular/core';
import { Pregunta } from '../../../models/pregunta';
import { PreguntaService } from '../../../services/pregunta.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Location, NgFor } from '@angular/common';
import { MaterialModule } from '../../../material.module';
import { MatTableDataSource } from '@angular/material/table';
import { PreguntaFormComponent } from '../pregunta-form/pregunta-form.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FlexLayoutModule } from '@angular/flex-layout';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pregunta-list',
  standalone: true,
  imports: [NgFor, RouterLink, MaterialModule, FlexLayoutModule],
  templateUrl: './pregunta-list.component.html',
  styleUrl: './pregunta-list.component.css',
})
export class PreguntaListComponent {
  preguntas: Pregunta[] = [];
  encuestaId: number | undefined;
  tituloEncuesta: string = '';

  displayedColumns = ['contenido', 'accion'];
  dataSource = new MatTableDataSource<Pregunta>();

  @ViewChild(MatSort) ordenamiento?: MatSort;
  @ViewChild(MatPaginator) paginador?: MatPaginator;

  constructor(
    private preguntaService: PreguntaService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.tituloEncuesta = history.state.titulo;
    this.route.paramMap.subscribe((params) => {
      this.encuestaId = Number(params.get('id'));
      this.listarPreguntas();
    });
  }

  listarPreguntas(): void {
    if (this.encuestaId) {
      this.preguntaService
        .obtenerPreguntasPorEncuesta(this.encuestaId)
        .subscribe((preguntas) => {
          this.dataSource.data = preguntas;
        });
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.ordenamiento ?? null;
    this.dataSource.paginator = this.paginador ?? null;
  }

  buscar(event: KeyboardEvent): void {
    const inputBuscar = event.target as HTMLInputElement;
    this.dataSource.filter = inputBuscar.value.trim().toLowerCase();
  }

  abrirDialog(operation: string, preguntaId?: number): void {
    const dialogRef = this.dialog.open(PreguntaFormComponent, {
      width: '550px',
      data: { operation, preguntaId, encuestaId: this.encuestaId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.listarPreguntas();
    });
  }

  eliminarPregunta(preguntaId: number): void {
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
        this.preguntaService.eliminarPregunta(preguntaId).subscribe(() => {
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            icon: 'success',
          }).then(() => {
            this.listarPreguntas();
          });
        });
      }
    });
  }

  verRespuestas(preguntaId: number, contenido: string): void {
    this.router.navigate(
      ['/encuestas', 'preguntas', preguntaId, 'respuestas'],
      { state: { contenido: contenido } }
    );
  }

  verDetallePregunta(preguntaId: number): void {
    this.router.navigate(['/preguntas', preguntaId]);
  }

  back(): void {
    this.location.back();
  }
}
