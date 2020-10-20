/*
 * File Created: Monday, 18th October 2020 4:51:50 pm
 * Author: Zheng Zhou (zhengzhou.purdue@gmail.com)
 * -----
 * Last Modified: Monday, 19th October 2020 2:36:10 pm
 * Modified By: Zheng Zhou (zhengzhou.purdue@gmail.com>)
 * -----
 */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-overview',
  templateUrl: './text-overview.component.html',
  styleUrls: ['./text-overview.component.scss']
})
export class TextOverviewComponent implements OnInit {
  @Input() data!: number;
  @Input() desc!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
