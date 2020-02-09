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
  persentDeposit: 0,
  moneyDeposit: 0,
  mission: 1000000,
  period: 12,
  budget: money,
  budgetDay: 0,
  budgetMonth: 0,
  expensesMonth: 0,
  // AccaumulatedMonth: 0,
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
    let list,
        value,
        obj = {};
    for (let i = 0; i < 2; i++)
    {
      if( i == 0 )
      {
        while(!(list = prompt('Введите обязательные расходы')));
      }
      else 
      {
        while(!(list = prompt('Введите ежедневные расходы ещё:')));
      }
      do
      {
        value = prompt('Во сколько это обойдётся?');
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
console.log(appData.income);
appData.getExpensesMonth();
appData.getBudget();
// console.log(appData.calcSaveMoney());
// Блок перспективы человека
console.log('Ваши обязательные расходы: ', appData.expenses);
console.log('Возможные расходы: ', appData.addExpenses);
console.log('Накоплено на сберегательном счету: ', appData.calcSaveMoney());
if(appData.getTargetMonth() > 0)
{
  console.log('Цель будет достигнута за ' + Math.floor(appData.getTargetMonth()), ' месяцев');
}
else
{
  console.log('Цель не будет достигнута!');
}
console.log(appData.getStatusIncome());
// console.log('Наша программа включает в себя следующие данные');
// for (let key in appData) {
//   console.log (key + ' ' + appData[key]);
// };