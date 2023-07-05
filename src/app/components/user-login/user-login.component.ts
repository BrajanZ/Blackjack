import { Component, OnInit } from '@angular/core';

import { RegistrationService } from '../../services/registration.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  user: User = new User();
  msg = '';

  constructor(private _service: RegistrationService, private router: Router) {}

  ngOnInit(): void {}

  loginUser() {
    this._service.loginUserFromRemote(this.user).subscribe(
      (data) => {
        localStorage.setItem('mail', data.emailId);
        localStorage.setItem('username', data.userName);
        this.router.navigate(['/home']);
      },
      (error) => {
        this.msg = 'Bad credentials, please valid Email and password';
      }
    );
  }
}
