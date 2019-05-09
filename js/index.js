$(function() 
{
    initialize();
});

let watches;
let watchesLoaded = false;
let featuredWatches;
let featuredWatchesLoaded = false;

function initialize()
{
    loadFeaturedItems();
}

function loadFeaturedItems()
{
    loadFeatured(function(data)
    {
        featuredWatches = data;
        featuredWatchesLoaded = true;

        if(watchesLoaded == true)
        {
            onFeaturedWatchesLoaded();
        }
    });

    loadWatches(function(data)
    {
        watches = data;
        watchesLoaded = true;

        if(featuredWatchesLoaded == true)
        {
            onFeaturedWatchesLoaded();
        }
    });
}

function onFeaturedWatchesLoaded()
{
    let featuredHtml = "";

    for(let featured of featuredWatches)
    {
        let watch = watches.find(w => w.id == featured.watchId);

        featuredHtml += `<div class="col-lg-3 col-md-6 col-xs-12 p-2">
                            <div class="category p-2">
                                <img src="img/${watch.image}" class="img-fluid mx-auto d-block" alt="${featured.name}" />
                                <span class="text-uppercase text-dark d-block text-center py-1">${featured.name}</span>
                            </div>
                        </div>`;
    }

    $("#featured-categories").html(featuredHtml);
}

function loadFeatured(callback)
{
    loadJson("data/featured.json", callback);
}

function loadWatches(callback)
{
    loadJson("data/watches.json", callback);
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