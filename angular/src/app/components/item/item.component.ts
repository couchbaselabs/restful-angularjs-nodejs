import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ROUTER_DIRECTIVES } from '@angular/router';
import { Location } from '@angular/common';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
    templateUrl: './app/components/item/item.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class ItemComponent implements OnInit {

    public person: any;

    public constructor(private http: Http, private route: ActivatedRoute, private location: Location) {
        this.person = {
            "firstname": "",
            "lastname": "",
            "email": ""
        }
    }

    public ngOnInit() {
        this.route.params.subscribe(params => {
            if(params["documentId"]) {
                this.http.get("http://localhost:3000/api/get?document_id=" + params["documentId"])
                    .map(result => result.json())
                    .subscribe(results => {
                        this.person = results[0];
                        this.person.document_id = params["documentId"];
                    }, error => {
                        console.error(error);
                    });
            }
        });
    }

    public save() {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://localhost:3000/api/save", JSON.stringify(this.person), options)
            .map(result => result.json())
            .subscribe(results => {
                this.location.back();
            }, error => {
                console.error(error);
            });
    }

}
