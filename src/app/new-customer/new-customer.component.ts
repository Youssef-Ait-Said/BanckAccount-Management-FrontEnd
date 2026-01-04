import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomersComponent} from "../customers/customers.component";
import {Customer} from "../models/customer.model";
import {CustomerService} from "../services/customer.service";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  newCustomerFormGroup! : FormGroup; //newCustomerFormGroup est un objet qui contient toutes les donnes saisises par le user dans la formulaire

  constructor(private fb : FormBuilder, private customerService : CustomerService, ) { }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(4), Validators.maxLength(10)]),
      email : this.fb.control(null, [Validators.email, Validators.required]),
    });
  }

  handleSaveCustomer() {
    let customer: Customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: data => {
        alert("Customer saved !");
      },
      error: err => {
        console.log(err);
      }
    });
  }
}
