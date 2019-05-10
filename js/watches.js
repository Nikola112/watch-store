$(function()
{
    initialize();
});

let watchesLoaded = false;
let manufacturersLoaded = false;
let gendersLoaded = false;
let typesLoaded = false;

let watches;
let manufacturers;
let genders;
let types;

let priceRange = {
    start: 0,
    end: 9999
};

function initialize()
{
    loadWatches(function(data)
    {
        watches = data;
        watchesLoaded = true;
        itemLoaded();
    });

    loadManufacturers(function(data)
    {
        manufacturers = data;
        manufacturersLoaded = true;
        itemLoaded();
    });

    loadGenders(function(data)
    {
        genders = data;
        gendersLoaded = true;
        itemLoaded();
    });

    loadTypes(function(data)
    {
        types = data;
        typesLoaded = true;
        itemLoaded();
    });
}

function itemLoaded()
{
    if(watchesLoaded && manufacturersLoaded && gendersLoaded && typesLoaded)
    {
        onEverithingLoaded();
    }
}

function onEverithingLoaded()
{
    getPriceRange();
    loadLocalStorage();
}

function getPriceRange()
{
    priceRange.start = getMinimumPrice(watches);
    priceRange.end = getMaximumPrice(watches);

    //updatePriceRange();
}

function loadLocalStorage()
{

}

function getMinimumPrice(_watches)
{
    let minimum = _watches[0].price;

    for(let i = 1; i < _watches.length; i++)
    {
        if(_watches[i].price < minimum)
        {
            minimum = _watches[i].price
        }
    }

    return minimum;
}

function getMaximumPrice(_watches)
{
    let maximum = _watches[0].price;

    for(let i = 1; i < _watches.length; i++)
    {
        if(_watches[i].price > maximum)
        {
            maximum = _watches[i].price
        }
    }

    return maximum;
}

function loadWatches(callback)
{
    loadJson("../data/watches.json", callback);
}

function loadGenders(callback)
{
    loadJson("../data/gender.json", callback);
}

function loadManufacturers(callback)
{
    loadJson("../data/manufacturers.json", callback);
}

function loadTypes(callback)
{
    loadJson("../data/types.json", callback);
}

function loadJson(path, successCallback)
{
    $.ajax({
        url: path,
        type: "GET",
        dataType: "json",
        success: function(data)
        {
            successCallback(data);
        }
    });
}

function filterManager(filterSettings, filterSettingsChanged)
{
    this.filterSettings = filterSettings;

    this.setMaxPrice = function(max)
    {
        this.filterSettings.maxPrice = max;
        filterSettingsChanged();
    };

    this.setMinPrice = function(min)
    {
        this.filterSettings.minPrice = min;
        filterSettingsChanged();
    }
}