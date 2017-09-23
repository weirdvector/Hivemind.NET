import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { PreGameReport } from '../entities/PreGameReport';
import { PostGameReport } from '../entities/PostGameReport';
import { BattleReport } from '../entities/BattleReport';

@Injectable()
export class GameClient {

    constructor(private _http: HttpClient) {}

    public ProcessPreGame(
        id: number,
    ): Observable<PreGameReport> {
        let body = id;

        return this._http.post<PreGameReport>(
            'http://localhost:61774/api/game/pre'
            , body
        );
    }

    public ProcessPostGame(
        battleReport: BattleReport,
    ): Observable<PostGameReport> {
        let body = battleReport;

        return this._http.post<PostGameReport>(
            'http://localhost:61774/api/game/post'
            , body
        );
    }

}