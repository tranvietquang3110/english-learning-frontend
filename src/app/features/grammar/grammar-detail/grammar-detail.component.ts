import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Grammar } from '../../../models/grammar/grammar.model';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-grammar-detail',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './grammar-detail.component.html',
  styleUrl: './grammar-detail.component.scss',
})
export class GrammarDetailComponent {
  @Input({ required: true }) grammar!: Grammar;
  @Output() goBack = new EventEmitter<void>();
  faArrowLeft = faArrowLeft;
  onBack() {
    this.goBack.emit();
  }
}
