/*
 * File Created: Sunday, 18th October 2020 6:47:10 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 6:19:18 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
export default class Utils {
  static generateUniqueId(): string {
    return Math.random().toString(36).substr(6);
  }
}
