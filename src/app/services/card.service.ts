import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Card} from '../model/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  URL = 'https://ha163hktjb.execute-api.eu-central-1.amazonaws.com/prod/cards';

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<Card[]>(this.URL);
  }

  getById(id: string) {
    return this.http.get(this.URL + '/' + id);
  }

  create(card: Card) {
    return this.http.post(this.URL, card).subscribe();
  }

  update(card: Card) {
    return this.http.put(this.URL + '/' + card.cardId, card).subscribe();
  }

  delete(id: string) {
    return this.http.delete(this.URL + '/' + id).subscribe();
  }
}
