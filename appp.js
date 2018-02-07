
// Budget Controller

var budgetController = (function () {


})();

// UI Controller
var UIController = (function () {

    var DOMstring = {
        inputtype: '.add__type',
        inputdescription: '.add__description',
        inputvalue: '.add__value',
        inputBtn: '.add__btn'
    };

    return {
        getinput: function () {
            return {

                type: document.querySelector(DOMstring.inputtype).value,
                description: document.querySelector(DOMstring.inputdescription).value,
                value: document.querySelector(DOMstring.inputvalue).value
            };
        },

        getDOMstrings: function(){
            return DOMstring;
        }
    };


})();


// Global app controller
var controller = (function(budgetCtrl, UICtrl){

    var setupEventListener = function () {

    var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click',ctrlAddItem);

        document.addEventListener('keypress', function (event) {

            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }

        });

    };



    var ctrlAddItem = function () {

        // 1. get the field of input data
        var input = UICtrl.getinput();
        console.log(input);

    };

    return {
        init: function () {
            console.log('Application Started')
            setupEventListener();
        }
    };





})(budgetController, UIController);

controller.init();