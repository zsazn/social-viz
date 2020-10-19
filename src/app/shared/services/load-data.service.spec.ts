import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LoadDataService } from './load-data.service';

describe('LoadDataService', () => {
  let mockHttpClient: HttpTestingController;
  let service: LoadDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, HttpClientTestingModule ]
    });
    service = TestBed.inject(LoadDataService);
    mockHttpClient = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load data', () => {
    const response = {
      data: [
        {
          id: '7ygrx1r',
          name: 'Nimra Gardiner',
          age: 13,
          weight: 80,
          friends: [
            'Dione Meyers',
            'Marius Carty'
          ]
        }
      ]
    };
    service.loadData().subscribe(res => {
      expect(res).toEqual(response.data);
    });
    const request = mockHttpClient.expectOne('assets/data/social-viz.json');
    expect(request.request.method).toEqual('GET');
    request.flush(response);
  });
});
