import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarmantenimientoComponent } from './mostrarmantenimiento.component';

describe('MostrarmantenimientoComponent', () => {
  let component: MostrarmantenimientoComponent;
  let fixture: ComponentFixture<MostrarmantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarmantenimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarmantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
