import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarDetalleManVehiculoComponent } from './mostrar-detalle-man-vehiculo.component';

describe('MostrarDetalleManVehiculoComponent', () => {
  let component: MostrarDetalleManVehiculoComponent;
  let fixture: ComponentFixture<MostrarDetalleManVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarDetalleManVehiculoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarDetalleManVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
