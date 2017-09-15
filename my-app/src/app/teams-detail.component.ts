import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TeamDetailService } from './teams-detail.service';


@Component({
  templateUrl: './teams-detail.component.html'
})
export class TeamDetailComponent implements OnInit {
  playerList: Array<any>;
  fixtureList: Array<any> = [];
  fixtureArray: Array<any>;

  constructor(private route: ActivatedRoute, private teamDetailService: TeamDetailService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.teamDetailService.getTeamDetails(params['id'])
        .subscribe((data: any) => {
          this.playerList = data['players'];
        });
      this.teamDetailService.getFixtureDetails(params['id'])
        .subscribe((data: any) => {
          this.fixtureArray = data['fixtures'];
          this.setFixturesList(data['fixtures']);
        });
    });
  }

  ngOnchanges() {

  }
  setFixturesList(fixturesArray: any) {
    let count = 0;

    // tslint:disable-next-line:prefer-const
    for (let fixture of fixturesArray) {
      if (fixture['status'] === 'SCHEDULED') {
        fixture['days'] = Math.abs(new Date(fixture['date']).getDay() - new Date().getDay());
        fixture['hours'] = Math.abs(new Date(fixture['date']).getHours() - new Date().getHours());
        fixture['minutes'] = Math.abs(new Date(fixture['date']).getMinutes() - new Date().getMinutes());
        fixture['seconds'] = Math.abs(new Date(fixture['date']).getSeconds() - new Date().getSeconds());
        this.fixtureList.push(fixture);
        count++;
      }
      if (count === 5) {
        break;
      }
    }
    this.updateTime();
  }
  updateTime() {
    // tslint:disable-next-line:prefer-const
    let interval = setInterval(() => {
      // tslint:disable-next-line:prefer-const
      for (let fixture of this.fixtureList) {
        fixture['days'] = Math.abs(new Date(fixture['date']).getDay() - new Date().getDay());
        fixture['hours'] = Math.abs(new Date(fixture['date']).getHours() - new Date().getHours());
        fixture['minutes'] = Math.abs(new Date(fixture['date']).getMinutes() - new Date().getMinutes());
        if (fixture['days'] === 0 && fixture['hours'] === 0 && fixture['minutes'] === 0) {
          this.setFixturesList(this.fixtureArray);
          clearInterval(interval);
          break;
        }
      }
    }, 60000);
  }

}
