/*
 * File Created: Sunday, 18th October 2020 3:03:47 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 3:41:59 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { Component, OnInit, OnChanges, SimpleChanges, Input, ElementRef, HostListener } from '@angular/core';
import * as d3 from '../d3';
import { Bin } from 'd3-array';
import { Axis } from 'd3-axis';
import { Selection } from 'd3-selection';
import { Margin } from '../../../typings';
import { NumberValue, ScaleBand, ScaleContinuousNumeric } from 'd3-scale';

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.scss']
})
export class HistogramComponent implements OnInit, OnChanges {
  @Input() data!: number[];
  @Input() chartTitle!: string;
  @Input() xAxisLabel!: string;
  @Input() yAxisLabel!: string;

  private bins!: Bin<number, number>[];
  public htmlElement!: HTMLElement;
  public svg!: Selection<SVGSVGElement, unknown, null, undefined>;
  private htmlElementWidth!: number;
  private htmlElementHeight!: number;
  private margin: Margin = {
    top: 30,
    bottom: 40,
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
      this.drawChart();
      this.drawAxis();
      this.drawTitle();
    }
  }

  private init(): void {
    this.htmlElement = this.elementRef.nativeElement.querySelector('.bar-chart-container') as HTMLElement;
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
      .attr('class', 'bar-chart-svg');
  }

  private setData(data: number[]): void {
    this.bins =  d3.bin().thresholds(8)(data);
    this.setScale(this.bins);
  }

  private setScale(bins: Bin<number, number>[]): void {
    this.xScale = d3.scaleLinear()
      .domain([bins[0].x0 as number, bins[bins.length - 1].x1 as number])
      .range([this.margin.left, this.htmlElementWidth - this.margin.right]);
    this.yScale = d3.scaleLinear()
      .domain([0, d3.max(bins, d => d.length) as number])
      .range([this.htmlElementHeight - this.margin.bottom, this.margin.top])
      .nice();
  }

  private drawChart(): void {
    if (!this.svg.selectAll('.bins-container').empty()) {
      this.svg.selectAll('.bins-container').remove();
    }
    const container = this.svg.append('g').attr('class', 'bins-container');
    container
      .selectAll('rect')
      .data(this.bins)
      .join('rect')
      .attr('class', 'bin-bar')
      .attr('x', d => this.xScale(d.x0 as number) as number + 1)
      .attr('y', d => this.yScale(d.length) as number)
      .attr('width', d => Math.max(0, this.xScale(d.x1 as number) as number - (this.xScale(d.x0 as number) as number) - 1))
      .attr('height', d => this.yScale(0) as number - (this.yScale(d.length) as number))
      .attr('fill', 'cadetblue');

  }

  private drawAxis(): void {
    this.xAxis = d3.axisBottom(this.xScale).ticks(8).tickSize(0);
    this.yAxis = d3.axisLeft(this.yScale)
      .ticks(5)
      .tickSizeInner(this.margin.left + this.margin.right - this.htmlElementWidth)
      .tickSizeOuter(0)
      .tickPadding(.5 * this.rem);
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
      .selectAll('line, path')
      .attr('stroke', '#708090');
    this.svg.select('.x-axis-container')
      .selectAll('text')
      .attr('font-size', 1.1 * this.rem)
      .attr('fill', '#0a050c')
      .attr('text-anchor', 'middle');
    this.svg
      .append('g')
      .attr('class', 'y-axis-container')
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .call(this.yAxis);
    this.svg.select('.y-axis-container')
      .selectAll('line')
      .attr('stroke', '#708090')
      .attr('stroke-dasharray', .3 * this.rem);
    this.svg.select('.y-axis-container')
      .selectAll('path')
      .attr('stroke', 'none');
    this.svg.select('.y-axis-container')
      .append('text')
      .attr('transform', `translate(0, 15)`)
      .attr('text-anchor', 'middle')
      .text(this.yAxisLabel);
    this.svg.select('.y-axis-container')
      .selectAll('text')
      .attr('font-size', 1.1 * this.rem)
      .attr('fill', '#0a050c');
  }

  private drawTitle(): void {
    if (!this.svg.selectAll('.title-container').empty()) {
      this.svg.selectAll('.title-container').remove();
    }
    const container = this.svg
      .append('g')
      .attr('class', 'title-container')
      .attr('transform', `translate(${this.htmlElementWidth - this.margin.right}, 15)`);
    container
      .append('text')
      .attr('text-anchor', 'end')
      .attr('font-weight', 700)
      .text(this.chartTitle);
  }

  @HostListener('window: resize')
  onResize(): void {
    this.init();
    this.setScale(this.bins);
    this.drawAxis();
    this.drawChart();
    this.drawTitle();
  }

}
