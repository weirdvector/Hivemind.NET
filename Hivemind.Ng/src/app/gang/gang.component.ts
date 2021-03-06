import { FinishGameModalComponent } from './../finish-game-modal/finish-game-modal.component';
import { START_GAME, CANCEL_GAME } from './../redux/GangState';
import { GangService } from './../redux/GangService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from 'redux';
import { IAppState } from '../redux/IAppState';
import { Ganger } from './../../autogenerated/entities/Ganger';
import { NgRedux } from '@angular-redux/store';
import { Gang } from './../../autogenerated/entities/Gang';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'gang',
  templateUrl: './gang.component.html',
  styleUrls: ['./gang.component.css']
})
export class GangComponent implements OnInit {

  public gang: Gang;
  public gangers: Ganger[];
  public userGangs: Gang[];
  public activeTab = 1;
  public isGameInProgress: boolean;
  public showAddNewGangModal: boolean;
  public addGangForm: FormGroup;
  @ViewChild('finishGameModal') finishGameModal: FinishGameModalComponent;

  constructor(
    private _ngRedux: NgRedux<IAppState>,
    private _formBuilder: FormBuilder,
    private _gangService: GangService,
    private _router: Router
  ) {
    this.addGangForm = _formBuilder.group({
      'gangName': ['', Validators.required],
      'gangHouse': ['', Validators.required]
    });

    this._router.navigate(['gangers']);

    this._ngRedux.subscribe(() => {
      const state = this._ngRedux.getState();
      this.gang = state.gang;

      if (state.gang) {
        this.gangers = state.gang.gangers;
      }

      if (state.user) {
        this.userGangs = state.user.userGangs;
      }

      this.isGameInProgress = state.inGame;
    });

    this.gang = new Gang({
      name: '',
      gangHouse: ''
    });
  }

  public ngOnInit() {
    const state = this._ngRedux.getState();
    this.gang = state.gang;
    if (this.gang && this.gang.gangers) {
      this.gang.gangers = state.gang.gangers;
    }
  }

  public addNewGang() {
    let gang = new Gang({
      name: this.addGangForm.controls['gangName'].value,
      gangHouse: this.addGangForm.controls['gangHouse'].value
    });

    this._gangService.addGang(gang);

    this.addGangForm.controls['gangName'].setValue('');
    this.addGangForm.controls['gangHouse'].setValue('');

    this.showAddNewGangModal = false;
  }

  public chooseGang(selection: string) {
    if (selection == 'Choose another gang') {
      return;
    }

    this._gangService.getGang(selection);
  }

  public startGame() {
    this._ngRedux.dispatch({
      type: START_GAME
    });
  }

  public cancelGame() {
    this.isGameInProgress = false;
    this._ngRedux.dispatch({
      type: CANCEL_GAME
    });
  }

  public displayFinishGameDialog() {
    this.finishGameModal.display();
  }
}
