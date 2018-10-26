//NPM 

var Table = require('cli-table');
var mysql = require('mysql');
var inquirer = require('inquirer');

//Connect to SQL database

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazonDB"
});

connection.query('SELECT * FROM products', function (error, results, fields) {
  if (error) throw error;
  for (var i = 0; i < results.length; i++) {
    console.log(results[i].product_name);
  }
    startPrompt();
});

//function to start for message

function startPrompt() {

    inquirer.prompt([{

        type: "confirm",
        name: "confirm",
        message: "Welcome  would  you like to buy product?",
        default: true

    }]).then(function(user) {
        if (user.confirm === true) {
          goods();
        } else {
            console.log("Thank you! Hope to see you next time!");
        }
    });
}

//Function

function goods() {

    var table = new Table({
        head: ['ID', 'Item', 'Department', 'Price', 'Stock'],
        colWidths: [5, 10, 10, 10, 10]
    });

    listgoods();

    function listgoods() {

        connection.query("SELECT * FROM products", function(err, res) {
            for (var i = 0; i < res.length; i++) {

                var itemId = res[i].item_id,
                    productName = res[i].product_name,
                    departmentName = res[i].department_name,
                    price = res[i].price,
                    stockQuantity = res[i].stock_quantity;

              table.push(
                  [itemId, productName, departmentName, price, stockQuantity]
            );
          }
            console.log(table.toString());
            log();
        });
    }
}

function log() {

    inquirer.prompt([{

        type: "confirm",
        name: "continue",
        message: "Would you like to buy product ?",
        default: true

    }]).then(function(user) {
        if (user.continue === true) {
            userSelection();
        } else {
            console.log("Thank you! Hope to see you next time!");
        }
    });
}
//function
function userSelection() {

    inquirer.prompt([{

            type: "input",
            name: "inputId",
            message: "Please enter the ID number of the item you would like to purchase.",
        },
        {
            type: "input",
            name: "inputNumber",
            message: "How many units of this item would you like to purchase?",

        }
    ]).then(function(bigBuy) {


        connection.query("SELECT * FROM products WHERE item_id=?", bigBuy.inputId, function(err, res) {
            for (var i = 0; i < res.length; i++) {

                if (bigBuy.inputNumber > res[i].stock_quantity) {

                    console.log(" Not enough in stock. Please try again later.");
                    
                    startPrompt();

                } else {
                    //list item information .
                  
                    console.log("We have your order  .")
                    console.log("Item: " + res[i].product_name);
                    console.log("Department: " + res[i].department_name);
                    console.log("Price: " + res[i].price);
                    console.log("Quantity: " + bigBuy.inputNumber);
                    console.log("Total: " + res[i].price * bigBuy.inputNumber);

                    var newStock = (res[i].stock_quantity - bigBuy.inputNumber);
                    var purchaseId = (bigBuy.inputId);
                    displayUser(newStock, purchaseId);
                }
            }
        });
    });
}

//Purchase

function displayUser(newStock, purchaseId) {

    inquirer.prompt([{

        type: "confirm",
        name: "confirmPurchase",
        message: "Please make sure if you like to buy this prduct ?",
        default: true

    }]).then(function(userConfirm) {
        if (userConfirm.confirmPurchase === true) {

            connection.query("UPDATE products SET ? WHERE ?", [{
                stock_quantity: newStock
            }, {
                item_id: purchaseId
            }], function(err, res) {});

        
            console.log("Purcahse completed. Thank you.");
            
            startPrompt();
        } else {
            console.log("Hope to see you next time");
      
            startPrompt();
        }
    });
}
