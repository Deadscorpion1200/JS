'use strict';

let start = document.querySelector('#start');
let btnPlus = document.querySelector('button');
let incomePlus = document.querySelector('.income_add');
let expensesPlus = document.querySelector('.expenses_add')
let additionalIncomeItem = document.querySelectorAll('.additional_income-item');
let additionalExpensesItem = document.querySelector('.additional_expenses-item')
let depositCheck = document.querySelector('#deposit-check');
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
let incomeItem = document.querySelectorAll('.income-items');
let expensesTitle = document.querySelector('.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
let additionalExpenses = document.querySelector('.additional_expenses');
let periodSelect = document.querySelector('.period-select');
let periodAmount = document.querySelector ('.period-amount');

'use strict';

let isNumber = function(n)
{
  return !isNaN(parseFloat(n)) && isFinite(n)
};


let appData = 
{
  income: {},
  incomeMonth: 0,
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  persentDeposit: 0,
  moneyDeposit: 0,
  budget: 0,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  // AccaumulatedMonth: 0,
  start: function()
  {
    if(salaryAmount.value === '')
    {
      start.style.display = 'block';
      return;
    }

    appData.budget = salaryAmount.value;
    // console.log(salaryAmount.value);
    appData.getExpenses();
    appData.getIncome();
    appData.getExpensesMonth();
    appData.getAddIncome();
    appData.getAddExpenses();
    appData.getBudget();
    appData.showResult();
  },
  addExpensesBlock: function()
  {
    console.log(expensesItems.parentNode);
    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
    expensesItems = document.querySelectorAll('.expenses-items');
    if(expensesItems.length === 3)
    {
      expensesPlus.style.display = 'none';
    }
  },
  getExpenses: function()
  {
    expensesItems.forEach(function(item){
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if(itemExpenses !== '' && cashExpenses !== '')
      {
        appData.expenses[itemExpenses] = +cashExpenses;
      }
    });
  },
  getIncome: function()
  {
    incomeItem.forEach(function(item){
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if(itemIncome !== '' && cashIncome !== '')
      {
        appData.income[itemIncome] = +cashIncome;
      }
    })

    for (let key in appData.income)
    {
      appData.incomeMonth += +appData.income[key];
    }
  },
  getAddExpenses: function()
  {
    let addExpenses = additionalExpensesItem.value.split(',');
    addExpenses.forEach(function(item){
      item = item.trim();
      if (item !== '')
      {
        appData.addExpenses.push(item);
      }
    });
  },
  getAddIncome: function()
  {
    additionalIncomeItem.forEach(function(item)
    {
      let itemValue = item.value.trim();
      if(itemValue !== '')
      {
        appData.addIncome.push(itemValue);
      }
    })
  },
  rangePeriod: function () 
  {      
    periodAmount.textContent = periodSelect.value;
  }, 
  showResult: function()
  {
    budgetMonthValue.value = appData.budgetMonth;
    budgetDayValue.value = Math.floor(appData.budgetDay);
    expensesMonthValue.value = appData.expensesMonth;
    additionalExpensesValue.value = appData.addExpenses.join(', ');
    additionalIncomeValue.value = appData.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(appData.getTargetMonth());
    incomePeriodValue.value = appData.calcPeriod();
    periodSelect.addEventListener('change', function(){
      incomePeriodValue.value = appData.calcPeriod();
    });
  },
  asking: function()
  {
    
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
  },
  getBudget: function()
  {
    appData.budgetMonth = appData.budget - appData.expensesMonth + appData.incomeMonth;
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
    return targetAmount.value / appData.budgetMonth;
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
  // calcSaveMoney: function()
  // {
  //   return appData.budgetMonth * appData.period;
  // },
  calcPeriod: function()
  {
    return appData.budgetMonth * periodSelect.value;
  }
};

start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', function()
{
  appData.rangePeriod();
  incomePeriodValue.value = appData.calcPeriod();
});

// console.log(appData.calcSaveMoney());
// Блок перспективы человека
// console.log('Ваши обязательные расходы: ', appData.expenses);
// console.log('Возможные расходы: ', appData.addExpenses);
// console.log('Накоплено на сберегательном счету: ', appData.calcSaveMoney());
// if(appData.getTargetMonth() > 0)
// {
//   console.log('Цель будет достигнута за ' + Math.floor(appData.getTargetMonth()), ' месяцев');
// }
// else
// {
//   console.log('Цель не будет достигнута!');
// }
// console.log(appData.getStatusIncome());
