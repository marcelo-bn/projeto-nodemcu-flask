import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AlteraVegetalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-altera-vegetal',
  templateUrl: 'altera-vegetal.html',
})
export class AlteraVegetalPage {
  vegetal : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.vegetal = navParams.get('vegetal');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlteraVegetalPage');
  }

}
