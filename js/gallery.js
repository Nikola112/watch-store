$(function()
{
    initialize();
});

function initialize()
{
    loadWatches(function(watches)
    {
        let imagesHtml = "";

        for(let watch of watches)
        {
            imagesHtml += `<div class="col-xs-12 col-md-6 col-lg-3 p-1 pb-3">
                                <div class="gallery-item p-1">
                                    <img src="../img/${watch.image}" alt="${watch.name}" class="img-fluid" />
                                </div>
                            </div>`;
        }

        $("#image-gallery").html(imagesHtml);
    });
}

function loadWatches(callback)
{
    loadJson("../data/watches.json", callback);
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