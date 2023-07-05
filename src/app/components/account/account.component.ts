import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user!: User;

  constructor() {}

  ngOnInit(): void {}

  editUser(editform: any) {}
}
