'use strict';

let start = document.querySelector('#start');
let cancel = document.querySelector('#cancel');
let btnPlus = document.querySelector('button');
let incomePlus = document.querySelector('.income_add');
let expensesPlus = document.querySelector('.expenses_add')
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let additionalExpensesItem = document.querySelector('.additional_expenses-item');
let depositCheck = document.querySelector('#deposit-check');
let depositBank = document.querySelector('.deposit-bank');
let depositAmount = document.querySelector('.deposit-amount');
let depositPercent = document.querySelector('.deposit-percent');
let budgetDayValue = document.querySelector('.budget_day-value');
let budgetMonthValue = document.querySelector('.budget_month-value');
let expensesMonthValue = document.querySelector('.expenses_month-value');
let accumulatedMonthValue = document.querySelector('.accumulated_month-value');
let additionalIncomeValue = document.querySelector('.additional_income-value');
let additionalExpensesValue = document.querySelector('.additional_expenses-value');
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

let isNumber = (n) => {
  return !isNaN(parseFloat(n)) && isFinite(n);
};

class app {
  constructor()
  {
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
  }

  eventListener() {
    start.addEventListener('click', this.start.bind(this));
    expensesPlus.addEventListener ('click', this.addExpensesBlock);
    incomePlus.addEventListener ('click', this.addIncomeBlock);
    periodSelect.addEventListener('input', function() {
    appData.rangePeriod();
    incomePeriodValue.value = appData.calcSavedMoney();
    });
    cancel.addEventListener('click', this.reset);
    depositCheck.addEventListener('change', this.depositHandler.bind(this));
  
  };

  addExpensesBlock () {
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3){
      expensesPlus.style.display = 'none';
    }
  };



  start() {
    if(salaryAmount.value === '')
    {
      start.style.display = 'block';
      return;
    }
    this.budget = +salaryAmount.value;

    this.getExpInc();
    this.getExpensesMonth();
    this.getAddExpenses();
    this.getAddIncome();
    this.getInfoDeposit();
    if(!isNumber(this.percentDeposit) || (this.percentDeposit > 100) || (this.percentDeposit <= 0))
    {
      alert('Введите корректный процент депозита!');
      return;
    }
    this.getBudget();
    this.showResult();
    this.blocked();
  };

  blocked() 
  {
    // document.querySelectorAll('.data input[type=text]').forEach(function(item){
    //   item.disabled = true;
    // });
    start.style.display = 'none';
    cancel.style.display = 'block';
  };

  showResult(){
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

  addIncomeBlock(){
    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
    incomeItems = document.querySelectorAll('.income-items');
    if (incomeItems.length === 3){
        incomePlus.style.display = 'none';
    }
  };

  getInfoDeposit()
  {
    if(this.deposit)
    {
      this.percentDeposit = depositPercent.value;
      this.moneyDeposit = depositAmount.value;
    }
  }
  changePercent()
  {
    const valueSelect = this.value;
    if (valueSelect === 'other')
    {
      depositPercent.style.display = 'inline-block';
    }
    else
    {
      depositPercent.style.display = 'none';
      depositPercent.value = valueSelect;
    }
  }

  depositHandler()
  {
    if(depositCheck.checked)
    {
      depositBank.style.display = 'inline-block';
      depositAmount.style.display = 'inline-block';
      this.deposit = true;
      depositBank.addEventListener('change', this.changePercent);
    }
    else {
      depositBank.style.display = 'none';
      depositAmount.style.display = 'none';
      depositBank.value = '';
      depositAmount.value = '';
      this.deposit = false;
      depositBank.removeEventListener('change', this.changePercent);
    }
  }

  getExpInc()
  {
    const count = item => {
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector (`.${startStr}-title`).value;
      const itemAmount = item.querySelector (`.${startStr}-amount`).value;
      if (itemTitle !== '' && itemAmount !== ''){
        this[startStr][itemTitle] = +itemAmount;
      }
    };

    expensesItems.forEach(count);
    incomeItems.forEach(count);

    for(const key in this.income)
    {
      this.incomeMonth += +this.income[key];
    }
  };

  getAddExpenses() 
  {
    const _this = this;
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
        item = item.trim(); /*Убирает пробелы в начале и в конце*/ 
      if (item !== ''){
        _this.addExpenses.push(item);
      }
    }); 
  };
  
  getAddIncome()
  {
    const _this = this;
    additionalIncomeItem.forEach(function(item){
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            _this.addIncome.push(itemValue); 
        }
    });
  };
    
  getExpensesMonth() 
  {
    let sumExpenses = 0;
    for (let key in this.expenses) 
    {
      sumExpenses += this.expenses[key];
    }
    this.expensesMonth = +sumExpenses;
  };
  
  getBudget() 
  {
    const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
    this.budgetDay = (this.budgetMonth/30);
  };

  getTargetMonth () 
  {
    return targetAmount.value/this.budgetMonth;    
  };

  calcSavedMoney() 
  {
    return this.budgetMonth * periodSelect.value;
  };

  rangePeriod() 
  {
    periodAmount.textContent = periodSelect.value;
  }; 
  reset() 
  {
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
    // const _this = this;
    cancel.style.display = 'none';
    start.style.display = 'block';

    if(incomeItems[2])
    {
      incomeItems[2].remove();
    }
    if(incomeItems[1])
    {
      incomeItems[1].remove();
    }
    incomePlus.style.display = 'block';

    if(expensesItems[2])
    {
      expensesItems[2].remove();
    }
    if(expensesItems[1])
    {
      expensesItems[1].remove();
    }
    expensesPlus.style.display = 'block';
    periodSelect.value = 1; 
  };
};

const appData = new app();
appData.eventListener();