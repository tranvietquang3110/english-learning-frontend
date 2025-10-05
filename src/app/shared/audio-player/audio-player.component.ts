import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faPlay,
  faPause,
  faRotateLeft,
  faVolumeUp,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-audio-player',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss'],
})
export class AudioPlayerComponent {
  // Inputs
  @Input() src = '';
  @Input() autoPlay = false;
  @Input() showTranscript = false;
  @Input() transcript: string | null = null;
  // Audio ref
  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;

  // Icons
  faPlay = faPlay;
  faPause = faPause;
  faRotateLeft = faRotateLeft;
  faVolumeUp = faVolumeUp;
  faVolumeMute = faVolumeMute;

  // State
  isPlaying = false;
  isMuted = false;
  currentTime = 0;
  duration = 0;
  volume = 1;
  showTranscriptText = false;

  ngAfterViewInit() {
    const audio = this.audioRef.nativeElement;

    audio.addEventListener('loadeddata', () => {
      this.duration = audio.duration;
      this.currentTime = audio.currentTime;
    });

    audio.addEventListener('timeupdate', () => {
      this.currentTime = audio.currentTime;
    });

    audio.addEventListener('ended', () => {
      this.isPlaying = false;
    });

    if (this.autoPlay) {
      audio.play();
      this.isPlaying = true;
    }
  }

  togglePlayPause() {
    const audio = this.audioRef.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  handleSeek(event: any) {
    const audio = this.audioRef.nativeElement;
    const newTime = Number(event.target.value);
    audio.currentTime = newTime;
    this.currentTime = newTime;
  }

  handleRestart() {
    const audio = this.audioRef.nativeElement;
    audio.currentTime = 0;
    this.currentTime = 0;
  }

  handleVolumeChange(event: any) {
    const audio = this.audioRef.nativeElement;
    const newVolume = Number(event.target.value);
    audio.volume = newVolume;
    this.volume = newVolume;
    this.isMuted = newVolume === 0;
  }

  toggleMute() {
    const audio = this.audioRef.nativeElement;
    if (this.isMuted) {
      audio.volume = this.volume;
      this.isMuted = false;
    } else {
      audio.volume = 0;
      this.isMuted = true;
    }
  }

  formatTime(time: number): string {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }
}
