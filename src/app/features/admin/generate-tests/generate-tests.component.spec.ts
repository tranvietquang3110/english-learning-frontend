import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTestsComponent } from './generate-tests.component';

describe('GenerateTestsComponent', () => {
  let component: GenerateTestsComponent;
  let fixture: ComponentFixture<GenerateTestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenerateTestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GenerateTestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
