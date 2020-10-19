/*
 * File Created: Saturday, 17th October 2020 3:47:18 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 5:45:30 pm
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

  public networkData!: NetworkData; // data for force directed graph
  public scatterplotData!: ScatterPlotDatum[]; // data for age-weight scatterplot
  public ageDistData!: number[]; // all on-record age
  public weightDistData!: number[]; // all on-record weight

  public totalRecord!: number; // total record number in current state
  public totalHeadCount!: number; // total number of people, including who filled out the form and all friends
  public avgAge!: number; // average age of who filled out the form
  public avgWeight!: number; // average weight of who filled out the form

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
    this.store.select('data').subscribe(state => { // subscribe to store and select 'data' state
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
