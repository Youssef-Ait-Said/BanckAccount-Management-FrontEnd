import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AccountDetails} from "../models/accounts.model";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import Swal  from "sweetalert2";


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})

export class AccountsComponent implements OnInit {

  accountFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  accountObservable!: Observable<AccountDetails>;
  operationsFormGroup!: FormGroup;
  errorMessage! : String;

  constructor(private fb: FormBuilder, private accountService: AccountsService) {
  }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control(''),

    });
    this.operationsFormGroup = this.fb.group({
        operationType: this.fb.control(null),
        amount: this.fb.control(null),
        description: this.fb.control(null),
        accountDestination: this.fb.control(null),
      }
    );

  }

  handleSearchAccount() {
    let accountId: String = this.accountFormGroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );

  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  // handleAccountOperations() {
  //   let accountId : String = this.operationsFormGroup.value.accountId;
  //   let operationType : String = this.operationsFormGroup.value.operationType;
  //   let amount : number = this.operationsFormGroup.value.amount;
  //   let description : String = this.operationsFormGroup.value.description;
  //   let accountDestination : String = this.operationsFormGroup.value.accountDestination;
  //
  //   if (operationType == 'DEBIT'){
  //     this.accountService.debit(accountId, amount, description).subscribe(
  //       {
  //         next: (data) => {
  //           alert("Success Debit");
  //           this.handleSearchAccount();
  //         },
  //         error: (err) => {
  //           console.log(err);
  //         }
  //       }
  //     );
  //   } else if (operationType == 'CREDIT'){
  //     this.accountService.credit(accountId, amount, description).subscribe(
  //       {
  //         next: (data) => {
  //           alert("Success Credit");
  //           this.handleSearchAccount();
  //         },
  //         error: (err) => {
  //           console.log(err);
  //         }
  //       }
  //     );
  //   } else if (operationType == 'TRANSFER'){
  //     this.accountService.transfer(accountId, accountDestination, amount, description).subscribe(
  //       {
  //         next: (data) => {
  //           alert("Success Transfer");
  //           this.handleSearchAccount();
  //         },
  //         error: (err) => {
  //           console.log(err);
  //         }
  //       }
  //     );
  //   }
  // }}
  handleAccountOperations() {
    let accountId: string = this.accountFormGroup.value.accountId;
    let operationType: string = this.operationsFormGroup.value.operationType;
    let amount: number = this.operationsFormGroup.value.amount;
    let description: string = this.operationsFormGroup.value.description;
    let accountDestination: string = this.operationsFormGroup.value.accountDestination;

    if (operationType === 'DEBIT') {
      this.accountService.debit(accountId, amount, description).subscribe({
        next: () => {
          this.handleSearchAccount();
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Debit completed successfully.',
            showConfirmButton: false,
            timer: 2000,
            background: 'peachpuff',
            color: 'black'
          });
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Debit failed.',
            background: 'peachpuff',
            color: 'black'
          });
        }
      });
    } else if (operationType === 'CREDIT') {
      this.accountService.credit(accountId, amount, description).subscribe({
        next: () => {
          this.handleSearchAccount();
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Credit completed successfully.',
            showConfirmButton: false,
            timer: 2000,
            background: 'peachpuff',
            color: 'black'
          });
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Credit failed.',
            background: 'peachpuff',
            color: 'black'
          });
        }
      });
    } else if (operationType === 'TRANSFER') {
      this.accountService.transfer(accountId, accountDestination, amount, description).subscribe({
        next: () => {
          this.handleSearchAccount();
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Transfer completed successfully.',
            showConfirmButton: false,
            timer: 2000,
            background: 'peachpuff',
            color: 'black'
          });
        },
        error: (err) => {
          console.log(err);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Transfer failed.',
            background: 'peachpuff',
            color: 'black'
          });
        }
      });
    }

    this.operationsFormGroup.reset();
  }

}
