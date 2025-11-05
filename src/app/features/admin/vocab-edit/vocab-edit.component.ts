import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Vocabulary } from '../../../models/vocabulary/vocabulary.model';
import { AudioPlayerComponent } from '../../../shared/audio-player/audio-player.component';

@Component({
  selector: 'app-vocab-edit',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AudioPlayerComponent,
  ],
  templateUrl: './vocab-edit.component.html',
})
export class VocabEditComponent implements OnInit {
  @Input() vocab?: Vocabulary; // dữ liệu cũ (nếu chỉnh sửa)
  @Output() save = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  form!: FormGroup;

  faSave = faSave;
  faTimes = faTimes;

  audioPreview: string | null = null;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      word: [this.vocab?.word || '', Validators.required],
      phonetic: [this.vocab?.phonetic || '', Validators.required],
      meaning: [this.vocab?.meaning || '', Validators.required],
      example: [this.vocab?.example || ''],
      exampleMeaning: [this.vocab?.exampleMeaning || ''],
      audioUrl: [this.vocab?.audioUrl || ''],
      imageUrl: [this.vocab?.imageUrl || ''],
      imageFile: null,
      audioFile: null,
    });

    // nếu có vocab thì set preview
    if (this.vocab?.imageUrl) this.imagePreview = this.vocab.imageUrl;
    if (this.vocab?.audioUrl) this.audioPreview = this.vocab.audioUrl;
  }

  onAudioSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.audioPreview = reader.result as string);
      reader.readAsDataURL(file);

      this.form.patchValue({ audioFile: file });
    }
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => (this.imagePreview = reader.result as string);
      reader.readAsDataURL(file);

      this.form.patchValue({ imageFile: file });
    }
  }

  onSubmit() {
    if (this.form.valid) {
      this.save.emit({
        ...this.form.value,
        id: this.vocab?.id,
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  onCancel() {
    this.cancel.emit();
  }
}
