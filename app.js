

/*Definida uma objeto para abstrair valores do Usuario*/

class Despesa{
   constructor(ano, mes, dia, tipo, descricao, valor){
       this.ano = ano
       this.mes = mes
       this.dia = dia
       this.tipo = tipo
       this.descricao = descricao
       this.valor = valor
   }

   validarDados(){
    for(let i in this) {
        if(this[i] == undefined || this[i] == '' || this[i] == null){
            return false
        }    
    }

    return true
   }

}

//funcção para gravad no local Storage

class Bd {
    constructor(){
        let id = localStorage.getItem('id')
        // se id for identico a null
        if(id === null){
            localStorage.setItem('id', 0)
         }
    }
    // funcion gravar
    //anexar dados Web sotorage
    getProximoId(){
         // getItem => recuperar dados
          let proximoId = localStorage.getItem('id')
          return parseInt(proximoId) + 1
    }
    gravar(d){
        let id = this.getProximoId()
        //convertendo arquivos em JSON
        // setItem => inserir dados
        localStorage.setItem(id, JSON.stringify(d))
        // adicionando proximo valor
        // ha uma variavel
        
        localStorage.setItem('id', id)
         
        
    }

    recuperarTodosRegistros(){
        // array despesas
        let despesas = Array()
        let id = localStorage.getItem('id')
        // todas despesas local storage
        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))

            if(despesa === null){
                 continue
            }

            // add Array
            despesas.push(despesa)
        }
        return despesas
    }
}

// criado ojjeto Bd()
let bd = new Bd()


function cadastrarDespesa(){

    //selecção de valores atraves do id
    // dia /  mes / ano 
   let ano =  document.getElementById('ano')
   let mes = document.getElementById('mes')
   let dia = document.getElementById('dia')
    
    // seleção de valores atraves do id
    // valor/ descricao / valor

    let tipo =  document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

   
     // console.log(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value)

   let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
        )
        
        //validação de dados
        if(despesa.validarDados()) {
        bd.gravar(despesa)
    
            document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
            document.getElementById('modal_titulo_div').className = 'modal-header text-success'
            document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
            document.getElementById('modal_btn').innerHTML = 'Voltar'
            document.getElementById('modal_btn').className = 'btn btn-success'
    
            //dialog de sucesso
            $('#modalRegistraDespesa').modal('show') 
        } else {
            
            document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do registro'
            document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
            document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente!'
            document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir'
            document.getElementById('modal_btn').className = 'btn btn-danger'
    
            //dialog de erro
            $('#modalRegistraDespesa').modal('show') 
        }
    }
    

    function carregaListaDespesas(){
        let despesas = Array()
        despesas = bd.recuperarTodosRegistros()
        var listaDespesas = document.getElementById('listaDespesas')



         despesas.forEach(function(d){
            // criar linhas
            let linha = listaDespesas.insertRow()
            // criar colunas
            linha.insertCell(0).innerHTML = `${d.dia} / ${d.mes} / ${d.ano}`
            

           switch(d.tipo){
               case '1': d.tipo = 'Alimentação'
                   break
               case '2': d.tipo = 'Educação'
                   break
               case '3': d.tipo = 'Lazer'
                   break
               case '4': d.tipo = 'Saúde'
                   break
               case '5': d.tipo = 'Transporte'
                   break
           }
            linha.insertCell(1).innerHTML = d.tipo

            linha.insertCell(2).innerHTML = d.descricao
            linha.insertCell(3).innerHTML = d.valor
           
         })
 }




