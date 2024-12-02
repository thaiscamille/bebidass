const tabela = document.getElementById("tabela_bebidas")
const bebidas = JSON.parse(localStorage.getItem("bebidas"))

if (!bebidas) {
    localStorage.setItem("bebidas", JSON.stringify([]))
     location.reload()
}

for (let index = 0; index < bebidas.length; index++) {
    const bebida = bebidas[index];
    const linha = `
        <tr>
            <td>${bebida.id}</td>
            <td>${bebida.nome}</td>
            <td>${bebida.quantidade}</td>
            <td>${bebida.descrição}</td>
            <td class="text-center">
                <div class="btn btn-warning" onClick="editarbebidas(${bebida.id})">Editar</div>
                <div class="btn btn-danger" onClick="apagarbebidas(${bebida.id})">Apagar</div>
            </td>
        </tr>
    `
    tabela.innerHTML += linha
}

function ss(id) {
    const bebidas = procurabebidasById(id)
    // abrir modal do id modal_cadastro
    var modal = new bootstrap.Modal(document.getElementById('modal_edicao'));
    const nomeeditar = document.getElementById("nome-editar")
    const quantidadeeditar = document.getElementById("quantidade-editar")
    const descriçãoeditar = document.getElementById("descrição-editar")

    nomeeditar.value =bebidas.nome
    quantidadeeditar.value = bebidas.quantidade
    descriçãoeditar.value = bebidas.descrição

    modal.show(); // 
}

function apagarbebidas(id) {
    Swal.fire({
        title: "Tem certeza?",
        text: "Você não poderá desfazer está ação",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, apagar",
        cancelButtonText: "Cancelar"
      }).then((result) => {
        if (result.isConfirmed) {
            const bebidasAremover = bebidas.findIndex(bebidas => bebidas.id == id)
            bebidas.splice(bebidasAremover, 1)
            localStorage.setItem('bebidas', JSON.stringify(bebidas))
             location.reload()
        }
      });
}

const adicionar_bebidas = document.getElementById("adicionar")

adicionar_bebidas.addEventListener("submit", (event) => {
    event.preventDefault()
    const nomedigitado = document.getElementById("nome-adicionar").value
    const quantidadedigitada = document.getElementById("quantidade-adicionar").value
    const descricaodigitada = document.getElementById("descricao-adicionar").value 

    console.log( quantidadedigitada, descricaodigitada, nomedigitado)

    let bebidas = JSON.parse(localStorage.getItem("bebidas"))
    const ultimoID = bebidas[bebidas.length -1]?.id || 0
    const bebidasAdd = {
        id: ultimoID + 1,
        Nome: nomedigitado ,
        quantidade: quantidadedigitada
    
    }
    
    bebidas.push(bebidasAdd)
    localStorage.setItem('bebidas', JSON.stringify(bebidas))
    location.reload()
})

function procurabebidasBynome (nomedigitado) {
    const bebidas = JSON.parse(localStorage.getItem("bebidas"))
    const found = bebidas.find((bebidas) => {
        return bebidas.nome == nomedigitado 
    })
    return found
}

function procurabebidasById(id) {
    const bebidas = JSON.parse(localStorage.getItem("bebidas"))
    const found = bebidas.find((bebidas) => {
        return bebidas.id == id 
    })
    return found
}