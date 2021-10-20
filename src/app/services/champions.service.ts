import { riot_api_key, version } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ChampionsService {

apiKey = riot_api_key;

  constructor(private http: HttpClient) {}

  // on récupere les 3 champions avec le plus de masteries
getMostPlayedChamps(summonerId: string, regionCode: string){
  const urlToGet = this.urlBuildMostPlayed(summonerId,regionCode);
  return this.http.get(urlToGet);
}

urlBuildMostPlayed(summonerId: string, regionCode: string){
  return "https://" + regionCode + ".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + summonerId + "?api_key=" + this.apiKey;
}

getChampionsData(){
  let url = "http://ddragon.leagueoflegends.com/cdn/"+version+"/data/en_US/champion.json"
  return this.http.get(url);
}

}
