import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ViewWillEnter } from '@ionic/angular';
import { GameService, Choice, GameStateDeathmatch } from '../services/game.service';

@Component({
  selector: 'app-game-deathmatch',
  templateUrl: './game-deathmatch.page.html',
  styleUrls: ['./game-deathmatch.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class GameDeathmatchPage implements OnInit, OnDestroy, ViewWillEnter {
  state!: GameStateDeathmatch;
  playerEmoji = '❓';
  cpuEmoji = '❓';
  resultMsg = '⏳ PILIH SEBELUM WAKTU HABIS!';
  resultClass = 'idle';
  streakMsg = '';
  chosenBtn: Choice | null = null;
  isLocked = false;
  isShaking = true;
  isRevealing = false;
  showOverlay = false;
  overlayTrophy = '💀';
  overlayTitle = 'GAME OVER!';
  overlayTitleClass = 'dead';
  timeLeft = 15;

  private timerInterval: any;
  private isActive = false;

  constructor(private router: Router, private game: GameService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.resetGame();
  }

  ionViewWillEnter() {
    // Reinit game state when page becomes active
    this.resetGame();
  }

  ngOnDestroy() { clearInterval(this.timerInterval); }

  play(choice: Choice) {
    if (this.isLocked || !this.isActive) return;
    clearInterval(this.timerInterval);
    this.isLocked = true;
    this.chosenBtn = choice;

    const cpuChoice = this.game.getCpuChoice();
    const result = this.game.getResult(choice, cpuChoice);

    this.isShaking = false; this.isRevealing = true;
    this.playerEmoji = this.game.EMOJI[choice];
    this.cpuEmoji = this.game.EMOJI[cpuChoice];

    const pName = this.game.LABELS[choice];
    const cName = this.game.LABELS[cpuChoice];

    if (result === 'win') {
      this.state.wins++; this.state.streak++;
      if (this.state.streak > this.state.bestStreak) this.state.bestStreak = this.state.streak;
      this.state.history.push('win');
      this.resultMsg = `★ ${pName} KALAHKAN ${cName}! ★`;
      this.resultClass = 'win';
      this.streakMsg = this.game.getStreakMessage(this.state.streak);
    } else if (result === 'lose') {
      this.state.hp--; this.state.streak = 0;
      this.state.history.push('lose');
      this.resultMsg = `✕ ${cName} KALAHKAN ${pName}...`;
      this.resultClass = 'lose';
      this.streakMsg = '';
    } else {
      this.state.history.push('draw');
      this.resultMsg = `= SERI! KEDUANYA ${pName}`;
      this.resultClass = 'draw';
    }

    if (this.state.hp <= 0) {
      setTimeout(() => this.showGameOver(), 1200);
    } else {
      setTimeout(() => this.nextRound(), 1100);
    }
  }

  private onTimeout() {
    this.isLocked = true;
    this.state.hp--; this.state.streak = 0;
    this.state.history.push('timeout');
    this.playerEmoji = '⏰';
    this.cpuEmoji = this.game.EMOJI[this.game.getCpuChoice()];
    this.resultMsg = '⏰ WAKTU HABIS! -1 HP';
    this.resultClass = 'timeout';
    this.streakMsg = '';

    if (this.state.hp <= 0) {
      setTimeout(() => this.showGameOver(), 1200);
    } else {
      setTimeout(() => this.nextRound(), 1300);
    }
  }

  private startTimer() {
    clearInterval(this.timerInterval);
    this.timeLeft = this.game.getTimerStart(this.state.wins);
    this.timerInterval = setInterval(() => {
      if (!this.isActive) return;
      this.timeLeft--;
      this.cdr.markForCheck(); // Ensure timer updates are detected
      if (this.timeLeft <= 0) {
        clearInterval(this.timerInterval);
        this.onTimeout();
      }
    }, 1000);
  }

  private nextRound() {
    this.state.roundNum++;
    this.isLocked = false;
    this.chosenBtn = null;
    this.playerEmoji = '❓'; this.cpuEmoji = '❓';
    this.isShaking = true; this.isRevealing = false;
    this.resultMsg = '⏳ PILIH SEBELUM WAKTU HABIS!';
    this.resultClass = 'idle';
    this.startTimer();
  }

  private showGameOver() {
    this.isActive = false;
    clearInterval(this.timerInterval);
    this.overlayTrophy = this.state.bestStreak >= 5 ? '👑' : this.state.bestStreak >= 3 ? '🔥' : '💀';
    this.overlayTitle = this.state.bestStreak >= 3 ? 'TIDAK BURUK!' : 'GAME OVER!';
    this.overlayTitleClass = this.state.bestStreak >= 3 ? 'alive' : 'dead';
    this.showOverlay = true;
  }

  surrender() {
    this.isActive = false;
    clearInterval(this.timerInterval);
    this.showGameOver();
  }

  resetGame() {
    clearInterval(this.timerInterval);
    this.state = this.game.initDeathmatch();
    this.isActive = true;
    this.playerEmoji = '❓'; this.cpuEmoji = '❓';
    this.resultMsg = '⏳ PILIH SEBELUM WAKTU HABIS!';
    this.resultClass = 'idle';
    this.streakMsg = '';
    this.chosenBtn = null;
    this.isLocked = false;
    this.isShaking = true; this.isRevealing = false;
    this.showOverlay = false;
    this.startTimer();
  }

  getWins(): number {
    return this.state.history.filter((r: string) => r === 'win').length;
  }

  goToMenu() { 
    (document.activeElement as HTMLElement)?.blur();
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    });
  }

  refreshPage() {
    window.location.reload();
  }
}
