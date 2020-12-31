import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {ClimaProvider} from '../../providers/clima/clima'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  info: any;
  constructor(public navCtrl: NavController, private climaProvider: ClimaProvider) {

  }

  ionViewWillEnter(){
    this.climaProvider.getInfo().subscribe(info => {
      this.info = info
      this.info = this.info.lista_info
      console.log(this.info)
    });
    
  }

}
