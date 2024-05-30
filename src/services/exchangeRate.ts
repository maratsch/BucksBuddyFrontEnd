// src/services/exchangeRate.ts
import Freecurrencyapi from '@everapi/freecurrencyapi-js';

const currencyapi = new Freecurrencyapi('fca_live_SXUfhiLcLAt87AE3F3ZZZ9i4yHzyQ4kfmKITa6Vy'); //TODO: API-Key hiden
const baseCurrency = 'EUR';
const targetCurrency = 'USD';

export let exchangeRate = 0;

currencyapi.latest({
    base_currency: baseCurrency,
    currencies: targetCurrency
}).then((response: any) => {
    if (response && response.data && response.data.USD) {
        exchangeRate = response.data.USD;
    } else {
        console.error('Ungültige API-Antwort:', response);
    }
}).catch((error: any) => {
    console.error('Fehler beim Abrufen der Wechselkurse:', error);
});
