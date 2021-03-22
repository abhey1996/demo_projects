const RANDOM_QUOTE_URL = 'https://type.fit/api/quotes'
const quoteTextElement = document.getElementById('quoteText')
const quoteAreaElement = document.getElementById('quoteArea')
const timer = document.getElementById('timer')

quoteAreaElement.addEventListener('input', () => {
    const quoteChars = document.querySelectorAll('span')
    const typedChars = quoteAreaElement.value.split('')

    const typedCorrectly = true
    quoteChars.forEach((char, index) => {
        const currentChar = typedChars[index]
        if (currentChar == undefined) {
            quoteChars[index].classList.remove('correct')
            quoteChars[index].classList.remove('incorrect')
            typedCorrectly = false
        }
        else if (currentChar == char.innerText) {
            quoteChars[index].classList.add('correct')
            quoteChars[index].classList.remove('incorrect')
        } else {
            quoteChars[index].classList.add('incorrect')
            quoteChars[index].classList.remove('correct')
            typedCorrectly = false
        }
    })

    if (typedCorrectly) {
        fetchQuote()
    }
})

function generateQuote() {
    return fetch(RANDOM_QUOTE_URL)
        .then(response => response.json())
        .then(data => data)
}

async function fetchQuote() {
    const quote = await generateQuote()
    const random = Math.floor(Math.random() * 1000) + 1
    quoteTextElement.innerText = ''
    quote[random].text.split('').forEach(char => {
        const charElement = document.createElement('span')
        charElement.innerText = char
        quoteTextElement.appendChild(charElement)
    });
    quoteAreaElement.value = null
    timerFunction()
}

let startTime
function timerFunction() {
    startTime = new Date()
    timer.innerText = 0
    setInterval(() => {
        timer.innerText = getTime()
    }, 1000)
}

function getTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

fetchQuote()