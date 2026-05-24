import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Import Router
import { Router } from '@angular/router';
import { IonicModule, ViewWillEnter } from '@ionic/angular'; 
import { GameService, Choice, GameState3Round } from '../services/game.service';

@Component({
  selector: 'app-game-3round',
  templateUrl: './game-round3.page.html',
  styleUrls: ['./game-round3.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class Game3roundPage implements OnInit, ViewWillEnter {
  state!: GameState3Round;
  playerEmoji = '❓';
  cpuEmoji = '❓';
  resultMsg = '✦ PILIH SENJATAMU! ✦';
  resultClass = 'idle';
  chosenBtn: Choice | null = null;
  isLocked = false;
  isShaking = true;
  isRevealing = false;
  showOverlay = false;
  overlayTrophy = '🏆';
  overlayTitle = 'KAMU MENANG!';
  overlayTitleClass = 'win';

  constructor(private router: Router, private game: GameService) {}

  ngOnInit() {
    this.resetGame();
  }

  ionViewWillEnter() {
    // Reinit game state when page becomes active
    this.resetGame();
  }

  play(choice: Choice) {
    if (this.isLocked) return;
    this.isLocked = true;
    this.chosenBtn = choice;

    // countdown animation
    this.isShaking = true;
    this.isRevealing = false;
    this.playerEmoji = '✊'; this.cpuEmoji = '✊';

    const countLabels = ['✊ 1!', '✊ 2!', '✊ 3!'];
    let count = 0;
    const countIv = setInterval(() => {
      this.resultMsg = countLabels[count];
      this.resultClass = 'idle';
      count++;
      if (count >= 3) {
        clearInterval(countIv);
        this.reveal(choice);
      }
    }, 380);
  }

  private reveal(choice: Choice) {
    const cpuChoice = this.game.getCpuChoice();
    const result = this.game.getResult(choice, cpuChoice);

    this.isShaking = false;
    this.isRevealing = true;
    this.playerEmoji = this.game.EMOJI[choice];
    this.cpuEmoji = this.game.EMOJI[cpuChoice];

    const pName = this.game.LABELS[choice];
    const cName = this.game.LABELS[cpuChoice];

    if (result === 'win') {
      this.state.playerScore++;
      this.state.rounds.push('win');
      this.resultMsg = `★ ${pName} KALAHKAN ${cName}! ★`;
      this.resultClass = 'win';
    } else if (result === 'lose') {
      this.state.cpuScore++;
      this.state.rounds.push('lose');
      this.resultMsg = `✕ ${cName} KALAHKAN ${pName}...`;
      this.resultClass = 'lose';
    } else {
      this.state.rounds.push('draw');
      this.resultMsg = `= SERI! KEDUANYA ${pName}`;
      this.resultClass = 'draw';
    }

    if (this.game.isGameOver3Round(this.state)) {
      setTimeout(() => this.showGameOver(), 1200);
    } else {
      this.state.currentRound++;
      setTimeout(() => this.nextRound(), 1100);
    }
  }

  private nextRound() {
    this.playerEmoji = '❓'; this.cpuEmoji = '❓';
    this.isShaking = true; this.isRevealing = false;
    this.resultMsg = '✦ PILIH SENJATAMU! ✦';
    this.resultClass = 'idle';
    this.chosenBtn = null;
    this.isLocked = false;
  }

  private showGameOver() {
    const won = this.state.playerScore >= 3 ||
      (this.state.rounds.length >= 5 && this.state.playerScore > this.state.cpuScore);
    const draw = this.state.playerScore === this.state.cpuScore && this.state.rounds.length >= 5;

    this.overlayTrophy = draw ? '🤝' : won ? '🏆' : '💀';
    this.overlayTitle = draw ? 'SERI!' : won ? '★ KAMU MENANG! ★' : 'CPU MENANG...';
    this.overlayTitleClass = draw ? 'draw' : won ? 'win' : 'lose';
    this.showOverlay = true;
  }

  resetGame() {
    this.state = this.game.init3Round();
    this.playerEmoji = '❓'; this.cpuEmoji = '❓';
    this.resultMsg = '✦ PILIH SENJATAMU! ✦';
    this.resultClass = 'idle';
    this.chosenBtn = null;
    this.isLocked = false;
    this.isShaking = true; this.isRevealing = false;
    this.showOverlay = false;
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
