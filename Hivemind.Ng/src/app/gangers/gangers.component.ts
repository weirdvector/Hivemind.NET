import { Ganger } from './../../autogenerated/entities/Ganger';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gangers',
  templateUrl: './gangers.component.html',
  styleUrls: ['./gangers.component.css']
})
export class GangersComponent implements OnInit {

  @Input() public gangers: Ganger;

  public ngOnInit() {
    
  }
}
