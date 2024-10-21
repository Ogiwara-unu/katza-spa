import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarprestamodispositivoComponent } from './agregarprestamodispositivo.component';

describe('AgregarprestamodispositivoComponent', () => {
  let component: AgregarprestamodispositivoComponent;
  let fixture: ComponentFixture<AgregarprestamodispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarprestamodispositivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregarprestamodispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
