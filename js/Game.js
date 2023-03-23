class Game {
  constructor() {}
  getState() { //LÊ QUAL O ESTADO DE JOGO
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }
  update(state) { //ATUALIZA O ESTADO DE JOGO. 0 = START/INICIAR. 1 = PLAY/JOGAR. 2 = GAMEOVER/FIM DE JOGO.
    database.ref("/").update({
      gameState: state
    });
  }
  // TA
  start() {
    player = new Player();
    playerCount = player.getCount();
    form = new Form();
    form.display();
    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;
    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;
    cars = [car1, car2];
  }

  //BP
  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  //SA
  play() {
    this.handleElements();

    Player.getPlayersInfo(); //added

    if (allPlayers !== undefined) { //se todos os jogadores já estiverem definidos, irá exibir a pista e os carros
      image(track, 0, -height * 5, width, height * 6); 
      //Ao exibir a imagem, manteremos a posição x como 0 e y como (-height * 5); isso criará a pista fora da tela 
      //porque não queremos mostrar a pista completa de uma vez, a pista será exibida conforme o jogador mover o carro.
      //indice dos jogadores inicia em 0. O primeiro recebe o numero 1. O segundo recebe o numero 2.
      var index = 0;
      for (var plr in allPlayers) {
        //plr é a variável usada para atravessar, e allPlayers é o objeto JavaScript no qual procuramos os valores
        //ou seja, para realizar o posicionamento de todas as informaçoes de todos jogadores
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;
        cars[index].position.x = x;
        cars[index].position.y = y;
        //adiciona um ao indice anterior
        index = index + 1;
      }
      //se a tecla pressionada para baixo é a SETA PARA CIMA  
      if (keyIsDown(UP_ARROW)) {
        player.positionY += 10; //aumente a posição do jogador de 10 em 10 a cada toque
        player.update(); //atualize a posição no banco de dados
      }
      drawSprites();
    }
  }
}
