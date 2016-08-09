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
var http_1 = require('@angular/http');
var ListComponent = (function () {
    function ListComponent(http) {
        this.http = http;
        this.people = [];
    }
    ListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.http.get("http://localhost:3000/api/getAll")
            .map(function (result) { return result.json(); })
            .subscribe(function (results) {
            _this.people = results;
        }, function (error) {
            console.error(error);
        });
    };
    ListComponent.prototype.delete = function (documentId) {
        var _this = this;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        this.http.post("http://localhost:3000/api/delete", JSON.stringify({ document_id: documentId }), options)
            .map(function (result) { return result.json(); })
            .subscribe(function (results) {
            for (var i = 0; i < _this.people.length; i++) {
                if (_this.people[i].id == documentId) {
                    _this.people.splice(i, 1);
                    break;
                }
            }
        }, function (error) {
            console.error(error);
        });
    };
    ListComponent = __decorate([
        core_1.Component({
            templateUrl: './app/components/list/list.component.html',
            directives: [router_1.ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ListComponent);
    return ListComponent;
}());
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map