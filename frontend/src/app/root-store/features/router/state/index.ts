import { Params, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import * as fromRouter from '@ngrx/router-store';

export interface State {
  url: string;
  queryParams: Params;
  params: Params;
  currentPath: string;
  data: any;
}

export class CustomSerializer implements fromRouter.RouterStateSerializer<State> {
  serialize(routerState: RouterStateSnapshot): State {
    let route: ActivatedRouteSnapshot = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams },
    } = routerState;
    const { params, data } = route;

    const currentPath = (!!data && data.navigationName) || (!!route.url[0] && route.url[0].path) || '';

    return { url, queryParams, params, currentPath, data };
  }
}
