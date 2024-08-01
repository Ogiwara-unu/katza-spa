import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrardepartamentoComponent } from './mostrardepartamento.component';

describe('MostrardepartamentoComponent', () => {
  let component: MostrardepartamentoComponent;
  let fixture: ComponentFixture<MostrardepartamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrardepartamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrardepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
