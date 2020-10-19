/*
 * File Created: Sunday, 18th October 2020 4:25:04 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 3:40:40 am
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { Injectable } from '@angular/core';
import { FormData, NetworkData, NetworkLink, NetworkNode, ScatterPlotDatum } from '../../../typings';
import { Utils } from './dashboard.utils';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
  ) { }

  getScatterplotData(data: FormData[]): ScatterPlotDatum[] {
    if (!data || data.length === 0) {
      return [];
    }
    return data.map(d => ({ x: d.age, y: d.weight }));
  }

  getNetworkData(data: FormData[]): NetworkData {
    if (!data || data.length === 0) {
      return { nodes: [], links: [] };
    }
    const nodes: NetworkNode[] = this.getNodes(data);
    const links: NetworkLink[] = this.getLinks(data, nodes);
    return {nodes, links};
  }

  private getNodes(data: FormData[]): NetworkNode[] {
    const nodes: NetworkNode[] = data.map((d: FormData) => ({
      id: d.id,
      name: d.name,
      age: d.age,
      weight: d.weight
     }));
    const existingNames: Set<string> = new Set<string>(data.map(d => d.name));
    data.forEach((d: FormData) => {
      d.friends.forEach((f: string) => {
        if (!existingNames.has(f)) {
          existingNames.add(f);
          nodes.push({
            id: Utils.generateUniqueId(),
            name: f,
            friendOnly: true
          });
        }
      });
    });
    return nodes;
  }

  private getLinks(data: FormData[], nodes: NetworkNode[]): NetworkLink[] {
    const links: NetworkLink[] = [];
    const map: Map<string, string[] | undefined> = new Map();
    nodes.forEach((node: NetworkNode) => {
      if (!map.get(node.name)) {
        const idList: string[] = [];
        idList.push(node.id);
        map.set(node.name, idList);
      } else {
        const idList: string[] | undefined = map.get(node.name);
        idList?.push(node.name);
        map.set(node.name, idList);
      }
    });

    data.forEach((d: FormData) => {
      d.friends.forEach((f: string) => {
        const idList: string[] | undefined = map.get(f);
        idList?.forEach(id => {
          links.push({ source: d.id, target: id });
        });
      });
    });
    return links;
  }
}
