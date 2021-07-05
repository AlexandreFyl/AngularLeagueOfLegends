import { SummonerService } from './../services/summoner.service';
import { Component, OnInit } from '@angular/core';
import { Region } from '../model/Region';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { Summoner } from '../model/Summoner';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  regions: Region[];
  placeholder = "Europe West";
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

/*   summonerForm = new FormGroup({
    summonerName: new FormControl(''),
    summonerRegion: new FormControl(''),
    saveSummoner : new FormControl('')
  }); */
  summonerForm = this.fb.group({
    summonerName: ['', Validators.required],
    summonerRegion: ['', Validators.required],
    saveSummoner : ['']
  });

  constructor(private summonerService: SummonerService, private fb: FormBuilder) {
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
    if (localStorage.getItem('summoner') != null) {
      this.summonerForm.patchValue({
        summonerName : localStorage.getItem('summoner'),
        // a regler region code
        summonerRegion : localStorage.getItem('summonerRegion')
      })
    }
    this.isSummonerShown = false;
  }

  onSubmit() {
    if (this.summonerForm.get('saveSummoner')?.value == true) {
      localStorage.setItem('summoner',this.summonerForm.get('summonerName')?.value);
      localStorage.setItem('regionCode',this.summonerForm.get('summonerRegion')?.value.code);
    }
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
        this.summonerService.summonerSaved = res;
        this.summonerToShow = res;
        this.isSummonerShown = true;
      });
  }
}
