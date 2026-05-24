import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ViewWillEnter } from '@ionic/angular'; 

@Component({
  selector: 'app-mode-select',
  templateUrl: './mode-select.page.html',
  styleUrls: ['./mode-select.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ModeSelectPage implements OnInit, OnDestroy, ViewWillEnter {
  demoTimer = 15;
  private timerInterval: any;

  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.startTimer();
  }

  ionViewWillEnter() {
    // Reset timer when page becomes active
    this.demoTimer = 15;
    this.cdr.detectChanges();
  }

  ngOnDestroy() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  private startTimer() {
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      this.demoTimer--;
      if (this.demoTimer < 0) this.demoTimer = 15;
      this.cdr.markForCheck();
    }, 1000);
  }

  selectMode(mode: '3round' | 'deathmatch') {
    (document.activeElement as HTMLElement)?.blur();
    if (mode === '3round') {
      this.router.navigate(['/game-3round']).then(() => {
        window.location.reload();
      });
    } else {
      this.router.navigate(['/game-deathmatch']).then(() => {
        window.location.reload();
      });
    }
  }

  goBack() {
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  refreshPage() {
    window.location.reload();
  }
}