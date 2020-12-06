
class Renderer {

    constructor() {
        this.source = $('#city-template').html();
        this.template = Handlebars.compile(this.source);
        this.results = $('#cities')
    }

    renderCity(city) {
        const newHTML = this.template(city);
        this.results.append(newHTML);
    }

    renderAllCities(cities) {
        this.results.empty()
        for (let i = cities.length - 1; i >= 0; i--) {
            this.renderCity(cities[i])
        }
    }

    renderSavedCity(element) {
        const btn = element.find('.add')
        btn.removeClass('add')
        btn.addClass('remove')
        btn.html('-')
    }

    renderDeletedCity(element) {
        const btn = element.find('.remove')
        btn.removeClass('remove')
        btn.addClass('add')
        btn.html('+')
    }

    renderUpdatedCity(element, data){
        element.find('.city-temp').text(data.city.temperature+" "+data.city.unit)
        element.find('.city-condition').text(data.city.condition),
        element.find('.city-image').attr('src', data.city.conditionPic)
    }
}