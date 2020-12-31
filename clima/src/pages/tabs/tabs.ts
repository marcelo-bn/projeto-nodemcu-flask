import { Component } from '@angular/core';

import { CadastrarPage } from '../cadastrar/cadastrar';
import { HomePage } from '../home/home';
import { SettingsPage } from '../settings/settings';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CadastrarPage;
  tab3Root = SettingsPage;

  constructor() {

  }
}
