import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'transfer-list',
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss'],
})
export class TransferListComponent implements OnInit {
  @Input() moves: [];
  @Input() title: string;

  constructor() {}

  ngOnInit(): void {}
}
