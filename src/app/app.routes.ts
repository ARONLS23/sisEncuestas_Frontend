import { Routes } from '@angular/router';
import { EncuestaListComponent } from './components/encuesta/encuesta-list/encuesta-list.component';
import { EncuestaFormComponent } from './components/encuesta/encuesta-form/encuesta-form.component';
import { EncuestaDetailComponent } from './components/encuesta/encuesta-detail/encuesta-detail.component';
import { PreguntaListComponent } from './components/pregunta/pregunta-list/pregunta-list.component';
import { PreguntaFormComponent } from './components/pregunta/pregunta-form/pregunta-form.component';
import { PreguntaDetailComponent } from './components/pregunta/pregunta-detail/pregunta-detail.component';
import { RespuestaListComponent } from './components/respuesta/respuesta-list/respuesta-list.component';
import { RespuestaFormComponent } from './components/respuesta/respuesta-form/respuesta-form.component';
import { RespuestaDetailComponent } from './components/respuesta/respuesta-detail/respuesta-detail.component';

export const routes: Routes = [
    {
        path: '', component: EncuestaListComponent
    },
    {
        path: 'encuestas',
        children:[
            {path: '', component: EncuestaListComponent},
            {path: 'nueva', component: EncuestaFormComponent},
            {path: 'editar/:id', component: EncuestaFormComponent},
            {path: ':id', component: EncuestaDetailComponent},
            {path: ':id/preguntas', component: PreguntaListComponent},
            {path: 'preguntas/:preguntaId/respuestas', component: RespuestaListComponent}
        ]
    },
    {
        path: 'preguntas',
        children:[
            {path: '', component: PreguntaListComponent},
            {path: 'nueva/:encuestaId', component: PreguntaFormComponent},
            {path: 'editar/:id/encuesta/:encuestaId', component: PreguntaFormComponent},
            {path: ':id', component: PreguntaDetailComponent}
        ]
    },
    {
        path: 'respuestas',
        children:[
            {path: '', component: RespuestaListComponent},
            {path: 'nueva/:preguntaId', component: RespuestaFormComponent},
            {path: 'editar/:id/pregunta/:preguntaId', component: RespuestaFormComponent},
            {path: ':id', component: RespuestaDetailComponent}
        ]
    }
];
