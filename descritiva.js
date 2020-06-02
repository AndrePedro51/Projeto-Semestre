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
let tabelaCorpo = document.getElementById('corpoTabela')
let tabela = document.getElementById('tabela')
let dadosGraf = [
    ['Variável','Frequência']
    
]

    


function drawChart(){
    const container = document.querySelector('#chart')
    const data = new google.visualization.arrayToDataTable(dadosGraf)
    const options = {
        title: "Frequências",
        height: 400,
        width: 820,
        is3D: true,
        backgroundColor: 'transparent',
        titleTextStyle: {color: "white", fontSize: 25},
        legend: {textStyle: {color: 'white', fontSize: 17}}
        
    }
    const chart = new google.visualization.PieChart(container)
    chart.draw(data, options)
}


function Calcular(){
    let modalTarget = dataTModal
    let vartipo = tipovar.value
    let DMvalor = dadosManuais.value
    let DMSeparado = DMvalor.split(';')
    let pop = 1
    let pass = 1
    let aux = 0
    tituloTab.innerHTML  = variavel.value

    //Verificação de dados

    if(variavel.value == "" || vartipo.value == "Selecione..." || medida.value == "Selecione..." || DMSeparado.length == 1){
        alert("Favor inserir todos os dados necessários!")
        modalTarget.setAttribute('data-target','0')
    } else {
        for (let i = 0; i < DMSeparado.length;i++){
        if (isNaN(DMSeparado[i])){
            aux = 1
        }
        }
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

    //Calculo amostra

    if(amostra.checked){
        pop = Math.round(((DMSeparado.length)*400)/((DMSeparado.length)+400))
        pass = Math.trunc(DMSeparado.length/pop)
        for(let i = 0; i < DMSeparado.length;i++){
            DMSeparado.splice(i,(pass-1))
        }
        if (DMSeparado.length > pop){
            for (let i = 0;DMSeparado.length >= pop;i++) {
                DMSeparado.splice(i,(pass-1))
            }
        }
    } 
    let cont = 1
    let acum = 1
    tabelaCorpo.innerHTML = 
    `
    
    
    `
    
    if(vartipo == "Quantitativa Discreta"){
        DMSeparado =  DMSeparado.sort()
        alert(DMSeparado)
        for (let i = 1; i <= DMSeparado.length; i++){
            if(DMSeparado[i] === DMSeparado[i-1]){
                cont++
                acum++
            } else {
                
                let frAtual = parseFloat(((cont/DMSeparado.length)*100).toFixed(2))
                let frAcum = parseFloat(((acum/DMSeparado.length)*100).toFixed(2))
                tabelaCorpo.innerHTML += 
                 `
                        <tr>
                        <th scope = "row"> ${DMSeparado[i-1]}</td>
                        <td>  ${cont} </td>
                        <td> ${frAtual} %</td>
                        <td> ${acum} </td>
                        <td> ${frAcum} %</td>
                        </tr>
                    
                    `
                
                cont = 1
                acum++

            }
        }
        
    }
    

}
    





