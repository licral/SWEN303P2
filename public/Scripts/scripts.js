/**
 * User Functions
 */
function db_User_AddItemToFavourite(){
    alert(new Date().toTimeString());//new Date().toTimeString()
}

function db_User_RemoveItemFromFavourite(item){

}

function db_User_GetPreviousPurchases(username) {

}

/**
 * Buy Functions
 */
function db_Buy_AddItemToCart(item){

}

function db_Buy_RemoveItemFromCart(item){

}

function db_Buy_AddReview(item) {

}

function db_Buy_GetReviews(item){

}

/**
 * Sell Functions
 */
function db_Sell_AddItemToCatalog(title, description, price, image, user, stock, category){
    "item" : {
        "title" : title,
            "description" : description,
            "price" : price,
            "image" : image,
            "user" : user,
            "stock" : stock,
            "category" : category};
    }
}

function db_Sell_EditItemInCatalog(item){

}

function db_Sell_RemoveItemFromCatalog(item){

}

function db_Sell_ViewStatistics(){

}