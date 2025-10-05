import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VocabEditComponent } from './vocab-edit.component';

describe('VocabEditComponent', () => {
  let component: VocabEditComponent;
  let fixture: ComponentFixture<VocabEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VocabEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VocabEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
