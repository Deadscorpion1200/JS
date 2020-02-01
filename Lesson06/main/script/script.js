'use strict';

function playing()
{
  const num = Math.floor((Math.random() * 100) + 1);
  let numb
  console.log(num);
  if(confirm('Угадйте число от 1 до 100'))
  {
    return function checking()
    {
      numb =+ prompt('Введите ваше число');
      if(numb>num)
      {
        alert('Загаданное число меньше!');
        checking();
      }
      else if(numb < num)
      {
        alert('Загаданное число больше!');
        checking();
      }
      else
      {
        alert('Поздравляем вас!');
      }
    }
  }
  else
  {
    alert('Ну и пошёл в жопу!');
  }
}
const play = playing();
play();