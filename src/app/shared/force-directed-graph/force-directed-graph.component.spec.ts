/*
 * File Created: Sunday, 18th October 2020 3:03:13 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 6:49:28 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceDirectedGraphComponent } from './force-directed-graph.component';

describe('ForceDirectedGraphComponent', () => {
  let component: ForceDirectedGraphComponent;
  let fixture: ComponentFixture<ForceDirectedGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForceDirectedGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForceDirectedGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update graph', () => {
    component.data = {
      nodes: [
        { id: '7ygrx1r', name: 'Nimra Gardiner', age: 13, weight: 80 },
        { id: 'huaflee', name: 'Dione Meyers', friendOnly: true },
        { id: 'lqabwdg', name: 'Marius Carty', friendOnly: true }
      ],
      links: [
        { source: '7ygrx1r', target: 'huaflee' },
        { source: '7ygrx1r', target: 'lqabwdg' }
      ]
    };
    component.ngOnChanges({
      data: new SimpleChange(undefined, component.data, true)
    });
    expect(component).toBeTruthy();
  });
});
