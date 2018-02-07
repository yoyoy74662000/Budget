
// Budget Controller

var budgetController = (function () {


})();

// UI Controller
var UIController = (function () {

    var DOMstring = {
        inputtype: '.add__type',
        inputdescription: '.add__description',
        inputvalue: '.add__value'
    };

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
    var DOMstring = {
        inputbtn : '.add__btn'
    };

    
    var ctrlAddItem = function () {

        // 1. get the field of input data
        var input = UICtrl.getinput();
        console.log(input);

    }
    
    document.querySelector(DOMstring.inputbtn).addEventListener('click',ctrlAddItem);



    document.addEventListener('keypress', function (event) {

        if(event.keyCode === 13 || event.which === 13){
            ctrlAddItem();
        }

    });

})(budgetController, UIController);