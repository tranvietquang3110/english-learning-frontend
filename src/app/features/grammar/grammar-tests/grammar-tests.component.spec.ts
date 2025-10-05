import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarTestsComponent } from './grammar-tests.component';

describe('GrammarTestsComponent', () => {
  let component: GrammarTestsComponent;
  let fixture: ComponentFixture<GrammarTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrammarTestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrammarTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
