
// Budget Controller

var budgetController = (function () {


})();

// UI Controller
var UIController = (function () {


    return {
        getinput: function () {

            return {

                type: document.querySelector('.add__type').value,
                description: document.querySelector('.add__description').value,
                value: document.querySelector('.add__value').value

            };

        }
    };


})();


// Global app controller
var controller = (function(budgetCtrl, UICtrl){
    
    var ctrlAddItem = function () {

        // 1. get the field of input data
        var input = UICtrl.getinput();
        console.log(input);

    }
    
    document.querySelector('.add__btn').addEventListener('click',ctrlAddItem);



    document.addEventListener('keypress', function (event) {

        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }

    });

})(budgetController, UIController);