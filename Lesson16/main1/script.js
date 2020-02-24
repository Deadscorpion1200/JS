const first = {
  hello()
  {
    console.log('Привет! Я метод родителя');
  }
}
const second = {
  hello()
  {
    super.hello();
    console.log('А я наследуемый метод!');
  }
}
Object.setPrototypeOf(second, first);
second.hello();