import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrardispositivosComponent } from './mostrardispositivos.component';

describe('MostrardispositivosComponent', () => {
  let component: MostrardispositivosComponent;
  let fixture: ComponentFixture<MostrardispositivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrardispositivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrardispositivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
