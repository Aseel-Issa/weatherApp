
const express = require('express')
const router = express.Router()
const axios = require('axios')
const db = require('../database/dbManager.js')
const key = "ab6e95edbd377ee1c1eef4009eea79fb"

router.get('/sanity', function (request, response) {
    console.log("Ok!")
    response.send('Ok!')
})

router.post('/weather', async function (request, response) {
    const weather = request.body
    // const result = await db.saveWeatherToDB(weather)
    // response.send(result)

    const result = db.saveWeatherToDB(weather)
    result.then((data)=>{response.send(data)})
        .catch((data)=>{
            response.status(400).send({
                message: 'Object was not saved correctl!'
             })
            })
})

router.get('/weather', async function (request, response) {
    const results = await db.getAllWeatherItems()
    response.send(results)
})

// router.delete('/weather/:id', function (request, response) {
//     const results = db.deleteWeatherItemById(request.params.id)
//     response.send(results)
// })

router.delete('/weather/:cityName', function (request, response) {
  //  console.log('reached the server...')
    const results = db.deleteWeatherItemByCityName(request.params.cityName)
    response.send(results)
})

router.delete('/weather/emptyDB', function (request, response) {
    const results = db.emptyDB()
    response.send(results)
})

router.get('/weather/externalAPI/:cityName', async function (request, response) {
    try {
        const results = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${request.params.cityName}&appid=${key}`)
        const weather = {
            city: results.data.name +", "+results.data.sys.country,
            temperature: results.data.main.temp,
            unit: "F",
            condition: results.data.weather[0].main,
            conditionPic: `http://openweathermap.org/img/wn/${results.data.weather[0].icon}@2x.png`
        }
        console.log(weather)
        response.send(weather)
    } catch (error) {
        response.send(error)
    }
})

module.exports = router