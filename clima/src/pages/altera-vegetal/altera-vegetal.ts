import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CadastrarProvider} from '../../providers/cadastrar/cadastrar'
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private cadastrarProvider: CadastrarProvider) {
    this.vegetal = navParams.get('vegetal');
  }

  ionViewDidLoad() {}

  alteraVegetal(vegetal,novaTempIdeal,novaUmiIdeal) {

    if (novaTempIdeal == undefined && novaUmiIdeal == undefined) {
      this.cadastrarProvider.putVegetal(vegetal.nome,vegetal.tempIdeal,vegetal.umidadeIdeal)
      //console.log(vegetal.nome,vegetal.tempIdeal,vegetal.umidadeIdeal)
    }
    else if (novaTempIdeal != undefined && novaUmiIdeal != undefined) {
      this.cadastrarProvider.putVegetal(vegetal.nome,novaTempIdeal,novaUmiIdeal)
      //console.log(vegetal.nome,novaTempIdeal,novaUmiIdeal)
    }
    else if (novaTempIdeal == undefined) {
      this.cadastrarProvider.putVegetal(vegetal.nome,vegetal.tempIdeal,novaUmiIdeal)
      //console.log(vegetal.nome,vegetal.tempIdeal,novaUmiIdeal)
    }
    else if (novaUmiIdeal == undefined ) {
      this.cadastrarProvider.putVegetal(vegetal.nome,novaTempIdeal,vegetal.umidadeIdeal)
      //console.log(vegetal.nome,novaTempIdeal,vegetal.umidadeIdeal)
    }

  }

}
