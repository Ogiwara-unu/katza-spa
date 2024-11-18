import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPruebaMantenimientosComponent } from './mostrar-prueba-mantenimientos.component';

describe('MostrarPruebaMantenimientosComponent', () => {
  let component: MostrarPruebaMantenimientosComponent;
  let fixture: ComponentFixture<MostrarPruebaMantenimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarPruebaMantenimientosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarPruebaMantenimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
