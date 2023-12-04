document
  .querySelector("#valorRecarga")
  .addEventListener("input", function (event) {
    let inputValue = event.target.value;

    inputValue = inputValue.replace(/[^0-9]/g,"");

    if (inputValue.length > 2) {
      inputValue = inputValue.replace(/^0*(\d+)(\d{2})$/, "$1,$2");
    } else if (inputValue.length === 2) {
      inputValue = `0,${inputValue}`;
    } else {
      inputValue = `0,0${inputValue}`;
    }

    event.target.value = inputValue;
  });