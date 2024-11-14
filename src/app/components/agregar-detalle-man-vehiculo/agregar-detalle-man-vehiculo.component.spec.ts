import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDetalleManVehiculoComponent } from './agregar-detalle-man-vehiculo.component';

describe('AgregarDetalleManVehiculoComponent', () => {
  let component: AgregarDetalleManVehiculoComponent;
  let fixture: ComponentFixture<AgregarDetalleManVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarDetalleManVehiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarDetalleManVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
