function cleanForm() {
    //Limpa valores do formulário de cep.
    document.getElementById('address').value=("");
    document.getElementById('city').value=("");
    document.getElementById('uf').value=("");
}

function fillFields(conteudo) {
try {
    //Atualiza os campos com os valores.
    document.getElementById('address').value=(conteudo.logradouro);
    document.getElementById('city').value=(conteudo.localidade);
    document.getElementById('uf').value=(conteudo.uf);

} catch(err) {
    //CEP não Encontrado.
    cleanForm();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    const validaCep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validaCep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.getElementById('address').value="...";
        document.getElementById('city').value="...";
        document.getElementById('uf').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=fillFields';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        cleanForm();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    cleanForm();
}
};

const itemsToCollect = document.querySelectorAll(".items-grid li")
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")
let selectedItems = []



function handleSelectedItem(event){
    const itemLi = event.target
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    //const alreadySelected = selectedItems.findIndex( item => item === itemId)
    const alreadySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId
        return itemFound
    })
    if(alreadySelected >= 0){
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferente = item != itemId
            return itemIsDifferente
        })
        selectedItems = filteredItems
    } else {
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
}



/*function popularUfs() {
    const ufSelect = document.querySelector("select[name=uf]")
        try{
        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( response => response.json())
        .then (states => {
            for (state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
    } catch (err){
        console.error(err)
    }
}

popularUfs()

function getCities(){
    const citySelect = document.querySelector("select[name=uf]")
    const stateInput = documnet.querySelector("input[name=satate]")

    const ufValue =  event.target.value
    const indexOfSelectedState = event.target.selectedIndex
    state.Input.value =  event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
        try{
        citySelect.innerHTML = ""
        citySelect.disable = true  

        fetch("url")
        .then( response => response.json())
        .then (cities => {

            for (city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`   
        }

        })
    } catch (err){
        console.error(err)
    }
}
 
document.querySelector("select[name="uf"]")
.addEventListener("change",getCities)
}


*/