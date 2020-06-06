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
    medidas.innerHTML = 
    `
    

    `
     
    

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
    let mediana =[]
    
    if(vartipo == "Quantitativa Discreta"){
        DMSeparado =  DMSeparado.sort()
        
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
    //adicionar dados no gráfico
    for(let j = 0; j < var1.length;j++){
        label[j] = var1[j]
        data[j] = var2[j]

    }
    //calculo media
    let teste = DMSeparado
    let somamedia = 0
    for(let i = 0; i < teste.length;i++){
        somamedia +=  parseInt(teste[i]) 
    }
    media = parseFloat(somamedia/DMSeparado.length).toFixed(2)
    //calculo mediana
    let x = DMSeparado.length
    if((x % 2) == 1){
        let pos1 = parseInt(x/2)
        mediana.push(DMSeparado[pos1])
    }else{
        let pos1 = (x/2)-1
        let pos2 = (x/2)
        mediana.push(DMSeparado[pos1])
        mediana.push(DMSeparado[pos2])
    }
    //calculo moda
    let maior = 0
    let moda
    for(let i = 0; i<var2.length;i++){
        if(var2[i] > maior){
            maior = var2[i]
            moda = `Moda: ${var1[i]}`
        }else if (maior == var2[i]){
            moda+= ` ,${var1[i]}`

        }
    }
    //calculo desvio padão
    let somaDesvio = 0
    let desvioP = 0
    for (let i = 0; i < var1.length;i++){
        somaDesvio += (Math.pow(var1[i]-media,2))*var2[i]
        
    }
    
    desvioP = parseFloat(Math.sqrt(somaDesvio/DMSeparado.length)).toFixed(2)
    let coefVar = parseFloat((desvioP/media)*100).toFixed(2)
    //calculo medida separatriz
    let medidaSeparatriz = DMSeparado[Math.round(DMSeparado.length*(barra.value/100))] 
    medidas.innerHTML += 
    `
    <h5>Média: ${media}</h5>
    <h5>Mediana: ${mediana}</h5>
    <h5>${moda}</h5>
    <h5>Desvio Padrão: ${desvioP}</h5>
    <h5>Coeficiente da variação: ${coefVar}%</h5>
    <h5>${medida.value} ${barra.value}% : ${medidaSeparatriz}</h5>

    `

    


    

} 
    





