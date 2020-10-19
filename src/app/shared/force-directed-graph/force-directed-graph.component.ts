/*
 * File Created: Sunday, 18th October 2020 3:03:13 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 2:35:12 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { Component, OnInit, OnChanges, SimpleChanges, Input, ElementRef, HostListener } from '@angular/core';
import * as d3 from '../d3';
import * as d3Drag from 'd3-drag';
import { Selection } from 'd3-selection';
import { NetworkData, Margin, NetworkNode, NetworkLink } from '../../../typings';
import { Simulation, SimulationLinkDatum, SimulationNodeDatum } from 'd3-force';

interface CircleDatum {
  nodeId: string;
  name: string;
  label: string;
  x: number;
  y: number;
  r: number;
  color: string;
}

interface CustomSubject {
  fx: number | null;
  fy: number | null;
  x: number;
  y: number;
}

@Component({
  selector: 'app-force-directed-graph',
  templateUrl: './force-directed-graph.component.html',
  styleUrls: ['./force-directed-graph.component.scss']
})
export class ForceDirectedGraphComponent implements OnInit, OnChanges {
  @Input() data!: NetworkData;
  private nodes!: NetworkNode[];
  private links!: NetworkLink[];
  public htmlElement!: HTMLElement;
  public svg!: Selection<SVGSVGElement, unknown, null, undefined>;

  private htmlElementWidth!: number;
  private htmlElementHeight!: number;
  private margin: Margin = {
    top: 10,
    bottom: 10,
    left: 10,
    right: 10
  };
  private rem!: number;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && this.data !== undefined
      && this.data.nodes.length > 0 && changes.data.currentValue !== changes.data.previousValue) {
      this.init();
      this.setData(this.data);
      this.drawGraph();
      this.drawLegend();
      this.drawTitle();
    }
  }

  private init(): void {
    this.htmlElement = this.elementRef.nativeElement.querySelector('.forced-network-graph-container') as HTMLElement;
    this.htmlElementWidth = this.htmlElement.getBoundingClientRect().width;
    this.htmlElementHeight = this.htmlElement.getBoundingClientRect().height;
    this.rem = parseFloat(getComputedStyle(document.querySelector('body') as HTMLElement).fontSize.slice(0, -2));

    if (this.svg) {
      this.svg.remove();
    }
    this.svg = d3.select(this.htmlElement)
      .append('svg')
      .attr('width', this.htmlElementWidth)
      .attr('height', this.htmlElementHeight)
      .attr('version', 1.1)
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('class', 'force-directed-graph');
  }

  private setData(data: NetworkData): void {
    this.nodes = data.nodes;
    this.links = data.links;
  }

  private drawGraph(): void {
    if (!this.svg) {
      return;
    }
    if (!this.svg.selectAll('.links-container').empty()) {
      this.svg.selectAll('.links-container').remove();
    }
    if (!this.svg.selectAll('.nodes-container').empty()) {
      this.svg.selectAll('.nodes-container').remove();
    }
    const nodes = this.nodes.map(d => Object.create(d));
    const links = this.links.map(d => Object.create(d));
    const simulation = d3.forceSimulation(nodes)
      .force('link', d3.forceLink(links).id(d => (d as NetworkNode).id))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('collision', d3.forceCollide().radius(10))
      .force('center', d3.forceCenter(this.htmlElementWidth / 2, this.htmlElementHeight / 2));
    const linksContainer = this.svg.append('g').attr('class', 'links-container');
    const nodesContainer = this.svg.append('g').attr('class', 'nodes-container');
    const linksGraph = linksContainer.selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke', '#708090')
      .attr('stroke-width', 1);
    const nodeContainer = nodesContainer.selectAll('g')
      .data(nodes)
      .join('g')
      .attr('class', 'node-container')
      .call(this.drag(simulation));
    const circles = nodeContainer
      .append('circle')
      .attr('r', (d: NetworkNode) => d.friendOnly ? 8 : 15)
      .attr('fill', (d: NetworkNode) => d.friendOnly ? '#708090' : '#00bfff')
      .attr('stroke', (d: NetworkNode) => d.friendOnly ? null : '#87cefa')
      .attr('stroke-width', (d: NetworkNode) => d.friendOnly ? 0 : 3);
    const labels = nodeContainer
      .append('text')
      .text((d: NetworkNode) => d.name);
    nodeContainer
      .append('title')
      .text((d: NetworkNode) => `Name: ${d.name}, Age: ${d.age}, Weight: ${d.weight}lb`);

    simulation.on('tick', () => {
      circles
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
      linksGraph
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      labels
        .attr('x', d => d.x + 15)
        .attr('y', d => d.y)
        .attr('dominant-baseline', 'central');
    });
  }

  private drawLegend(): void {
    if (!this.svg.selectAll('.legend-container').empty()) {
      this.svg.selectAll('.legend-container').remove();
    }
    this.svg
      .append('g')
      .attr('class', 'legend-container')
      .attr('transform', `translate(${this.margin.left * 2}, ${this.htmlElementHeight - 100})`);
    const legendContainer = this.svg.selectAll('.legend-container');
    legendContainer.append('g').attr('class', 'person-legend');
    legendContainer.append('g').attr('class', 'friend-only-legend');
    legendContainer
      .selectAll('.person-legend')
      .append('circle')
      .attr('r', 15)
      .attr('cx', 15)
      .attr('cy', 0)
      .attr('fill', '#00bfff')
      .attr('stroke', '#87cefa')
      .attr('stroke-width', 3);
    legendContainer
      .selectAll('.person-legend')
      .append('text')
      .attr('x', 40)
      .attr('y', 0)
      .attr('font-size', this.rem * 1.4)
      .attr('dominant-baseline', 'central')
      .text('Person who filled the form');
    legendContainer
      .selectAll('.friend-only-legend')
      .append('circle')
      .attr('r', 8)
      .attr('cx', 15)
      .attr('cy', 50)
      .attr('fill', '#708090');
    legendContainer
      .selectAll('.friend-only-legend')
      .append('text')
      .attr('x', 40)
      .attr('y', 50)
      .attr('font-size', this.rem * 1.4)
      .attr('dominant-baseline', 'central')
      .text('Person who is just a friend');
  }

  private drawTitle(): void {
    if (!this.svg.selectAll('.title-container').empty()) {
      this.svg.selectAll('.title-container').remove();
    }
    this.svg
      .append('g')
      .attr('class', 'title-container')
      .attr('transform', `translate(${this.margin.left * 2}, 40)`);
    const titleContainer = this.svg.selectAll('.title-container');
    titleContainer
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('font-size', this.rem * 2)
      .attr('font-weight', 700)
      .text('Friends network');
  }

  private drag(simulation: Simulation<SimulationNodeDatum, SimulationLinkDatum<SimulationNodeDatum>>): any {
    function dragStarted(event: any): void {
      if (!event.active) {
        simulation.alphaTarget(0.3).restart();
      }
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }
    function dragged(event: any): void {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
      console.log(event);
    }

    function dragEnded(event: any): void {
      if (!event.active) {
        simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }
    }

    return d3.drag()
             .on('start', dragStarted)
             .on('drag', dragged)
             .on('end', dragEnded);
  }

  @HostListener('window: resize')
  onResize(): void {
    this.init();
    this.drawGraph();
    this.drawLegend();
    this.drawTitle();
  }

}
