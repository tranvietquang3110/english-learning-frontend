import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadByFileComponent } from './upload-by-file.component';

describe('UploadByFileComponent', () => {
  let component: UploadByFileComponent;
  let fixture: ComponentFixture<UploadByFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadByFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadByFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
