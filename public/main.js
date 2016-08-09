"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var _1 = require('./app/');
var list_component_1 = require('./app/components/list/list.component');
var item_component_1 = require('./app/components/item/item.component');
if (_1.environment.production) {
    core_1.enableProdMode();
}
exports.AppRoutes = [
    { path: "", component: list_component_1.ListComponent },
    { path: "item", component: item_component_1.ItemComponent },
    { path: "item/:documentId", component: item_component_1.ItemComponent }
];
platform_browser_dynamic_1.bootstrap(_1.AppComponent, [router_1.provideRouter(exports.AppRoutes), http_1.HTTP_PROVIDERS]);
//# sourceMappingURL=main.js.map