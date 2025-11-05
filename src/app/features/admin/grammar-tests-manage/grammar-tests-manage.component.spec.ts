import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrammarTestsManageComponent } from './grammar-tests-manage.component';

describe('GrammarTestsManageComponent', () => {
  let component: GrammarTestsManageComponent;
  let fixture: ComponentFixture<GrammarTestsManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrammarTestsManageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrammarTestsManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
