import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployyeEditComponent } from './employye-edit.component';

describe('EmployyeEditComponent', () => {
  let component: EmployyeEditComponent;
  let fixture: ComponentFixture<EmployyeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployyeEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployyeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
