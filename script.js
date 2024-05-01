document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cuadradosMediosForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const semilla = parseInt(document.getElementById('semilla').value);
        const cantidadDigitos = parseInt(document.getElementById('cantidadDigitos').value);
        const digitosSemilla = parseInt(document.getElementById('digitosSemilla').value);
        const resultados = generarCuadradosMedios(semilla, cantidadDigitos, digitosSemilla);
        mostrarResultados(resultados);
    });
});

function generarCuadradosMedios(semilla, cantidadDigitos, digitosSemilla) {
    let resultados = [];
    for (let i = 0; i < cantidadDigitos; i++) {
        let cuadrado = semilla * semilla;
        let cuadradoStr = cuadrado.toString();
        let longitud = cuadradoStr.length;
        let inicio = Math.floor((longitud - digitosSemilla) / 2);
        let numero = parseInt(cuadradoStr.substr(inicio, digitosSemilla));
        let ri = numero / (Math.pow(10, digitosSemilla));
        resultados.push({ paso: i, semilla: semilla, cuadrado: cuadrado, longitud: longitud, numero: numero, ri: ri });
        semilla = numero;
    }
    return resultados;
}

function mostrarResultados(resultados) {
    const tabla = `
        <table class="table table-striped text-center">
            <thead class="table-dark">
                <tr>
                    <th>Paso(n)</th>
                    <th>Semilla</th>
                    <th>(Xi)^2</th>
                    <th>Largo (dígitos)</th>
                    <th>Xi seleccionado</th>
                    <th>ri</th>
                </tr>
            </thead>
            <tbody>
                ${resultados.map(resultado => `
                    <tr>
                        <td>${resultado.paso}</td>
                        <td>${resultado.semilla}</td>
                        <td>${resultado.cuadrado}</td>
                        <td>${resultado.longitud}</td>
                        <td>${resultado.numero}</td>
                        <td>${resultado.ri.toFixed(4)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    document.getElementById('resultado').innerHTML = tabla;
}