/*
 * File Created: Monday, 19th October 2020 4:51:50 am
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 6:22:57 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TextOverviewComponent } from './text-overview.component';

describe('TextOverviewComponent', () => {
  let component: TextOverviewComponent;
  let fixture: ComponentFixture<TextOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
