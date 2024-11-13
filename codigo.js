function numberToWords(n) {
    const unidades = ["", "um", "dois", "três", "quatro", "cinco", "seis", "sete", "oito", "nove"];
    const especiais = ["dez", "onze", "doze", "treze", "catorze", "quinze", "dezesseis", "dezessete", "dezoito", "dezenove"];
    const dezenas = ["", "", "vinte", "trinta", "quarenta", "cinquenta", "sessenta", "setenta", "oitenta", "noventa"];
    const centenas = ["","cento", "duzentos", "trezentos", "quatrocentos", "quinhentos", "seiscentos", "setecentos", "oitocentos", "novecentos"];

    if (n === 0) return "zero";
    if (n < 0) return "menos " + numberToWords(-n);

    let words = "";

    // milhares
    if (Math.floor(n / 1000) > 0) {
        words += (Math.floor(n / 1000) === 1 ? "mil" : unidades[Math.floor(n / 1000)] + " mil");
        n %= 1000;
        if (n > 0) words += " e ";
    }

    // centenas
    if (Math.floor(n / 100) > 0) {
        words += (n === 100 ? "cem" : centenas[Math.floor(n / 100)]);
        n %= 100;
        if (n > 0) words += " e ";
    }

    // dezenas e unidades especiais (de 10 a 19)
    if (n >= 10 && n <= 19) {
        words += especiais[n - 10];
        n = 0;
    } else if (Math.floor(n / 10) > 0) { // outras dezenas
        words += dezenas[Math.floor(n / 10)];
        n %= 10;
        if (n > 0) words += " e ";
    }

    // unidades
    if (n > 0) {
        words += unidades[n];
    }

    return words;
}

export const handler = async (event, context) => {

    const {numero} = event; 
    //console.log(numberToWords(numero));
    const resultado = numberToWords(numero);

    return {
        statusCode: 200,
        body: JSON.stringify({ text: resultado }),
    };

    
};
