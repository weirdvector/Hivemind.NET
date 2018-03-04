/*
 * This file is autogenerated. Please see README.md for instructions on editing.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './../../app/redux/TokenService';
import { Weapon } from '../entities/Weapon';

@Injectable()
export class WeaponsClient {

    constructor(private _http: HttpClient, private _tokenService: TokenService) {}

    public GetWeapon(
        weaponId: number,
    ): Observable<Weapon> {

        return this._http.get<Weapon>(
            'http://localhost:61774/api/weapons/' + weaponId + ''
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public GetAllWeapons(
    ): Observable<Weapon[]> {

        return this._http.get<Weapon[]>(
            'http://localhost:61774/api/Weapons'
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

}