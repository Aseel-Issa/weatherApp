
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/weatherDB', { useNewUrlParser: true })

const Schema = mongoose.Schema

const weatherSchema = new Schema({
    city: String,
    temperature: Number,
    unit: String,
    condition: String,
    conditionPic: String
})

const Weather = mongoose.model('weather', weatherSchema)

const saveWeatherToDB = async function(weatherObj){
    const weather = new Weather(weatherObj)
    const response = await weather.save()
    return response
}

const getAllWeatherItems = async function(){
    let data = await Weather.find({})
    return data
}

// const deleteWeatherItemById = function(id){
//     Weather.findByIdAndRemove(id, function (error, result) {
//         if (error) {
//             return error
//           } else {
//             return result
//           }
//     })
// }

const deleteWeatherItemByCityName = function(name){
    
    Weather.findOneAndDelete({city: name}, function (error, result) {
        if (error) {
            console.log(error)
          } else {
             console.log(result)
          }
    })
}

const emptyDB = function(){
    
    Weather.deleteMany({}, function (error) {
        if (error) {
            console.log(error)
          } else {
            console.log("Database is empty now!")
          }
    })
}

module.exports = {
    saveWeatherToDB,
    getAllWeatherItems,
    deleteWeatherItemByCityName,
    emptyDB
}
