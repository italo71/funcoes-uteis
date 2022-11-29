// validador de emails, email validos
function validacaoEmail(field) {
    usuario = field.value.substring(0, field.value.indexOf("@"));
    dominio = field.value.substring(field.value.indexOf("@") + 1, field.value.length);

    if ((usuario.length >= 1) &&
        (dominio.length >= 3) &&
        (usuario.search("@") == -1) &&
        (dominio.search("@") == -1) &&
        (usuario.search(" ") == -1) &&
        (dominio.search(" ") == -1) &&
        (dominio.search(".") != -1) &&
        (dominio.indexOf(".") >= 1) &&
        (dominio.lastIndexOf(".") < dominio.length - 1)) {
        return true
    }
    else
        return false
}

//Validador de CNPJ
function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj == '') return false;
    if (cnpj.length != 14)
        return false;
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;
    return true;
}

// Consulta cep, busca cep, via cep
function pesquisacep(cep) {
    valor = cep
    valor = valor.replace(/ /g, '')
    valor = valor.replace(/-/g, '')
    valor = valor.replace(/\./g, '')
    valor = valor.replace(/\//g, '')
    if (valor.length == 8)
        fetch(`https://viacep.com.br/ws/${valor}/json`)
            .then(response => {
                return response.json()
                    .then((data) => {
                        document.getElementById('cidade').value = data.localidade
                        document.getElementById('bairro').value = data.bairro
                        document.getElementById('endereco').value = data.logradouro
                        document.getElementById('uf').value = data.uf
                    });
            }).then((data) => {
            }).catch((err) => { });
}

// alternador de checkbox, checkbox, check, alterar checkbox, alterador de checkbox
function toggleCheck(id) {
    if (document.getElementById(id).checked)
        document.getElementById(id).checked = 0
    else
        document.getElementById(id).checked = 1
}

// alterador de abas, abas, tabs
//HTML BASE
/*                         
                        <ul id="nav-ul">
                            <li role="presentation" class="tab-select act" id="pagina_cad">
                                <a href="#pagina_cadastro" data-toggle="tab" onclick="alterTab(0)">
                                    Cadastro
                                </a>
                                <div style="display: inline-block; position: relative; top: 4px;">
                                    <i class="material-icons" style="font-size: 14pt;">how_to_reg</i>
                                </div>
                            </li>
                        </ul>
                        <div class="tab-pane row" id="pagina_cadastro"></div>
*/
function alterTab(tab) {
    let qnt = document.querySelectorAll('.tab-pane').length
    for (let i = 0; i < qnt; i++) {
        document.querySelectorAll('.tab-pane')[i].style.display = 'none'
        if (document.querySelectorAll('.tab-select')[i].classList.contains('act')) {
            document.querySelectorAll('.tab-select')[i].classList.remove('act')
        }
    }
    document.querySelectorAll('.tab-pane')[tab].style.display = ''
    document.querySelectorAll('.tab-select')[tab].classList.add('act')
}

// formatador de celular, telefone, formatador, formatar
function mphone(v) {
    var r = v.replace(/\D/g, "");
    r = r.replace(/^0/, "");
    if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        r = r.replace(/^(\d*)/, "($1");
    }
    return r;
}

//tables, tabelas, tabela
//ajuste, formatação, organizar
function ajuste() {
    j('#tabela_pr').DataTable();
    j('#tabela_pr').DataTable().columns.adjust();
}

// preencher tabela, tabela
table_exec = () => {
    j('#tabela_pr').DataTable();
    j('#tabela_pr').DataTable().clear();
    j('#tabela_pr').DataTable().rows().invalidate().draw();
    j('#tabela_pr').DataTable().destroy();
    var tabela_default_order = [0, "asc"];
    var table = j('#tabela_pr').DataTable({
        fixedHeader: true,
        "autoWidth": false,
        "order": [tabela_default_order],
        "ordering": true,
        "scrollX": false,
        "scrollY": "60vh",
        "scrollCollapse": false,
        "paging": true,
        "language": datatable_pt_br,
        "lengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
        "pageLength": 10
    });
}