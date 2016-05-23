window.onload = function () {
    var user = getCookie("isLoggedIn");

    $(".favourite").hide();
    $(".unfavourite").hide();
    if (user != "") {
        var url = window.location.href.split("/");
        if(url[url.length-1] != "search"){
            $.post('/favourites/checkID?id=' + url[url.length-1],
                function(result){
                    if(result == "true"){
                        $(".unfavourite").show();
                    } else {
                        $(".favourite").show();
                    }
                });
        }
    }
}
function addToCart(itemID){
    var user = getCookie("isLoggedIn");
    var quantity = 1;

    if($("#quantity").val() != undefined){
        quantity = $("#quantity").val();
    }

    if (user != "") {
        $.post('/account/addItemToCart?item=' + itemID + "&quantity=" + quantity,
            function (data) {
                updateCartCount();
                $("#addedToCart").show();
            }
        );
    } else {
        alert("Register or Log In to purchase!");
    }
}
function addToFavourites(item){
    $.post('/favourites/addToFavourites?id=' + item[0] + "&title=" + item[1],
        function(data) {
            if(data == "success"){
                $(".favourite").hide();
                $(".unfavourite").show();
            }
        }
    );
}
function removeFromFavourites(item) {
    $.post('/favourites/removeFromFavourites?id=' + item[0] + "&title=" + item[1],
        function(data) {
            if(data == "success"){
                if(item[2] == "fav"){
                    location.reload();
                } else {
                    $(".unfavourite").hide();
                    $(".favourite").show();
                }
            }
        }
    );
}