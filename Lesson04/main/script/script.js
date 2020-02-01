'use strict';

let money = +prompt('Ваш месячный доход?');
let income = "Фриланс";
let addExpenses = prompt('Перечислите возможные расходы на период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = +prompt('Во сколько это обойдётся?');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = +prompt('Во сколько это обойдётся?');

let getExpensesMonth = function()
{
  return amount1 + amount2;
}

let getAccumulatedMonth = function()
{
  return money - getExpensesMonth();
}
let mission = 1000000;
let period = 12;
let AccumulatedMonth = getAccumulatedMonth();
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

let showTypeOf = function(data)
{
  console.log(data, typeof(data));
}

let getTargetMonth = mission / AccumulatedMonth;

showTypeOf (money);
showTypeOf (income);
showTypeOf (deposit);
console.log(addExpenses.length);
console.log('\n');
console.log('Период равен ' + getTargetMonth + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(','));
console.log('Дневной бюджет составляет: ' + Math.floor(budgetDay));
console.log('Месячный бюджет за вычетом обязательных расходов составляет: ' + AccumulatedMonth);
console.log('Цель будет достигнута через: ' + Math.ceil(getTargetMonth) + 'месяцев')



console.log(getStatusIncome());
