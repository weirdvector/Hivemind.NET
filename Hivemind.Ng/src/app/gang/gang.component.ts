import { Store } from 'redux';
import { IAppState } from '../redux/IAppState';
import { Ganger } from './../../autogenerated/entities/Ganger';
import { NgRedux } from '@angular-redux/store';
import { Gang } from './../../autogenerated/entities/Gang';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gang',
  templateUrl: './gang.component.html',
  styleUrls: ['./gang.component.css']
})
export class GangComponent {

  @Input() public gang: Gang;
  public gangers: Ganger[] = new Array<Ganger>();

  constructor(private _ngRedux: Store<IAppState>) {
    this._ngRedux.subscribe(() => {
      let state = this._ngRedux.getState();

      this.gang = state.gang;
      this.gangers = this.gang.gangers;
    });
  }
  
}