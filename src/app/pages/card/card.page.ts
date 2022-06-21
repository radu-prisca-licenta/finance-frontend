import { Component, OnInit } from '@angular/core';
import SwiperCore, { Pagination, SwiperOptions, Autoplay } from 'swiper';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  config: SwiperOptions = {
    pagination: { clickable: true },
    spaceBetween: 50,
  };
  cards = [
    {
      number: '5200 8282 8282 8210',
      name: 'Radu Prisca',
      expireAt: '05/27',
    },
    {
      number: '4242 4242 4242 4242',
      name: 'Radu Prisca',
      expireAt: '01/25',
    },
    {
      number: '2223003122003222',
      name: 'Radu Prisca',
      expireAt: '07/30',
    },
  ];
  constructor() {}

  ngOnInit() {
    SwiperCore.use([Pagination, Autoplay]);
  }

  onSlideChange([Swiper]) {
    console.log('slide change', Swiper);
  }

  format(value, currency = 'USD') {
    return new Intl.NumberFormat('en-US', <any>{
      // maximumFractionDigits: n,
      style: 'currency',
      currency: currency,
      currencySign: 'accounting',
      signDisplay: 'auto',
    }).format(value);
  }
}
