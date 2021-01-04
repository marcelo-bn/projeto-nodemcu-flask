import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {BombaProvider} from '../../providers/bomba/bomba'
/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  info: any;
  tempoBomba1: any;
  tempoBomba2: any;
  vaso1: any;
  vaso2: any;

  constructor(public navCtrl: NavController, private bombaProvider: BombaProvider) {
  }

  ionViewWillEnter(){
    this.bombaProvider.getInfo().subscribe(info => {
      this.info = info
      this.info = this.info.lista_vasos
      this.vaso1 = this.info[0]
      this.vaso2 = this.info[1]
    });

  }
  
  acionaBomba(idVaso){
    if (idVaso == 1) {
      this.bombaProvider.putBomba(idVaso, this.tempoBomba1)
      this.tempoBomba1 = ""
    } else {
      this.bombaProvider.putBomba(idVaso, this.tempoBomba2)
      this.tempoBomba2 = ""
    }
  }

  


}
