import { Injectable } from '@angular/core';
import { IAppState } from './IAppState';
import { NgRedux } from '@angular-redux/store';
import { GangsClient } from './../../autogenerated/clients/GangsClient';
import { Gang } from './../../autogenerated/entities/Gang';
import { ADD_GANG, CHANGE_GANG, SET_TOKEN } from './GangState';

@Injectable()
export class GangService {

    constructor(
        private _ngRedux: NgRedux<IAppState>,
        private _gangsClient: GangsClient) {
    }

    public addGang(gang: Gang) {
        this._gangsClient.AddGang(gang).subscribe((addedGang: Gang) => {
            this._ngRedux.dispatch({
                type: ADD_GANG,
                payload: addedGang
            });
        });
    }

    public getGang(id: string) {
        this._gangsClient.GetGang(id).subscribe((gang: Gang) => {
            this._ngRedux.dispatch({
                type: CHANGE_GANG,
                payload: gang
            });
            return gang;
        });
    }
}
