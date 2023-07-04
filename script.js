const inputs = document.querySelectorAll('input');
const cardInfos = document.querySelectorAll(
  '.card_name, .card_number, .card_month, .card_year, .card_cvc'
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

const checkInputs = data => {
  const year = date.getFullYear().toString().slice(2);
  const yearInt = parseInt(year);
  let isValid = true;

  errorElement.forEach((e, index) => {
    if (e.classList.contains(data[index].name) && data[index].value === '') {
      e.classList.add('display');
      inputs[index].classList.add('error-input');
    } else if (
      e.classList.contains(data[index].name) &&
      data[index].value !== ''
    ) {
      e.classList.remove('display');
      inputs[index].classList.remove('error-input');

      if (data[index].name === 'card_number') {
        if (data[index].value.length < 16) {
          e.innerHTML = 'please insert a card number';
          e.classList.add('display');
          inputs[index].classList.add('error-input');
          isValid = false;
          return;
        }
      } else if (data[index].name === 'card_year') {
        if (
          parseInt(data[index].value) < yearInt ||
          parseInt(data[index].value) > yearInt + 10
        ) {
          e.innerHTML = 'please insert a valid year';
          e.classList.add('display');
          inputs[index].classList.add('error-input');
          isValid = false;
          return;
        }
      } else if (data[index].name === 'card_month') {
        if (
          parseInt(data[index].value) < 1 ||
          parseInt(data[index].value) > 12
        ) {
          e.innerHTML = 'please insert a valid month';
          e.classList.add('display');
          inputs[index].classList.add('error-input');
          isValid = false;
          return;
        }
      } else if (data[index].name === 'card_cvc') {
        if (data[index].value.length < 3) {
          e.innerHTML = 'please insert a valid cvc';
          e.classList.add('display');
          inputs[index].classList.add('error-input');
          isValid = false;
          return;
        }
      }
    }

    if (data[index].value === '') {
      isValid = false;
    }
  });
  handleConfirmation(isValid);
};

const handleButton = event => {
  event.preventDefault();

  let data = [];
  for (let input of inputs) {
    data.push({ name: input.id, value: input.value });
  }

  checkInputs(data);
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
            input.id === 'card_number'
              ? formatCardNumber(input.value)
              : input.value
          }`;
          input.value = `${input.value}`;
        });
      }
    }
  }
};

const reload = () => {
  location.reload();
};

const handleKeyDown = event => {
  const { key } = event;

  if (event.target.id !== 'card_name') {
    if (!/^\d$/.test(key) && key !== 'Backspace') {
      event.preventDefault();
    } else {
      handleCardInfoUpdate();
    }
  } else {
    handleCardInfoUpdate();
  }
};
