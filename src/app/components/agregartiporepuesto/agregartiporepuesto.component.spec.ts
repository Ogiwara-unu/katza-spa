import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregartiporepuestoComponent } from './agregartiporepuesto.component';

describe('AgregartiporepuestoComponent', () => {
  let component: AgregartiporepuestoComponent;
  let fixture: ComponentFixture<AgregartiporepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregartiporepuestoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregartiporepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
