import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastrarProvider } from '../../providers/cadastrar/cadastrar';
import { AlteraVegetalPage } from '../altera-vegetal/altera-vegetal';

@Component({
  selector: 'page-cadastrar',
  templateUrl: 'cadastrar.html'
})
export class CadastrarPage {
  vegetais: any;

  constructor(public navCtrl: NavController, private cadastrarProvider: CadastrarProvider) {
   
  }

  // Método PUT
  alteraVegetalPagina(vegetal){
    this.navCtrl.push(AlteraVegetalPage, {vegetal: vegetal})
  }

  ionViewWillEnter(){
    this.cadastrarProvider.getVegetal().subscribe(info => {
      this.vegetais = info
      this.vegetais = this.vegetais.lista_vegetais
      console.log(this.vegetais)
    });
  }

}
