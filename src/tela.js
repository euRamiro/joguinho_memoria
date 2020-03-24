// métodos static não podem acessar o this por isso,
// não colocar o util no construtor
const util = Util;
const ID_CONTEUDO = "conteudo";
const ID_BOTAO_JOGAR = "jogar";
const ID_BOTAO_MOSTRAR_TUDO = "mostrarTudo";
const ID_MENSAGEM = "mensagem";
const CLASSE_INVISIVEL = "invisible";
const ID_CARREGANDO = "carregando";
const ID_CONTADOR = "contador";
const MENSAGENS = {
  sucesso: {
    texto: 'acertou!',
    classe: 'alert-success'
  },
  erro: {
    texto: 'errou!',
    classe: 'alert-danger'
  }
}

class Tela {
  static obterHTML(item) {
    return `
    <div class="col-md-3">
      <div class="card" style="width: 50%;" onclick="window.verificarSelecao('${item.id}','${item.nome}')">
        <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="...">
      </div>
      <br />
    </div>
    `
  }

  static configuraBotaoVerificarSelecao(funcaoOnClick) {
    window.verificarSelecao = funcaoOnClick
  }

  static alterarConteudoHTML(codigoHtml) {
    const conteudo = document.getElementById(ID_CONTEUDO)
    conteudo.innerHTML = codigoHtml
  }
  static gerarStringHTMLPelaImagem(itens) {
    // para cada item da lista, vai executar a função obterHTML
    // ao final, vai concatenar tudo em uma unica string
    // muda de array para string
    return itens.map(Tela.obterHTML).join('')
  }

  static atualizarImagens(itens) {
    const codigoHtml = Tela.gerarStringHTMLPelaImagem(itens)
    Tela.alterarConteudoHTML(codigoHtml)
  }

  static configurarBotaoJogar(funcaoOnClick) {
    const botaoJogar = document.getElementById(ID_BOTAO_JOGAR)
    botaoJogar.onclick = funcaoOnClick
  }

  static configurarBotaoMostrarTudo(funcaoOnClick) {
    const mostrarTudo = document.getElementById(ID_BOTAO_MOSTRAR_TUDO);
    mostrarTudo.onclick = funcaoOnClick;
  }

  static exibirHerois(nomeHeroi, img) {
    const elementosHTML = document.getElementsByName(nomeHeroi);
    // para cada elemento encontrado na tela, alterar a imagem
    // para a imagem inicial
    // com o forEach, para cada item, dentro do () seta o valor de imagem
    elementosHTML.forEach(item => (item.src = img))
  }

  static async exibirMensagem(sucesso = true) {
    const elemento = document.getElementById(ID_MENSAGEM)
    if (sucesso) {
      elemento.classList.remove(MENSAGENS.erro.classe);
      elemento.classList.add(MENSAGENS.sucesso.classe);
      elemento.innerText = MENSAGENS.sucesso.texto;
    } else {
      elemento.classList.remove(MENSAGENS.sucesso.classe);
      elemento.classList.add(MENSAGENS.erro.classe);
      elemento.innerText = MENSAGENS.erro.texto;
    }
    elemento.classList.remove(CLASSE_INVISIVEL);
    await util.timeout(1000);
    elemento.classList.add(CLASSE_INVISIVEL);
  }

  static exibirCarregando(mostrar = true) {
    const carregando = document.getElementById(ID_CARREGANDO);
    if (mostrar) {
      carregando.classList.remove(CLASSE_INVISIVEL);
      return;
    } else {
      carregando.classList.add(CLASSE_INVISIVEL);
    }
  }

  static iniciarContador() {
    let contarAte = 3;
    const elementoContador = document.getElementById(ID_CONTADOR);
    // substituir o texto Começando $$contador segundos
    // onde está o $$contador add o valor
    const indentificadorNoTexto = '$$contador';
    const textoPadrao = `Começando em ${indentificadorNoTexto} ...`;
    // criando uma função na mesma linha para atualizar o texto a cada segundo
    const atualizarTexto = () => (elementoContador.innerHTML = textoPadrao.replace(indentificadorNoTexto, contarAte--));

    atualizarTexto();
    // a cada segundo, vai chamar a função atualizar texto
    // essa função vai substituir o $$contador pelo 'contarAte' diminuindo
    // retorna o idDoIntervalo para parar mais tarde
    const idDoIntervalo = setInterval(atualizarTexto, 1000);
    return idDoIntervalo;
  }

  static limparContador(idDoIntervalo) {
    clearInterval(idDoIntervalo);
    // sem texto
    document.getElementById(ID_CONTADOR).innerHTML = "";
  }

}