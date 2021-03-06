/*
 * This file is autogenerated. Please see README.md for instructions on editing.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './../../app/redux/TokenService';
import { FormDataHelper } from '../../app/clients/FormDataHelper';
import { ClientService } from './../../app/clients/ClientService';
import { Gang } from '../entities/Gang';
import { Weapon } from '../entities/Weapon';
import { GangWeapon } from '../entities/GangWeapon';

@Injectable()
export class GangsClient {
    private _path: string;

    constructor(
        private _http: HttpClient, 
        private _tokenService: TokenService,
        private _formDataHelper: FormDataHelper,
        private _clientService: ClientService
    ) {
        this._clientService.dataObs.subscribe(res => {
            this._path = res;
        });
        this._clientService.getPath();
    }

    public GetGang(
        gangId: string,
    ): Observable<Gang> {


        return this._http.get<Gang>(
            this._path + '/api/gangs/' + gangId + ''
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public AddGang(
        gang: Gang,
    ): Observable<Gang> {

        const body = this._formDataHelper.getFormData(gang);

        return this._http.post<Gang>(
            this._path + '/api/gangs'
            , body
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public GetGangStash(
        gangId: string,
    ): Observable<Weapon[]> {


        return this._http.get<Weapon[]>(
            this._path + '/api/gangs/' + gangId + '/weapons'
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public AddGangWeapon(
        gangId: string,
        gangWeapon: GangWeapon,
    ): Observable<GangWeapon> {

        const body = this._formDataHelper.getFormData(gangWeapon);

        return this._http.post<GangWeapon>(
            this._path + '/api/gangs/' + gangId + '/weapons'
            , body
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public GetGangerWeapons(
        gangId: string,
    ): Observable<Weapon[]> {


        return this._http.get<Weapon[]>(
            this._path + '/api/gangs/' + gangId + '/weapons/gangers'
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public UpdateGang(
        gang: Gang,
    ): Observable<Gang> {

        const body = this._formDataHelper.getFormData(gang);

        return this._http.put<Gang>(
            this._path + '/api/Gangs'
            , body
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

}
