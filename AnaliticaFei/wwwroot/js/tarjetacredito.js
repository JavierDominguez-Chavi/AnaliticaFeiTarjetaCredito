// Objeto global para usar las funciones
var $cc = {}

// Validar el numero de tarjeta
$cc.validate = function (e) {
    // Algoritmo de Luhn para validar números de tarjeta de crédito
    function luhn(number) {
        var numberArray = number.split('').reverse();
        for (var i = 0; i < numberArray.length; i++) {
            if (i % 2 != 0) {
                numberArray[i] = numberArray[i] * 2;
                if (numberArray[i] > 9) {
                    numberArray[i] = parseInt(String(numberArray[i]).charAt(0)) + parseInt(String(numberArray[i]).charAt(1))
                }
            }
        }
        var sum = 0;
        for (var i = 1; i < numberArray.length; i++) {
            sum += parseInt(numberArray[i]);
        }
        sum = sum * 9 % 10;
        if (numberArray[0] == sum) {
            return true;
        } else {
            return false;
        }

        // Si el imput esta vacio se reinician los indicadores a sus clases default
        if (e.target.value == '') {
            document.querySelector('.card-type').setAttribute('class', 'card-type');
            e.target.nextElementSibling.className = 'card-valid';
            return
        }

        // Se obtiene el valor del input y se quitan todos lo carcateres que no sean numeros
        var number = String(e.target.value);
        var cleanNumber = '';
        for (var i = 0; i < number.length; i++) {
            if (/^[0-9]+$/.test(number.charAt(i))) {
                cleanNumber += number.charAt(i);
            }
        }

        // Solo se formatea el numero si la tecla no es backspace
        if (e.key != 'Backspace') {
            // Formatea el valor para incluir espacios en la posicion 3, 7, 11
            var formatNumber = '';
            for (var i = 0; i < cleanNumber.length; i++) {
                if (i == 3 || i == 7 || i == 11) {
                    formatNumber = formatNumber + cleanNumber.charAt(i) + ' ';
                } else {
                    formatNumber += cleanNumber.charAt(i);
                }
            }
            e.target.value = formatNumber;
        }

        //Se ejecuta el algoritmo Luhn sobre el numero solo si tiene la longitud minima de tipo de tarjeta menor
        if (cleanNumber.length >= 12) {
            var isLuhn = luhn(cleanNumber);
        }

        //Si el numero pasa el algoritmo de Luhn se agrega a la clase 'active'
        if (isLuhn == true) {
            e.target.nextElementSibling.className = 'card-valid active';
        } else {
            e.target.nextElementSibling.className = 'card-valid';
        }

        //Tipos de tarjeta soportados. Aqui agrega otro tipo o midifica las regex para mejorar la precision
        var card_types = [
            {
                name: 'amex',
                pattern: /^3[47]/,
                valid_length: [15]
            }, {
                name: 'diners_club_carte_blanche',
                pattern: /^30[0-5]/,
                valid_length: [14]
            }, {
                name: 'diners_club_international',
                pattern: /^36/,
                valid_length: [14]
            }, {
                name: 'jcb',
                pattern: /^35(2[89]|[3-8][0-9])/,
                valid_length: [16]
            }, {
                name: 'laser',
                pattern: /^(6304|670[69]|6771)/,
                valid_length: [16, 17, 18, 19]
            }, {
                name: 'visa_electron',
                pattern: /^(4026|417500|4508|4844|491(3|7))/,
                valid_length: [16]
            }, {
                name: 'visa',
                pattern: /^4[0-9]/,
                valid_length: [16]
            }, {
                name: 'mastercard',
                pattern: /^5[1-5]/,
                valid_length: [16]
            }, {
                name: 'maestro',
                pattern: /^(5018|5020|5038|6304|6759|676[1-3])/,
                valid_length: [12, 13, 14, 15, 16, 17, 18, 19]
            }, {
                name: 'discover',
                pattern: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/,
                valid_length: [16]
            }
        ];

        //Pruba el numero que da el usuario contra cada tipos de tarjeta
        for (var i = 0; i < card_types.length; i++) {
            if (number.match(card_types[i].pattern)) {
                // Si se encuentra una coincidencia, se agrega el tipo de tarjeta como clase para mostar la imagen
                document.querySelector('.card-type').setAttribute('class', 'card.type ' + card_types[i].name);
                break;
            }
        }
    } 
}

// Validar la fecha de expiracion
$cc.expiry = function (e) {
    if (e.key != 'Backspace') {
        var number = String(this.value);

        // Quitar todos los caracteres que no sean numeros
        var cleanNumber = '';
        for (var i = 0; i < number.length; i++) {
            if (i == 1 && number.charAt(i) == '/') {
                cleanNumber = 0 + number.charAt(0);
            }
            if (/^[0-9]+$/.test(number.charAt(i))) {
                cleanNumber += number.charAt(i);
            }
        }

        var formattedMonth = '';
        for (var i = 0; i < cleanNumber.length; i++) {
            if (/^[0-9]+$/.test(cleanNumber.charAt(i))) {
                // Si el numero es mayor a 1 se agrega un cero para forzar un mes con 2 digitos
                if (i == 0 && cleanNumber.charAt(i) > 1) {
                    formattedMonth += 0;
                    formattedMonth += cleanNumber.charAt(i);
                    formattedMonth += '/';
                }
                // Se agrega un '/' despues del segundo numero
                else if (i == 1) {
                    formattedMonth += cleanNumber.charAt(i);
                    formattedMonth += '/';
                }
                // Forzar a un año para que tenga 4 digitos
                else if (i == 2 && cleanNumber.charAt(i) < 2) {
                    formattedMonth += '20' + cleanNumber.charAt(i);
                } else {
                    formattedMonth += cleanNumber.charAt(i);
                }
            }
        }
        this.value = formattedMonth;
    }
}
