import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  err = '';
  credentials = { username: '', password: '' };

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.loadUsersDB();
  }

  async onLoginUser() {
    const res = await this.userService.login(this.credentials).toPromise();
    if (res) {
      console.log(res);

      this.err = '';
      this.router.navigate(['/']);
    } else {
      this.err = 'Login Failed!';
    }
  }
}
