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
let grafico = document.getElementById('grafico')
let medidas = document.getElementById('medidas')
let label = []
let data = []

  





function Calcular(){
    
    let modalTarget = dataTModal
    let vartipo = tipovar.value
    let DMvalor = dadosManuais.value
    let DMSeparado = DMvalor.split(';')
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


    
    let cont = 1
    let acum = 1
    tabelaCorpo.innerHTML = 
    `
    
    
    `
    let a = 0
    let var1 = []
    let var2 = []
    let var3 = []
    let media = 0
    let acummedia = 0
    if(vartipo == "Quantitativa Discreta"){
        DMSeparado =  DMSeparado.sort()
        alert(DMSeparado)
        for (let i = 1; i <= DMSeparado.length; i++){
            if(DMSeparado[i] === DMSeparado[i-1]){
                cont++
                acum++
                
            } else {
                var1.push(DMSeparado[i-1])
                var2.push(cont)
                var3.push(acum)
                acum++
                a++
                cont = 1
                

            }
        }
        

    }
    for (let i = 0; i < var1.length; i++){
        tabelaCorpo.innerHTML += 
                 `
                        <tr>
                        <th scope = "row"> ${var1[i]} </td>
                        <td>  ${var2[i]} </td>
                        <td> ${parseFloat((var2[i]/DMSeparado.length)*100).toFixed(2)} %</td>
                        <td> ${var3[i]} </td>
                        <td> ${parseFloat((var3[i]/DMSeparado.length)*100).toFixed(2)} %</td>
                        </tr>
                    
                    `
    }
    
    for(let j = 0; j < var1.length;j++){
        label[j] = var1[j]
        data[j] = var2[j]

    }
    let teste = DMSeparado
    let soma = 0
    for(let i = 0; i < teste.length;i++){
        soma +=  parseInt(teste[i]) 
    }
    media = parseFloat(soma/DMSeparado.length).toFixed(2)
    medidas.innerHTML += 
    `
    <h5>Média: ${media}</h5>
    <h5></h5>
    <h5></h5>
    <h5></h5>

    `

    alert(media)
    alert(soma)
    alert(label)
    alert(data)


    

} 
    





