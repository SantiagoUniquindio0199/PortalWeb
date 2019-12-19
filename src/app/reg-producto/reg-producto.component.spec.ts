import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegProductoComponent } from './reg-producto.component';

describe('RegProductoComponent', () => {
  let component: RegProductoComponent;
  let fixture: ComponentFixture<RegProductoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegProductoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
