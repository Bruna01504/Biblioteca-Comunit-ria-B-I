// Alternador de Abas do Menu
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('nav button').forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'active-tab');
    });

    document.getElementById(`tab-${tabId}`).classList.remove('hidden');
    document.getElementById(`nav-${tabId}`).classList.add('bg-indigo-600', 'active-tab');
    
    carregarDadosDashboard();
}

// Carregar Estatísticas do Topo
async function carregarStats() {
    try {
        const res = await fetch('/api/stats');
        const stats = await res.json();
        
        document.getElementById('stat-ativos').innerText = stats.emprestimosAtivos;
        document.getElementById('stat-atraso').innerText = stats.emAtraso;
        document.getElementById('stat-leitores').innerText = stats.leitoresCadastrados;
        document.getElementById('stat-livros').innerText = stats.livrosDisponiveis;
    } catch (error) {
        console.error("Erro ao carregar estatísticas:", error);
    }
}

// Carregar Leitores, Livros e Empréstimos no Painel
async function carregarDadosDashboard() {
    const hoje = new Date().toISOString().split('T')[0];
    
    // Atualiza estatísticas sempre que recarregar o painel
    carregarStats();

    try {
        // 1. Busca e renderiza os seletores do formulário de empréstimo
        const resLeitores = await fetch('/api/leitores');
        const leitores = await resLeitores.json();
        const selectLeitor = document.getElementById('emp-leitor');
        if (selectLeitor) {
            selectLeitor.innerHTML = '<option value="">Selecione o Leitor</option>' + 
                leitores.map(l => `<option value="${l.id}">${l.nome}</option>`).join('');
        }

        const resLivros = await fetch('/api/livros');
        const livros = await resLivros.json();
        const selectLivro = document.getElementById('emp-livro');
        if (selectLivro) {
            selectLivro.innerHTML = '<option value="">Selecione o Livro</option>' + 
                livros.map(l => `<option value="${l.id}">${l.titulo} (${l.quantidade} disponíveis)</option>`).join('');
        }

        // 2. Busca e renderiza a tabela de Empréstimos Ativos
        const resEmprestimos = await fetch('/api/emprestimos');
        const emprestimos = await resEmprestimos.json();
        
        const tabela = document.getElementById('lista-emprestimos');
        if (!tabela) return;

        tabela.innerHTML = emprestimos.length === 0 
            ? '<tr><td colspan="5" class="py-8 text-center text-slate-400 italic">Nenhum empréstimo pendente no momento.</td></tr>' 
            : '';

        emprestimos.forEach(emp => {
            const estaAtrasado = emp.data_devolucao_prevista < hoje;
            const statusBadge = estaAtrasado 
                ? '<span class="bg-red-100 text-red-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Atrasado</span>' 
                : '<span class="bg-emerald-100 text-emerald-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">No Prazo</span>';

            tabela.innerHTML += `
                <tr class="group hover:bg-slate-50 transition-colors">
                    <td class="py-4 px-2">
                        <div class="font-semibold text-slate-700">${emp.leitor_name}</div>
                    </td>
                    <td class="py-4 px-2 text-slate-500 text-sm">${emp.livro_titulo}</td>
                    <td class="py-4 px-2 text-slate-500 text-sm">${emp.data_devolucao_prevista.split('-').reverse().join('/')}</td>
                    <td class="py-4 px-2">${statusBadge}</td>
                    <td class="py-4 px-2 text-right">
                        <button onclick="devolverLivro(${emp.id})" class="text-indigo-600 hover:text-indigo-800 font-bold text-xs cursor-pointer bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">
                            Receber
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        console.error("Erro ao carregar dados do painel:", error);
    }
}

// Envios de Formulários para a API (POSTs)
document.getElementById('form-leitor').addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
        nome: document.getElementById('lei-nome').value,
        telefone: document.getElementById('lei-telefone').value,
        email: document.getElementById('lei-email').value
    };
    try {
        await fetch('/api/leitores', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(dados) });
        alert('Leitor cadastrado com sucesso!');
        e.target.reset();
        carregarStats();
    } catch (err) {
        alert('Erro ao cadastrar leitor.');
    }
});

document.getElementById('form-livro').addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
        titulo: document.getElementById('liv-titulo').value,
        autor: document.getElementById('liv-autor').value,
        quantidade: parseInt(document.getElementById('liv-qtd').value)
    };
    try {
        await fetch('/api/livros', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(dados) });
        alert('Livro adicionado ao acervo!');
        e.target.reset();
        carregarStats();
    } catch (err) {
        alert('Erro ao adicionar livro.');
    }
});

document.getElementById('form-emprestimo').addEventListener('submit', async (e) => {
    e.preventDefault();
    const dados = {
        leitor_id: document.getElementById('emp-leitor').value,
        livro_id: document.getElementById('emp-livro').value,
        data_devolucao_prevista: document.getElementById('emp-data').value
    };
    
    const response = await fetch('/api/emprestimos', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(dados) });
    if (response.ok) {
        alert('Empréstimo registrado com sucesso!');
        carregarDadosDashboard();
    } else {
        const err = await response.json();
        alert(`Erro: ${err.error}`);
    }
});

// Ação de Devolução
async function devolverLivro(id) {
    if (confirm('Confirmar a devolução deste livro?')) {
        try {
            await fetch(`/api/emprestimos/${id}/devolver`, { method: 'POST' });
            carregarDadosDashboard();
        } catch (err) {
            alert('Erro ao processar devolução.');
        }
    }
}

// Inicializa chamando a aba inicial ao carregar o script
document.addEventListener('DOMContentLoaded', () => {
    carregarDadosDashboard();
});
