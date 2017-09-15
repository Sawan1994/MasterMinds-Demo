import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompetitionDetailService } from './competition-detail.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'competition-detail',
  templateUrl: './competition-detail.component.html'
})
export class CompetitionDetailComponent {
  competitionList: Array<any>;

  constructor(private router: Router, private competitionDetailService: CompetitionDetailService) {
    this.setCompetitionList();
  }

  setCompetitionList() {
    this.competitionDetailService.getCompetitions()
      .subscribe((data: any) => {
        this.competitionList = data;
      });
  }

  goToStandings(id: number) {
    this.router.navigate(['/standings', id]);
  }
}
