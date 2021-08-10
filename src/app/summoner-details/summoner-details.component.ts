import { LeagueService } from './../services/league.service';
import { Component, OnInit } from '@angular/core';
import { Summoner } from '../model/Summoner';
import { SummonerService } from '../services/summoner.service';
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

  soloLogoToShow: string ="";
  flexLogoToShow: string ="";

  soloRankToShow: string = "";
  flexRankToShow: string = "";

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
      .subscribe(() => {

        // on gere le probleme si le joueur ne joue pas en flex/solo avec des if
        this.flexQueue = this.leagueService.flexQueue;
        this.soloQueue = this.leagueService.soloQueue;

        if (this.flexQueue != undefined) {
          // ajout d'un param pour fix les headers
          this.flexQueue.title = "Flex Queue";
          this.flexWinrate = this.getWinrate(this.leagueService.flexQueue.wins, this.leagueService.flexQueue.losses);
          this.getTierImgToShow(this.leagueService.flexQueue.tier, "flex");
          this.getRankImgToShow(this.leagueService.flexQueue.rank, "flex");
        } else if (this.soloQueue != undefined) {
          this.soloQueue.title = "Solo Queue";
          this.soloWinrate = this.getWinrate(this.leagueService.soloQueue.wins, this.leagueService.soloQueue.losses);
          this.getTierImgToShow(this.leagueService.soloQueue.tier, "solo");
          this.getRankImgToShow(this.leagueService.soloQueue.rank, "solo");
        }

        this.rdyToShow = true;


      });

  }

  getWinrate(wins: number, looses: number) {
    return (wins / ( wins + looses) * 100).toFixed(2);
  }

  getTierImgToShow(tier: string, queue:string) {
    let logo = "";
    if( tier == "UNRANKED") {
      logo = "unranked.png";
    } else if(tier === "IRON") {
      logo = "iron.png";
    } else if(tier === "BRONZE") {
      logo = "bronze.png";
    } else if(tier === "SILVER") {
      logo = "silver.png";
    } else if(tier === "GOLD") {
      logo = "gold.png";
    } else if(tier === "PLATINUM") {
      logo = "plat.png";
    } else if(tier === "DIAMOND") {
      logo = "diamond.png";
    } else if(tier === "MASTER") {
      logo = "master.png";
    } else if(tier === "GRANDMASTER") {
      logo = "grandmaster.png";
    } else if(tier === "CHALLENGER") {
      logo = "challenger.png";
    }
    // choix du logo a afficher
    if(queue == "solo") {
      console.log(logo);

      this.soloLogoToShow = logo;
      console.log("solo",this.soloLogoToShow);
    } else if(queue == "flex") {
      console.log(logo);

      this.flexLogoToShow = logo;
      console.log("flex",this.flexLogoToShow);
    } else {
      console.log("erreur img tier");

    }
  }

  getRankImgToShow(rank: string, queue:string) {
    let logo = "";
    if(rank == "I") {
      logo = "1.jpg";
    } else if (rank == "II") {
      logo = "2.jpg";
    } else if (rank == "III") {
      logo = "3.jpg";
    } else if (rank == "IV") {
      logo = "4.jpg";
    }

    if (queue == "solo") {
      this.soloRankToShow = logo;
    } else if (queue = "flex") {
      this.flexRankToShow = logo;
    } else {
      console.log("erreur img rank");

    }
  }
}
