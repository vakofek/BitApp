import { Component, OnInit, Input } from '@angular/core';
import { Contact } from 'src/app/model/contact.model';

@Component({
  selector: 'contact-preview',
  templateUrl: './contact-preview.component.html',
  styleUrls: ['./contact-preview.component.scss'],
})
export class ContactPreviewComponent implements OnInit {
  @Input() contact: Contact;

  constructor() {}
  contactImgNumber: number = Date.now() % 100;

  ngOnInit(): void {}
}
