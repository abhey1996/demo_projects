require('dotenv').config()
const nightmare = require('nightmare')()
const sgmail = require('@sendgrid/mail')
sgmail.setApiKey(process.env.SENDGRID_API_KEY)

const args = process.argv.slice(2)

const url = args[0]
const minPrice = args[1]

checkPrice()

async function checkPrice() {
    try {
        const priceString = await nightmare.goto(url)
            .wait('#priceblock_ourprice')
            .evaluate(() => document.getElementById('priceblock_ourprice').innerText)
            .end()

        const priceNumber = parseFloat(priceString.replace('₹', ''))

        if (priceNumber < minPrice) {
            await sendEmail(
                'Price is low',
                `the price on ${url} has dropped below ${minPrice}`
            )
            console.log("if")
        }
    } catch (error) {
        await sendEmail(
            'Amazon price checker error',
            error.message
        )
        throw error
    }
}

async function sendEmail(subject, body) {
    const email = {
        to: 'abhey1996@gmail.com',
        from: 'amazon_price_checker@testing.com',
        subject: subject,
        text: body,
        html: body
    }

    return await sgmail.send(email)
}

