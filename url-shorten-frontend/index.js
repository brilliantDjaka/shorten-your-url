// install express with `npm install express` 
const express = require('express')
const { Deta } = require('deta');

const deta = Deta(); 
const app = express()

//static
app.get('/favicon.ico', (_req, res) => res.sendFile(__dirname+'/public/favicon.ico'))
app.get('/200.html', (_req, res) => res.sendFile(__dirname+'/public/200.html'))
app.get('/.nojekyll', (_req, res) => res.sendFile(__dirname+'/public/.nojekyll'))

app.get('/', (_req, res) => res.sendFile(__dirname+'/index.html'))
app.get('/:id', async (req, res) => {
    const { id } = req.params;

    //get url
    const urlDB = deta.Base('urls');
    try {
        const url = await urlDB.get(id);
        return res.redirect(url.value);
    } catch (_error) {
        // if error, then return 404 not found
        return res.sendStatus(404);
    }
})

app.use('/_nuxt',express.static('_nuxt'))

// export 'app'
module.exports = app