import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ClimaProvider {

  info : any;

  constructor(public http: HttpClient) {
    console.log('Hello ClimaProvider Provider');
  }


  getInfo(){
    return this.http.get('http://localhost:3001/informacao');    
    //subscribe((response) => {
    
     // this.info = response
    //});
  }

}
