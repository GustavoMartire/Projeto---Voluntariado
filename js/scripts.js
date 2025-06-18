
const DataManager = {
    STORAGE_KEY: 'rede_do_bem_necessidades',

    saveNecessidade(necessidade) {
        const necessidades = this.getAllNecessidades();
        necessidade.id = Date.now().toString();
        necessidade.dataCadastro = new Date().toISOString();
        necessidades.push(necessidade);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(necessidades));
    },

    getAllNecessidades() {
        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }
};


function addDemoData() {
    if (!localStorage.getItem('rede_do_bem_demo_added')) {
        const exemploNecessidades = [
            {
                nomeInstituicao: "ONG Esperança",
                tipoAjuda: "Educação",
                titulo: "Professores voluntários para reforço escolar",
                descricao: "Precisamos de voluntários para ajudar crianças com dificuldades em matemática.",
                cep: "01310-100",
                cidade: "São Paulo",
                contato: "contato@ongesperanca.org"
            },
            {
                nomeInstituicao: "Instituto Verde",
                tipoAjuda: "Meio Ambiente",
                titulo: "Mutirão de limpeza no parque",
                descricao: "Vamos realizar um mutirão de limpeza no parque municipal. Traga luvas!",
                cep: "22071-900",
                cidade: "Rio de Janeiro",
                contato: "(21) 99999-8888"
            }
        ];

        exemploNecessidades.forEach(necessidade => DataManager.saveNecessidade(necessidade));
        localStorage.setItem('rede_do_bem_demo_added', 'true');
    }
}

addDemoData();


const Utils = {
    showMessage(elementId, message, type = 'success') {
        const messageEl = document.getElementById(elementId);
        if (messageEl) {
            messageEl.textContent = message;
            messageEl.className = `message ${type}`;
            messageEl.style.display = 'block';
            setTimeout(() => { messageEl.style.display = 'none'; }, 5000);
        }
    }
};


const FormManager = {
    init() {
        const form = document.getElementById('form-necessidade');
        if (!form) return;
        form.addEventListener('submit', this.handleSubmit.bind(this));
    },

    handleSubmit(event) {
        event.preventDefault();
        try {
            const necessidade = {
                nomeInstituicao: document.getElementById('nome-instituicao').value.trim(),
                tipoAjuda: document.getElementById('tipo-ajuda').value,
                titulo: document.getElementById('titulo').value.trim(),
                descricao: document.getElementById('descricao').value.trim(),
                cep: document.getElementById('cep').value.trim(),
                cidade: document.getElementById('cidade').value.trim(),
                contato: document.getElementById('contato').value.trim()
            };

            if (!necessidade.nomeInstituicao || !necessidade.titulo || !necessidade.descricao || !necessidade.contato) {
                throw new Error('Por favor, preencha todos os campos obrigatórios.');
            }

            DataManager.saveNecessidade(necessidade);
            Utils.showMessage('message', 'Necessidade cadastrada com sucesso!', 'success');
            event.target.reset();

            setTimeout(() => { window.location.href = 'necessidades.html'; }, 2000);

        } catch (error) {
            Utils.showMessage('message', error.message, 'error');
        }
    }
};


document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('cadastro.html')) {
        FormManager.init();
    }
});










const NecessidadesManager = {
    init() {
        this.loadNecessidades();
    },

    loadNecessidades() {
        const necessidades = DataManager.getAllNecessidades();
        this.renderNecessidades(necessidades);
    },

    renderNecessidades(necessidades) {
        const container = document.getElementById('cards-container');
        if (necessidades.length === 0) {
            container.innerHTML = `
                <div class="card">
                    <h3>Nenhuma necessidade encontrada</h3>
                    <p class="description">Seja o primeiro a cadastrar uma necessidade!</p>
                    <a href="cadastro.html" class="btn btn-primary">➕ Cadastrar</a>
                </div>
            `;
            return;
        }

        container.innerHTML = necessidades.map(n => `
            <div class="card">
                <span class="type-badge">${n.tipoAjuda}</span>
                <h3>${n.titulo}</h3>
                <p class="institution">🏢 ${n.nomeInstituicao}</p>
                <p class="description">${n.descricao}</p>
                <p class="location">📍 ${n.cidade}</p>
                <p class="contact">📞 <strong>${n.contato}</strong></p>
            </div>
        `).join('');
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname;

    if (page.includes('cadastro.html')) {
        FormManager.init();
    } else if (page.includes('necessidades.html')) {
        NecessidadesManager.init();
    }
    
    addDemoData();
});