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

let sort = 0;

let filters = {
    gender: [],
    types: [],
    manufacturers: []
};

function initialize()
{
    subscribeToEvents();

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

function subscribeToEvents()
{
    $("#sort-box").on("change", onSortBoxValueChanged)
}

function onSortBoxValueChanged()
{
    sort = this.value;
    displayWatches();
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
    displayWatches();
    renderFilters();
}

function loadLocalStorage()
{
    let _filters = loadObjectFromLocalStorage("filters");

    if(_filters != null)
    {
        filters = _filters;

        localStorage.removeItem("filters");
    }
}

function displayWatches()
{
    let _watches = cloneArray(watches);
    _watches = filterWatches(_watches);
    _watches = sortWatches(_watches);
    renderWatches(_watches);
}

function renderFilters()
{
    let filtersHtml = `<h2 class="text-center text-dark filter-header py-2 mb-0">Filters</h2>`;

    filtersHtml = renderTypes(filtersHtml);
    filtersHtml = renderManufacturers(filtersHtml);
    filtersHtml = renderGender(filtersHtml);

    $("#filters").html(filtersHtml);
}

function renderManufacturers(filtersHtml)
{
    let manufacturersHtml = `${filtersHtml}<div class="px-2 py-3"><h3 class="text-dark pb-2 filter-headers">Manufacturers</h3>`;

    for(let m of manufacturers)
    {
        manufacturersHtml += `<label class="text-dark pl-3 d-block">
                                 <input type="checkbox" class="filter-checkbox" onchange="manufacturerCheckboxChanged(${m.id}, checked)" ${filters.manufacturers.includes(m.id) ? "checked" : ""} />
                                 ${m.name} (${watches.filter(w => w.manufacturerId == m.id).length})
                             </label>`;
    }

    manufacturersHtml += `</div>`;
    return manufacturersHtml;
}

function manufacturerCheckboxChanged(mId, value)
{
    value ? filters.manufacturers.push(mId) : filters.manufacturers = filters.manufacturers.filter(f => f != mId);
    displayWatches();
}

function renderTypes(filtersHtml)
{
    let typesHtml = `${filtersHtml}<div class="px-2 py-3"><h3 class="text-dark pb-2 filter-headers">Types</h3>`;

    for(let m of types)
    {
        typesHtml += `<label class="text-dark pl-3 d-block">
                                 <input type="checkbox" class="filter-checkbox" onchange="typeCheckboxChanged(${m.id}, checked)" ${filters.types.includes(m.id) ? "checked" : ""} />
                                 ${m.name} (${watches.filter(w => w.typeId == m.id).length})
                             </label>`;
    }

    typesHtml += `</div>`;
    return typesHtml;
}

function typeCheckboxChanged(mId, value)
{
    value ? filters.types.push(mId) : filters.types = filters.types.filter(f => f != mId);
    displayWatches();
}

function renderGender(filtersHtml)
{
    let genderHtml = `${filtersHtml}<div class="px-2 py-3"><h3 class="text-dark pb-2 filter-headers">Gender</h3>`;

    for(let m of genders)
    {
        genderHtml += `<label class="text-dark pl-3 d-block">
                                 <input type="checkbox" class="filter-checkbox" onchange="genderCheckboxChanged(${m.id}, checked)" ${filters.gender.includes(m.id) ? "checked" : ""} />
                                 ${m.name} Watches (${watches.filter(w => w.genderId == m.id).length})
                             </label>`;
    }

    genderHtml += `</div>`;
    return genderHtml;
}

function genderCheckboxChanged(mId, value)
{
    value ? filters.gender.push(mId) : filters.gender = filters.gender.filter(f => f != mId);
    displayWatches();
}

// function arraySum(arr, f)
// {
//     let _sum = 0;

//     for(let m of arr)
//     {
//         _sum += f(m);
//     }

//     return _sum;
// }

function cloneArray(arr)
{
    return arr.slice(0);
}

function filterWatches(_watches)
{
    let w = filterByManufacturer(_watches);
    w = filterByGender(w);
    w = filterByType(w);

    return w;
}

function filterByManufacturer(_watches)
{
    if(filters.manufacturers.length > 0)
    {
        return _watches.filter(w => filters.manufacturers.includes(w.manufacturerId));
    }

    return _watches;
}

function filterByGender(_watches)
{
    if(filters.gender.length > 0)
    {
        return _watches.filter(w => filters.gender.includes(w.genderId));
    }

    return _watches;
}

function filterByType(_watches)
{
    if(filters.types.length > 0)
    {
        return _watches.filter(w => filters.types.includes(w.typeId));
    }

    return _watches;
}

function sortWatches(_watches)
{
    if(sort == 1)
    {
        return _watches.sort((a, b) => 
        {
            let aFullName = manufacturers.find(m => m.id == a.manufacturerId).name + " " + a.name;
            let bFullName = manufacturers.find(m => m.id == b.manufacturerId).name + " " + b.name;
            return aFullName.localeCompare(bFullName)
        });
    }
    else if(sort == 2)
    {
        return _watches.sort((a, b) => 
        {
            let aFullName = manufacturers.find(m => m.id == a.manufacturerId).name + " " + a.name;
            let bFullName = manufacturers.find(m => m.id == b.manufacturerId).name + " " + b.name;
            return -aFullName.localeCompare(bFullName)
        });
    }
    else if(sort == 3)
    {
        return _watches.sort((a, b) => a.price - b.price);
    }
    else if(sort == 4)
    {
        return _watches.sort((a, b) => b.price - a.price);
    }

    return _watches;
}

function renderWatches(_watches)
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