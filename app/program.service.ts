import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Year }           from './year';
import { Observable }     from 'rxjs/Observable';
import './rxjs-operators';

@Injectable()
export class ProgramService {

  private url = "http://146.185.168.179:1337/parse/";
  private header ;

  constructor (private http: Http) {
    this.header = {headers: new Headers()};
    this.header.headers.append("X-Parse-Application-Id","PDT") ;
    this.header.headers.append("Content-Type","application/json");
  }


  getProgram (id:string): Observable<Year[]> {
    return this.http.get(this.url + "classes/programs/" + id,this.header)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


  private extractData(res: Response) {
    let body = res.json();
    return body.years || body.results[0].years || [];
  }

  getCareers (): Observable<any>{
    return this.http.get(this.url + "classes/programs?keys=objectId,graduationprogram,program",this.header)
                    .map((e)=>e.json().results)
                    .catch(this.handleError)
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
