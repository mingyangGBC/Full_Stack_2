import { Component, OnInit, ViewChild } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpacexapiService } from '../network/spacexapi.service';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MissiondetailsComponent implements OnInit {

  @ViewChild(MissiondetailsComponent) child: any;
  id:any;
  data:  any;
  constructor(private route:ActivatedRoute, private spacexservice: SpacexapiService) { 
    
  }

  ngOnInit(): void {
   console.log(this.route.snapshot.params['id']);
   this.id = this.route.snapshot.params['id'];
   this.getMissionDetails();
  }

  getMissionDetails():void{
    this.spacexservice.getMissionDetails(this.id).subscribe(res=>{
      if(res){
      JSON.parse(JSON.stringify(res));
      console.log(res);
      this.data= res;
      }
    })
  }
}
