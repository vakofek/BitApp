import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterBy } from 'src/app/model/filterBy.model';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss']
})
export class ContactFilterComponent implements OnInit {
  @Input() filterBy: FilterBy
  @Output() onFilter = new EventEmitter<FilterBy>()

  filterByCopy: FilterBy
  constructor() {
    this.filterByCopy = { ...this.filterBy }
  }

  ngOnInit(): void {}

}
