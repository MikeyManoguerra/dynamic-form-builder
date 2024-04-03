import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMetadataFormComponent } from './form-metadata-form.component';

describe('FormMetadataFormComponent', () => {
  let component: FormMetadataFormComponent;
  let fixture: ComponentFixture<FormMetadataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormMetadataFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormMetadataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
