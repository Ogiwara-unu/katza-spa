import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarempleadoComponent } from './mostrarempleado.component';

describe('MostrarempleadoComponent', () => {
  let component: MostrarempleadoComponent;
  let fixture: ComponentFixture<MostrarempleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarempleadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarempleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
