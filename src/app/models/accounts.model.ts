export interface AccountDetails {
  accountId:           string;
  accountOperationDTO: AccountOperation[];
  balance:             number;
  currentPage:         number;
  pageSize:            number;
  totalPages:          number;
}

export interface AccountOperation {
  amount:        number;
  description:   string;
  id:            string;
  operationDate: Date;
  type:          string;
}
