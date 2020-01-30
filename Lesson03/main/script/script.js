'use strict';

let money = prompt('Ваш месячный доход?');
let income = "Фриланс";
let addExpenses = prompt('Перечислите возможные расходы на период через запятую');
let deposit = confirm('Есть ли у вас депозит в банке?');
let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = prompt('Во сколько это обойдётся?');
let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = prompt('Во сколько это обойдётся?');
let mission = 1000000;
let period = 12;
let budgetMonth = money - (amount1 + amount2);
let budgetDay = budgetMonth/30;
let finale = mission/budgetMonth;
console.log(typeof money);
console.log(typeof income);
console.log(deposit);
console.log(addExpenses.length);
console.log('\n');
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(','));
console.log('Дневной бюджет составляет: ' + Math.floor(budgetDay));
console.log('Месячный бюджет за вычетом обязательных расходов составляет: ' + budgetMonth);
console.log('Цель будет достигнута через: ' + Math.ceil(finale) + 'месяцев')

if(budgetDay > 1200)
{
  console.log('У вас высокий уровень дохода!!');
}
else if ((budgetDay > 600) && ( budgetDay < 1200)) 
{
  console.log('У вас средний уровень дохода!');
} 
else if (budgetDay < 600)
{
  console.log('У вас низкий уровень дохода!');
}
else
{
  console.log('Что-то пошло не так!')
}
switch(budgetDay)
{
  case 0:
    console.log('ВСЁ ОЧЕНЬ ПЛОХО!');
    break;
  case 600:
    console.log('А вы не плох!');
    break;
  case 1200:
    console.log('Да вы хорош!');
}
