/*
 * This file is autogenerated. Please see README.md for instructions on editing.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './../../app/redux/TokenService';
import { GangTerritory } from '../entities/GangTerritory';
import { Territory } from '../entities/Territory';

@Injectable()
export class TerritoriesClient {

    constructor(private _http: HttpClient, private _tokenService: TokenService) {}

    public GetGangTerritoryById(
        gangId: string,
    ): Observable<GangTerritory[]> {

        return this._http.get<GangTerritory[]>(
            'http://localhost:61774/api/territories/' + gangId + ''
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public AddGangTerritory(
        gangId: string,
        territory: Territory,
    ): Observable<GangTerritory> {
        let body = territory;

        return this._http.post<GangTerritory>(
            'http://localhost:61774/api/territories/' + gangId + ''
            , body
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public RemoveGangTerritory(
        gangTerritoryId: string,
    ): Observable<string> {

        return this._http.delete<string>(
            'http://localhost:61774/api/territories/' + gangTerritoryId + ''
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public GetAllTerritories(
    ): Observable<Territory[]> {

        return this._http.get<Territory[]>(
            'http://localhost:61774/api/Territories'
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

}