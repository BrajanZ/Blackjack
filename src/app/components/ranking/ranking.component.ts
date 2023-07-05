import { Component, OnInit } from '@angular/core';

import { RegistrationService } from 'src/app/services/registration.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
})
export class RankingComponent implements OnInit {
  ranking: any;
  constructor(public registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.getRanking();
  }

  getRanking() {
    this.registrationService.getRanking().subscribe((res) => {
      this.ranking = res;
    });
  }
}
