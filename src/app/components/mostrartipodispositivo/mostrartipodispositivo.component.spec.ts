import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrartipodispositivoComponent } from './mostrartipodispositivo.component';

describe('MostrartipodispositivoComponent', () => {
  let component: MostrartipodispositivoComponent;
  let fixture: ComponentFixture<MostrartipodispositivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrartipodispositivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrartipodispositivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
