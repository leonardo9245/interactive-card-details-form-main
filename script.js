const inputs = document.querySelectorAll('input');
const cardInfos = document.querySelectorAll(
  '.card-name, .card-number, .card-month, .card-year, .card-cvc'
);
const errorElement = document.querySelectorAll('.error-message');

const checkInputs = (id, value) => {
  const element = document.getElementById(id);

  errorElement.forEach(e => {
    if (value === '') {
      element.classList.add('error-input');
      if (e.classList.contains(id)) {
        e.classList.add('display');
      }
    } else {
      element.classList.remove('error-input');
      e.classList.remove('display');
    }
  });
};

const handleButton = event => {
  event.preventDefault();
  for (let input of inputs) {
    checkInputs(input.id, input.value);
  }
};

for (let input of inputs) {
  for (let infos of cardInfos) {
    if (input.id === infos.classList.value) {
      input.addEventListener('input', () => {
        infos.innerHTML = `${input.value}`;
        input.value = `${input.value}`;
      });
    }
  }
}
