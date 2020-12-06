

class Model{

    constructor(){
        this.cities = []
    }

    async loadCities(){
       await $.get(`weather`, (data) => {
            data.forEach(element => {
                this.cities.push(new City(element, true))
            });
         })
        return this.cities
    }

    getCities(){
        return this.cities
    }

    async getCityWeather(cityName){
        let city
        await $.get(`weather/externalAPI/${cityName}`, (data) => {
            city = new City(data, false)
            this.cities.push(city);
         })
         return {cities: this.cities, city: city}
    }

    async saveCity(data){
        $.post(`weather`, data, (data) => {
            console.log('City is saved to database')
         })
    }

    async removeCity(cityName){
         $.ajax({
            url: `weather/${cityName}`,
            type: 'DELETE',
            dataType: 'json',
            success: function(response) {
                console.log('City is removed from database')
                console.log(response);
            },
            error: function(response) {
                console.log(response);
            }
        })
         
    }
}