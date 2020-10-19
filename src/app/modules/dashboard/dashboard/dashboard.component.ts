/*
 * File Created: Saturday, 17th October 2020 3:47:18 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 1:42:20 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { ConnectedPosition } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormData, NetworkData, ScatterPlotDatum } from '../../../../typings';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public networkData!: NetworkData;
  public scatterplotData!: ScatterPlotDatum[];
  public ageDistData!: number[];
  public weightDistData!: number[];

  public totalRecord!: number;
  public totalHeadCount!: number;
  public avgAge!: number;
  public avgWeight!: number;

  public overlayPosition: ConnectedPosition[] = [{
    originX: 'start',
    originY: 'top',
    overlayX: 'start',
    overlayY: 'top'
  }];

  public overlayOpened = false;

  constructor(
    private store: Store<{data: FormData[]}>,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.store.select('data').subscribe(state => {
      if (state && state.length > 0) {
        this.ageDistData = state.map(d => d.age);
        this.weightDistData = state.map(d => d.weight);
        this.networkData = this.dashboardService.getNetworkData(state);
        this.scatterplotData = this.dashboardService.getScatterplotData(state);
        this.totalRecord = state.length;
        this.totalHeadCount = this.networkData.nodes.length;
        this.avgAge = state.map(d => d.age).reduce((a, b) => a + b) / state.length;
        this.avgWeight = state.map(d => d.weight).reduce((a, b) => a + b) / state.length;
      }
    });
  }

  openOverlay(): void {
    this.overlayOpened = true;
  }

  closeOverlay(): void {
    this.overlayOpened = false;
  }
}
