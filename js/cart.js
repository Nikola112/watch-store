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
    displayCartItems();
}

function displayCartItems()
{
    let itemsInCart = loadObjectFromLocalStorage("cart");

    if(itemsInCart == null || itemsInCart.length == 0)
    {
        $("#cart-items").html(`<div class="col-12 cart-top p-2">
                                    <input type="button" class="cart-clear text-antialiased" value="Clear" onclick="clearCart()" />
                                    <h2 class="text-dark text-antialiased cart-items-header">Items: 0</h2>
                                </div>

                                <div class="col-12 cart-bottom p-2">
                                    <h2 class="text-dark text-antialiased cart-items-total">Total: 0.00$</h2>
                                </div>`);
        return;
    }

    let cartItemsHtml = `<div class="col-12 cart-top p-2">
                            <input type="button" class="cart-clear text-antialiased" value="Clear" onclick="clearCart()" />
                            <h2 class="text-dark text-antialiased cart-items-header">Items: ${arraySum(itemsInCart, i => i.count)}</h2>
                        </div>`;

    for(let item of itemsInCart)
    {
        let watch = watches.find(w => w.id == item.id);
        let manufacturer = manufacturers.find(m => m.id == watch.manufacturerId);
        let type = types.find(t => t.id == watch.typeId);
        let gender = genders.find(g => g.id == watch.genderId);

        cartItemsHtml += `<div class="col-12 cart-item">
                            <div class="row">
                                <div class="col-md-2 col-xs-12 px-2 pt-2 pb-2">
                                    <img src="../img/${watch.image}" alt="${watch.name}" class="cart-img" />
                                </div>
                                <div class="col-md-4 col-xs-12 px-2 pt-2">
                                    <div class="text-dark cart-name-text pb-3">Name: ${watch.name}</div>
                                    <div class="text-dark cart-text">Manufacturer: ${manufacturer.name}</div>
                                    <div class="text-dark cart-text">Type: ${type.name}</div>
                                    <div class="text-dark cart-text pb-3">Gender: ${gender.name}</div>
                                    <div class="text-dark cart-price-text pb-2">Price per item: ${watch.price} $</div>
                                </div>
                                <div class="col-md-3 col-xs-12 px-2 pt-2 cart-total-container">
                                    <span class="text-dark pb-2 cart-total-text">Total: ${watch.price * item.count} $</span>
                                </div>
                                <div class="col-md-3 col-xs-12 px-2 py-2 cart-item-controls">
                                    <input type="button" class="cart-remove-button text-antialiased" value="Remove" onclick="removeItem(${item.id})" />
                                    <div class="cart-controls-middle">
                                        <input type="button" class="cart-control-button text-antialiased" value="-" onclick="deleteItem(${item.id})" />
                                        <div class="cart-item-count">${item.count}</div>
                                        <input type="button" class="cart-control-button text-antialiased" value="+" onclick="addItem(${item.id})" />
                                    </div>
                                </div>
                            </div>
                        </div>`;
    }

    cartItemsHtml += `<div class="col-12 cart-bottom p-2">
                        <h2 class="text-dark text-antialiased cart-items-total">Total: ${calculateTotalPrice(itemsInCart)}.00 $</h2>
                    </div>`;

    $("#cart-items").html(cartItemsHtml);
}

function calculateTotalPrice(items)
{
    return arraySum(items, i => i.count * watches.find(w => w.id == i.id).price);
}

function clearCart()
{
    localStorage.removeItem("cart");
    displayCartItems();
}

function removeItem(id)
{
    let itemsInCart = loadObjectFromLocalStorage("cart");

    if(itemsInCart == null) return;

    itemsInCart = itemsInCart.filter(i => i.id != id);

    saveObjectToLocalStorage("cart", itemsInCart);

    displayCartItems();
}

function addItem(id)
{
    let itemsInCart = loadObjectFromLocalStorage("cart");

    if(itemsInCart == null) return;

    let item = itemsInCart.find(i => i.id == id);

    item.count += 1;

    saveObjectToLocalStorage("cart", itemsInCart);
    
    displayCartItems();
}

function deleteItem(id)
{
    let itemsInCart = loadObjectFromLocalStorage("cart");

    if(itemsInCart == null) return;

    let item = itemsInCart.find(i => i.id == id);

    item.count -= 1;

    if(item.count < 0)
    {
        itemsInCart = itemsInCart.filter(i => i.id != id);
    }

    saveObjectToLocalStorage("cart", itemsInCart);
    
    displayCartItems();
}

function arraySum(arr, f)
{
    if(arr == null) return 0;

    let _sum = 0;

    for(let m of arr)
    {
        _sum += f(m);
    }

    return _sum;
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