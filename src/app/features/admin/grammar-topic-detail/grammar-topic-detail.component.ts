import { Component, OnInit } from '@angular/core';
import { GrammarService } from '../../../services/GrammarService';
import { ActivatedRoute } from '@angular/router';
import { Grammar } from '../../../models/grammar/grammar.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RichTextEditorComponent } from '../../../shared/rich-text-editor/rich-text-editor.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

enum State {
  View,
  Edit,
  Create,
  Detail,
}

@Component({
  selector: 'app-grammar-topic-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RichTextEditorComponent,
    ConfirmDialogComponent,
  ],
  templateUrl: './grammar-topic-detail.component.html',
  styleUrl: './grammar-topic-detail.component.scss',
})
export class GrammarTopicDetailComponent implements OnInit {
  grammarList: Grammar[] = [];
  name: string = '';
  State = State;
  currentState: State = State.View;
  grammarToEdit!: Grammar;
  grammarToView!: Grammar;
  topicId: string | null = '';
  selectedImage: File | null = null;
  showDeleteConfirm = false;
  grammarToDelete: Grammar | null = null;
  constructor(
    private grammarService: GrammarService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    console.log('GrammarTopicDetailComponent initialized');
    this.topicId = this.route.snapshot.paramMap.get('topicId');
    if (this.topicId) {
      this.loadGrammars(this.topicId);
    }
  }

  loadGrammars(topicId: string) {
    this.grammarService.getGrammarsByTopicId(topicId).subscribe({
      next: (data) => {
        console.log('Loaded grammars for topic:', data);
        this.grammarList = data.grammars;
        this.name = data.name;
      },
      error: (err) => {
        console.error('Error loading grammars:', err);
      },
    });
  }

  handleViewDetail(grammar: Grammar) {
    this.currentState = State.Detail;
    this.grammarToView = grammar;
  }

  handleEdit(grammar: Grammar) {
    console.log('Edit grammar:', grammar);
    this.changeToEdit(grammar);
  }

  handleDelete(grammar: Grammar) {
    console.log('Delete grammar:', grammar);
    this.grammarToDelete = grammar;
    this.showDeleteConfirm = true;
  }

  changeToEdit(grammar: Grammar) {
    this.currentState = State.Edit;
    this.grammarToEdit = grammar;
  }

  changeToCreate() {
    this.currentState = State.Create;
    this.grammarToEdit = {} as Grammar;
  }

  backToView() {
    this.currentState = State.View;
    this.grammarToEdit = {} as Grammar;
    this.grammarToView = {} as Grammar;
  }

  handleCancel() {
    this.backToView();
    this.grammarToEdit = {} as Grammar;
  }

  handleCreate(grammarToCreate: Grammar) {
    if (this.topicId) {
      console.log(grammarToCreate);
      this.grammarService.addGrammar(grammarToCreate, this.topicId).subscribe({
        next: (res) => {
          console.log(res);
          this.grammarList = this.grammarList.concat(res);
          this.backToView();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  handleSaveEdit() {
    if (this.grammarToEdit && this.grammarToEdit.id) {
      console.log('Saving edited grammar:', this.grammarToEdit);
      this.grammarService
        .updateGrammar(this.grammarToEdit, this.grammarToEdit.id)
        .subscribe({
          next: (res) => {
            console.log('Grammar updated successfully:', res);
            // Update the grammar in the list
            const index = this.grammarList.findIndex(
              (g) => g.id === this.grammarToEdit.id
            );
            if (index !== -1) {
              this.grammarList[index] = { ...this.grammarToEdit };
            }
            this.backToView();
          },
          error: (err) => {
            console.error('Error updating grammar:', err);
            alert('Không thể cập nhật ngữ pháp');
          },
        });
    }
  }

  onContentChange(content: string): void {
    this.grammarToEdit.content = content;
    console.log('Content changed:', content);
  }

  onImageUpload(file: File): void {
    // Handle image upload for grammar content
    console.log('Image upload for grammar:', file);
    // You can implement your image upload logic here
    // For now, we'll just log the file
  }

  getSafeContent(content: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }

  onConfirmDelete() {
    if (this.grammarToDelete) {
      this.grammarService.deleteGrammar(this.grammarToDelete.id).subscribe({
        next: (res) => {
          console.log('Grammar deleted successfully:', res);
          // Remove the grammar from the list
          this.grammarList = this.grammarList.filter(
            (g) => g.id !== this.grammarToDelete!.id
          );
          this.showDeleteConfirm = false;
          this.grammarToDelete = null;
        },
        error: (err) => {
          console.error('Error deleting grammar:', err);
          alert('Không thể xóa ngữ pháp');
          this.showDeleteConfirm = false;
          this.grammarToDelete = null;
        },
      });
    }
  }

  onCancelDelete() {
    this.showDeleteConfirm = false;
    this.grammarToDelete = null;
  }
}
