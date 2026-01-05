import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer} from "../models/customer.model";
import {Form, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {

  customers! : Observable<Array<Customer>>;
  errorMessage! : String;
  searchFormGroup : FormGroup | undefined;

  constructor(private customerService: CustomerService, private fb : FormBuilder, private route : Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.customers = this.customerService.getCustomers().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers = this.customerService.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )
  }

  // handleDeleteCustomer(c : Customer) {
  //   let confirmation = confirm("You are going to delete a customer!\n Are you sure?");
  //   if (!confirmation) return;
  //   this.customerService.deleteCustomer(c.id).subscribe({
  //     next : (resp) =>{
  //       this.customers = this.customers.pipe(
  //         map( (data) => {
  //           let index = data.indexOf(c);
  //           data.slice(index, 1);
  //           return data;
  //         })
  //       );
  //     }, error: err => {
  //       console.log(err);
  //     }
  // });
  // }
  handleDeleteCustomer(c: Customer) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You are going to delete a customer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.customerService.deleteCustomer(c.id).subscribe({
          next: () => {
            this.customers = this.customers.pipe(
              map(data => data.filter(customer => customer !== c))
            );
            Swal.fire('Deleted!', 'Customer has been deleted.', 'success');
          },
          error: err => console.log(err)
        });
      }
    });
  }

  handleCustomerAccounts(c : Customer){
    this.route.navigateByUrl("/customer-accounts/"+c.id, {state : c});
  }

}
