import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarrepuestoComponent } from './agregarrepuesto.component';

describe('AgregarrepuestoComponent', () => {
  let component: AgregarrepuestoComponent;
  let fixture: ComponentFixture<AgregarrepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarrepuestoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarrepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
