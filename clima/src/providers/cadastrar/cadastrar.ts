import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the CadastrarProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CadastrarProvider {

  constructor(public http: HttpClient) {}

  getVegetal(){
    return this.http.get('http://localhost:5000/vegetal');    
  }

  putVegetal() {}

  postVegetal() {}

  getVaso(){
    return this.http.get('http://localhost:5000/vaso');    
  }

  putVaso() {}
  
  deleteVaso() {}
 
}
