import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Game3roundPage } from './game-round3.page';

const routes: Routes = [
  {
    path: '',
    component: Game3roundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRound3PageRoutingModule {}
