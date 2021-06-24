import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Summoner } from '../model/Summoner';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummonerService {

apiKey = "RGAPI-58f4443c-b820-4d8d-ac49-21453d8774fd";

constructor(private http: HttpClient) { }

getSummonerBySummonerName(summonerName: string, regionCode: string): Observable<Summoner> {
  const urlToGet = this.urlBuild(summonerName,regionCode);
  console.log(urlToGet);

  console.log(this.http.get<Summoner>(urlToGet).pipe(map((res: Summoner) => res)));

  return this.http.get<Summoner>(urlToGet).pipe(map((res: Summoner) => res));
}

urlBuild(summonerName: string, regionCode: string): string {
  return "https://" + regionCode + ".api.riotgames.com/lol/summoner/v4/summoners/by-name/" + summonerName + "?api_key=" + this.apiKey;
}

}
