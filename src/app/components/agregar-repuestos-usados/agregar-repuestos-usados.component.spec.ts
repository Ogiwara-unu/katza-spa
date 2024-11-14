import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarRepuestosUsadosComponent } from './agregar-repuestos-usados.component';

describe('AgregarRepuestosUsadosComponent', () => {
  let component: AgregarRepuestosUsadosComponent;
  let fixture: ComponentFixture<AgregarRepuestosUsadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarRepuestosUsadosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarRepuestosUsadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
