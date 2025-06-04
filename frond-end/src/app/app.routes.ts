import { Routes } from '@angular/router';
import { ProfileComponent } from './componentes/user/profile.component';
import { LoginComponent } from './componentes/login/login.component';
import { DocentesComponent } from './componentes/docentes/docentes.component';
import { EstudiantesComponent } from './componentes/estudiantes/estudiantes.component';
import { MateriasComponent } from './componentes/materias/materias.component';
import { CursosComponent } from './componentes/cursos/cursos.component';
import { PadresComponent } from './componentes/padres/padres.component';
import { InscripcionesComponent } from './componentes/inscripciones/inscripciones.component';
import { CursoMateriasComponent } from './componentes/curso-materias/curso-materias.component';
import { HorariosComponent } from './componentes/horarios/horarios.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profesores', component: DocentesComponent },
  { path: 'estudiantes', component: EstudiantesComponent },
  { path: 'materias', component: MateriasComponent },
  { path: 'cursos', component: CursosComponent },
  { path: 'inscripciones', component: InscripcionesComponent },
  { path: 'curso-materias', component: CursoMateriasComponent },
  { path: 'horarios', component: HorariosComponent },
  {path: 'padres', component: PadresComponent},
  { path: '**', redirectTo: '' }
]
