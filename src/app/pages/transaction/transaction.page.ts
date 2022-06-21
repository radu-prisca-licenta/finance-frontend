import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  transactions = [];
  allTransactions = [
    {
      title: 'Akolisa',
      date: '4 Apr. 2022',
      amount: 26.0,
      type: 'credit',
      currency: 'USD',
    },
    {
      title: 'Simon G.',
      date: '3 Apr. 2022',
      amount: 56.3,
      type: 'credit',
      currency: 'USD',
    },
    {
      title: 'Austine A.',
      date: '3 Apr. 2022',
      amount: 16.0,
      type: 'credit',
      currency: 'USD',
    },
    {
      title: 'PaperCloud',
      date: '1 Apr. 2022',
      amount: 4.99,
      type: 'debit',
      currency: 'USD',
    },
    {
      title: 'ReWork',
      date: '28 Mar. 2022',
      amount: 26.0,
      type: 'debit',
      currency: 'EUR',
    },
    {
      title: 'Myranda',
      date: '25 Mar. 2022',
      amount: 10.99,
      type: 'credit',
      currency: 'GBP',
    },
  ];

  constructor() {}

  ngOnInit() {
    this.transactions = this.filterTransaction(this.allTransactions);
  }

  handleChange(e) {
    const type = e.target.value;
    this.transactions = this.filterTransaction(this.allTransactions, type);
    console.log(type);
  }

  filterTransaction(value, type = 'credit') {
    if (type == 'credit') {
      const transaction = value.filter((item) => {
        return item.type == 'credit';
      });

      return transaction;
    }

    return value.filter((item) => {
      return item.type != 'credit';
    });
  }

  format(value, currency = 'USD') {
    return new Intl.NumberFormat('en-US', <any>{
      style: 'currency',
      currency: currency,
      currencySign: 'accounting',
      signDisplay: 'auto',
    }).format(value);
  }
}
