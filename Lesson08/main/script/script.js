'use strict';

let isNumber = function(n)
{
  return !isNaN(parseFloat(n)) && isFinite(n)
};

let money;
let start = function()
{
  do
  {
    money = prompt('Ваш месячный доход?');
  }
  while(!isNumber(money));
};

start();

let appData = 
{
  income: {},
  addIncome: [],
  expenses: {},
  addExpenses: [],
  deposit: false,
  mission: 1000000,
  period: 12,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  // AccaumulatedMonth: 0,
  asking: function()
  {
    let addExpenses = prompt('Перечислите возможные расходы на период через запятую');
    appData.addExpenses = addExpenses.toLowerCase().split(',');
    appData.deposit = confirm('Есть ли у вас депозит в банке?');
    let list,
        value,
        obj = {};
    for (let i = 0; i < 2; i++)
    {
      if( i == 0 )
      {
        list = prompt('Введите обязательные расходы');
      }
      else 
      {
        list = prompt('Введите ежедневные расходы ещё:');
      }
      do
      {
        value = +prompt('Во сколько это обойдётся?');
      }while(!isNumber(value));
      obj[list] = Number(value);
    }
    appData.expenses = obj;
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
  // getAccumulatedMonth: function()          // Остаток за вычетом расходов
  // {
  //   return money - appData.expensesMonth;
  // },
  getBudget: function()
  {
    appData.budgetMonth = money - appData.expensesMonth;
    console.log('Бюджет на месяц' + '' + appData.budgetMonth);
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
  
}


// let amount1 = +prompt('Во сколько это обойдётся?');
// let expenses2;
// let amount2 = +prompt('Во сколько это обойдётся?');


// let expensesMonth = appData.getExpensesMonth();
// let AccumulatedMonth = appData.getAccumulatedMonth(); // все месячные расходы


// appData.budgetDay = appData.AccumulatedMonth/30;
/* приведение типов данных функция */
// let showTypeOf = function(data)
// {
//   console.log(data, typeof(data));
// }


// приведение типов данных вызов
// showTypeOf (appData.money);
// showTypeOf (appData.income);
// showTypeOf (appData.deposit);

// console.log('\n');
// console.log(appData.addExpenses);
// console.log(appData.deposit);
// console.log('Период равен ' + appData.getTargetMonth() + ' месяцев');
// console.log('Цель заработать ' + appData.mission + ' рублей');
// console.log('Общий месячный расход: ', appData.expensesMonth);
// console.log('Дневной бюджет составляет: ' + Math.floor(appData.budgetDay));
// console.log('Месячный бюджет за вычетом обязательных расходов составляет: ' + appData.getAccumulatedMonth());
// if(appData.getTargetMonth() < 0)
// {
//   console.log('Цель не будет достигнута!')
// }
// else
// {
//   console.log('Цель будет достигнута через: ' + Math.ceil(appData.getTargetMonth()) + 'месяцев')
// }
// // Вывод аналитического сообщения
// console.log(appData.getStatusIncome());

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
console.log('Цель будет достигнута за ' + Math.floor(appData.getTargetMonth()), ' месяцев');
console.log(appData.getStatusIncome());
console.log('Наша программа включает в себя следующие данные');
for (let key in appData) {
  console.log (key + ' ' + appData[key]);
}