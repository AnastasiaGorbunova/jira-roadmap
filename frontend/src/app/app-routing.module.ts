import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '@app/core/guards/auth.guard';
import { LoginGuard } from '@app/core/guards/login.guard';
import { LoginComponent } from '@app/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'projects-board',
    pathMatch: 'full',
  },
  {
    path: 'projects-board',
    loadChildren: () =>
      import('src/app/projects-board/projects-board.module').then((m) => m.ProjectsBoardModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'project',
    loadChildren: () =>
      import('src/app/project/project.module').then((m) => m.ProjectModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginGuard],
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
