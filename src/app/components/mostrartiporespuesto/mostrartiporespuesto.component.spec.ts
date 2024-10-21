import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrartiporespuestoComponent } from './mostrartiporespuesto.component';

describe('MostrartiporespuestoComponent', () => {
  let component: MostrartiporespuestoComponent;
  let fixture: ComponentFixture<MostrartiporespuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrartiporespuestoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrartiporespuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
