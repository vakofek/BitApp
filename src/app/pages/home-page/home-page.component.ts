import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../../model/user.model';
import { UserService } from 'src/app/services/user.service';
import { BitconService } from 'src/app/services/bitcoin.service';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private userService: UserService, private bitconService: BitconService) { }
  subscription: Subscription;
  user: User = null
  bitcoinValues: any = null
  coins: number = 0

  ngOnInit(): void {
    this.subscription = this.userService.user$.subscribe((user: User) => { this.user = user });
    this.bitcoinValues = this.bitconService.getMarketPrice();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCurrValue() {
    if (this.bitcoinValues) return this.bitcoinValues[0];
  }

  async onAddCoins() {
    const updateUser = { ...this.user, coins: this.user.coins + this.coins }
    await this.userService.updateUser(updateUser)
    this.coins = 0;
  }


}
