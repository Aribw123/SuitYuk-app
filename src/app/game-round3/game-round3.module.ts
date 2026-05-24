import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameRound3PageRoutingModule } from './game-round3-routing.module';

import { Game3roundPage } from './game-round3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameRound3PageRoutingModule,
    Game3roundPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GameRound3PageModule {}
