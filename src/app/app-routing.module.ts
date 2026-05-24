import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'mode-select',
    loadComponent: () => import('./mode-select/mode-select.page').then(m => m.ModeSelectPage)
  },
  {
    path: 'game-3round',
    loadComponent: () => import('./game-round3/game-round3.page').then(m => m.Game3roundPage)
  },
  {
    path: 'game-deathmatch',
    loadComponent: () => import('./game-deathmatch/game-deathmatch.page').then(m => m.GameDeathmatchPage)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
