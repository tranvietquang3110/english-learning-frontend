import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarTestsDetailComponent } from './grammar-tests-detail.component';

describe('GrammarTestsDetailComponent', () => {
  let component: GrammarTestsDetailComponent;
  let fixture: ComponentFixture<GrammarTestsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrammarTestsDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrammarTestsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
