var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("console.table");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_db"
});
var total;
var time = "first";
connection.connect(function (err) {
    if (err) throw err;
    selectAll();
    
});
function selectAll() {
    connection.query("SELECT * FROM products", function (error, results, fields) {
        if (error) throw error;
        console.table(results);
        if(time === "first") {
            buyProducts(results);
            time = "notFirst";
        } else {
            endConnection();
        }
    });
}
function deductQuantity(qty, itm) {
    connection.query("UPDATE products SET stock_quantity='" 
        + qty + "' WHERE item_id='" + itm + "'", function (error, results) {});
    selectAll();
}
function totalPrice(product_id, quantity, data){
    for(i = 0; i < data.length; i ++) {
        if(data[i].item_id == product_id) {
            var stock = data[i].stock_quantity;
            if(data[i].stock_quantity > quantity) {
                var total = data[i].price * quantity;
                console.log("$", total.toFixed(2));
                stock -= quantity;
                deductQuantity(stock, data[i].item_id);
            } else {
                console.log("Insufficient Quantity in Stock.");
            }
        }
    }
}
function buyProducts(data) {
    inquirer.prompt([{
            name: "product_id",
            type: "input",
            message: "Product ID of item you wish to purchase",
        },
        {
            name: "quantity",
            type: "input",
            message: "How many would you like kind sir/miss?"
        }]).then(function (answers) {

        totalPrice(answers.product_id, answers.quantity, data);        
    });
};
function endConnection(){
    connection.end();
}