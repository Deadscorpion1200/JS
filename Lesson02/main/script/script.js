let money = 1200;
let income = "Фриланс";
let addExpenses = "Интернет, Такси, Коммуналка, Корм для кота";
let deposit = false;
let mission = 1000000;
let period = 12;
let budgetDay = money/30;

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);
console.log('\n');
console.log('Период равен ' + period + ' месяцев');
console.log('Цель заработать ' + mission + ' рублей');
console.log(addExpenses.toLowerCase().split(','));
console.log('Дневной бюджет составляет: ' + budgetDay);