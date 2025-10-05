import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarManagementComponent } from './grammar-management.component';

describe('GrammarManagementComponent', () => {
  let component: GrammarManagementComponent;
  let fixture: ComponentFixture<GrammarManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrammarManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrammarManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
