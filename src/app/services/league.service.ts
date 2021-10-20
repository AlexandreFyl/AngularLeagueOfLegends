import { riot_api_key } from './../../environments/environment';
import { League } from './../model/League';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

apiKey = riot_api_key;

flexQueue: League = {
  leagueId: "",
  queueType: "",
  tier: "",
  rank: "",
  summonerId: "",
  summonerName: "",
  leaguePoints: 0,
  wins: 0,
  losses: 0,
  veteran: false,
  inactive: false,
  freshBlood: false,
  hotStreak: false
}

soloQueue: League = {
  leagueId: "",
  queueType: "",
  tier: "",
  rank: "",
  summonerId: "",
  summonerName: "",
  leaguePoints: 0,
  wins: 0,
  losses: 0,
  veteran: false,
  inactive: false,
  freshBlood: false,
  hotStreak: false
}

constructor(private http: HttpClient) { }

getLeagueBySummonerId(summonerId: string, regionCode: string) {
  const urlToGet = this.urlBuildLeague(summonerId,regionCode);
  return this.http.get<Array<League>>(urlToGet).pipe(map((res) => {
    console.log("res",res);

    res.forEach(element => {
      if (element.queueType === "RANKED_SOLO_5x5") {
        this.soloQueue = element;
      } else if(element.queueType === "RANKED_FLEX_SR") {
        this.flexQueue = element;
      } else {
        console.log("Mode de jeu non pris en charge");
      }
    });

  }));
}

urlBuildLeague(summonerId: string, regionCode: string) {
  return "https://" + regionCode + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerId + "?api_key=" + this.apiKey;
}

}
