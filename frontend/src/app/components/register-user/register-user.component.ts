import { Component, OnInit } from '@angular/core';

import { RegistrationService } from '../../services/registration.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  user = new User();
  msg = '';

  constructor(private _service: RegistrationService, private _route: Router) {}

  ngOnInit(): void {}

  registerUser() {
    this._service.registerUserFromRemote(this.user).subscribe(
      (data) => {
        this._route.navigate(['']);
      },
      (error) => {
        this.msg = error.error;
      }
    );
  }
}
