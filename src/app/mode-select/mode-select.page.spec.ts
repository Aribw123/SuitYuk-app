import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular'; // Import NavController
import { ModeSelectPage } from './mode-select.page';

describe('ModeSelectPage', () => {
  let component: ModeSelectPage;
  let fixture: ComponentFixture<ModeSelectPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Masukkan komponen ke imports karena Standalone
      imports: [
        IonicModule.forRoot(),
        ModeSelectPage 
      ],
      providers: [
        // Menyediakan NavController palsu agar test tidak error
        { provide: NavController, useValue: { navigateBack: jasmine.createSpy(), navigateForward: jasmine.createSpy() } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModeSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});