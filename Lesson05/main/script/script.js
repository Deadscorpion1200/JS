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
let income = "Фриланс";
let addExpenses = prompt('Перечислите возможные расходы на период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses = [];
// let amount1 = +prompt('Во сколько это обойдётся?');
// let expenses2;
// let amount2 = +prompt('Во сколько это обойдётся?');


let getExpensesMonth = function()             // сумма расходов
{
  let sum = 0;
  for (let i = 0; i<2; i++)
  {
    let amount;
    expenses [i] = +prompt('Введите обязательную статью расходов: ');
    do
    {
      amount = prompt('Во сколько это обойдётся?');
    }while(!isNumber(amount));
    sum += +amount;
  }
  console.log(expenses);
  return sum;
}

let getAccumulatedMonth = function()          // Остаток за вычетом расходов
{
  return money - expensesMonth;
}

let expensesMonth = getExpensesMonth();
let mission = 1000000; // сколько мечтаешь накопить
let period = 12;       // за сколько месяцев
let AccumulatedMonth = getAccumulatedMonth(); // все месячные расходы

/* комментарий по доходу */
let getStatusIncome = function()
{
  if(budgetDay > 1200)
  {
    return('У вас высокий уровень дохода!!');
  }
  else if ((budgetDay > 600) && ( budgetDay < 1200)) 
  {
    return('У вас средний уровень дохода!');
  } 
  else if (budgetDay < 600)
  {
    return('У вас низкий уровень дохода!');
  }
  else
  {
    return('Что-то пошло не так!');
  }
}
let budgetDay = AccumulatedMonth/30;
/* приведение типов данных функция */
let showTypeOf = function(data)
{
  console.log(data, typeof(data));
}

let getTargetMonth = mission / AccumulatedMonth;

// приведение типов данных вызов
showTypeOf (money);
showTypeOf (income);
showTypeOf (deposit);

console.log(addExpenses.length);
console.log('\n');
console.log('Период равен ' + getTargetMonth + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(','));
console.log('Общий месячный расход: ', expensesMonth);
console.log('Дневной бюджет составляет: ' + Math.floor(budgetDay));
console.log('Месячный бюджет за вычетом обязательных расходов составляет: ' + AccumulatedMonth);
if(getTargetMonth < 0)
{
  console.log('Цель не будет достигнута!')
}
else
{
  console.log('Цель будет достигнута через: ' + Math.ceil(getTargetMonth) + 'месяцев')
}
// Вывод аналитического сообщения
console.log(getStatusIncome());
