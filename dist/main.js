
const model = new Model()
const renderer = new Renderer()

const searchForCity = async function () {
    const cityName = $('input').val()
    const results = await model.getCityWeather(cityName)
    renderer.renderAllCities(results.cities)
}

const addCity = async function () {
    const element = $(this).closest('.city')
    const temp = element.find('.city-temp').html().split(" ")
    const data = {
        city: element.find('.city-name').html(),
        temperature: temp[0],
        unit: temp[1],
        condition: element.find('.city-condition').html(),
        conditionPic: element.find('.city-image').attr('src')
    }

    await model.saveCity(data)

    // update after save
    renderer.renderSavedCity(element)
}

const removeCity = async function () {
    const element = $(this).closest('.city')
    const cityName = element.find('.city-name').html()

    await model.removeCity(cityName)
    renderer.renderDeletedCity(element)
}

const refreshCity = async function () {
    const element = $(this).closest('.city')
    const cityName = element.find('.city-name').html()

    const data = await model.getCityWeather(cityName)
    renderer.renderUpdatedCity(element, data.city)
}

const loadData = async function () {
    const results = await model.loadCities()
    renderer.renderAllCities(results)
}

loadData()
$('body').on('click', '.add', addCity)
$('body').on('click', '.remove', removeCity)
$('body').on('click', '.refresh', refreshCity)