const Increment = document.getElementById('increment');
const Decrement = document.getElementById('decrement');
const Reset = document.getElementById('reset');
const Counter = document.getElementById('counter');

Increment.addEventListener('click', () => {
  let count = parseInt(Counter.textContent);
  count++;
  Counter.textContent = count;
});

Decrement.addEventListener('click', () => {
  let count = parseInt(Counter.textContent);
  count--;
  Counter.textContent = count;
});

Reset.addEventListener('click', () => {
  Counter.textContent = '0';
});