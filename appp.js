
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

    var calculatetotal = function (type) {
        var sum = 0;
        data.allitems[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        allitems: {
            exp:[],
            inc:[]
        },
        totals:{
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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


        calculatebudget: function () {

            calculatetotal('inc');
            calculatetotal('exp');

            data.budget = data.totals.inc - data.totals.exp;

            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);

        },

        getbudget: function () {

            return {

                budget: data.budget,
                totalinc: data.totals.inc,
                totalexp: data.totals.exp,
                percentage: data.percentage + '%'
            }
        },

        // testing data
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
        inputBtn: '.add__btn',
        incomecontainer: '.income__list',
        expensecontainner: '.expenses__list'
    };

    return {
        getinput: function () {
            return {

                type: document.querySelector(DOMstring.inputtype).value,
                description: document.querySelector(DOMstring.inputdescription).value,
                value: parseFloat(document.querySelector(DOMstring.inputvalue).value)
            };
        },

        addlistitem: function (obj, type) {

            var html, newhtml, element;

            if(type === 'exp'){
                element = DOMstring.expensecontainner;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__percentage"></div> <div class="item__delete"> <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            else if(type === 'inc'){
                element = DOMstring.incomecontainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            //Replace the placeholder text with some actual data
            newhtml = html.replace('%id%', obj.id);
            newhtml = newhtml.replace('%description%', obj.description);
            newhtml = newhtml.replace('%value%', obj.value);

            //Insert the html into the dom
            document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);


        },
        // clean the field and focus
        clearfields: function () {

            var field, fieldarray;
            field = document.querySelectorAll(DOMstring.inputdescription + ',' + DOMstring.inputvalue);

            fieldarray = Array.prototype.slice.call(field);

            fieldarray.forEach(function (current, index, array) {
                current.value = "";
            });

            fieldarray[0].focus();
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

    var updatebudget = function () {

        // calculate budget
        budgetController.calculatebudget();

        //get budget
        var budget = budgetController.getbudget();

        //display
        console.log(budget);

    };



    var ctrlAddItem = function () {

        var input, newitem;

        // 1. get the field of input data
        input = UICtrl.getinput();
        console.log(input);

        if(input.description !== "" && !isNaN(input.value) && input.value > 0){

            // 2. add the item to the budget controller
            newitem = budgetController.additem(input.type, input.description, input.value);

            // 3. add the item to the UI
            UICtrl.addlistitem(newitem, input.type);

            // 4. clean the field
            UICtrl.clearfields();

            updatebudget();

        }


    };

    return {
        init: function () {
            console.log('Application Started');
            setupEventListener();
        }
    };





})(budgetController, UIController);

controller.init();