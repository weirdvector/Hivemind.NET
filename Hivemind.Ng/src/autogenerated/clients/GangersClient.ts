/*
 * This file is autogenerated. Please see README.md for instructions on editing.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './../../app/redux/TokenService';
import { FormDataHelper } from '../../app/clients/FormDataHelper';
import { ClientService } from './../../app/clients/ClientService';
import { Ganger } from '../entities/Ganger';
import { GangerWeapon } from '../entities/GangerWeapon';

@Injectable()
export class GangersClient {
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

    public GetGanger(
        gangerId: string,
    ): Observable<Ganger> {


        return this._http.get<Ganger>(
            this._path + '/api/gangers/' + gangerId + ''
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public GetWeapons(
        gangerId: string,
    ): Observable<GangerWeapon[]> {


        return this._http.get<GangerWeapon[]>(
            this._path + '/api/gangers/' + gangerId + '/weapons'
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public AddGangerWeapon(
        gangerId: string,
        gangWeaponId: string,
    ): Observable<GangerWeapon> {


        return this._http.post<GangerWeapon>(
            this._path + '/api/gangers/' + gangerId + '/weapons/' + gangWeaponId + ''
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public RemoveGangerWeapon(
        gangerId: string,
        gangerWeaponId: string,
    ): Observable<string> {


        return this._http.delete<string>(
            this._path + '/api/gangers/' + gangerId + '/weapons/' + gangerWeaponId + ''
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public UpdateGanger(
        ganger: Ganger,
    ): Observable<Ganger> {

        const body = this._formDataHelper.getFormData(ganger);

        return this._http.put<Ganger>(
            this._path + '/api/Gangers'
            , body
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public AddGanger(
        ganger: Ganger,
    ): Observable<Ganger> {

        const body = this._formDataHelper.getFormData(ganger);

        return this._http.post<Ganger>(
            this._path + '/api/Gangers'
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
