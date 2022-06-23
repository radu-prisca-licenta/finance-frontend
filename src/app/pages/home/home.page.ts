import {Component, OnInit} from '@angular/core';
import SwiperCore, {Autoplay, Pagination, SwiperOptions} from 'swiper';
import {TransactionService} from '../../services/transaction.service';
import {Transaction} from '../../model/transaction';
import {formatDate} from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    isModalOpen = false;
    isSendModalOpen = false;

    config: SwiperOptions = {
        pagination: {clickable: true},
    };
    slides = [
        {
            title: 'Total Balance',
            balance: 420.69,
            account: '50901293853',
            currency: 'USD',
        },
        {
            title: 'Total Balance',
            balance: 120.69,
            account: '50901293853',
            currency: 'EUR',
        },
        {
            title: 'Total Balance',
            balance: 64.2,
            account: '50901293853',
            currency: 'GBP',
        },
    ];

    accountActions = [
        {
            icon: 'paper-plane',
            color: 'action-cyan',
            label: 'send',
        },
        {
            icon: 'add-circle',
            color: 'action-yellow',
            label: 'top-up',
        },
        {
            icon: 'newspaper',
            color: 'action-white',
            label: 'bills',
        },
    ];

    transaction: Transaction = {amount: 0, currency: 'EUR', date: '', from: '', title: '', to: '', transactionId: '', type: 'credit'};
    username: string;
    password: string;
    user: string;
    transactions: Transaction[];

    constructor(private transactionService: TransactionService) {
    }

    ngOnInit() {

        if (localStorage.getItem('user') === null) {
            this.isModalOpen = true;
        } else {
            this.user = localStorage.getItem('user');
            SwiperCore.use([Pagination, Autoplay]);
            this.getTransactions();
        }
    }

    onSlideChange([Swiper]) {
        console.log('slide change', Swiper);
    }

    handleAction({label}) {

        switch (label) {
            case 'send':
                this.toggleSend();
                break;
            case 'top-up':
                this.toggleTopUp();
                break;
            case 'bills':
                this.toggleBills();
                break;

        }
        this.getTransactions();
        console.log('You clicked on:', label);
    }

    format(value, currency = 'USD') {
        return new Intl.NumberFormat('en-US', <any>{
            style: 'currency',
            currency: currency,
            currencySign: 'accounting',
            signDisplay: 'auto',
        }).format(value);
    }

    private toggleSend() {
        this.isSendModalOpen = true;
    }

    sendMoney() {
        this.transaction.from = this.user;
        this.transaction.date = formatDate(new Date(), 'yyyy-MM-dd HH:mm', 'en'),
        this.transactionService.create(this.transaction);
        this.isSendModalOpen = false;
        this.transaction = {amount: 0, currency: 'EUR', date: '', from: '', title: '', to: '', transactionId: '', type: 'credit'};
        this.getTransactions();
    }

    private toggleTopUp() {

    }

    private toggleBills() {

    }

    private getTransactions() {
        this.transactionService.getAll().subscribe(transactions => {
            this.transactions = transactions.filter(transaction => transaction.from === this.user || transaction.to === this.user);
        })
    }


    setOpen(isOpen: boolean) {
        this.isModalOpen = isOpen;
    }

    login() {
        if (!!this.username && !!this.password && this.username === this.password) {
            localStorage.setItem('user', this.username);
            this.isModalOpen = false;
            location.reload();
        }
    }

    logout() {
        localStorage.removeItem('user');
        location.reload();
    }

    setSendModalOpen(b: boolean) {
        this.isSendModalOpen = b;
    }
}
