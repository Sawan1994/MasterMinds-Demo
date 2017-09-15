import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class StandingsDetailService {
  constructor(private http: Http) { }

  getStandingsData(id: number): Observable<Response> {
    const url: string = 'http://api.football-data.org/v1/competitions/' + id + '/leagueTable';

    return this.http.get(url, {
      // tslint:disable-next-line:max-line-length
      headers: new Headers({'X-Auth-Token': 'b0f466b77b80409c8416b0b48c60be19'})
      }
    )
      .map(res => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
