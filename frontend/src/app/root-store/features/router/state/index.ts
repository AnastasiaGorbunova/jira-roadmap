import { Params } from "@angular/router";

export interface State {
    url: string;
    queryParams: Params;
    params: Params;
    currentPath: string;
    data: any;
  }
  