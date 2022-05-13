import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit, OnDestroy {

  confirmData:any;
  constructor() { }

  ngOnInit(): void {
    this.confirmData = JSON.parse(JSON.stringify(history.state));
  }

  ngOnDestroy(): void {
    history.pushState(null,null);
    this.confirmData = null;
  }

}
