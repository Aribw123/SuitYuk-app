import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameDeathmatchPage } from './game-deathmatch.page';

const routes: Routes = [
  {
    path: '',
    component: GameDeathmatchPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameDeathmatchPageRoutingModule {}