import { TokenService } from './tokenService/token.service';
import { Gang } from './../autogenerated/entities/Gang';
import { GangService } from './redux/GangService';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersClient } from 'autogenerated/clients/UsersClient';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title: string = "Hivemind NG";
  public showSignUpDialog: boolean = false;
  public showLoginDialog: boolean = false;
  public loginForm: FormGroup;
  public gang: Gang;
  private _loginUrl = 'http://localhost:61774/api/login';

  constructor(
    private _formBuilder: FormBuilder,
    private _tokenService: TokenService,
    private _usersClient: UsersClient,
    private _http: HttpClient
    ) {
    this.loginForm = _formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  public submitLoginForm() {
    console.log(this.loginForm);
    let body = new HttpParams()
      .set('UserName', this.loginForm.get('email').value)
      .set('Password', this.loginForm.get('password').value)
      .set('grant_type', 'password');

    let headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    console.log(body);

    this._http.post(this._loginUrl, body.toString(), { 'headers': headers }).subscribe((data: any) => {
      if (data && data.access_token) {
        this._tokenService.token = data.access_token;
        this.showLoginDialog = false;

        // TODO: Call user service, get user info and gangs.
        // Call getGang of first gang, or create an empty gang.

      } else {
        // TODO: Show error message.
      }
    });
  }
}
