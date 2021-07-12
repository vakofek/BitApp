import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { BitconService } from 'src/app/services/bitcoin.service';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'transer-preview',
  templateUrl: './transer-preview.component.html',
  styleUrls: ['./transer-preview.component.scss'],
})
export class TranserPreviewComponent implements OnInit {
  @Input() move: {
    type: string;
    transferAt: number;
    userId?: string;
    contactId?: string;
    coins: number;
  };
  @Input() title: string;

  constructor(
    private contactService: ContactService,
    private bitconService: BitconService
  ) {}

  contactName: string;
  subscription: Subscription;
  marketPrice: number;

  ngOnInit(): void {
    this.subscription = this.contactService
      .getContactById(this.move.contactId)
      .subscribe((contact) => (this.contactName = contact.name));
    this.marketPrice = this.bitconService.getMarketPrice()[0].y;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
