import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../models/customer.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  // backendHost : String = "http://localhost:8085";

  constructor(private http:HttpClient) {}

    public getCustomers():Observable <Array<Customer>>{
      return this.http.get<Array<Customer>>(environment.backendHost+"/customers");
    }

    public searchCustomers(keyword: String):Observable <Array<Customer>>{
      return this.http.get<Array<Customer>>(environment.backendHost+"/customers/search?keyword="+keyword);
    }
}
