import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  user: any;
  userData: User = {
    userId: '',
    name: '',
    email: '',
    phone: '',
    useBioSecurity: false,
    pinCodeEnabled: false
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.user = localStorage.getItem('user');

    if (!this.user) {
      this.router.navigate(['/tabs/home']);
      return;
    }


    this.userService.getAll().subscribe(
        (data) => {
          this.userData = data.find(user => user.name === this.user);

          console.log(this.userData);

          if (!this.userData) {
            this.userData = {
              userId: '',
              name: this.user,
              email: 'user@finance.com',
              phone: '123456789',
              useBioSecurity: false,
              pinCodeEnabled: false
            };

            this.userService.create(this.userData);
          }

        }
    );


  }

  logout() {
    localStorage.removeItem('user');

    location.reload();
  }

}
