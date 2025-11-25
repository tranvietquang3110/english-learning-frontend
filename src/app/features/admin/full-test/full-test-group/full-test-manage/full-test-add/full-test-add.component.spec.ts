import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTestAddComponent } from './full-test-add.component';

describe('FullTestAddComponent', () => {
  let component: FullTestAddComponent;
  let fixture: ComponentFixture<FullTestAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullTestAddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullTestAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
