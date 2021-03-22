const express = require("express")
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb+srv://abhey1996:abhey1996@cluster1.vfp1y.mongodb.net/songRecorder?retryWrites=true&w=majority', {
    useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true
}, () => {
    console.log("db connected")
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    const shortUrl = await ShortUrl.find()
    res.render('index', { shortUrl: shortUrl })
})

app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl })
    res.redirect('/')
})

app.get('/:shorturl', async (req, res) => {
    const url = await ShortUrl.findOne({ short: req.params.shorturl })

    if (url == null) return res.sendStatus(404)

    url.click++
    await url.save()

    res.redirect(url.full)
})

app.listen(3000, () => {
    console.log("app running")
})