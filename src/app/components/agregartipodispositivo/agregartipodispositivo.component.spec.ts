import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregartipodispositivoComponent } from './agregartipodispositivo.component';

describe('AgregartipodispositivoComponent', () => {
  let component: AgregartipodispositivoComponent;
  let fixture: ComponentFixture<AgregartipodispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregartipodispositivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgregartipodispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
