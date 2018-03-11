import { GangerBattleStats } from './../../autogenerated/entities/GangerBattleStats';
import { BattleReport } from './../../autogenerated/entities/BattleReport';
import { GangerService } from './../redux/GangerService';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from './../redux/IAppState';
import { Gang } from './../../autogenerated/entities/Gang';
import { Ganger } from './../../autogenerated/entities/Ganger';
import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../redux/GameService';

@Component({
  selector: 'gangers',
  templateUrl: './gangers.component.html',
  styleUrls: ['./gangers.component.css']
})
export class GangersComponent implements OnInit {
  public gangers: Ganger[];
  public gang: Gang;
  public addGangerForm: FormGroup;
  public showAddGangerDialog: boolean;
  public isGameInProgress: boolean;
  public gangerBattleReportForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _gangerService: GangerService,
    private _gameService: GameService,
    private _ngRedux: NgRedux<IAppState>
  ) {
    this._ngRedux.subscribe(() => {
      const state = this._ngRedux.getState();
      this.gang = state.gang;
      this.gangers = state.gang.gangers;
      this.isGameInProgress = state.inGame;

      this.gangerBattleReportForm = _formBuilder.group({
        gangerReports: this._formBuilder.array([])
      });

      const formArray = this.gangerBattleReportForm.controls['gangerReports'] as FormArray;
      this.gangers.forEach(ganger => {
        let group = this._formBuilder.group({
          gangerId: [ganger.gangerId],
          kills: [0],
          objectives: [0],
          down: [false],
          outOfAction: [false]
        });
        formArray.push(group);
      });
    });

    this.addGangerForm = _formBuilder.group({
      'gangerName': ['', Validators.required],
      'gangerType': ['', Validators.required]
    });

    this.gangerBattleReportForm = _formBuilder.group({
      gangerReports: this._formBuilder.array([])
    });

    this.gangers = new Array<Ganger>();
  }

  public ngOnInit() {
    const state = this._ngRedux.getState();
    this.gang = state.gang;
    if (state.gang && state.gang.gangers) {
      this.gangers = state.gang.gangers;
    }
  }

  public displayAddGangerDialog() {
    this.addGangerForm.controls['gangerName'].setValue('');
    this.addGangerForm.controls['gangerType'].setValue('');
    this.showAddGangerDialog = true;
  }

  public checkAddGangerType() {
    // check if the gang can afford to add a new ganger
  }

  public submitAddGangerForm() {
    const ganger = new Ganger({
      name: this.addGangerForm.controls['gangerName'].value,
      gangerType: this.addGangerForm.controls['gangerType'].value,
      gangId: this.gang.gangId
    });

    this._gangerService.addGanger(ganger);
    this.showAddGangerDialog = false;
  }

  public parseGangerEquipment(ganger: Ganger): string {
    let out = '';

    for (let i = 0; i < ganger.weapons.length; i++) {
      out += ganger.weapons[i].name;

      if (i + 1 < ganger.weapons.length) {
        out += ', ';
      }
    }

    return out;
  }

  public finishGame() {
    let battleReport = new BattleReport({
      gangId: this.gang.gangId,
      gangBattleStats: new Array<GangerBattleStats>()
    });

    const form = <FormArray>this.gangerBattleReportForm.controls['gangerReports'];

    form.controls.forEach((group: FormGroup) => {
      const gangerBattleStats = new GangerBattleStats({
        gangerId: group.controls['gangerId'].value,
        kills: group.controls['kills'].value,
        objectives: group.controls['objectives'].value,
        down: group.controls['down'].value,
        outOfAction: group.controls['outOfAction'].value
      });

      battleReport.gangBattleStats.push(gangerBattleStats);
    });

    this._gameService.processGame(battleReport);
  }

  public toggleFleshwound(ganger: Ganger) {
    let g = this.gangers.find(g => g.gangerId == ganger.gangerId);
    if (g.hasFleshWound) {
      g.weaponSkill++;
      g.ballisticSkill++;
    } else {
      g.weaponSkill--;
      g.ballisticSkill--;
    }

    g.hasFleshWound = !g.hasFleshWound;
  }
}
