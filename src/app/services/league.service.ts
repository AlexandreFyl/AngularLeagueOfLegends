import { League } from './../model/League';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

apiKey = "RGAPI-51bf9c2f-57e4-4eb2-af23-59a89b9308e5";

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

    console.log("0",res[0]);
    console.log("1",res[1]);

    this.flexQueue = res[0];

    this.soloQueue = res[1];
  }));
}

urlBuildLeague(summonerId: string, regionCode: string) {
  return "https://" + regionCode + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" + summonerId + "?api_key=" + this.apiKey;
}

}
