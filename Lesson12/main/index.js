'use strict';

let start = document.querySelector('#start');
let cancel = document.querySelector('#cancel');
let btnPlus = document.querySelector('button');
let incomePlus = document.querySelector('.income_add');
let expensesPlus = document.querySelector('.expenses_add')
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositCheck = document.querySelector('#deposit-check');
let budgetDayValue = document.querySelector('.budget_day-value');
let budgetMonthValue = document.querySelector('.budget_month-value');
let expensesMonthValue = document.querySelector('.expenses_month-value');
let accumulatedMonthValue = document.querySelector('.accumulated_month-value');
let additionalIncomeValue = document.querySelector('.additional_income-value');
let additionalExpensesValue = document.querySelector(
    '.additional_expenses-value'
);
let incomePeriodValue = document.querySelector('.income_period-value');
let targetMonthValue = document.querySelector('.target_month-value');
let targetAmount = document.querySelector('.target-amount');
let salaryAmount = document.querySelector('.salary-amount');
let incomeTitle = document.querySelector('.income-title');
let incomeAmount = document.querySelector('.income-amount');
let incomeItems = document.querySelectorAll('.income-items');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpenses = document.querySelector('.additional_expenses');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector('.period-amount');

let isNumber = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const app = function () {

  this.income = {};
  this.incomeMonth = 0;
  this.addIncome = [];
  this.expenses = {};
  this.addExpenses = [];
  this.budget = 0;
  this.budgetDay = 0;
  this.budgetMonth = 0;
  this.expensesMonth = 0;
  this.deposit = false;
  this.percentDeposit = 0;
  this.moneyDeposit = 0;
};

    app.prototype.start = function() {
      if(salaryAmount.value === ''){
        start.style.display = 'block';
     return;
      }
      this.budget = +salaryAmount.value;


      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.showResult();
      this.blocked();
    };

    app.prototype.blocked = function() {
      document.querySelectorAll('.data input[type=text]').forEach(function(item){
          item.disabled = true;
      });
      start.style.display = 'none';
      cancel.style.display = 'block';
  };

  app.prototype.reset = function () {
    this.income = {},
    this.incomeMonth = 0,
    this.addIncome = [],
    this.expenses = {},
    this.addExpenses = [],
    this.budget = 0,
    this.budgetDay = 0,
    this.budgetMonth = 0,
    this.expensesMonth = 0,
    this.deposit = false,
    this.percentDeposit = 0,
    this.moneyDeposit = 0;

    periodAmount.textContent = '1';
    incomePeriodValue.value = 1;
    periodSelect.value = 1;

    let allInputs = document.querySelectorAll('input[type=text]');
    allInputs.forEach(function(item) {
        item.value = '';
        item.disabled = false;
    });
    const _this = this;
    cancel.style.display = 'none';
    start.style.display = 'block';

    incomeItems[1].remove();
    incomeItems[2].remove();
    incomePlus.style.display = 'block';

    expensesItems[1].remove();
    expensesItems[2].remove();
    expensesPlus.style.display = 'block';
    _this.rangePeriod();
};


  app.prototype.showResult = function(){
    const _this = this;
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    incomePeriodValue.value = this.calcSavedMoney();
    periodSelect.addEventListener('change', function(){
        incomePeriodValue.value = _this.calcSavedMoney();});
};

app.prototype.addExpensesBlock = function () {
  let cloneExpensesItem = expensesItems[0].cloneNode(true);
  expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
  expensesItems = document.querySelectorAll('.expenses-items');
  if(expensesItems.length === 3){
    expensesPlus.style.display = 'none';
  }
};

app.prototype.getExpenses = function(){
  const _this = this;
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector ('.expenses-title').value;
      let cashExpenses = item.querySelector ('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== ''){
          _this.expenses[itemExpenses] = +cashExpenses;
      }
   });
  };

  app.prototype.addIncomeBlock = function(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3){
        incomePlus.style.display = 'none';
    }
};

app.prototype.getIncome = function () {
  const _this = this;
    incomeItems.forEach(function(item){
        let itemsIncome = item.querySelector ('.income-title').value;
        let itemsCash = item.querySelector ('.income-amount').value;
        if (itemsIncome !== '' && itemsCash !== ''){
            _this.income[itemsIncome] = +itemsCash;
        }
    });
};  

app.prototype.getAddExpenses = function() {
  const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim(); /*Убирает пробелы в начале и в конце*/ 
        if (item !== ''){
            _this.addExpenses.push(item);
        }
    }); 
};

app.prototype.getAddIncome = function(){
  const _this = this;
  additionalIncomeItem.forEach(function(item){
      let itemValue = item.value.trim();
      if (itemValue !== ''){
          _this.addIncome.push(itemValue); 
      }
  });
};
  
app.prototype.getExpensesMonth = function() {
      let sumExpenses = 0;
      for (let key in this.expenses) {
          sumExpenses += this.expenses[key];
      }
      this.expensesMonth = +sumExpenses;
    };

    app.prototype.getBudget = function () {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = (this.budgetMonth/30);
  };

    app.prototype.getTargetMonth = function () {
      return targetAmount.value/this.budgetMonth;    
    };

    
    app.prototype.calcSavedMoney = function () {
      return this.budgetMonth * periodSelect.value;
   };
   
   app.prototype.rangePeriod = function () {
  
    periodAmount.textContent = periodSelect.value;
}; 

app.prototype.eventListener = function () {
  start.addEventListener('click', appData.start.bind(appData));
  expensesPlus.addEventListener ('click', appData.addExpensesBlock);
  incomePlus.addEventListener ('click', appData.addIncomeBlock);
  periodSelect.addEventListener('input', function() {
  appData.rangePeriod();
  incomePeriodValue.value = appData.calcSavedMoney();
});
  cancel.addEventListener('click', app.prototype.reset);

};

const appData = new app();
app.prototype.eventListener();
