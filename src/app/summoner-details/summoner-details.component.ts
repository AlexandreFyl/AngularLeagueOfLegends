import { ChampionsService } from './../services/champions.service';
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

  soloWinrate: string = '';
  flexWinrate: string = '';

  soloLogoToShow: string = '';
  flexLogoToShow: string = '';

  soloRankToShow: string = '';
  flexRankToShow: string = '';

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

  mostPlayedChamps: any = [];
  firstMostPlayed: any;
  secondMostPlayed: any;
  thirdMostPlayed: any;

  firstMostPlayedName: string = "";
  secondMostPlayedName: string = "";
  thirdMostPlayedName: string = "";

  champsRdyToShow: boolean = false;

  constructor(
    private summonerService: SummonerService,
    private leagueService: LeagueService,
    private championsService: ChampionsService
  ) {}

  ngOnInit() {
    this.leagueService
      .getLeagueBySummonerId(this.summonerToShow.id, this.regionCodeSaved)
      .subscribe(() => {
        // on gere le probleme si le joueur ne joue pas en flex/solo avec des if
        this.flexQueue = this.leagueService.flexQueue;
        this.soloQueue = this.leagueService.soloQueue;

        if (this.flexQueue !== undefined) {
          // ajout d'un param pour fix les headers
          this.flexQueue.title = 'Flex Queue';
          this.flexWinrate = this.getWinrate(
            this.leagueService.flexQueue.wins,
            this.leagueService.flexQueue.losses
          );
          this.getTierImgToShow(this.leagueService.flexQueue.tier, 'flex');
          this.getRankImgToShow(this.leagueService.flexQueue.rank, 'flex');
        }
        if (this.soloQueue !== undefined) {
          this.soloQueue.title = 'Solo Queue';
          this.soloWinrate = this.getWinrate(
            this.leagueService.soloQueue.wins,
            this.leagueService.soloQueue.losses
          );
          this.getTierImgToShow(this.leagueService.soloQueue.tier, 'solo');
          this.getRankImgToShow(this.leagueService.soloQueue.rank, 'solo');
        }
        console.log('solo queue', this.soloQueue);

        this.rdyToShow = true;
      });
    this.getThreeMostPlayed();
  }

  getThreeMostPlayed() {
    this.championsService
      .getMostPlayedChamps(this.summonerToShow.id, this.regionCodeSaved)
      .subscribe((data) => {
        this.mostPlayedChamps = Object.values(data).slice(0, 3);
        this.firstMostPlayed = this.mostPlayedChamps[0];

        this.firstMostPlayedName = this.getChampName(
          this.firstMostPlayed.championId
        );

        this.secondMostPlayed = this.mostPlayedChamps[1];
        this.secondMostPlayedName = this.getChampName(
          this.secondMostPlayed.championId
        );

        this.thirdMostPlayed = this.mostPlayedChamps[2];
        this.thirdMostPlayedName = this.getChampName(
          this.thirdMostPlayed.championId
        );

        console.log(
          this.firstMostPlayed,
          this.secondMostPlayed,
          this.thirdMostPlayed
        );
      });
      console.log(this.firstMostPlayedName);

      this.champsRdyToShow = true;
  }

  getChampName(id: number): string {
    let champName: string = "";

    this.championsService.getChampionsData().subscribe((champList: any) => {
      let list = champList.data;

      let arrayList = Object.keys(list).map((key) => ({
        id: Number(key),
        champion: list[key],
      }));



      arrayList.forEach((champ: any) => {
        if (champ.champion.key === id.toString()) {
          console.log(champ.champion.name);

          champName = champ.champion.name;
        }
      });


    });
    return champName;
  }

  getWinrate(wins: number, looses: number) {
    return ((wins / (wins + looses)) * 100).toFixed(2);
  }

  getTierImgToShow(tier: string, queue: string) {
    let logo = '';
    if (tier === 'UNRANKED') {
      logo = 'unranked.png';
    } else if (tier === 'IRON') {
      logo = 'iron.png';
    } else if (tier === 'BRONZE') {
      logo = 'bronze.png';
    } else if (tier === 'SILVER') {
      logo = 'silver.png';
    } else if (tier === 'GOLD') {
      logo = 'gold.png';
    } else if (tier === 'PLATINUM') {
      logo = 'plat.png';
    } else if (tier === 'DIAMOND') {
      logo = 'diamond.png';
    } else if (tier === 'MASTER') {
      logo = 'master.png';
    } else if (tier === 'GRANDMASTER') {
      logo = 'grandmaster.png';
    } else if (tier === 'CHALLENGER') {
      logo = 'challenger.png';
    }
    // choix du logo a afficher
    if (queue === 'solo') {
      console.log(logo);

      this.soloLogoToShow = logo;
      console.log('solo', this.soloLogoToShow);
    } else if (queue === 'flex') {
      console.log(logo);

      this.flexLogoToShow = logo;
      console.log('flex', this.flexLogoToShow);
    } else {
      console.log('erreur img tier');
    }
  }

  getRankImgToShow(rank: string, queue: string) {
    let logo = '';
    if (rank == 'I') {
      logo = '1.jpg';
    } else if (rank === 'II') {
      logo = '2.jpg';
    } else if (rank === 'III') {
      logo = '3.jpg';
    } else if (rank === 'IV') {
      logo = '4.jpg';
    }

    if (queue === 'solo') {
      this.soloRankToShow = logo;
    } else if (queue === 'flex') {
      this.flexRankToShow = logo;
    } else {
      console.log('erreur img rank');
    }
  }
}
