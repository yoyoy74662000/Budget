
// Budget Controller

var budgetController = (function () {


})();

// UI Controller
var UIController = (function () {



})();


// Global app controller
var controller = (function(budgetCtrl, UICtrl){
    document.querySelector('.add__btn').addEventListener('click',function () {



    });

    document.addEventListener('keypress', function (event) {

        if(event.keyCode === 13 || event.which === 13){
            console.log('Enter was Pressed')
        }else{
            console.log('Other key was Pressed')

        }

    });

})(budgetController, UIController);