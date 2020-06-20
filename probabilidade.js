
function escolha(){
    let maiorque = document.getElementById('maiorque')
    let menorque = document.getElementById('menorque')
    let entre = document.getElementById('entre')
    let optionValor = document.getElementById('optionValor')
    optionValor.innerHTML = ``
    if(maiorque.checked){
        optionValor.innerHTML += 
        `
        <h5 class="my-2 text-light">Maior que:</h5>
        <input type="number" class="form-control-inline col-4" id="maiorV"><br>
        <div class="ml-auto mr-auto text-center col-sm-4 col-md-4 col-lg-4 my-3">
            <button type="button" class="btn btn-outline-light btn-block" id = "calcular" onclick="Calcular()"><h5>Calcular</h5></button>
        </div>
        
        `
    }else if(menorque.checked){
        optionValor.innerHTML += 
        `
        <h5 class="my-2 text-light">Menor que:</h5>
        <input type="number" class="form-control-inline col-4" id="menorV"><br>
        <div class="ml-auto mr-auto text-center col-sm-4 col-md-4 col-lg-4 my-3">
            <button type="button" class="btn btn-outline-light btn-block" id = "calcular" onclick="Calcular()"><h5>Calcular</h5></button>
        </div>
        
        `
    }else if(entre.checked){
        optionValor.innerHTML += 
        `
        <h5 class="my-2 text-light">Entre:</h5>
        <input type="number" class="form-control-inline col-4" id="entre1V"> 
        <label class="form-check-label h6 text-light mx-2">  e  </label>
        <input type="number" class="form-control-inline col-4" id="entre2V">
        <div class="ml-auto mr-auto text-center col-sm-4 col-md-4 col-lg-4 my-3">
            <button type="button" class="btn btn-outline-light btn-block" id = "calcular" onclick="Calcular()"><h5>Calcular</h5></button>
        </div>
        
        `
    }

}