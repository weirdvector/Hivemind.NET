import { Injectable } from '@angular/core';
import { IAppState } from './IAppState';
import { NgRedux } from '@angular-redux/store';
import { GangsClient } from './../clients/GangsClient';
import { Gang } from './../entities/Gang';
import { ADD_GANG, CHANGE_GANG } from './GangState';

@Injectable()
export class GangService {
    
    constructor(private ngRedux: NgRedux<IAppState>, private _gangsClient: GangsClient) {}

    public addGang(gang: Gang) {
        this._gangsClient.AddGang(gang.name, gang.gangHouse).subscribe((addedGang: Gang) => {
            this.ngRedux.dispatch({
                type: ADD_GANG,
                payload: addedGang
            });
        });
    }

    public getGang(id: string) {
        this._gangsClient.GetGang(id).subscribe((gang: Gang) => {
            this.ngRedux.dispatch({
                type: CHANGE_GANG,
                payload: gang
            });
            return gang;
        });
    }
}