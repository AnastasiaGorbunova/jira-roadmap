import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { HeaderContainerComponent } from './header/header-container.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateProjectDialogComponent } from './dialogs/create-project-dialog/create-project-dialog.component';
import { ConfirmActionDialogComponent } from './dialogs/confirm-action-dialog/confirm-action-dialog.component';
import { CreateTaskDialogComponent } from './dialogs/create-task-dialog/create-task-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    HeaderContainerComponent,
    HeaderComponent,
    CreateProjectDialogComponent,
    ConfirmActionDialogComponent,
    CreateTaskDialogComponent
  ],
  declarations: [
    HeaderContainerComponent,
    HeaderComponent,
    CreateProjectDialogComponent,
    ConfirmActionDialogComponent,
    CreateTaskDialogComponent
  ],
  entryComponents: [
    CreateProjectDialogComponent
  ]
})
export class SharedModule { }
