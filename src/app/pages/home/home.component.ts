import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  endpoint = environment.URL_API;

  constructor(public router: Router) { }

  ngOnInit(): void {
    console.log(this.endpoint);
  }

  select(op: string) {
    if(op === 'search') {
      this.router.navigate(['search']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
