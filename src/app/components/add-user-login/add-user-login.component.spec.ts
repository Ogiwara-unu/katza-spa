import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserLoginComponent } from './add-user-login.component';

describe('AddUserLoginComponent', () => {
  let component: AddUserLoginComponent;
  let fixture: ComponentFixture<AddUserLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddUserLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddUserLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
