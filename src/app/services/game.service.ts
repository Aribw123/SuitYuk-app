import { Injectable } from '@angular/core';

export type Choice = 'rock' | 'scissors' | 'paper';
export type Result = 'win' | 'lose' | 'draw';
export type RoundResult = 'win' | 'lose' | 'draw' | 'timeout';

export interface GameState3Round {
  playerScore: number;
  cpuScore: number;
  rounds: RoundResult[];
  currentRound: number;
}

export interface GameStateDeathmatch {
  hp: number;
  maxHp: number;
  streak: number;
  bestStreak: number;
  roundNum: number;
  wins: number;
  history: RoundResult[];
}

@Injectable({ providedIn: 'root' })
export class GameService {
  readonly CHOICES: Choice[] = ['rock', 'scissors', 'paper'];
  readonly EMOJI: Record<Choice, string> = { rock: '🪨', scissors: '✂️', paper: '📄' };
  readonly LABELS: Record<Choice, string> = { rock: 'BATU', scissors: 'GUNTING', paper: 'KERTAS' };
  private readonly BEATS: Record<Choice, Choice> = { rock: 'scissors', scissors: 'paper', paper: 'rock' };

  getCpuChoice(): Choice {
    return this.CHOICES[Math.floor(Math.random() * 3)];
  }

  getResult(player: Choice, cpu: Choice): Result {
    if (player === cpu) return 'draw';
    return this.BEATS[player] === cpu ? 'win' : 'lose';
  }

  getTimerStart(wins: number): number {
    return Math.max(5, 15 - Math.floor(wins / 3) * 2);
  }

  init3Round(): GameState3Round {
    return { playerScore: 0, cpuScore: 0, rounds: [], currentRound: 1 };
  }

  initDeathmatch(): GameStateDeathmatch {
    return { hp: 5, maxHp: 5, streak: 0, bestStreak: 0, roundNum: 1, wins: 0, history: [] };
  }

  isGameOver3Round(state: GameState3Round): boolean {
    return state.playerScore >= 3 || state.cpuScore >= 3 || state.rounds.length >= 5;
  }

  getStreakMessage(streak: number): string {
    const msgs = ['', '🔥', '🔥🔥', '🔥🔥🔥 COMBO!', '💥 UNSTOPPABLE!'];
    return streak >= 4 ? '⚡⚡ LEGENDARY!' : msgs[Math.min(streak, 4)];
  }
}
