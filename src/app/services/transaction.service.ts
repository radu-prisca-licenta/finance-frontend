import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Transaction} from '../model/transaction';

@Injectable({
    providedIn: 'root'
})
export class TransactionService {

    URL = 'https://g70xibb6fh.execute-api.eu-central-1.amazonaws.com/prod/transactions';

    constructor(private http: HttpClient) {
    }

    getAll() {
        return this.http.get<Transaction[]>(this.URL);
    }

    getById(id: string) {
        return this.http.get(this.URL + '/' + id);
    }

    create(transaction: Transaction) {
        return this.http.post(this.URL, transaction).subscribe();
    }

    update(transaction: Transaction) {
        return this.http.put(this.URL + '/' + transaction.transactionId, transaction);
    }

    delete(id: string) {
        return this.http.delete(this.URL + '/' + id);
    }
}
