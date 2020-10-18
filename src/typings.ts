import { FormControl } from "@angular/forms";

/*
 * File Created: Saturday, 17th October 2020 8:53:23 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Sunday, 18th October 2020 1:06:52 am
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
export interface FormData {
  name: string;
  age: number;
  weight: number;
  friends: string[];
}

export interface FormError {
  name: string;
  age: string;
  weight: string;
}
