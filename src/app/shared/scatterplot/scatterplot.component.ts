/*
 * File Created: Sunday, 18th October 2020 3:03:37 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 7:18:28 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { Component, OnInit, OnChanges, SimpleChanges, Input, ElementRef, HostListener } from '@angular/core';
import * as d3 from '../d3';
import { Selection } from 'd3-selection';
import { Axis } from 'd3-axis';
import { ScatterPlotDatum, Margin } from '../../../typings';
import { NumberValue, ScaleContinuousNumeric } from 'd3-scale';

@Component({
  selector: 'app-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.scss']
})
export class ScatterplotComponent implements OnInit, OnChanges {
  @Input() data!: ScatterPlotDatum[];
  @Input() chartTitle!: string;
  @Input() xAxisLabel!: string;
  @Input() yAxisLabel!: string;
  private xMin!: number;
  private xMax!: number;
  private yMin!: number;
  private yMax!: number;
  public htmlElement!: HTMLElement;
  public svg!: Selection<SVGSVGElement, unknown, null, undefined>;
  private htmlElementWidth!: number;
  private htmlElementHeight!: number;
  private margin: Margin = {
    top: 30,
    bottom: 50,
    left: 40,
    right: 20
  };
  private rem!: number;
  private xScale!: ScaleContinuousNumeric<number, number>;
  private yScale!: ScaleContinuousNumeric<number, number>;
  private xAxis!: Axis<NumberValue>;
  private yAxis!: Axis<NumberValue>;

  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data && this.data !== undefined &&
      changes.data.currentValue !== changes.data.previousValue) {
        this.init();
        this.setData(this.data);
        this.drawAxis();
        this.drawChart();
        this.drawTitle();
      }
  }

  private init(): void {
    this.htmlElement = this.elementRef.nativeElement.querySelector('.scatterplot-container') as HTMLElement;
    this.htmlElementWidth = this.htmlElement.getBoundingClientRect().width || 400;
    this.htmlElementHeight = this.htmlElement.getBoundingClientRect().height || 300;
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
      .attr('class', 'scatterplot-svg');
  }

  private setData(data: ScatterPlotDatum[]): void {
    const xData: number[] = data.map(d => d.x);
    const yData: number[] = data.map(d => d.y);
    this. xMin = Math.min(...xData);
    this. xMax = Math.max(...xData);
    this. yMin = Math.min(...yData);
    this. yMax = Math.max(...yData);
    this.setScale(this.xMin, this.xMax, this.yMin, this.yMax);
  }

  private setScale(xMin: number, xMax: number, yMin: number, yMax: number): void {
    this.xScale = d3.scaleLinear()
      .domain([xMin, xMax])
      .range([this.margin.left, this.htmlElementWidth - this.margin.right])
      .nice();
    this.yScale = d3.scaleLinear()
      .domain([yMin, yMax])
      .range([this.htmlElementHeight - this.margin.bottom, this.margin.top])
      .nice();
  }

  private drawAxis(): void {
    this.yAxis = d3.axisLeft(this.yScale)
      .ticks(5)
      .tickSizeInner(this.margin.left + this.margin.right - this.htmlElementWidth)
      .tickSizeOuter(0)
      .tickPadding(.5 * this.rem);
    this.xAxis = d3.axisBottom(this.xScale).ticks(5);
    if (!this.svg.selectAll('.y-axis-container').empty()) {
      this.svg.selectAll('.y-axis-container').remove();
    }
    if (!this.svg.selectAll('.x-axis-container').empty()) {
      this.svg.selectAll('.x-axis-container').remove();
    }
    this.svg
      .append('g')
      .attr('class', 'x-axis-container')
      .attr('transform', `translate (0, ${this.htmlElementHeight - this.margin.bottom})`)
      .call(this.xAxis);
    this.svg.select('.x-axis-container')
      .selectAll('path')
      .attr('stroke', 'none');
    this.svg.select('.x-axis-container')
      .selectAll('line')
      .attr('stroke', '#ccc');
    this.svg.select('.x-axis-container')
      .append('text')
      .attr('transform', `translate (${this.htmlElementWidth / 2}, ${this.margin.bottom - 10})`)
      .text(this.xAxisLabel);
    this.svg.select('.x-axis-container')
      .selectAll('text')
      .attr('font-size', this.rem)
      .attr('fill', '#888')
      .attr('text-anchor', 'middle');
    this.svg
      .append('g')
      .attr('class', 'y-axis-container')
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(this.yAxis);
    this.svg.select('.y-axis-container')
      .selectAll('line')
      .attr('stroke', '#ccc')
      .attr('stroke-width', 1)
      .attr('stroke-dasharray', .3 * this.rem);
    this.svg.select('.y-axis-container')
      .selectAll('path')
      .attr('stroke', 'none');
    this.svg.select('.y-axis-container')
      .append('text')
      .attr('transform', `translate(5, 15)`)
      .attr('text-anchor', 'middle')
      .text(this.yAxisLabel);
    this.svg.select('.y-axis-container')
      .selectAll('text')
      .attr('font-size', this.rem)
      .attr('fill', '#888');
  }

  private drawChart(): void {
    if (!this.svg.selectAll('.plot-container').empty()) {
      this.svg.selectAll('.plot-container').remove();
    }
    const container = this.svg.append('g').attr('class', 'plot-container');
    container
      .selectAll('circle')
      .data(this.data)
      .join('circle')
      .attr('class', 'data-point')
      .attr('fill', '#00bcd4')
      .attr('r', 5)
      .attr('cx', (d: ScatterPlotDatum): number => this.xScale(d.x) as number)
      .attr('cy', (d: ScatterPlotDatum): number => this.yScale(d.y) as number)
      .append('title');
  }

  private drawTitle(): void {
    if (!this.svg.selectAll('.title-container').empty()) {
      this.svg.selectAll('.title-container').remove();
    }
    const container = this.svg
      .append('g')
      .attr('class', 'title-container')
      .attr('transform', `translate(${this.htmlElementWidth / 2}, 15)`);
    container
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('font-weight', 700)
      .text(this.chartTitle);
  }
  @HostListener('window: resize')
  onResize(): void {
    this.init();
    this.setScale(this.xMin, this.xMax, this.yMin, this.yMax);
    this.drawAxis();
    this.drawChart();
    this.drawTitle();
  }
}
