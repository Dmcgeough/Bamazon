//require npm packages
//configure mysql
//connect to mysql
    //inquire about choices or if you want to quit
        //remember choices

    //run selected function according to choices
        //return data

    // return to menu

var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon_DB"
});
connection.connect(function (err) {
    if (err) throw err;
    
function chooseOptions() {
    inquirer.prompt({
            name: "product_id",
            type: "input",
            message: "What would you like to do?",
            choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }).then(function (answers) {
        console.log(answers)
                });
   
}});

 chooseOptions();


if (answers=answers[0]){
    
}











 function endConnection(){
    connection.end();
}