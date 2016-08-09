"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var common_1 = require('@angular/common');
var http_1 = require('@angular/http');
var ItemComponent = (function () {
    function ItemComponent(http, route, location) {
        this.http = http;
        this.route = route;
        this.location = location;
        this.firstname = "";
        this.lastname = "";
        this.email = "";
    }
    ItemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            if (params["documentId"]) {
                _this.http.get("http://localhost:3000/api/get?document_id=" + params["documentId"])
                    .map(function (result) { return result.json(); })
                    .subscribe(function (results) {
                    _this.firstname = results[0].firstname;
                    _this.lastname = results[0].lastname;
                    _this.email = results[0].email;
                }, function (error) {
                    console.error(error);
                });
            }
        });
    };
    ItemComponent.prototype.save = function () {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post("http://localhost:3000/api/save", JSON.stringify({ firstname: this.firstname, lastname: this.lastname, email: this.email }), options)
            .map(function (result) { return result.json(); })
            .subscribe(function (results) {
            _this.location.back();
        }, function (error) {
            console.error(error);
        });
    };
    ItemComponent = __decorate([
        core_1.Component({
            templateUrl: './app/components/item/item.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [http_1.Http, router_1.ActivatedRoute, common_1.Location])
    ], ItemComponent);
    return ItemComponent;
}());
exports.ItemComponent = ItemComponent;
//# sourceMappingURL=item.component.js.map