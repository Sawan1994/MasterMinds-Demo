import { Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class TeamDetailService {
  constructor(private http: Http) { }

  getTeamDetails(id: number): Observable<Response> {
    // tslint:disable-next-line:prefer-const
    let url = 'http://api.football-data.org/v1/teams/' + id + '/players';
    return this.http.get(url, {
      // tslint:disable-next-line:max-line-length
      headers: new Headers({'X-Auth-Token': 'b0f466b77b80409c8416b0b48c60be19'})
      })
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
  getFixtureDetails(id: number): Observable<Response> {
    // tslint:disable-next-line:prefer-const
    let url = 'http://api.football-data.org/v1/teams/' + id + '/fixtures';
    return this.http.get(url, {
      // tslint:disable-next-line:max-line-length
      headers: new Headers({'X-Auth-Token': 'b0f466b77b80409c8416b0b48c60be19'})
      })
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
