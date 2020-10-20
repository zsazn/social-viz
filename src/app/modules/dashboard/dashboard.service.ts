/*
 * File Created: Sunday, 18th October 2020 4:25:04 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 6:19:18 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { Injectable } from '@angular/core';
import { FormData, NetworkData, NetworkLink, NetworkNode, ScatterPlotDatum } from '../../../typings';
import Utils from './dashboard.utils';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(
  ) { }

  /**
   * To map FormData array to ScatterPlotDatum array
   * Transform state to scatter plot data format
   *
   * @param {FormData[]} data
   * @returns {ScatterPlotDatum[]}
   * @memberof DashboardService
   */
  getScatterplotData(data: FormData[]): ScatterPlotDatum[] {
    if (!data || data.length === 0) {
      return [];
    }
    return data.map(d => ({ x: d.age, y: d.weight }));
  }

  /**
   * To map FormData array to NetworkData
   * Transform state to force directed graph nodes and links
   *
   * @param {FormData[]} data
   * @returns {NetworkData}
   * @memberof DashboardService
   */
  getNetworkData(data: FormData[]): NetworkData {
    if (!data || data.length === 0) {
      return { nodes: [], links: [] };
    }
    const nodes: NetworkNode[] = this.getNodes(data);
    const links: NetworkLink[] = this.getLinks(data, nodes);
    return {nodes, links};
  }

  /**
   * Calculate nodes for force directed network graph
   * Assumptions:
   * 1. Identical name yields two different records
   * 2. Identical friend's names yields the same friend
   *
   * @private
   * @param {FormData[]} data
   * @returns {NetworkNode[]}
   * @memberof DashboardService
   */
  private getNodes(data: FormData[]): NetworkNode[] {
    // get all records from current state and map them to `nodes` array
    const nodes: NetworkNode[] = data.map((d: FormData) => ({
      id: d.id,
      name: d.name,
      age: d.age,
      weight: d.weight
     }));
    // create a set for all current unique names
    const existingNames: Set<string> = new Set<string>(data.map(d => d.name));
    // get unique names from every person's friend list
    data.forEach((d: FormData) => {
      d.friends.forEach((f: string) => {
        if (!existingNames.has(f)) {
          existingNames.add(f);
          nodes.push({
            id: Utils.generateUniqueId(),
            name: f,
            friendOnly: true // flag the node is only friend of someone
          });
        }
      });
    });
    return nodes;
  }

  /**
   * Calculate links fro force directed network graph
   *
   * @private
   * @param {FormData[]} data
   * @param {NetworkNode[]} nodes
   * @returns {NetworkLink[]}
   * @memberof DashboardService
   */
  private getLinks(data: FormData[], nodes: NetworkNode[]): NetworkLink[] {
    const links: NetworkLink[] = [];
    const map: Map<string, string[] | undefined> = new Map();
    // map id list to each node name
    nodes.forEach((node: NetworkNode) => {
      if (!map.get(node.name)) {
        const idList: string[] = [];
        idList.push(node.id);
        map.set(node.name, idList);
      } else {
        // process duplicated names
        const idList: string[] | undefined = map.get(node.name);
        idList?.push(node.name);
        map.set(node.name, idList);
      }
    });

    // source: each person's name (node)
    // target: a friend only node, or another person's node
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
