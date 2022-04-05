export class Mission {
    flight_number: number |undefined;
    details: string | undefined;
    mission_name: string ;
    launch_year: string | undefined;
    links: Links;
    
   
   constructor(launchRes: any){
     this.flight_number = launchRes.flight_number;
      this.mission_name = launchRes.mission_name;
      this.launch_year = launchRes.launch_year;
      this.details =launchRes.details;
      this.links = launchRes.links.mission_patch_small;
      this.links = launchRes.links.mission_patch;
      
    }
    
  }
  export class Links {
    mission_patch_small: any | undefined;
    mission_patch: any | undefined;
   
  }
