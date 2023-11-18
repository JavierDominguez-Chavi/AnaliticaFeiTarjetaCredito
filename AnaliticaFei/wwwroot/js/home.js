const form = document.querySelector('form');
const inputCreditNumber = document.getElementById('Card_number');
const inputExpiry = document.getElementById('Expiry');

//Evento para cuando presionamos una tecla
inputCreditNumber.addEventListener('keyup', function (e) {
    $cc.validate(e)
});

//Evento para cuando presionamos una tecla
inputExpiry.addEventListener('keyup', function (e) {
    $cc.expiry.call(this, e)
});

// Previene el envio del formulario para realiazar validaciones antes de enviarlo
form.addEventListener('submit', (e) => {
    e.preventDefault();
});