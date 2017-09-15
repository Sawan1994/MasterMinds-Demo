import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { StandingsDetailService } from './standings-detail.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'standing-detail',
  templateUrl: './standings-detail.component.html'
})
export class StandingsDetailComponent implements OnInit {
  standingsObject: Object;
  standingsArray: Array<Object>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private standingsDetailService: StandingsDetailService) {
  }

  ngOnInit() {

    this.route.params.subscribe(params => {
      // tslint:disable-next-line:prefer-const
      let id = Number.parseInt(params['id']);
      this.setStandingsList(id);
    });
  }
  setStandingsList(id: number) {
    this.standingsDetailService.getStandingsData(id)
      .subscribe((data: any) => {
        this.standingsObject = data;
        this.standingsArray = data['standing'];
      });
  }
  goToTeamDetail(team: any) {
    // tslint:disable-next-line:prefer-const
    let url = team['_links']['team']['href'];
    // tslint:disable-next-line:prefer-const
    let tempArr = url.split('/');
    // tslint:disable-next-line:prefer-const
    let id = tempArr[tempArr.length - 1];
    this.router.navigate(['/team', id]);
  }
}
