import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRepuestosUsadosComponent } from './mostrar-repuestos-usados.component';

describe('MostrarRepuestosUsadosComponent', () => {
  let component: MostrarRepuestosUsadosComponent;
  let fixture: ComponentFixture<MostrarRepuestosUsadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarRepuestosUsadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarRepuestosUsadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
