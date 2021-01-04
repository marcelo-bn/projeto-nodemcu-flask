import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ClimaProvider {

  info : any;

  constructor(public http: HttpClient) {}


  getInfo(){
    return this.http.get('http://localhost:5000/informacao');    
  }

}
