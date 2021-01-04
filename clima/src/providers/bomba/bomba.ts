import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class BombaProvider {

  info : any;

  constructor(public http: HttpClient) {}


  getInfo(){
    return this.http.get('http://localhost:5000/vaso');    
  }


  putBomba(idVaso, tempoBomba){
    let body = {
      idVaso : String(idVaso),
      tempo :tempoBomba
    };

    const headers = new HttpHeaders()
    .set("Content-Type", "application/json");

    console.log(JSON.stringify(body))
    return this.http.put('http://localhost:5000/bomba', JSON.stringify(body), 
                        {headers}).subscribe(
                                    val => {
                                        console.log("PUT realizado", 
                                                    val);
                                    },
                                    response => {
                                        console.log("PUT não realizado", response);
                                    }
                                );

  }


}
