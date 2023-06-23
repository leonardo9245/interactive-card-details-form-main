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
      if (e.classList.contains(id) && value === '') {
        e.classList.add('display');
      }
    } else {
      element.classList.remove('error-input');
      if (e.classList.contains(id)) {
        e.classList.remove('display');
      }
    }
  });
};

const handleButton = event => {
  event.preventDefault();
  for (let input of inputs) {
    checkInputs(input.id, input.value);
  }
};

const formatCardNumber = value => {
  let result = '';
  for (let i = 0; i < value.length; i++) {
    result += value[i];
    if ((i + 1) % 4 === 0 && i !== value.length - 1) {
      result += ' ';
    }
  }
  return result;
};

const handleCardInfoUpdate = () => {
  for (let input of inputs) {
    for (let infos of cardInfos) {
      if (input.id === infos.classList.value) {
        input.addEventListener('input', () => {
          infos.innerHTML = `${
            input.id === 'card-number'
              ? formatCardNumber(input.value)
              : input.value
          }`;
          input.value = `${input.value}`;
        });
      }
    }
  }
};

const handleKeyDown = event => {
  const { key } = event;

  if (event.target.id !== 'card-name') {
    if (!/^\d$/.test(key) && key !== 'Backspace') {
      event.preventDefault();
    } else {
      handleCardInfoUpdate();
    }
  } else {
    handleCardInfoUpdate();
  }
};
