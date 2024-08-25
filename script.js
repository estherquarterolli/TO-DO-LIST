const localStoragename = 'to-do-list-gn';

function newTask() {
    let input = document.getElementById('input_new_task');
    
    // Validação
    if (!input.value.trim()) {
        alert('Campo em branco, insira uma nova task!');
        return;
    }

    // Verifica se o valor já existe
    let values = JSON.parse(localStorage.getItem(localStoragename) || "[]");
    if (values.some(task => task.name === input.value.trim())) {
        alert('ESSA TAREFA JÁ EXISTE'); 
        input.style.boxShadow = '0 0 10px red'; // Adiciona sombra vermelha
        return;
    }

    // Remove a sombra vermelha se o valor não for duplicado
    input.style.boxShadow = 'none';

    // Incrementa local storage
    values.push({
        name: input.value.trim(),
        completed: false // Adiciona um campo para o estado da tarefa
    });
    
    localStorage.setItem(localStoragename, JSON.stringify(values));
    showValues(); 
    input.value = ''; 
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStoragename) || "[]");
    
    let list = document.getElementById('to_do_list');
    list.innerHTML = '';
    
    values.forEach((item, index) => {
        list.innerHTML += `
            <li class="${item.completed ? 'completed' : ''}">
                <button class="btn_checkvazio" data-index="${index}">
                    <ion-icon name="${item.completed ? 'checkmark-circle' : 'checkmark-circle-outline'}"></ion-icon>
                </button>
                ${item.name}
                <button class="btn_apagartask" data-index="${index}">
                    <ion-icon name="trash-bin-outline"></ion-icon>
                </button>
            </li>`;
    });

    // Adiciona event listeners para os botões
    document.querySelectorAll('.btn_checkvazio').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            toggleTaskComplete(index);
        });
    });

    document.querySelectorAll('.btn_apagartask').forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteTask(index);
        });
    });
}

function toggleTaskComplete(index) {
    let values = JSON.parse(localStorage.getItem(localStoragename) || "[]");
    values[index].completed = !values[index].completed; // Alterna o estado da tarefa
    localStorage.setItem(localStoragename, JSON.stringify(values));
    showValues(); // Atualiza a lista exibida
}

function deleteTask(index) {
    let values = JSON.parse(localStorage.getItem(localStoragename) || "[]");
    values.splice(index, 1); // Remove a tarefa pelo índice
    localStorage.setItem(localStoragename, JSON.stringify(values));
    showValues(); // Atualiza a lista exibida
}

// Atualiza a lista quando a página é carregada
document.addEventListener('DOMContentLoaded', showValues);
