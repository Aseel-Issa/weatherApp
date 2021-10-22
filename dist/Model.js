

class Model{

    constructor(){
        this.cities = []
    }

    async loadCities(){
        let data = await $.get(`http://localhost:3000/weather`)
        data.forEach(element => {
            this.cities.push(new City(element, true))
        });
        return this.cities
    }

    getCities(){
        return this.cities
    }

    async getCityWeather(cityName){
        let city
        console.log('before API call')
        let data = await $.get(`http://localhost:3000/weather/externalAPI/${cityName}`)
        city = new City(data, false)
        this.cities.push(city);
         return {cities: this.cities, city: city}
    }

    async saveCity(data){
        // $.post(`http://localhost:3000/weather`, data, (data) => {
        //     if (data!== 'Object was not saved correctly')
        //         console.log('City is saved to database')
        //  })

         $.ajax({
            type: "POST",
            url: `http://localhost:3000/weather`,
            dataType: 'json',
            data: data,
            success: function(response) {
                console.log('City is saved to database')
                console.log(response);
            },
            error: function(response) {
                console.log(response);
            }
          });
    }

    async removeCity(cityName){
         $.ajax({
            url: `http://localhost:3000/weather/${cityName}`,
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