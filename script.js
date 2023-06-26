const inputs = document.querySelectorAll('input');
const cardInfos = document.querySelectorAll(
  '.card-name, .card-number, .card-month, .card-year, .card-cvc'
);
const errorElement = document.querySelectorAll('.error-message');
const date = new Date();

const handleConfirmation = value => {
  const formContainer = document.querySelector('form');
  const completeState = document.querySelector('.complete-state');

  if (value) {
    formContainer.classList.toggle('display');
    completeState.classList.toggle('display');
  }
};

const checkInputs = (id, value) => {
  const inputElement = document.getElementById(id);
  const year = date.getFullYear().toString().slice(2);
  const yearInt = parseInt(year);
  const valueInt = parseInt(value);
  let isValid = false;

  errorElement.forEach(e => {
    if (value === '') {
      inputElement.classList.add('error-input');
      if (e.classList.contains(id) && value === '') {
        e.classList.add('display');
      }
    } else {
      inputElement.classList.remove('error-input');
      if (e.classList.contains(id)) {
        e.classList.remove('display');
        if (id === 'card-year') {
          if (valueInt < yearInt || valueInt > yearInt + 10) {
            e.innerHTML = 'please insert a valid year';
            e.classList.add('display');
            isValid = false;
            return;
          }
        } else if (id === 'card-month') {
          if (valueInt < 1 || valueInt > 12) {
            e.innerHTML = 'please insert a valid month';
            e.classList.add('display');
            isValid = false;
            return;
          }
        }
        isValid = true;
      }
    }
  });

  handleConfirmation(isValid);
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
