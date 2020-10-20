/*
 * File Created: Saturday, 17th October 2020 8:53:23 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 12:51:20 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
export interface FormData {
  id: string;
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

export interface NetworkData {
  nodes: NetworkNode[];
  links: NetworkLink[];
}

export interface NetworkNode {
  id: string;
  name: string;
  age?: number;
  weight?: number;
  friendOnly?: boolean;
}

export interface NetworkLink {
  source: string;
  target: string;
}

export interface ScatterPlotDatum {
  x: number;
  y: number;
}

export interface Margin {
  top: number;
  bottom: number;
  left: number;
  right: number;
}
