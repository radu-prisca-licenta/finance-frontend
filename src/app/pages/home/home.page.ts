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

    transactions$;
    username: string;
    password: string;
    user: string;

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
        const transaction: Transaction = {
            amount: 100,
            currency: 'USD',
            date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
            from: 'John',
            title: 'Clothes',
            to: 'Radu',
            transactionId: '' + new Date().getTime(),
            type: 'credit',

        }
        this.transactionService.create(transaction);
    }

    private toggleTopUp() {

    }

    private toggleBills() {

    }

    private getTransactions() {
        this.transactions$ = this.transactionService.getAll();
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
}
