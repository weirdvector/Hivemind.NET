/*
 * This file is autogenerated. Please see README.md for instructions on editing.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { TokenService } from './../../app/redux/TokenService';
import { FormDataHelper } from '../../app/clients/FormDataHelper';
import { PreGameReport } from '../entities/PreGameReport';
import { Gang } from '../entities/Gang';
import { PostGameReport } from '../entities/PostGameReport';
import { BattleReport } from '../entities/BattleReport';
import { GangerSkill } from '../entities/GangerSkill';
import { GangSkillUpRequest } from '../entities/GangSkillUpRequest';

@Injectable()
export class GameClient {

    constructor(
        private _http: HttpClient, 
        private _tokenService: TokenService,
        private _formDataHelper: FormDataHelper
    ) {}

    public ProcessPreGame(
        gang: Gang,
    ): Observable<PreGameReport> {
        const body = this._formDataHelper.getFormData(gang);

        return this._http.post<PreGameReport>(
            'http://localhost:61774/api/game/pre'
            , body
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public ProcessPostGame(
        battleReport: BattleReport,
    ): Observable<PostGameReport> {
        const body = this._formDataHelper.getFormData(battleReport);

        return this._http.post<PostGameReport>(
            'http://localhost:61774/api/game/post'
            , body
            , {
                headers: new HttpHeaders({
                    'Authorization': 'Bearer ' + this._tokenService.token,
                    'Content-Type': 'application/x-www-form-urlencoded'
                })
            }
        );
    }

    public LearnSkills(
        skillUpRequest: GangSkillUpRequest,
    ): Observable<GangerSkill[]> {
        const body = this._formDataHelper.getFormData(skillUpRequest);

        return this._http.post<GangerSkill[]>(
            'http://localhost:61774/api/game/post/skills'
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
