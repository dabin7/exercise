const quotes = [
    {
        quote: "Imagination is more important than knowledge.",
        author: "Albert Einstein",
    },
    {
        quote: "A goal without a plan is just a wish.",
        author: "Antoine de Saint-Exupery",
    },
    {
        quote: "Much learning does not teach understanding.",
        author: "Heraclitus",
    },
    {
        quote: "The secret of happiness is renunciation.",
        author: "Andrew Camegie",
    },
    {
        quote: "Action is the foundational key to all success.",
        author: "Pablo Picasso",
    },
    {
        quote: "Our greatestweakness lies in give up.The most certain way to succeed is always to try just one more time.",
        author: "Thomas Alva Edison",
    },
    {
        quote: "Whether you believe you can do a thing or not,will be you believe.",
        author: "Henny Ford",
    },
    {
        quote: "The most terrible poverty is loneliness and the feeling of being unloved.",
        author: "Mother Teresa Bojaxhiu",
    },
    {
        quote: "Nearly all men can stand adversity, But if you want to test a man's character, give him power",
        author: "Abraham Lincoln",
    },
    {
        quote: "We should all start to live before we get too old. Fear is stupid. So are regrets ",
        author: "Marilyn Monroe",
    },
];

const quote = document.querySelector("#quote span:first-child")
const author = document.querySelector("#quote span:last-child")

const todaysQuote = quotes[Math.floor(Math.random()*quotes.length)]

quote.innerText = todaysQuote.quote;
author.innerText = todaysQuote.author;