import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { provideRouter, RouterConfig } from '@angular/router';
import { HTTP_PROVIDERS } from '@angular/http';
import { AppComponent, environment } from './app/';

import { ListComponent } from './app/components/list/list.component';
import { ItemComponent } from './app/components/item/item.component';

if (environment.production) {
  enableProdMode();
}

export const AppRoutes: RouterConfig = [
    { path: "", component: ListComponent },
    { path: "item", component: ItemComponent },
    { path: "item/:documentId", component: ItemComponent }
];

bootstrap(AppComponent, [provideRouter(AppRoutes), HTTP_PROVIDERS]);
