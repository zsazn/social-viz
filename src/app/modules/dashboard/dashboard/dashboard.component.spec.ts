/*
 * File Created: Saturday, 17th October 2020 3:47:18 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 6:31:14 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { SharedModule } from '../../../shared/shared.module';
import { MaterialModule } from '../../../shared/material/material.module';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  let store: MockStore<{ data: FormData[] }>;
  const initialState = {
    data: [
      {
        id: '7ygrx1r',
        name: 'Nimra Gardiner',
        age: 13,
        weight: 80,
        friends: [
          'Dione Meyers',
          'Marius Carty'
        ]
      },
      {
        id: '4e93de',
        name: 'Scarlet Ahmed',
        age: 16,
        weight: 110,
        friends: [
          'Monty Koch',
          'Marius Carty'
        ]
      },
      {
        id: 'pkf1xxc',
        name: 'Dione Meyers',
        age: 15,
        weight: 99,
        friends: [
          'Nimra Gardiner',
          'Dilan Ware'
        ]
      },
      {
        id: 'adb8xp',
        name: 'Marius Carty',
        age: 17,
        weight: 150,
        friends: [
          'Nimra Gardiner',
          'Ravinder Mooney',
          'Scarlet Ahmed'
        ]
      },
      {
        id: '1vybagc',
        name: 'Monty Koch',
        age: 16,
        weight: 110,
        friends: [
          'Scarlet Ahmed',
          'Marius Carty'
        ]
      }
    ] };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SharedModule, MaterialModule ],
      declarations: [ DashboardComponent ],
      providers: [ provideMockStore({ initialState }) ]
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open and close overlay', () => {
    component.openOverlay();
    expect(component.overlayOpened).toBeTruthy();
    component.closeOverlay();
    expect(component.overlayOpened).toBeFalsy();
  });

  it('should calculate age distribution data', () => {
    expect(component.totalRecord).toBe(5);
    expect(component.totalHeadCount).toBe(7);
    expect(component.avgAge).toBeCloseTo(15.4);
    expect(component.avgWeight).toBeCloseTo(109.8);
    expect(component.ageDistData).toEqual([13, 16, 15, 17, 16]);
    expect(component.weightDistData).toEqual([80, 110, 99, 150, 110]);
  });
});
