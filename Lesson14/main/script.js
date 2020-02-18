
const DOM = function( selector, height, width, bg, fontSize) {
  this.selector = selector;
  this.height = height;
  this.width = width;
  this.bg = bg;
  this.fontSize = fontSize;
  this.NewElem();
};

DOM.prototype.NewElem = function () {
  if (this.selector[0] === '.'){
      this.element = document.createElement('div');
      this.element.className = this.selector.substring(1);
      console.log(this.element);
    } else if(this.selector[0] === '#'){
      this.element = document.createElement('p');
      this.element.id = this.selector.substring(1);
      console.log(this.element);
}

this.element.style.cssText = `height: ${this.height}px; width: ${this.width}px; background-color: ${this.bg}; font-size: ${this.fontSize}px`;
let body = document.querySelector('body');
  body.append(this.element);
};

DOM.prototype.NewText = function (){
  this.element.textContent = 'Привет';
};

let one = new DOM('#block', 20, 40, 'lightblue', 10).NewText();