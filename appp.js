
// Budget Controller

var budgetController = (function () {
    
    var expense = function (id, description, value) {
        this.id = id,
        this.description = description,
        this.value = value
    };

    var income = function (id, description, value) {
        this.id = id,
        this.description = description,
        this.value = value
    };

    var data = {
        allitems: {
            exp:[],
            inc:[]
        },

        totals:{
            exp: 0,
            inc: 0
        }
    };

    return {

        additem: function (type, des, val) {

            var newitem, ID;
            // create new id

            if(data.allitems[type].length >0){
                ID = data.allitems[type][data.allitems[type].length-1].id + 1;
            }else{
                ID = 0;
            }

            // create new item base on 'inc' and 'exp'
            if(type === 'exp'){
                newitem = new expense(ID, des, val);
            }else if(type === 'inc'){
                newitem = new income(ID, des, val);
            }

            // push it into data structure
            data.allitems[type].push(newitem);

            // return the new element
            return newitem;
        },

        testing: function () {
            console.log(data);
        }
    };


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

        var input, newitem;

        // 1. get the field of input data
        input = UICtrl.getinput();
        console.log(input);

        // 2. add the item to the budget controller
        newitem = budgetController.additem(input.type, input.description, input.value);
    };

    return {
        init: function () {
            console.log('Application Started')
            setupEventListener();
        }
    };





})(budgetController, UIController);

controller.init();