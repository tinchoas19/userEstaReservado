import { Component, ViewChild } from '@angular/core';

import { MapPage } from './../map/map';
import { ReservasPage } from '../reservas/reservas';
import { HomePage } from '../home/home';
import { Tabs, NavController, Events } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  @ViewChild('mainTabs') mainTabs: Tabs;

  tab1Root = HomePage;
  tab2Root = MapPage;
  tab3Root = ReservasPage;

  constructor(public nav:NavController, public events: Events ) {

  }

  public tapped() {
    console.log('tap');
    this.events.publish('home:scrollToTop',true);
}
}
