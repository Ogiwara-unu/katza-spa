import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarprestamodispositivoComponent } from './mostrarprestamodispositivo.component';

describe('MostrarprestamodispositivoComponent', () => {
  let component: MostrarprestamodispositivoComponent;
  let fixture: ComponentFixture<MostrarprestamodispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarprestamodispositivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarprestamodispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
