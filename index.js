$(document).ready(function() {
    // Función para mostrar/ocultar campos según la operación seleccionada
    function toggleInputs() {
        const operation = $('#operation').val();

        // Ocultar todos los campos primero
        $('#input-i, #input-end-i, #input-j, #input-end-j').hide();
        // Reiniciar los valores de los campos
        $('#start-i, #end-i, #start-j, #end-j').val('0');

        // Mostrar campos según la operación
        if (operation === 'sum' || operation === 'prod') {
            $('#input-i, #input-end-i').show(); // Solo se necesita i
        } else if (operation === 'comb' || operation === '2sum' || operation === '2prod') {
            $('#input-i, #input-end-i, #input-j, #input-end-j').show(); // Se necesitan i y j
        }
    }

    // Ejecutar la función al cambiar la operación
    $('#operation').on('change', toggleInputs);

    // Ejecutar la función al cargar la página
    toggleInputs();

    // Calcular el resultado al enviar el formulario
    $('#form-data').on('submit', function(event) {
        event.preventDefault();

        const operation = $('#operation').val();
        const func = $('#function').val();
        const startI = parseInt($('#start-i').val());
        const endI = parseInt($('#end-i').val());
        const startJ = parseInt($('#start-j').val());
        const endJ = parseInt($('#end-j').val());

        let result = 0;

        switch (operation) {
            case 'sum':
                result = 0;
                for (let i = startI; i <= endI; i++) {
                    result += eval(func.replace(/i/g, i).replace(/\^/g, '**'));
                }
                break;
            case 'prod':
                result = 1;
                for (let i = startI; i <= endI; i++) {
                    result *= eval(func.replace(/i/g, i).replace(/\^/g, '**'));
                }
                break;
            case 'comb':
                result = 0;
                for (let i = startI; i <= endI; i++) {
                    let product = 1;
                    for (let j = startJ; j <= endJ; j++) {
                        product *= eval(func.replace(/i/g, i).replace(/j/g, j).replace(/\^/g, '**'));
                    }
                    result += product;
                }
                break;
            case '2sum':
                result = 0;
                for (let i = startI; i <= endI; i++) {
                    for (let j = startJ; j <= endJ; j++) {
                        result += eval(func.replace(/i/g, i).replace(/j/g, j).replace(/\^/g, '**'));
                    }
                }
                break;
            case '2prod':
                result = 1;
                for (let i = startI; i <= endI; i++) {
                    for (let j = startJ; j <= endJ; j++) {
                        result *= eval(func.replace(/i/g, i).replace(/j/g, j).replace(/\^/g, '**'));
                    }
                }
                break;
        }

        $('#result').text(`Resultado: ${result}`);
    });
});