function onLoad() {
  const dependencias = {
    tela: Tela,
    util: Util
  }
  //inicializando o jogoDaMemoria
  const jogoDaMemoria = new JogoDaMemoria(dependencias);
  jogoDaMemoria.inicializar();
}
window.onload = onLoad;