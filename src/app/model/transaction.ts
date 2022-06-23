export interface Transaction {
    transactionId: string;
    from: string;
    to: string;
    date: string;
    amount: number;
    title: string;
    type: 'debit' | 'credit';
    currency: 'EUR' | 'USD' | 'RON';
}
