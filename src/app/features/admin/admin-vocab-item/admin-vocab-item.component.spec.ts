import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVocabItemComponent } from './admin-vocab-item.component';

describe('AdminVocabItemComponent', () => {
  let component: AdminVocabItemComponent;
  let fixture: ComponentFixture<AdminVocabItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminVocabItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminVocabItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
