Projeto Rede do Bem

Introdução
Este repositório contém o código-fonte do projeto "Rede do Bem", uma plataforma web desenvolvida como parte de um estudo prático de tecnologias front-end. O objetivo da aplicação é servir como um intermediário entre organizações que necessitam de auxílio e voluntários dispostos a ajudar, facilitando a conexão entre eles.

Funcionalidades Principais

-Cadastro de Necessidades: As instituições podem registrar suas demandas através de um formulário dedicado.
-Consulta de Endereço via API: Integração com a API ViaCEP para o preenchimento automático de campos de endereço (cidade e estado) a partir da inserção do CEP.
-Listagem Dinâmica: As necessidades registradas são exibidas dinamicamente na página principal, utilizando manipulação do DOM para renderizar os cartões de informação.
-Busca e Filtragem: A plataforma oferece funcionalidades de pesquisa por palavra-chave e filtragem por categoria, permitindo aos usuários encontrar necessidades específicas de  
forma eficiente.
-Persistência de Dados: Utilização do localStorage do navegador para armazenar os dados cadastrados, garantindo que as informações persistam entre as sessões do usuário.
Tecnologias Aplicadas
gi
O projeto foi desenvolvido utilizando exclusivamente tecnologias web fundamentais:

HTML5: Empregado para a estruturação semântica do conteúdo da aplicação.
CSS3: Utilizado para a estilização completa da interface, incluindo a criação de layouts responsivos com Flexbox e Grid, além de animações e uso de variáveis para um tema consistente.
JavaScript (ES6+): Responsável por toda a lógica de interatividade da aplicação, incluindo manipulação do DOM, gerenciamento de eventos, validações de formulário e a comunicação com APIs externas.