// this requires the needed packages and files

var inquirer = require("inquirer");
var mysql = require("mysql");
var fs = require("fs");

// connecting to the mysql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Norman12",
  database: "bamazon_db"
});


connection.connect(function (err) {

});

// call function that initializes program
start();

// function that initializes program
function start() {
  inquirer
  .prompt([
    {
      name: "type",
      type: "list",
      choices: ["Customer","Manager","Supervisor"],
      message: "Who are you user?"
  }
  ])
  .then(function (answer) {
  purchase();
  }
)
};



// function that allows orders to be placed

function purchase() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;

    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What product would you like to buy?"
        },
        {
          name: "buy",
          type: "input",
          message: "How many would you like to buy?"
        }
      ])
      .then(function (answer) {
        // get the information of the chosen item
        var chosenProduct;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenProduct = results[i];
          }
        }
       
        if (chosenProduct.stock_quantity >= parseInt(answer.buy)) {
          // quantity ordered is available, so update db, let the user know
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: chosenProduct.stock_quantity-answer.buy
              },
              {
                item_id: chosenProduct.id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("purchase complete product quantity updated");
              var cost = parseFloat(answer.buy * chosenProduct.price).toFixed(2);
              console.log("Your total purchase cost is  $" + cost);
              // start process over
              start();
            }
          );
        }
        else {
          // not enough product to fulfill order
          console.log("Available quantity too low. Choose another quantity or product");
          // start process over
          start();
        }

      });
  });
}
