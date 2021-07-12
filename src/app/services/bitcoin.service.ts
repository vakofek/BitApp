import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service'

const MARKET_PRICE = 'market-price';
const TRADE_VOLUME = 'trade-volume';

@Injectable({
    providedIn: 'root'
})
export class BitconService {

    constructor(private http: HttpClient, private storageService: StorageService) { }

    getMarketPrice() {
        let marketPrices = this.storageService.load(MARKET_PRICE)
        if (!marketPrices || marketPrices === 0) {
            const bitcoinValues$ = this.http.get<{ values: [] }>('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
            bitcoinValues$.subscribe(data => {
                marketPrices = data.values
                this.storageService.save(MARKET_PRICE, marketPrices)
            })
        }
        return marketPrices
    }

    getTradeVolume() {
        let tradeVolumes = this.storageService.load(TRADE_VOLUME);
        if (!tradeVolumes || tradeVolumes === 0) {
            const bitcoinValues$ = this.http.get<{ values: [] }>('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
            bitcoinValues$.subscribe(data => {
                tradeVolumes = data.values
                this.storageService.save(TRADE_VOLUME, tradeVolumes)
            })
        }
        return tradeVolumes
    }
}
