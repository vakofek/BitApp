import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Contact } from 'src/app/model/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {

  contact: Contact

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contactService: ContactService

  ) { }

  subscription: Subscription

  async ngOnInit(): Promise<void> {
    this.subscription = this.route.data.subscribe(data => {
      this.contact = data.contact || this.contactService.getEmptyContact()
    })
  }

  async onRemoveContact() {
    await this.contactService.deleteContact(this.contact._id)
    this.router.navigate(['/contact'])
  }

  onGoBack() {
    this.contact._id ? this.router.navigate(['/contact', this.contact._id]) : this.router.navigate(['/contact'])
  }

  async onSaveContact() {
    await this.contactService.saveContact(this.contact)
    this.router.navigate(['/contact', this.contact._id])
  }
}
