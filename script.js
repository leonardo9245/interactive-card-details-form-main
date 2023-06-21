const inputs = document.querySelectorAll('input');
const cardInfos = document.querySelectorAll(
  '.card-name, .card-number, .card-month, .card-year, .card-cvc'
);

for (let input of inputs) {
  for (let infos of cardInfos) {
    if (input.id === infos.classList.value) {
      input.addEventListener('input', () => {
        infos.innerHTML = `${input.value}`;
      });
    }
  }
}
