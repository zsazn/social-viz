/*
 * File Created: Saturday, 17th October 2020 3:47:28 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 6:00:11 pm
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

  let store: MockStore<{ data: FormData[] }>;
  const initialState: { data: FormData[] } = { data: [] };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule ],
      declarations: [ FriendsFormComponent ],
      providers: [ provideMockStore({ initialState }) ]
    }).compileComponents();
    store = TestBed.inject(MockStore);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid on init', () => {
    expect(component.friendsForm.valid).toBeFalsy();
  });

  it('should require name, age, and weight', () => {
    const name = component.friendsForm.controls.name;
    const age = component.friendsForm.controls.age;
    const weight = component.friendsForm.controls.weight;
    const nameErrors = name.errors || {};
    const ageErrors = age.errors || {};
    const weightErrors = weight.errors || {};
    expect(nameErrors?.required).toBeTruthy();
    expect(ageErrors?.required).toBeTruthy();
    expect(weightErrors?.required).toBeTruthy();
  });

  it('should add a new friend field', () => {
    component.addFriend();
    expect(component.friends.length).toBe(2);
  });

  it('should reset form', () => {
    component.addFriend();
    const name = component.friendsForm.controls.name;
    const age = component.friendsForm.controls.age;
    const weight = component.friendsForm.controls.weight;
    name.setValue('John Smith');
    age.setValue(23);
    weight.setValue(145);
    expect(component.friendsForm.valid).toBeTruthy();
    component.resetForm();
    expect(component.friendsForm.valid).toBeFalsy();
    expect(component.friends.length).toBe(1);
  });

  it('should submit form', () => {
    spyOn(component.submitted, 'emit');
    const name = component.friendsForm.controls.name;
    const age = component.friendsForm.controls.age;
    const weight = component.friendsForm.controls.weight;
    name.setValue('John Smith');
    age.setValue(23);
    weight.setValue(145);
    expect(component.friendsForm.valid).toBeTruthy();
    component.onSubmit();
    expect(component.submitted.emit).toHaveBeenCalledWith(true);
  });
});
