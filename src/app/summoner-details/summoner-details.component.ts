import { LeagueService } from './../services/league.service';
import { Component, OnInit } from '@angular/core';
import { Summoner } from '../model/Summoner';
import { SummonerService } from '../services/summoner.service';
import { take } from 'rxjs/operators';
import { League } from '../model/League';

@Component({
  selector: 'app-summoner-details',
  templateUrl: './summoner-details.component.html',
  styleUrls: ['./summoner-details.component.css'],
})
export class SummonerDetailsComponent implements OnInit {
  rdyToShow = false;

  summonerToShow: Summoner = this.summonerService.summonerSaved;
  regionCodeSaved: string = this.summonerService.regionCodeSaved;

  soloWinrate: string = "";
  flexWinrate: string = "";

  soloLogoToShow: string ="../../assets/img/rank_icons/";
  flexLogoToShow: string ="../../assets/img/rank_icons/";

  flexQueue: League = {
    leagueId: '',
    queueType: '',
    tier: '',
    rank: '',
    summonerId: '',
    summonerName: '',
    leaguePoints: 0,
    wins: 0,
    losses: 0,
    veteran: false,
    inactive: false,
    freshBlood: false,
    hotStreak: false,
  };

  soloQueue: League = {
    leagueId: '',
    queueType: '',
    tier: '',
    rank: '',
    summonerId: '',
    summonerName: '',
    leaguePoints: 0,
    wins: 0,
    losses: 0,
    veteran: false,
    inactive: false,
    freshBlood: false,
    hotStreak: false,
  };

  constructor(
    private summonerService: SummonerService,
    private leagueService: LeagueService
  ) {}

  ngOnInit() {
    this.leagueService
      .getLeagueBySummonerId(this.summonerToShow.id, this.regionCodeSaved)
      .subscribe((res) => {
        this.flexQueue = this.leagueService.flexQueue;
        this.soloQueue = this.leagueService.soloQueue;
        console.log(this.getWinrate(this.leagueService.soloQueue.wins, this.leagueService.soloQueue.losses));
        console.log(372/(372+382)*100);

        this.soloWinrate = this.getWinrate(this.leagueService.soloQueue.wins, this.leagueService.soloQueue.losses);
        this.flexWinrate = this.getWinrate(this.leagueService.flexQueue.wins, this.leagueService.flexQueue.losses);
        this.rdyToShow = true;
        /* this.getImgToShow(this.leagueService.soloQueue.rank); */
      });

  }

  getWinrate(wins: number, looses: number) {
    return (wins / ( wins + looses) * 100).toFixed(2);
  }

/*   getImgToShow(rank: string) {
    if(rank === "GOLD") {
      this.soloLogoToShow = this.soloLogoToShow + "gold.png";
    }
  } */
}
