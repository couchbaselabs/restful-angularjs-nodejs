import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
    templateUrl: './app/components/list/list.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class ListComponent implements OnInit {

    public people: Array<any>;

    public constructor(private http: Http) {
        this.people = [];
    }

    public ngOnInit() {
        this.http.get("http://localhost:3000/api/getAll")
            .map(result => result.json())
            .subscribe(results => {
                this.people = results;
            }, error => {
                console.error(error);
            });
    }

    public delete(documentId: string) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post("http://localhost:3000/api/delete", JSON.stringify({document_id: documentId}), options)
            .map(result => result.json())
            .subscribe(results => {
                for(let i = 0; i < this.people.length; i++) {
                    if(this.people[i].id == documentId) {
                        this.people.splice(i, 1);
                        break;
                    }
                }
            }, error => {
                console.error(error);
            });
    }

}
