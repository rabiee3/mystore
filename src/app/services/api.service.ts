import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class APIService {
  data:any;
  constructor(private http:HttpClient) {}

  getAllProducts():Promise<any>{
    return new Promise((res,rej)=>{
      this.http.get(environment.API_URL).toPromise().then((data:any)=>{
        res(data);
      }).catch(err=>{
        rej(err);
      });
    });
  }

  getProductById(id: number):Promise<any> {
    return new Promise((res,rej)=>{
      this.http.get(environment.API_URL).toPromise().then((data:any)=>{
        res(data.find(x=>x.id==id));
      }).catch(err=>{
        rej(err);
      });
    });
  }
}
