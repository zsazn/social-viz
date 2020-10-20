/*
 * File Created: Monday, 19th October 2020 6:14:29 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 6:21:44 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import Utils from './dashboard.utils';

describe('Utils class functions should work', () => {
  it('should generate 100 unique ids', () => {
    const res: string[] = [];
    let counter = 0;
    while (counter < 100) {
      res.push(Utils.generateUniqueId());
      counter ++;
    }
    const set = new Set<string>(res);
    expect(set.size).toEqual(100);
  });
});
