function maskDate (e) {
  let input = e.target.value.replace(/\D/g, '')
  let inputFormatted = ''

  for (let i = 0; i < input.length; i++) {
    if (i >= 8) break

    inputFormatted += input.charAt(i) + (i == 1 || i == 3 ? '/' : '')
  }

  e.target.value = inputFormatted
}

$('.form-date').on('keyup', maskDate)
