import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CompetitionDetailService {
  constructor(private http: Http) { }
  getCompetitions(): Observable<Response> {
    return this.http.get('http://api.football-data.org/v1/competitions', {
      // tslint:disable-next-line:max-line-length
      headers: new Headers({'X-Auth-Token': 'b0f466b77b80409c8416b0b48c60be19'})
      })
      .map((res) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}
