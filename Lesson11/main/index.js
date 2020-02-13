'use strict';

let getAccount = document.getElementById('start');
let incomeAdd = document.getElementsByTagName('button')[0];
let expensesAdd = document.getElementsByTagName('button')[1];
let getDeposit = document.querySelector('#deposit-check');
let incomeBlock = document.querySelectorAll('additional_income-item');

let budgetMonth = document.querySelector('.budget_month-value');
let budgetDay = document.querySelector('.budget_day-value');

let expensesMonth = document.querySelector('.expenses_month-value');
let addIncome = document.querySelector('.additional_income-value');
let addExpenses = document.querySelector('.additional_expenses-value');
let incomePeriod = document.querySelector('.income_period-value');
let targetMonth = document.querySelector('.target_month-value');

let MonthAmount = document.querySelector('.salary-amount'); // Месячный доход
let incomeTitle = document.querySelector('.income-title');   // Наименование дохода
let incomeItems = document.querySelectorAll('.income-items'); // Сумма дохода

let expensesTitle = document.querySelector('.expenses-title'); // Наименование расходов
let expensesItems = document.querySelectorAll('.expenses-items');
let addExpensesField = document.querySelector('.additional_expenses-item'); // Наименования возможных расходов 

let target = document.querySelector('.target-amount');  // Целевая сумма
let period = document.querySelector('.period-select');  // Время цели

let isNumber = function(n)
{
  return !isNaN(parseFloat(n)) && isFinite(n)
};


// start();

let appData = 
{
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  mission: 1000000,
  period: 12,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  // AccaumulatedMonth: 0,
  start: function()
  {
    if(MonthAmount.value === '')
    {
      alert('Ошибка! Поле "Месячный доход" должно быть заполнено!');
      return;
    }
    appData.budget = MonthAmount.value;
    appData.getExpenses();
    // console.log(appData.income);
    appData.getExpensesMonth();
    appData.getBudget();
  },
  addIncomeBlock: function()
  {
    let cloneIncomeItems = incomeItems[0].cloneNode(true);
    incomeItems[0].parentNode.insertBefore(cloneIncomeItems, incomeAdd);
    incomeItems = document.querySelectorAll('.income-items');
    if(incomeItems.length === 3)
    {
      incomeAdd.style.display = 'none';
    }
  },
  addExpensesBlock: function()
  {
    let cloneExpensesItems = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItems, expensesAdd);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3)
    {
      expensesAdd.style.display = 'none';
    }
  },
  getExpenses: function()
  {
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== '')
      {
        appData.expenses[itemExpenses] = cashExpenses;
      }
    });
  },
  asking: function()
  {
    if(confirm('Есть ли у вас дополнительный заработок?'))
    {
      let itemIncome;
      while(!(itemIncome = prompt('Какой у вас дополнительный заработок?')));
      let cashIncome;
      do
      {
        cashIncome = prompt('Сколько вы зарабатываете?');
      }while(!isNumber(cashIncome))

      appData.income[itemIncome] = cashIncome;

    }
    let addExpenses;
    while(!(addExpenses = prompt('Перечислите возможные расходы на период через запятую')));
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    let arr1 = appData.addExpenses.map(item => item.trim());
    let arr2 = arr1.map(item => item[0].toUpperCase() + item.substring(1)).join(', ');
    // console.log(arr2);
    appData.addExpenses = arr2;

    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    if(appData.deposit == true)
    {
      appData.getInfoDeposit();
    }
  },
  getExpensesMonth: function()             // сумма расходов
  {
    let sum = 0;
    for (let key in appData.expenses)
    {
      sum += appData.expenses[key];
    }
    appData.expensesMonth = sum;
    console.log('appData.expensesMonth: ' + appData.expensesMonth);
  },
  getBudget: function()
  {
    appData.budgetMonth = appData.budget - appData.expensesMonth;
    console.log('Бюджет на месяц ' + '' + appData.budgetMonth);
    appData.budgetDay = (appData.budgetMonth / 30);
    if(appData.budgetDay < 0)
    {
      console.log("Что-то пошло не так!");
    }
    else
    {
      console.log('Бюджет на день ' + '' + Math.floor(appData.budgetDay));
    }
  },
  /* комментарий по доходу */
  getStatusIncome: function()
  {
    if(appData.budgetDay > 1200)
    {
      return('У вас высокий уровень дохода!!');
    }
    else if ((appData.budgetDay > 600) && ( appData.budgetDay < 1200)) 
    {
      return('У вас средний уровень дохода!');
    } 
    else if (appData.budgetDay < 600)
    {
      return('У вас низкий уровень дохода!');
    }
    else
    {
      return('Что-то пошло не так!');
    }
  },
  getTargetMonth: function()
  {
    return appData.mission / appData.budgetMonth;
  },
  getInfoDeposit: function()
  {
    if(appData.deposit)
    {
      do
      {
        appData.persentDeposit = prompt('Какой годовой процент?', 10);
      }while(!isNumber(appData.persentDeposit))
      do
      {
        appData.moneyDeposit = prompt('Какая сумма заложена?');
      }while(!isNumber(appData.moneyDeposit));
    }
  },
  calcSaveMoney: function()
  {
    return appData.budgetMonth * appData.period;
  }
}

start.addEventListener('click', appData.start);

expensesAdd.addEventListener('click', appData.addExpensesBlock);
incomeAdd.addEventListener('click', appData.addIncomeBlock);
