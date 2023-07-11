import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudentComponent } from './add-student.component';

describe('AddStudentComponent', () => {
  let component: AddStudentComponent;
  let fixture: ComponentFixture<AddStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddStudentComponent]
    });
    fixture = TestBed.createComponent(AddStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
