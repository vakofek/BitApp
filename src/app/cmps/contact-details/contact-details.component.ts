import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private userService: UserService
  ) {
  }
  loggedInUser: User
  coinsToTransfer = 0
  moves: []

  contact: Contact;
  subscription: Subscription

  async ngOnInit(): Promise<void> {
    this.subscription = this.route.data.subscribe(data => {
      this.contact = data.contact
    })
    this.loggedInUser = this.userService.getLoggedInUser()
    this.moves = this.filterMoves()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onGoBack() {
    this.router.navigate(['/contact'])
  }

  async onGoNeighborContact(type: string) {
    let nextContactId = await this.contactService.getNeighborContactId(this.contact._id, type).toPromise()
    this.router.navigate(['/contact', nextContactId])
  }

  onTransferChange(diff: number) {
    if (this.coinsToTransfer + diff < 0 || this.coinsToTransfer + diff > this.loggedInUser.coins) return
    this.coinsToTransfer += diff;

  }

  onTransferCoins() {
    const userMove = {
      type: 'To',
      contactId: this.contact._id,
      coins: this.coinsToTransfer,
      transferAt: Date.now()
    };
    const contactMove = {
      type: 'From',
      userId: this.loggedInUser._id,
      coins: this.coinsToTransfer,
      transferAt: Date.now()
    };
    this.contactService.setMove(contactMove, this.contact._id)
    this.userService.setMove(userMove, this.loggedInUser._id)
    this.coinsToTransfer = 0;
    this.loggedInUser = this.userService.getLoggedInUser();
    this.moves = this.filterMoves();
  }

  filterMoves() {
    if (!this.loggedInUser) return []
    return this.loggedInUser.moves.filter((move: any) => move.contactId === this.contact._id )
  }


}
