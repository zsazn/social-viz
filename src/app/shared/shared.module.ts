/*
 * File Created: Saturday, 17th October 2020 3:36:26 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 12:51:10 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ForceDirectedGraphComponent } from './force-directed-graph/force-directed-graph.component';
import { ScatterplotComponent } from './scatterplot/scatterplot.component';
import { HistogramComponent } from './histogram/histogram.component';
import { TextOverviewComponent } from './text-overview/text-overview.component';

@NgModule({
  declarations: [
    HistogramComponent,
    ForceDirectedGraphComponent,
    ScatterplotComponent,
    TextOverviewComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    HistogramComponent,
    ForceDirectedGraphComponent,
    ScatterplotComponent,
    TextOverviewComponent
  ]
})
export class SharedModule { }
