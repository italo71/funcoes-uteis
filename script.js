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
                        console.log(`${data.logradouro}, ${data.bairro}`)
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

//Timer, temporizador, cronometro
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        display.textContent = minutes + ":" + seconds; // o display pode ser uma div, span, p
        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
window.onload = function () {
    var duration = 60 * 5; // Converter para segundos
    display = document.querySelector('#timer'); // selecionando o timer
    startTimer(duration, display); // iniciando o timer
};
//validador de celular/telefone
function telefone_validation(telefone) {
    //retira todos os caracteres menos os numeros
    telefone = telefone.replace(/\D/g, '');
    //verifica se tem a qtde de numero correto
    if (!(telefone.length >= 10 && telefone.length <= 11)) return false
    //Se tiver 11 caracteres, verificar se começa com 9 o celular
    if (telefone.length == 11 && parseInt(telefone.substring(2, 3)) != 9) return false;
    //verifica se não é nenhum numero digitado errado (propositalmente)
    for (var n = 0; n < 10; n++) {
        //um for de 0 a 9.
        //estou utilizando o metodo Array(q+1).join(n) onde "q" é a quantidade e n é o
        //caractere a ser repetido
        if (telefone == new Array(11).join(n) || telefone == new Array(12).join(n)) return false;
    }
    //DDDs validos
    var codigosDDD = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];
    //verifica se o DDD é valido (sim, da pra verificar rsrsrs)
    if (codigosDDD.indexOf(parseInt(telefone.substring(0, 2))) == -1) return false;
    //se passar por todas as validações acima, então está tudo certo
    return true;
}
//Copiar textp, copiar, input, copy
function copiarTexto(id) {
    //obj deve ser um input, caso queira usar em uma textarea tranferir o seu conteudo para um input
    textoCopiado.value = document.getElementById(id).value;
    textoCopiado.select();
    document.execCommand("copy");
    textoCopiado.style.display = 'none'
}