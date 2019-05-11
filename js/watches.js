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
    loadLocalStorage();
    renderItems(watches);
}

function loadLocalStorage()
{
    let _filters = loadObjectFromLocalStorage("filters");

    if(_filters != null)
    {
        loadFilters(_filters);

        localStorage.removeItem("filters");
    }
}

function renderItems(_watches)
{
    let watchesHtml = "";

    for(let watch of _watches)
    {
        let manufacturer = manufacturers.find(m => m.id == watch.manufacturerId);

        watchesHtml += `<div class="col-lg-3 col-md-6 col-xs-12 p-2">
                            <div class="category p-2">
                                <img src="../img/${watch.image}" class="img-fluid mx-auto d-block" alt="${watch.name}" />
                                <span class="text-uppercase text-dark d-block text-center py-2">${manufacturer.name} ${watch.name}</span>
                                <span class="text-uppercase price text-dark d-block text-center pb-3 pt-1">${watch.price}$</span>
                                <input type="button" class="add-to-cart-button" value="Add to cart" />
                            </div>
                        </div>`;
    }

    $("#watch-items").html(watchesHtml);
}

function loadFilters(_filters)
{

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

function loadObjectFromLocalStorage(key)
{
    return JSON.parse(localStorage.getItem(key));
}

function saveObjectToLocalStorage(key, object)
{
    localStorage.setItem(key, JSON.stringify(object));
}