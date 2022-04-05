import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Mission } from '../models/mission';

@Injectable({
  providedIn: 'root'
})
export class SpacexapiService {

  constructor(private http:HttpClient) { }
  url: string = "https://api.spacexdata.com/v3/launches/"
  getMission()
  {
    return this.http.get<Mission[]>(this.url);
  
  } 
  getMissionDetails(id: number)
  {
    return this.http.get<Mission[]>("https://api.spacexdata.com/v3/launches/"+id)
  
  } 
}
