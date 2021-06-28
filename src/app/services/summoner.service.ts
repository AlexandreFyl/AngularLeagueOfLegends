import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Summoner } from '../model/Summoner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummonerService {

summonerSaved: Summoner = {
  id: '',
  accountId: '',
  puuid: '',
  name: '',
  profileIconId: 0,
  revisionDate: 0,
  summonerLevel: 0
};

regionCodeSaved: string = "";

apiKey = "RGAPI-883c7625-8994-4803-be3f-72c606ccee45";

constructor(private http: HttpClient) { }

getSummonerBySummonerName(summonerName: string, regionCode: string): Observable<Summoner> {
  const urlToGet = this.urlBuildSummonerName(summonerName,regionCode);
  console.log(urlToGet);

  this.http.get<Summoner>(urlToGet).pipe(map((res: Summoner) => this.summonerSaved = res, this.regionCodeSaved = regionCode))
  return this.http.get<Summoner>(urlToGet).pipe(map((res: Summoner) => res));
}

urlBuildSummonerName(summonerName: string, regionCode: string): string {
  return "https://" + regionCode + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key=" + this.apiKey;
}

}
