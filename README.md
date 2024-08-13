Cadastro de Fornecedores e Produtos
Este projeto é parte de um desafio técnico, cujo objetivo é construir um formulário para cadastro de fornecedores e produtos. O desenvolvimento foi realizado utilizando HTML5, JavaScript (ECMA-6), Bootstrap, CSS e jQuery 3.5.1.

------🎯 Objetivo do Projeto------
Avaliar os conhecimentos técnicos no desenvolvimento de um formulário de cadastro, respeitando os requisitos fornecidos e implementando as funcionalidades necessárias para garantir uma boa experiência de usuário e qualidade no código.

-----📋 Requisitos Técnicos------
Tecnologias Utilizadas:
HTML: versão 5
JavaScript: preferência ao ECMAScript 6 (ECMA-6)
Bootstrap: versão 4 ou 5 para estilização
CSS: para personalização do layout
jQuery: versão 3.5.1

Outras Considerações:
Documentação de Recursos e Estilos: Foi utilizado o link de referência para padronização do estilo e recursos.
Sem Recursos Externos: Não foram utilizados outros frameworks ou bibliotecas além dos especificados.

-----📝 Funcionalidades do Formulário------
Campos Obrigatórios:
Razão Social
Nome Fantasia
CNPJ
Endereço: Deve ser preenchido automaticamente via API de consulta por CEP.
Nome da Pessoa de Contato
Telefone
E-mail
Tabela de Produtos:
Descrição
Unidade de Medida
Quantidade em Estoque
Valor Unitário
Valor Total: Preenchido automaticamente com base na quantidade e valor unitário.
Tabela de Anexos:
Inclusão de Documentos: Pelo menos 1 documento deve ser anexado.
Memória: Os documentos são armazenados em memória (Blob e Session Storage) para envio.
Botão Excluir (Lixeira): Remove o documento da memória.
Botão Visualizar (Olho): Permite o download do documento.
Ação "Salvar Fornecedor":

-----🗂 Estrutura de Pastas------
plaintext
Copiar código
├── index.html
├── css/
│ ├── style.css
├── js/
│ ├── script.js
├── img/
│ ├── ... (imagens utilizadas)
├── docs/
│ ├── layout.png (Layout de referência)
└── README.md

-----🛠 Como Executar o Projeto------
Clone o Repositório:

bash
Copiar código
git clone https://github.com/seu-usuario/nome-do-repositorio.git
Navegue até o Diretório do Projeto:

bash
Copiar código
cd nome-do-repositorio
Abra o arquivo index.html no navegador:

Você pode simplesmente arrastar o arquivo index.html para uma nova aba do seu navegador ou clicar duas vezes no arquivo.
