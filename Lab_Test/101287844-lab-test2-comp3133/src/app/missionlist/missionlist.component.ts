import { Component, OnInit } from '@angular/core';
import { Mission } from '../models/mission';
import { SpacexapiService } from '../network/spacexapi.service';
@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {

  dataList: Mission[]= [];
 
  constructor(private spacexservice: SpacexapiService) { }

  ngOnInit() {
   this.getMissionList();
  }
  getMissionList():void{
    
    this.spacexservice.getMission().subscribe((res)=>{
     this.dataList = res;
    }); 
  }

}
