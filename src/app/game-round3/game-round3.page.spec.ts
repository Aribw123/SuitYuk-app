import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { Game3roundPage } from './game-round3.page';
import { GameService } from '../services/game.service';

describe('Game3roundPage', () => {
  let component: Game3roundPage;
  let fixture: ComponentFixture<Game3roundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        Game3roundPage
      ],
      providers: [
        GameService,
        { 
          provide: Router, 
          useValue: { navigate: jasmine.createSpy() } 
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Game3roundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});