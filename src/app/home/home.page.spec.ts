import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { provideRouter } from '@angular/router'; // Tambahkan ini jika butuh router testing

import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Hapus declarations: [HomePage] karena ini komponen standalone
      imports: [
        IonicModule.forRoot(),
        HomePage // Masukkan ke sini
      ],
      providers: [provideRouter([])] // Menyediakan context router untuk testing
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});