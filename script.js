document.addEventListener('DOMContentLoaded', function () {
    const quoteText = document.getElementById('quote-text');
    const author = document.getElementById('author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const searchForm = document.getElementById('search-form'); 
    const authorInput = document.getElementById('author-input');


    function fetchQuote() {
        fetch('http://quotable.io/random')
            .then(response => response.json())
            .then(data => {

                quoteText.innerHTML = `"${data.content}"`;
                author.innerHTML = `${data.author}.....`;
            })
            .catch(error => console.error('Error fetching quote:', error));
    }

    function searchQuoteByAuthor(authorName) {
        fetch(`http://api.quotable.io/quotes?author=${authorName}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.results && data.results.length > 0) {
                    const quotes = data.results;
                    const randomIndex = Math.floor(Math.random() * quotes.length); 
                    const quote = quotes[randomIndex];
                    quoteText.innerHTML = `"${quote.content}"`;
                    author.innerHTML = `${quote.author}.....`; 
                } else {
                    quoteText.textContent = `No quotes found for author ${authorName}.`;
                    author.textContent = '';
                }
            })
            .catch(error => console.error('Error searching quote:', error));
    }

    
    newQuoteBtn.addEventListener('click', fetchQuote);

    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const authorName = authorInput.value.trim();
        if (authorName !== '') {
            searchQuoteByAuthor(authorName);
        } else {
            
            console.error('Author name input is empty');
        }
    });
    
    fetchQuote();
});
