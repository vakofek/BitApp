import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Contact } from '../model/contact.model';
import {UtilService} from './util.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private _contactsDb: Contact[] = CONTACTS;

  private _contacts$ = new BehaviorSubject<Contact[]>([])
  public contacts$ = this._contacts$.asObservable()

  constructor(private utilService: UtilService) {}

  public loadContacts(filterBy = { term: '' }): void {
    let contacts = this._contactsDb;
    if (filterBy && filterBy.term) {
      contacts = this._filter(contacts, filterBy.term)
    }
    this._contacts$.next(this._sort(contacts))
  }


  public getContactById(id: string): Observable<Contact> {
    const contact = this._contactsDb.find(contact => contact._id === id)

    //return an observable
    return contact ? of({ ...contact }) : of(null)
  }

  public getNeighborContactId(id: string, type: string): Observable<string> {
    let nextContactId: string
    var currContactIdx = this._contactsDb.findIndex(contact => contact._id === id)
    if (type === 'next') {
      if (currContactIdx + 1 === this._contactsDb.length) currContactIdx = -1
      nextContactId = this._contactsDb[currContactIdx + 1]._id
    } else {
      if (currContactIdx === 0) currContactIdx = this._contactsDb.length
      nextContactId = this._contactsDb[currContactIdx - 1]._id
    }
    return of(nextContactId)
  }

  public deleteContact(id: string) {
    //mock the server work
    this._contactsDb = this._contactsDb.filter(contact => contact._id !== id)

    // change the observable data in the service - let all the subscribers know
    this._contacts$.next(this._contactsDb)
    return of('Removed')
  }

  public saveContact(contact: Contact) {
    return contact._id ? this._updateContact(contact) : this._addContact(contact)
  }

  public getEmptyContact() {
    return { name: '', email: '', phone: '' }
  }

  public setMove(move: {}, contactId: string) {
    const contacts = this._contactsDb.map(contact => {
      if (contact._id === contactId) contact.move.push(move)
      return contact
    })
    this._contactsDb = contacts;
    this._contacts$.next(contacts)
  }

  private _updateContact(contact: Contact) {
    //mock the server work
    this._contactsDb = this._contactsDb.map(c => contact._id === c._id ? contact : c)
    // change the observable data in the service - let all the subscribers know
    this._contacts$.next(this._sort(this._contactsDb))
    return of('Updated')
  }

  private _addContact(contact: Contact) {
    //mock the server work
    const newContact: Contact = contact;
    newContact._id = this.utilService.makeId();
    newContact.imgUrl = `https://randomuser.me/api/portraits/${Math.random() < 0.5 ? 'men' : 'women'}/${this.utilService.getRandomInt(1, 100)}.jpg`
    this._contactsDb.push(newContact)
    this._contacts$.next(this._sort(this._contactsDb))
  }

  private _sort(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }

      return 0;
    })
  }

  private _filter(contacts: Contact[], term: string) {
    term = term.toLocaleLowerCase()
    return contacts.filter(contact => {
      return contact.name.toLocaleLowerCase().includes(term) ||
        contact.phone.toLocaleLowerCase().includes(term) ||
        contact.email.toLocaleLowerCase().includes(term)
    })
  }
}

const CONTACTS = [
  {
    "_id": "5a56640269f443a5d64b32ca",
    "coins": 0,
    "move": [] = [],
    "imgUrl": "https://randomuser.me/api/portraits/men/1.jpg", "name": "Ochoa Hyde",
    "email": "ochoahyde@renovize.com",
    "phone": "+1 (968) 593-3824"
  },
  {
    "_id": "5a5664025f6ae9aa24a99fde",
    "coins": 0, "move": [] = [], "imgUrl": "https://randomuser.me/api/portraits/men/2.jpg", "name": "Hallie Mclean",
    "email": "halliemclean@renovize.com",
    "phone": "+1 (948) 464-2888"
  },
  {
    "_id": "5a56640252d6acddd183d319",
    "coins": 0, "move": [] = [], "imgUrl": "https://randomuser.me/api/portraits/men/12.jpg", "name": "Parsons Norris",
    "email": "parsonsnorris@renovize.com",
    "phone": "+1 (958) 502-3495"
  },
  {
    "_id": "5a566402ed1cf349f0b47b4d",
    "coins": 0, "move": [] = [], "imgUrl": "https://randomuser.me/api/portraits/men/3.jpg", "name": "Rachel Lowe",
    "email": "rachellowe@renovize.com",
    "phone": "+1 (911) 475-2312"
  },
  {
    "_id": "5a566402abce24c6bfe4699d",
    "coins": 0, "move": [] = [], "imgUrl": "https://randomuser.me/api/portraits/men/4.jpg", "name": "Dominique Soto",
    "email": "dominiquesoto@renovize.com",
    "phone": "+1 (807) 551-3258"
  },
  {
    "_id": "5a566402a6499c1d4da9220a",
    "coins": 0, "move": [] = [], "imgUrl": "https://randomuser.me/api/portraits/men/5.jpg", "name": "Shana Pope",
    "email": "shanapope@renovize.com",
    "phone": "+1 (970) 527-3082"
  },
  {
    "_id": "5a566402f90ae30e97f990db",
    "coins": 0, "move": [] = [], "imgUrl": "https://randomuser.me/api/portraits/men/6.jpg", "name": "Faulkner Flores",
    "email": "faulknerflores@renovize.com",
    "phone": "+1 (952) 501-2678"
  },
  {
    "_id": "5a5664027bae84ef280ffbdf",
    "coins": 0, "move": [] = [], "imgUrl": "https://randomuser.me/api/portraits/men/7.jpg", "name": "Holder Bean",
    "email": "holderbean@renovize.com",
    "phone": "+1 (989) 503-2663"
  },
  {
    "_id": "5a566402e3b846c5f6aec652",
    "coins": 0, "move": [] = [], "imgUrl": "https://randomuser.me/api/portraits/men/8.jpg", "name": "Rosanne Shelton",
    "email": "rosanneshelton@renovize.com",
    "phone": "+1 (968) 454-3851"
  },
  {
    "_id": "5a56640272c7dcdf59c3d411",
    "coins": 0, "move": [] = [], "imgUrl": "https://randomuser.me/api/portraits/men/9.jpg", "name": "Pamela Nolan",
    "email": "pamelanolan@renovize.com",
    "phone": "+1 (986) 545-2166"
  },
  {
    "_id": "5a5664029a8dd82a6178b15f",
    "coins": 0, "move": [] = [], "imgUrl": "https://randomuser.me/api/portraits/men/10.jpg", "name": "Roy Cantu",
    "email": "roycantu@renovize.com",
    "phone": "+1 (929) 571-2295"
  }
];
