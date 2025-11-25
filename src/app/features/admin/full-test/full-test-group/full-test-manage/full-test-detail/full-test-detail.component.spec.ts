import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTestDetailComponent } from './full-test-detail.component';

describe('FullTestDetailComponent', () => {
  let component: FullTestDetailComponent;
  let fixture: ComponentFixture<FullTestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullTestDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullTestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
