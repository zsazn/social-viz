/*
 * File Created: Saturday, 17th October 2020 3:47:28 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 2:48:14 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { FriendsFormComponent } from './friends-form.component';

describe('FriendsFormComponent', () => {
  let component: FriendsFormComponent;
  let fixture: ComponentFixture<FriendsFormComponent>;

  let store: MockStore;
  const initialState: FormData[] = [];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ FriendsFormComponent ],
      providers: [ provideMockStore({ initialState }) ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
