import { TestBed } from '@angular/core/testing';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;
  const data = [
    {
      id: '7ygrx1r',
      name: 'Nimra Gardiner',
      age: 13,
      weight: 80,
      friends: [
        'Dione Meyers',
        'Marius Carty'
      ]
    },
    {
      id: '4e93de',
      name: 'Scarlet Ahmed',
      age: 16,
      weight: 110,
      friends: [
        'Monty Koch',
        'Marius Carty'
      ]
    },
    {
      id: 'pkf1xxc',
      name: 'Dione Meyers',
      age: 15,
      weight: 99,
      friends: [
        'Nimra Gardiner',
        'Dilan Ware'
      ]
    },
    {
      id: 'adb8xp',
      name: 'Marius Carty',
      age: 17,
      weight: 150,
      friends: [
        'Nimra Gardiner',
        'Ravinder Mooney',
        'Scarlet Ahmed'
      ]
    },
    {
      id: '1vybagc',
      name: 'Monty Koch',
      age: 16,
      weight: 110,
      friends: [
        'Scarlet Ahmed',
        'Marius Carty'
      ]
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get scatterplot data', () => {
    expect(service.getScatterplotData([])).toEqual([]);
    expect(service.getScatterplotData(data).length).toBe(5);
  });

  it('should get network data', () => {
    expect(service.getNetworkData([])).toEqual({nodes: [], links: []});
    const res = service.getNetworkData(data);
    expect(res.nodes.length).toBe(7);
    expect(res.links.length).toBe(11);
  });
});
