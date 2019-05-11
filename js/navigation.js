function openWatchesFromIndex(reference)
{
    navigateToWatchesWithReference(reference, "content/watches.html")
}

function openWatches(reference)
{
    navigateToWatchesWithReference(reference, "watches.html")
}

function navigateToWatchesWithReference(reference, path)
{
    let filters = {
        gender: [],
        types: [],
        manufacturers: []
    };
    
    filters[reference.type].push(reference.referenceId);

    saveObjectToLocalStorage("filters", filters);

    window.location.href = path;
}

function navigateToMensWatches(location)
{
    let filters = {
        gender: [1],
        types: [],
        manufacturers: []
    };

    saveObjectToLocalStorage("filters", filters);

    window.location.href = location;
}

function navigateToLadiesWatches(location)
{
    let filters = {
        gender: [0],
        types: [],
        manufacturers: []
    };

    saveObjectToLocalStorage("filters", filters);

    window.location.href = location;
}

function navigateToDesignerWatches(location)
{
    let filters = {
        gender: [],
        types: [1],
        manufacturers: []
    };

    saveObjectToLocalStorage("filters", filters);

    window.location.href = location;
}

function navigateToLuxuryWatches(location)
{
    let filters = {
        gender: [],
        types: [0],
        manufacturers: []
    };

    saveObjectToLocalStorage("filters", filters);

    window.location.href = location;
}

function navigateToWatchesWithBrandFromIndex(brandId)
{
    let filters = {
        gender: [],
        types: [],
        manufacturers: [brandId]
    };

    saveObjectToLocalStorage("filters", filters);

    window.location.href = "content/watches.html";
}

function navigateToWatchesWithBrand(brandId)
{
    let filters = {
        gender: [],
        types: [],
        manufacturers: [brandId]
    };

    saveObjectToLocalStorage("filters", filters);

    window.location.href = "watches.html";
}

function saveObjectToLocalStorage(key, object)
{
    localStorage.setItem(key, JSON.stringify(object));
}
