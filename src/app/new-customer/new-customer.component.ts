import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CustomersComponent} from "../customers/customers.component";
import {Customer} from "../models/customer.model";
import {CustomerService} from "../services/customer.service";
import {Router, RouterLink} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {

  newCustomerFormGroup! : FormGroup; //newCustomerFormGroup est un objet qui contient toutes les donnes saisises par le user dans la formulaire

  constructor(private fb : FormBuilder, private customerService : CustomerService, private router : Router) { }

  ngOnInit(): void {
    this.newCustomerFormGroup = this.fb.group({
      name : this.fb.control(null, [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
      email : this.fb.control(null, [Validators.email, Validators.required]),
    });
  }

  // handleSaveCustomer() {
  //   let customer: Customer = this.newCustomerFormGroup.value;
  //   this.customerService.saveCustomer(customer).subscribe({
  //     next: data => {
  //       alert("Customer saved !");
  //       this.router.navigateByUrl("/customers").then(r => null);
  //     },
  //     error: err => {
  //       console.log(err);
  //     }
  //   });
  // }
  handleSaveCustomer() {
    let customer: Customer = this.newCustomerFormGroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: data => {
        Swal.fire({
          position: 'center',          // en haut au centre
          icon: 'success',          // icône succès
          title: 'Customer saved!', // texte
          showConfirmButton: false, // pas de bouton
          timer: 1500,              // disparaît après 1.5s
          toast: true,              // style toast
          width: '300px',           // largeur du toast
        });

        // redirection après animation
        this.router.navigateByUrl("/customers").then(r => null);
      },
      error: err => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    });
  }


}
