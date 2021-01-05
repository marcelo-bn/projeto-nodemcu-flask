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
  vasos: any;

  constructor(public navCtrl: NavController, private cadastrarProvider: CadastrarProvider) {
   
  }

  // Método PUT
  alteraVegetalPagina(vegetal){
    this.navCtrl.push(AlteraVegetalPage, {vegetal: vegetal})
  }

   // Método PUT
   alteraVasoPagina(vaso){
    //this.navCtrl.push(AlteraVasoPage, {vaso: vaso})
  }

  ionViewWillEnter(){
    this.cadastrarProvider.getVegetal().subscribe(info => {
      this.vegetais = info
      this.vegetais = this.vegetais.lista_vegetais
      //console.log(this.vegetais)
    });

    this.cadastrarProvider.getVaso().subscribe(info => {
      this.vasos = info
      this.vasos = this.vasos.lista_vasos
      //console.log(this.vegetais)
    });
  }

}
