import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


import { DashboardComponent } from './dashboard.component';
import { CardPokemonComponent } from './card-pokemon/card-pokemon.component';
import { MatchButtonComponent } from './match-button/match-button.component';
import { MatchReportComponent } from './match-report/match-report.component';
import {TableModule} from 'primeng/table';
import { SharedModule } from 'primeng/api';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [DashboardComponent, CardPokemonComponent, MatchButtonComponent,MatchReportComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    SharedModule ,
    DialogModule,
    ButtonModule
  ]
})
export class DashboardModule {}
