import { GangsClient } from './../../autogenerated/clients/GangsClient';
import { WeaponsClient } from './../../autogenerated/clients/WeaponsClient';
import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { IAppState } from '../redux/IAppState';
import { Weapon } from '../../autogenerated/entities/Weapon';
import { WeaponService } from '../redux/WeaponService';
import { SET_WEAPONS } from '../redux/GangState';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

  public weapons: Weapon[];
  public viewGang = true;
  public viewAll = false;
  private _gangId: string;

  constructor(
    private _ngRedux: NgRedux<IAppState>,
    private _weaponsClient: WeaponsClient,
    private _gangsClient: GangsClient
  ) {
    this._ngRedux.subscribe(() => {
      const state = this._ngRedux.getState();
      this._gangId = state.gang.gangId;
      this.weapons = state.weapons;
    });
  }

  ngOnInit() {
    const state = this._ngRedux.getState();
    if (state.weapons) {
      this._gangId = state.gang.gangId;
      this.weapons = state.weapons;
    }
  }

  public setViewGang() {
    if (this.viewGang) {
      return;
    }

    this.viewGang = true;
    this.viewAll = false;

    this._gangsClient.GetGangerWeapons(this._gangId).subscribe(weapons => {
      this._ngRedux.dispatch({
        type: SET_WEAPONS,
        payload: weapons
      });
    });
  }

  public setViewAll() {
    if (this.viewAll) {
      return;
    }

    this.viewGang = false;
    this.viewAll = true;

    this._weaponsClient.GetAllWeapons().subscribe(weapons => {
      this._ngRedux.dispatch({
        type: SET_WEAPONS,
        payload: weapons
      });
    });
  }
}
