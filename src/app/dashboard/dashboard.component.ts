import { SummonerService } from './../services/summoner.service';
import { Component, OnInit } from '@angular/core';
import { Region } from '../model/Region';
import { FormGroup, FormControl } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Summoner } from '../model/Summoner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  regions: Region[];

  isSummonerShown: boolean = false;
  summonerToShow: Summoner = {
    id: '',
    accountId: '',
    puuid: '',
    name: '',
    profileIconId: 0,
    revisionDate: 0,
    summonerLevel: 0
  };

  selectedRegion: Region = {
    fullName: '',
    code: '',
  };

  summonerForm = new FormGroup({
    summonerName: new FormControl(''),
    summonerRegion: new FormControl(''),
  });

  constructor(private summonerService: SummonerService) {
    this.regions = [
      { fullName: 'Europe West', code: 'EUW1' },
      { fullName: 'Europe Nordic / East', code: 'EUN1' },
      { fullName: 'Brazil', code: 'BR1' },
      { fullName: 'Japan', code: 'JB1' },
      { fullName: 'Korea', code: 'KR' },
      { fullName: 'North America', code: 'NA1' },
      { fullName: 'Russia', code: 'RU' },
      { fullName: 'Oceania', code: 'OC1' },
      { fullName: 'Turkey', code: 'TR1' },
      { fullName: 'Latin America North', code: 'LA1' },
      { fullName: 'Latin America South', code: 'LA2' },
    ];
  }

  ngOnInit() {
    this.isSummonerShown = false;
  }

  onSubmit() {
    this.getSummoner();
  }

  getSummoner() {
    this.summonerService
      .getSummonerBySummonerName(
        this.summonerForm.get('summonerName')?.value,
        this.summonerForm.get('summonerRegion')?.value.code
      )
      .pipe(take(1))
      .subscribe((res) => {

        this.summonerToShow = res;
        console.log(this.summonerToShow);
        this.isSummonerShown = true;

      });
  }
}
