/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SummonerService } from './summoner.service';

describe('Service: Summoner', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SummonerService]
    });
  });

  it('should ...', inject([SummonerService], (service: SummonerService) => {
    expect(service).toBeTruthy();
  }));
});
