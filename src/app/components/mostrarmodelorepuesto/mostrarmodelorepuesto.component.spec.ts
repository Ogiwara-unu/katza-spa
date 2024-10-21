import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarmodelorepuestoComponent } from './mostrarmodelorepuesto.component';

describe('MostrarmodelorepuestoComponent', () => {
  let component: MostrarmodelorepuestoComponent;
  let fixture: ComponentFixture<MostrarmodelorepuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarmodelorepuestoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarmodelorepuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
