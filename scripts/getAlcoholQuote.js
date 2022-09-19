import  quotes  from './quotesJSON.js';

//ADD QUOTE TO PAGE
export default function getAlcoholQuote()  {
        let quote = document.getElementsByClassName('quote')[0];
        let quoter = document.getElementsByClassName('quoter')[0];

        let num = Math.floor(Math.random()*11);
        let selectedQuote = quotes['quote'+num];
        let quoteTextNode = document.createTextNode(selectedQuote.quote);
        let quoterTextNode = document.createTextNode(selectedQuote.quoter);
        quote.appendChild(quoteTextNode);
        quoter.appendChild(quoterTextNode);
}