class JogoDaMemoria {
  // 3o importar a tela como dependencia
  // iria funcionar sem importar chamando a variavel Tela global
  // mas não é uma boa prática, a melhor prática é obter esse valor por dependencia
  // depois usar a partir do this

  constructor({
    tela,
    util
  }) {
    this.tela = tela
    this.util = util

    this.heroisIniciais = [
      // relativo ao index.html pois será carregado lá
      {
        img: './arquivos/batman.png',
        nome: 'batman'
      },
      {
        img: './arquivos/ciclop.png',
        nome: 'ciclop'
      },
      {
        img: './arquivos/deadpool.png',
        nome: 'deadpool'
      },
      {
        img: './arquivos/mulhermaravilha.png',
        nome: 'mulhermaravilha'
      },
    ]
    this.iconePadrao = './arquivos/default.png'
    this.heroisEscondidos = []
    this.heroisSelecionados = []
  }

  // 1o -para usar o this, nao podemos usar o static
  inicializar() {
    // 2o - vamos precisar importar a tela para fazer alterações nela
    // 3o - chamar a funcao de tela apara atualizar as imagens
    this.tela.atualizarImagens(this.heroisIniciais);

    //força a tela a usar o THIS do jogoDaMemoria
    this.tela.configurarBotaoJogar(this.jogar.bind(this))
    //.bind mantém o contexto desta classe
    this.tela.configuraBotaoVerificarSelecao(this.verificarSelecao.bind(this));
    this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this));
  }

  async embaralhar() {
    const copias = this.heroisIniciais
      //dublicar os herois
      .concat(this.heroisIniciais)
      //entrar em cada item e criar um id aleatório
      .map(item => {
        return Object.assign({}, item, {
          id: Math.random() / 0.5
        });
      })
      //ordenar
      .sort(() => Math.random() - 0.5)

    this.tela.atualizarImagens(copias)
    this.tela.exibirCarregando();
    const idDoIntervalo = this.tela.iniciarContador();
    // esperar 3 segundos para ocultar os herois
    await this.util.timeout(3000);
    this.tela.limparContador(idDoIntervalo);
    this.esconderHerois(copias);
    this.tela.exibirCarregando(false);
  }

  esconderHerois(herois) {
    // trocar a imagem de todos o herois pelo ícone padrão 
    // como feitos no construtor, extrair somente o necessário 
    const heroisOcultos = herois.map(({
      nome,
      id
    }) => ({
      id,
      nome,
      img: this.iconePadrao
    }))
    this.tela.atualizarImagens(heroisOcultos)
    // guardar os herois para trabalhar com ele depois
    this.heroisEscondidos = heroisOcultos
  }

  verificarSelecao(id, nome) {
    const item = {
      id,
      nome
    }
    const heroisSelecionados = this.heroisSelecionados.length;
    switch (heroisSelecionados) {
      case 0:
        // adciona a escolha na lista, esperando pelo próximo click
        this.heroisSelecionados.push(item);
        break;
      case 1:
        // se a qtde de escolhido for 1 , significa que o usuário só pode
        // escolher mais 1 
        // obter o primeiro da lista
        const [opcao1] = this.heroisSelecionados
        // limpar a lista
        this.heroisSelecionados = []

        if (opcao1.nome === item.nome &&
          // verificar se o id é diferente para não clicar 
          // duas vezes na mesma carta
          opcao1.id !== item.id) {
          this.exibirHerois(item.nome);
          this.tela.exibirMensagem();
          // return para a execução 
          return;
        }
        this.tela.exibirMensagem(false);
    }
  }

  jogar() {
    this.embaralhar();
  }

  exibirHerois(nomeHeroi) {
    // procurar heroi pelo nome na lista de heroisIniciais
    // obter somente a imagem do heroi
    const {
      img
    } = this.heroisIniciais.find(({
      nome
    }) => nomeHeroi === nome);
    // função na tela para exibir o heroi selecionado
    this.tela.exibirHerois(nomeHeroi, img);
  }

  mostrarHeroisEscondidos() {
    const heroisEscondidos = this.heroisEscondidos;
    for (const heroi of heroisEscondidos) {
      const {
        img
      } = this.heroisIniciais.find(item => item.nome === heroi.nome);
      heroi.img = img;
    }
    this.tela.atualizarImagens(heroisEscondidos);
  }

}