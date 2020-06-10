let medida = document.getElementById("medida")
let barra = document.getElementById("barraMedida")
let vlrBarra = document.getElementById('vlrBarra')
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
        DMSeparado = DMSeparado.sort(function(a, b){return a-b});
        
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
        if(amostra.checked){
            desvioP = parseFloat(Math.sqrt(somaDesvio/(DMSeparado.length-1))).toFixed(2)
        }else{
            desvioP = parseFloat(Math.sqrt(somaDesvio/DMSeparado.length)).toFixed(2)
        }
        
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

    } else if (vartipo == "Quantitativa Contínua"){
        
        DMSeparado.sort(function(a, b){return a-b});
        let z = DMSeparado.length
        let x = parseInt(DMSeparado[z-1]) 
        let y = parseInt(DMSeparado[0])
        let at = x-y
        let qtdClass = parseInt(Math.sqrt(z))
        for(let i = at;i%qtdClass !== 0;i++){
            at++
        }
        let IC = at/qtdClass
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
        let var11 = []
        let var21 = []
        let var31 = []
        let contC = 0
        let acumC = 0
        
        let f = parseInt(var1[0])
        

        for(let i = 0; i <= qtdClass; i++){
            var11.push(f)
            f+=IC
            
        }
        if(var11[var11.length-1] == DMSeparado[DMSeparado.length-1]){
            var11.push(f)
        }


        for(let i = 0; i < var11.length-1; i++){
            for(let j = 0; j < DMSeparado.length;j++){
                if((DMSeparado[j] >= var11[i]) && (DMSeparado[j] < var11[i+1])){
                    contC++
                    acumC++
                }
            }

            var21.push(contC)
            var31.push(acumC)
            contC = 0
        }
       
        for (let i = 0; i < var21.length; i++){ 
            tabelaCorpo.innerHTML += 
                     `
                            <tr>
                            <th scope = "row"> ${var11[i]} |-- ${var11[i+1]} </td>
                            <td>  ${var21[i]} </td>
                            <td> ${parseFloat((var21[i]/DMSeparado.length)*100).toFixed(2)} %</td>
                            <td> ${var31[i]} </td>
                            <td> ${parseFloat((var31[i]/DMSeparado.length)*100).toFixed(2)} %</td>
                            </tr>
                        
                        `
        }
        //calculos gráfico
        for(let j = 0; j < var21.length;j++){
            let s = "" + var11[j] + " |-- " + var11[j+1]
            label[j] = s
            data[j] = var21[j]
    
        }
        //calculo media
        let varMedia = []
        let auxM = 0
        for(let i = 0; i < var11.length-1; i++){
            auxM = (var11[i+1]+var11[i])/2
            varMedia.push(auxM)
        }
        auxM = 0
        for(let i =0;i<var21.length;i++){
            auxM += var21[i]*varMedia[i]
        }
        media = parseFloat(auxM/DMSeparado.length).toFixed(2)
        

        //calculo mediana
        let d = DMSeparado.length
        let pos1x = (d/2)
        let pos1 = Math.round((d/2))
        
        let d1 = 0
        let d2 = 0
        let d3 = 0
        let md = 0
        for(let i =0; i < var11.length-1;i++){
            if((DMSeparado[pos1] >= var11[i]) && (DMSeparado[pos1] < var11[i+1])){
                d1 = var11[i]
                d2 = var31[i-1]
                d3 = var21[i]
            }
        }
        

        md = parseFloat((d1)+((pos1x-d2)/d3)*IC).toFixed(2)

        //calculo moda
        let maior = 0
        let moda
        for(let i = 0; i<var21.length;i++){
            if(var21[i] > maior){
                maior = var21[i]
                moda = `Moda: ${(var11[i]+var11[i+1])/2}`
            }else if (maior == var21[i]){
                moda+= ` ,${(var11[i]+var11[i+1])/2}`
    
            }
        }
        //calculo desvio padão
        let somaDesvio = 0
        let desvioP = 0
        
        for (let i = 0; i < varMedia.length;i++){
            somaDesvio += (Math.pow((varMedia[i]-media),2))*var21[i]
            
        }
        if(amostra.checked){
            desvioP = parseFloat(Math.sqrt(somaDesvio/(DMSeparado.length-1))).toFixed(2)
        }else{
            desvioP = parseFloat(Math.sqrt(somaDesvio/DMSeparado.length)).toFixed(2)
        }
        
        let coefVar = parseFloat((desvioP/media)*100).toFixed(2)
        //calculo medida separatriz
        let pos = Math.round(DMSeparado.length*(barra.value/100))
        let posx = DMSeparado.length*(barra.value/100)
        let g1 = 0
        let g2 = 0
        let g3 = 0
        let MS = 0
        
        for(let i =0; i < var11.length-1;i++){
            if((DMSeparado[pos] >= var11[i]) && (DMSeparado[pos] < var11[i+1])){
                g1 = var11[i]
                g2 = var31[i-1]
                g3 = var21[i]
            }
        }
        MS = parseFloat(g1+(((posx-g2)/g3)*IC)).toFixed(2)
        if(isNaN(MS)){
            MS = parseFloat(g1+(((posx-0)/g3)*IC)).toFixed(2)
        }



        medidas.innerHTML += 
        `
        <h5>Média: ${media}</h5>
        <h5>Mediana: ${md}</h5>
        <h5>${moda}</h5>
        <h5>Desvio padrão: ${desvioP}</h5>
        <h5>Coeficiente da variação: ${coefVar}%</h5>
        <h5>${medida.value} ${barra.value}% : ${MS}</h5>
    
        `
        
        
        
        

    } else if(vartipo == "Qualitativa Nominal"){
        DMSeparado = DMSeparado.sort();
        
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
        media = 'Não tem'
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
        //calculo medida separatriz
        let medidaSeparatriz = DMSeparado[Math.round(DMSeparado.length*(barra.value/100))] 

        
        
        
        medidas.innerHTML += 
        `
        <h5>Média: ${media}</h5>
        <h5>Mediana: ${mediana}</h5>
        <h5>${moda}</h5>
        <h5>${medida.value} ${barra.value}% : ${medidaSeparatriz}</h5>
    
        `
    }else if(vartipo == "Qualitativa Ordinal"){
        DMSeparado = DMSeparado.sort();
        
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
        media = 'Não tem'
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
        //calculo medida separatriz
        let medidaSeparatriz = DMSeparado[Math.round(DMSeparado.length*(barra.value/100))] 

        
        
        
        medidas.innerHTML += 
        `
        <h5>Média: ${media}</h5>
        <h5>Mediana: ${mediana}</h5>
        <h5>${moda}</h5>
        <h5>${medida.value} ${barra.value}% : ${medidaSeparatriz}</h5>
    
        `
    }

    


    

} 
    





