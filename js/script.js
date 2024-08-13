$(document).ready(function () {
    // Função para mostrar mensagens de erro
    function mostrarErro(campoId, mensagem) {
        $(`#${campoId}`).addClass('invalid');
        $(`#error${campoId.charAt(0).toUpperCase() + campoId.slice(1)}`).text(mensagem).show();
    }

    // Função para ocultar mensagens de erro
    function ocultarErro(campoId) {
        $(`#${campoId}`).removeClass('invalid');
        $(`#error${campoId.charAt(0).toUpperCase() + campoId.slice(1)}`).hide();
    }

    // Verifica se todos os campos obrigatórios estão preenchidos
    function validarFormulario() {
        let valido = true;

        // Verificar Razão Social
        if ($('#razaoSocial').val().trim() === '') {
            mostrarErro('razaoSocial', 'Campo obrigatório');
            valido = false;
        } else {
            ocultarErro('razaoSocial');
        }

        // Verificar Nome Fantasia
        if ($('#nomeFantasia').val().trim() === '') {
            mostrarErro('nomeFantasia', 'Campo obrigatório');
            valido = false;
        } else {
            ocultarErro('nomeFantasia');
        }

        // Verificar CNPJ
        if ($('#cnpj').val().trim() === '') {
            mostrarErro('cnpj', 'Campo obrigatório');
            valido = false;
        } else {
            ocultarErro('cnpj');
        }

        // Verificar CEP
        if ($('#cep').val().trim() === '') {
            mostrarErro('cep', 'Campo obrigatório');
            valido = false;
        } else {
            ocultarErro('cep');
        }

        // Verificar Endereço
        if ($('#endereco').val().trim() === '') {
            mostrarErro('endereco', 'Campo obrigatório');
            valido = false;
        } else {
            ocultarErro('endereco');
        }

        // Verificar Nome da Pessoa de Contato
        if ($('#nomeContato').val().trim() === '') {
            mostrarErro('nomeContato', 'Campo obrigatório');
            valido = false;
        } else {
            ocultarErro('nomeContato');
        }

        // Verificar Telefone
        if ($('#telefone').val().trim() === '') {
            mostrarErro('telefone', 'Campo obrigatório');
            valido = false;
        } else {
            ocultarErro('telefone');
        }

        // Verificar E-mail
        if ($('#email').val().trim() === '') {
            mostrarErro('email', 'Campo obrigatório');
            valido = false;
        } else {
            ocultarErro('email');
        }

        // Verificar Produtos
        let produtosValido = false;
        $('.produto-item').each(function () {
            let produto = $(this).find('.produto').val().trim();
            let unidadeMedida = $(this).find('.unidadeMedida').val();
            let qtdEstoque = $(this).find('.qtdEstoque').val().trim();
            let valorUnitario = $(this).find('.valorUnitario').val().trim();

            if (produto && unidadeMedida && qtdEstoque && valorUnitario) {
                produtosValido = true;
            }
        });
        if (!produtosValido) {
            $('#produtosList').prepend('<div class="alert alert-danger">É obrigatório adicionar pelo menos um produto.</div>');
            valido = false;
        }

        // Verificar Anexos
        if ($('#anexosLista').children().length === 0) {
            mostrarErro('fileUpload', 'É obrigatório anexar pelo menos um documento.');
            valido = false;
        } else {
            ocultarErro('fileUpload');
        }

        return valido;
    }

    // Função para preencher o endereço usando a API ViaCEP
    $('#cep').on('blur', function() {
        const cep = $(this).val().replace(/\D/g, '');
        if (cep.length === 8) {
            $.getJSON(`https://viacep.com.br/ws/${cep}/json/`, function(data) {
                if (!data.erro) {
                    $('#endereco').val(data.logradouro);
                    $('#bairro').val(data.bairro);
                    $('#municipio').val(data.localidade);
                    $('#estado').val(data.uf);
                } else {
                    alert('CEP não encontrado.');
                }
            });
        }
    });

    // Adicionar produto
    $('#adicionarProduto').on('click', function () {
        let produtoCount = $('.produto-item').length + 1;
        let produtoHtml = `
            <div class="produto-item mb-3" data-produto-id="${produtoCount}">
                <div class="d-flex justify-content-between align-items-center mb-2">
                    <h5>Produto - ${produtoCount}</h5>
                    <button class="btn btn-danger btn-sm excluirProduto">Excluir</button>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-2 d-flex align-items-center">
                        <img src="assets/produto.png" class="produto-img" alt="Produto">
                    </div>
                    <div class="form-group col-md-10">
                        <label for="produto${produtoCount}">Produto <span class="text-danger">*</span></label>
                        <input type="text" class="form-control produto" id="produto${produtoCount}" required>
                        <div class="invalid-feedback">Campo obrigatório</div>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-2">
                        <label for="unidadeMedida${produtoCount}">UND. Medida <span class="text-danger">*</span></label>
                        <select class="form-control unidadeMedida" id="unidadeMedida${produtoCount}" required>
                            <option value="">Selecione</option>
                            <option value="unidade">Unidade</option>
                            <option value="kg">Kg</option>
                            <option value="litro">Litro</option>
                        </select>
                        <div class="invalid-feedback">Campo obrigatório</div>
                    </div>
                    <div class="form-group col-md-2">
                        <label for="qtdEstoque${produtoCount}">QTDE. em Estoque <span class="text-danger">*</span></label>
                        <input type="number" class="form-control qtdEstoque" id="qtdEstoque${produtoCount}" required>
                        <div class="invalid-feedback">Campo obrigatório</div>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="valorUnitario${produtoCount}">Valor Unitário <span class="text-danger">*</span></label>
                        <input type="number" class="form-control valorUnitario" id="valorUnitario${produtoCount}" required>
                        <div class="invalid-feedback">Campo obrigatório</div>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="valorTotal${produtoCount}">Valor Total <span class="text-danger">*</span></label>
                        <input type="text" class="form-control valorTotal" id="valorTotal${produtoCount}" readonly>
                        <div class="invalid-feedback">Campo obrigatório</div>
                    </div>
                </div>
            </div>
        `;
        $('#produtosList').append(produtoHtml);
        document.querySelector('.produto-item:last-child').style.border = '2px solid black';
    });

    // Calcular valor total automaticamente
    $(document).on('input', '.qtdEstoque, .valorUnitario', function () {
        let $produtoItem = $(this).closest('.produto-item');
        let qtdEstoque = $produtoItem.find('.qtdEstoque').val();
        let valorUnitario = $produtoItem.find('.valorUnitario').val();
        let valorTotal = qtdEstoque * valorUnitario;
        $produtoItem.find('.valorTotal').val(valorTotal.toFixed(2));
    });

    // Excluir produto
    $(document).on('click', '.excluirProduto', function () {
        $(this).closest('.produto-item').remove();
    });

    let anexos = {}; // Armazena os anexos em memória

    // Adicionar anexo
    $('#adicionarAnexo').on('click', function () {
        let files = $('#fileUpload')[0].files;
        if (files.length === 0) {
            $('#errorFileUpload').text('É obrigatório anexar pelo menos um documento.').show();
            return;
        }
        $('#errorFileUpload').hide();

        let anexosHtml = '';
        let existingAnexosCount = $('#anexosLista .anexo-item').length;

        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            let fileId = existingAnexosCount + i;
            anexos[fileId] = file; // Armazena o arquivo na memória

            anexosHtml += `
                <div class="anexo-item d-flex justify-content-start align-items-center mb-2" data-file-id="${fileId}">
                    <button class="btn btn-link p-0 excluirAnexo">
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16" style="fill: red;">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                    <button class="btn btn-link p-0 visualizarAnexo mx-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16" style="fill: blue;">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                        </svg>
                    </button>
                    <span>${file.name}</span>
                </div>
            `;
        }

        $('#anexosLista').append(anexosHtml);
        $('#fileUpload').val(''); // Limpar o campo de upload
    });

    // Função para excluir anexo
    $(document).on('click', '.excluirAnexo', function () {
        let fileId = $(this).closest('.anexo-item').data('file-id');
        delete anexos[fileId]; // Remove o arquivo da memória
        $(this).closest('.anexo-item').remove(); // Remove o item da lista
    });

    // Função para visualizar anexo
    $(document).on('click', '.visualizarAnexo', function () {
        let fileId = $(this).closest('.anexo-item').data('file-id');
        let file = anexos[fileId];

        // Cria um link temporário para download
        let url = URL.createObjectURL(file);
        let a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url); // Libera o espaço em memória
});



    // Submissão do formulário
    $('#salvarFornecedor').on('click', function (e) {
        e.preventDefault();

        if (validarFormulario()) {
            // Criar JSON para envio
            let fornecedorData = {
                razaoSocial: $('#razaoSocial').val(),
                nomeFantasia: $('#nomeFantasia').val(),
                cnpj: $('#cnpj').val(),
                inscricaoEstadual: $('#inscricaoEstadual').val(),
                inscricaoMunicipal: $('#inscricaoMunicipal').val(),
                cep: $('#cep').val(),
                endereco: $('#endereco').val(),
                bairro: $('#bairro').val(),
                municipio: $('#municipio').val(),
                estado: $('#estado').val(),
                nomeContato: $('#nomeContato').val(),
                telefone: $('#telefone').val(),
                email: $('#email').val(),
                produtos: [],
                anexos: []
            };

            // Adicionar produtos ao JSON
            $('.produto-item').each(function () {
                fornecedorData.produtos.push({
                    produto: $(this).find('.produto').val(),
                    unidadeMedida: $(this).find('.unidadeMedida').val(),
                    qtdEstoque: $(this).find('.qtdEstoque').val(),
                    valorUnitario: $(this).find('.valorUnitario').val(),
                    valorTotal: $(this).find('.valorTotal').val()
                });
            });

            // Adicionar anexos ao JSON
            $('#anexosLista .anexo-item').each(function () {
                let fileId = $(this).data('file-id');  // Certificar-se de que o fileId é o correto
                let fileInput = document.getElementById('fileUpload');  // Referência ao input de arquivos
                let file = fileInput.files[fileId];  // Obter o arquivo baseado no fileId
    
                if (file) {
                    // Convertendo o arquivo em um formato que pode ser enviado como JSON 
                    let reader = new FileReader();
                    reader.onload = function (e) {
                        fornecedorData.anexos.push({
                            nome: file.name,
                            tipo: file.type,
                            conteudo: e.target.result 
                        });
    
                        // Quando todos os arquivos forem processados, exibir o JSON formatado
                        if (fornecedorData.anexos.length === fileInput.files.length) {
                            console.log(JSON.stringify(fornecedorData, null, 2)); // Exibir JSON formatado no console
                        }
                    };
                    reader.readAsDataURL(file);
                }
            });
    

            console.log(JSON.stringify(fornecedorData)); // Exibir JSON no console

            // Abrir modal de loading
            $('#modalLoading').modal('show');

            // Simulação do envio
            setTimeout(function () {
                $('#modalLoading').modal('hide');
                alert('Fornecedor salvo com sucesso!');
              
            }, 2000);
         
        }
    });
});
