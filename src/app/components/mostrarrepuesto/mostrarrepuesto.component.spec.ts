import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarrepuestoComponent } from './mostrarrepuesto.component';

describe('MostrarrepuestoComponent', () => {
  let component: MostrarrepuestoComponent;
  let fixture: ComponentFixture<MostrarrepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarrepuestoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarrepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
