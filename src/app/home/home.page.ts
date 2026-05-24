import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class HomePage implements OnInit {
  constructor(private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // Ensure proper initialization and change detection
    this.cdr.detectChanges();
  }

  goToMode() {
    // Blur any focused element to prevent aria-hidden issues
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/mode-select']).then(() => {
      window.location.reload();
    });
  }

  refreshPage() {
    window.location.reload();
  }
}