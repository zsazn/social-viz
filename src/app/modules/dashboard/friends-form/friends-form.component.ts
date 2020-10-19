/*
 * File Created: Saturday, 17th October 2020 3:47:28 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 3:11:25 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addRecord } from '../../../app.actions';
import { ERROR_AGE_REQUIRED, ERROR_NAME_REQUIRED, ERROR_WEIGHT_REQUIRED } from '../../../../constants/app-constants';
import { Utils } from '../dashboard.utils';
import { FormData, FormError } from '../../../../typings';

@Component({
  selector: 'app-friends-form',
  templateUrl: './friends-form.component.html',
  styleUrls: ['./friends-form.component.scss']
})
export class FriendsFormComponent implements OnInit {
  @Output() submitted: EventEmitter<boolean> = new EventEmitter<boolean>();

  public friendsForm!: FormGroup;
  public error: FormError = {
    name: ERROR_NAME_REQUIRED,
    age: ERROR_AGE_REQUIRED,
    weight: ERROR_WEIGHT_REQUIRED
  };

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{data: FormData[]}>
  ) {
    this.friendsForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      weight: ['', Validators.required],
      friends: new FormArray([new FormControl('')]) // initializing a form array of one form control field
    });
  }

  ngOnInit(): void {
  }

  get name(): FormControl {
    return this.friendsForm.get('name') as FormControl;
  }

  get age(): FormControl {
    return this.friendsForm.get('age') as FormControl;
  }

  get weight(): FormControl {
    return this.friendsForm.get('weight') as FormControl;
  }

  get friends(): FormArray {
    return this.friendsForm.get('friends') as FormArray;
  }

  // add an additional field to friends form array
  addFriend(): void {
    this.friends.push(this.formBuilder.control(''));
  }

  onSubmit(): void {
    this.dispatchAddRecord(); // dispatch Add_record action
    this.submitted.emit(true); // emit to close the overlay
    this.resetForm(); // reset form
  }

  resetForm(): void {
    this.friends.clear(); // clear friends form array
    this.friendsForm.reset(); // reset entire form group
    this.friends.insert(0, new FormControl('')); // insert a blank field to friends form array
  }

  dispatchAddRecord(): void {
    // dispatch an Add_record action with a payload
    // payload has form group values and a unique id
    this.store.dispatch(addRecord({payload: {id: Utils.generateUniqueId(), ...this.friendsForm.value}}));
  }
}
