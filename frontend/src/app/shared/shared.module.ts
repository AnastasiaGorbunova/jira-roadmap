import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material.module';
import { HeaderComponent } from './header/header.component';
import { HeaderContainerComponent } from './header/header-container.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
    HeaderComponent
  ],
  declarations: [
    HeaderContainerComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
