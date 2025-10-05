import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabularyManagementComponent } from './vocabulary-management.component';

describe('VocabularyManagementComponent', () => {
  let component: VocabularyManagementComponent;
  let fixture: ComponentFixture<VocabularyManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabularyManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VocabularyManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
