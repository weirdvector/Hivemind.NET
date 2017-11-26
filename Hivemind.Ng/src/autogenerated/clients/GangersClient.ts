import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './../../app/tokenService/token.service';
import { Ganger } from '../entities/Ganger';
import { GangerWeapon } from '../entities/GangerWeapon';
import { Weapon } from '../entities/Weapon';

@Injectable()
export class GangersClient {

    constructor(private _http: HttpClient, private _tokenService: TokenService) {}

    public GetGanger(
        gangerId: string,
    ): Observable<Ganger> {

        return this._http.get<Ganger>(
            'http://localhost:61774/api/gangers/' + gangerId + ''
            , {
                headers: new HttpHeaders({
                    'Authorize': 'Bearer ' + this._tokenService.token
                })
            }
        );
    }

    public GetWeapons(
        gangerId: string,
    ): Observable<GangerWeapon[]> {

        return this._http.get<GangerWeapon[]>(
            'http://localhost:61774/api/gangers/' + gangerId + '/weapons'
            , {
                headers: new HttpHeaders({
                    'Authorize': 'Bearer ' + this._tokenService.token
                })
            }
        );
    }

    public AddGangerWeapon(
        gangerId: string,
        weapon: Weapon,
    ): Observable<GangerWeapon> {
        let body = weapon;

        return this._http.post<GangerWeapon>(
            'http://localhost:61774/api/gangers/' + gangerId + '/weapons'
            , body
            , {
                headers: new HttpHeaders({
                    'Authorize': 'Bearer ' + this._tokenService.token
                })
            }
        );
    }

    public RemoveGangerWeapon(
        gangerId: string,
        gangerWeaponId: string,
    ): Observable<string> {

        return this._http.delete<string>(
            'http://localhost:61774/api/gangers/' + gangerId + '/weapons/' + gangerWeaponId + ''
            , {
                headers: new HttpHeaders({
                    'Authorize': 'Bearer ' + this._tokenService.token
                })
            }
        );
    }

    public UpdateGanger(
        ganger: Ganger,
    ): Observable<Ganger> {
        let body = ganger;

        return this._http.put<Ganger>(
            'http://localhost:61774/api/Gangers'
            , body
            , {
                headers: new HttpHeaders({
                    'Authorize': 'Bearer ' + this._tokenService.token
                })
            }
        );
    }

    public AddGanger(
        ganger: Ganger,
    ): Observable<Ganger> {
        let body = ganger;

        return this._http.post<Ganger>(
            'http://localhost:61774/api/Gangers'
            , body
            , {
                headers: new HttpHeaders({
                    'Authorize': 'Bearer ' + this._tokenService.token
                })
            }
        );
    }

}