
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