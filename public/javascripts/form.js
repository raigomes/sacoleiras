function maskDate(e) {
  let input = e.target.value.replace(/\D/g, "");
  let inputFormatted = "";

  for (let i = 0; i < input.length; i++) {
    if (i >= 8) break;

    inputFormatted += input.charAt(i) + (i == 1 || i == 3 ? "/" : "");
  }

  e.target.value = inputFormatted;
}

function validateDate(e) {
  const input = e.target;
  const inputDate = input.value;

  if (isDateValid(inputDate)) {
    input.classList.add("shadow-success");
    input.classList.remove("shadow-error");
  } else {
    input.classList.remove("shadow-success");
    input.classList.add("shadow-error");
  }
}

function isDateValid(inputDate) {
  if (inputDate.match(/\d{1,2}\/\d{1,2}\/\d{4}/)) {
    const [day, month, year] = inputDate.split("/");

    const dateFrom = Date.parse("01/01/1900");
    const dateTo = new Date();
    const dateCheck = new Date(year, month, day);

    return dateCheck >= dateFrom && dateCheck <= dateTo;
  }

  return false;
}

$(".form-date")
  .on("keyup", maskDate)
  .on("focusout", validateDate);
