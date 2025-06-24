
const DataManager = {
    filterNecessidades(searchTerm = '', tipo = 'todos') {
        const necessidades = this.getAllNecessidades();
        
        return necessidades.filter(n => {
            const searchTermLower = searchTerm.toLowerCase();
            const matchesSearch = !searchTerm || 
                n.titulo.toLowerCase().includes(searchTermLower) ||
                n.descricao.toLowerCase().includes(searchTermLower) ||
                n.nomeInstituicao.toLowerCase().includes(searchTermLower);
            
            const matchesTipo = tipo === 'todos' || n.tipoAjuda === tipo;
            
            return matchesSearch && matchesTipo;
        });
    },
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
        
        const cepInput = document.getElementById('cep');
        cepInput.addEventListener('blur', this.handleCEPBlur.bind(this));
        form.addEventListener('submit', this.handleSubmit.bind(this));
    },

    async handleCEPBlur(event) {
        const cep = event.target.value;
        if (!cep) return;

        try {
            const endereco = await CEPManager.buscarCEP(cep);
            document.getElementById('cidade').value = endereco.cidade;
        } catch (error) {
            Utils.showMessage('message', error.message, 'error');
        }
    },
};


document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('cadastro.html')) {
        FormManager.init();
    }
});

const CEPManager = {
    async buscarCEP(cep) {
        const cleanCEP = cep.replace(/\D/g, '');
        if (cleanCEP.length !== 8) throw new Error('CEP inválido');

        try {
            const response = await fetch(`https://viacep.com.br/ws/${cleanCEP}/json/`);
            const data = await response.json();
            if (data.erro) throw new Error('CEP não encontrado');
            return { cidade: data.localidade || '' };
        } catch (error) {
            throw new Error('Erro ao buscar CEP.');
        }
    }
};

const NecessidadesManager = {
    init() {
        this.setupFilters();
        this.loadNecessidades();
    },

    setupFilters() {
        document.getElementById('search-input')?.addEventListener('input', () => this.loadNecessidades());
        document.getElementById('filter-tipo')?.addEventListener('change', () => this.loadNecessidades());
    },

    loadNecessidades() {
        const searchTerm = document.getElementById('search-input')?.value || '';
        const tipoFilter = document.getElementById('filter-tipo')?.value || 'todos';
        
        const necessidades = DataManager.filterNecessidades(searchTerm, tipoFilter);
        this.renderNecessidades(necessidades);
    },
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

