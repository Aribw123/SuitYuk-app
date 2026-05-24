import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GameDeathmatchPageRoutingModule } from './game-deathmatch-routing.module';

import { GameDeathmatchPage } from './game-deathmatch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GameDeathmatchPageRoutingModule,
    GameDeathmatchPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GameDeathmatchPageModule {}
