const inputTarefa = document.querySelector('.input-tarefa');
const btn = document.querySelector('.btn');
const tarefas = document.querySelector('.tarefas');


const criaLi = () =>{
    const li = document.createElement("li")
    return li;
};
inputTarefa.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
      if (!inputTarefa.value) return;
      criaTarefa(inputTarefa.value);
    }
  });

btn.addEventListener("click", () => {
    if(!inputTarefa.value) return
    criaTarefa(inputTarefa.value);
});


const limpaInput = () =>{
    inputTarefa.value = ""
    inputTarefa.focus();
};

const botaoApagar = (li) => {
    li.innerHTML += " "
    const botaoApaga = document.createElement("button")
    botaoApaga.innerHTML = "Apagar"
    botaoApaga.setAttribute("class", "apagar")
    li.appendChild(botaoApaga)

};


const criaTarefa = (valor) =>{
    const li = criaLi();
    li.innerHTML += valor
    tarefas.appendChild(li);
    limpaInput();
    botaoApagar(li);
    salvarTarefas();
};

document.addEventListener("click", (e) => {
    const el = e.target
    if(el.classList.contains("apagar"))
    el.parentElement.remove();
    salvarTarefas()
});

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];
  
    for (let tarefa of liTarefas) {
      let tarefaTexto = tarefa.innerText;
      tarefaTexto = tarefaTexto.replace('Apagar', '').trim();
      listaDeTarefas.push(tarefaTexto);
    }
  
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON);
  }
  
  function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
  
    for(let tarefa of listaDeTarefas) {
      criaTarefa(tarefa);
    }
  }
  adicionaTarefasSalvas();
  