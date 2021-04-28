import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';

import { environment } from 'src/environments/environment';
import { RouterStateModule } from './features/router/router-state.module';
import { AuthStateModule } from './features/auth/auth-state.module';
import { RouterStoreState } from './features/router';
import { ProjectsStateModule } from './features/projects';
import { TasksStateModule } from './features/tasks';

@NgModule({
  imports: [
    CommonModule,
    AuthStateModule,
    RouterStateModule,
    ProjectsStateModule,
    TasksStateModule,
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: false,
          strictActionImmutability: false,
        },
      }
    ),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot({
      serializer: RouterStoreState.CustomSerializer,
    }),
    EffectsModule.forRoot([]),
  ],
  declarations: []
})
export class RootStoreModule { }
