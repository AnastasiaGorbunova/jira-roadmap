import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';

import { ProjectsBoardComponent } from './projects-board/projects-board.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'projects',
    // loadChildren: () =>
    //   import('src/app/projects-board/projects-board.module').then((m) => m.ProjectsBoardModule),
    component: ProjectsBoardComponent
    // canLoad: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    // canActivate: [LoginGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
