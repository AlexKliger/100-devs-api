const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000

app.use(cors())
app.use(express.json())

const pokemonCaught = {
    'pikachu': {
        numberCaught: 12,
        type: 'electric'
    },
    'bulbasaur': {
        numberCaught: 5,
        type: 'grass/poison'
    },
    'snorlax': {
        numberCaught: 1,
        type: 'normal'
    },
    'undocumented pokemon': {
        numberCaught: null,
        type: '???'
    }
}
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api/:name',(req, res)=>{
    const pokemonName = req.params.name.toLowerCase()
    pokemonCaught[pokemonName] ? res.json(pokemonCaught[pokemonName]) : res.json(pokemonCaught['undocumented pokemon'])
})

app.delete('/api/:name', (req, res) => {
    const pokemonName = req.params.name.toLowerCase()
    delete pokemonCaught[pokemonName]
    res.json(pokemonCaught)
})

app.post('/api/:name', (req, res) => {
    const pokemonName = req.params.name.toLowerCase()
    const aPokemon = pokemonCaught[pokemonName]
    if (aPokemon) {
        pokemonCaught[pokemonName].numberCaught++
    } else {
        pokemonCaught[pokemonName] = {numberCaught: 1, type: req.body.type || 'not provided'}
    }
    res.json(pokemonCaught[pokemonName])
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`The server is now running on port ${PORT}! Betta Go Catch It!`)
})