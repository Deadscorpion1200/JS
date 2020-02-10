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
let incomeTitle = document.querySelector('income-title');   // Наименование дохода
let incomeAmount = document.querySelector('income-amount'); // Сумма дохода

let expensesTitle = document.querySelector('.expenses-title'); // Наименование расходов
let expensesAmount = document.querySelector('.expenses-amount'); // Сумма расходов
let addExpensesField = document.querySelector('.additional_expenses-item'); // Наименования возможных расходов 

let target = document.querySelector('.target-amount');  // Целевая сумма
let period = document.querySelector('.period-select');  // Время цели