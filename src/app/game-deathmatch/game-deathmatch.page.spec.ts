import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameDeathmatchPage } from './game-deathmatch.page';

describe('GameDeathmatchPage', () => {
  let component: GameDeathmatchPage;
  let fixture: ComponentFixture<GameDeathmatchPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GameDeathmatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
