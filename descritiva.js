let medida = document.getElementById("medida")
let barra = document.getElementById("barraMedida")
let vlrBarra = document.getElementById('vlrBarra')

function valorBarra(){
    vlrBarra.innerHTML = barra.value + "%"
    barra.oninput = function(){
        vlrBarra.innerHTML = barra.value + "%"
    }
}

function Separatriz(){
    
    if (medida.value == "Quartil"){
        barra.step = 25
        barra.max = 100
        barra.value = 0
        vlrBarra.innerHTML = barra.value + "%"
    } else if (medida.value == 'Quintil'){
        barra.step = 20
        barra.max = 100
        barra.value = 0
        vlrBarra.innerHTML = barra.value + "%"
    } else if (medida.value == 'Decil'){
        barra.step = 10
        barra.max = 100
        barra.value = 0
        vlrBarra.innerHTML = barra.value + "%"
    } else if (medida.value == 'Percentil'){
        barra.step = 1
        barra.max = 100
        barra.value = 0
        vlrBarra.innerHTML = barra.value + "%"
    } else {
        barra.step = 1
        barra.max = 0
        barra.value = 0
        vlrBarra.innerHTML = barra.value + "%"
    }
}

let tituloTab = document.getElementById('tituloTab')
let variavel = document.getElementById('variavel')
let dadosManuais = document.getElementById('dadosmanuais')
let tipovar = document.getElementById('tipoVar')
let dataTModal = document.getElementById('modalres')
let amostra = document.getElementById('amostra')

function Calcular(){
    let modalTarget = dataTModal
    let vartipo = tipovar.value
    let DMvalor = dadosManuais.value
    let DMSeparado = DMvalor.split(';')
    let pop = 1
    let pass = 1
    tituloTab.innerHTML = variavel.value
    
    if(amostra.checked){
        pop = Math.round(((DMSeparado.length)*400)/((DMSeparado.length)+400))
        pass = Math.trunc(DMSeparado.length/pop)
        for(let i = 0;DMSeparado[i] < DMSeparado.length;i++){
            DMSeparado.splice(i,(pass-1))
        }
    } 
    alert(pop)
    alert(pass)
    alert(DMSeparado)
    alert(DMSeparado.length)
    

    
    
    if ((aux > 0) & (vartipo == 'Quantitativa Discreta')){
        alert("Digite apenas valores númericos")
        modalTarget.setAttribute('data-target','0')

    } else if ((aux > 0) & (vartipo == 'Quantitativa Contínua')) { 
        alert("Digite apenas valores númericos")
        modalTarget.setAttribute('data-target','0')
    
    } else if ((aux == 0) & (vartipo == 'Qualitativa Nominal')) { 
        alert("Digite apenas valores não númericos")
        modalTarget.setAttribute('data-target','0')

    } else if ((aux == 0) & (vartipo == 'Qualitativa Ordinal')) { 
        alert("Digite apenas valores não númericos")
        modalTarget.setAttribute('data-target','0')
        
    } else {
        modalTarget.setAttribute('data-target','#ModalResultado')
    }

    
    
}







