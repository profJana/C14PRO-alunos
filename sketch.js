//Variáveis
var trex, trexCorrendo;
var chao, chaoImg, chaoInvisivel; 
var canvas;
var gravidade = 1.5; //y positivo é para baixo
var forcaPulo = -16; //y é para cima
var nuvem, nuvemImg;


//carregar animações
function preload(){ 
  trexCorrendo = loadAnimation("t1.png","t3.png", "t4.png");
  chaoImg = loadImage('ground2.png');
  nuvemImg = loadImage('cloud.png');
}

function setup() {
  canvas = createCanvas(600, 200); //larg, alt
  canvas.center();

  //crie um sprite de trex
  trex = createSprite(50,150,20,50);
  trex.addAnimation("correndo", trexCorrendo);
  //adicione dimensão ao trex
  trex.scale = 0.5;
  
  //crie um sprite ground (solo)
  chao = createSprite(300,170,600,20); //x, y,larg, alt
  chao.addImage("chao", chaoImg); 
  chao.velocityX = -6

  chaoInvisivel = createSprite(60,230)
  chaoInvisivel.visible = false

  
  
}

function draw() {// desenhar
  background(180); //fundo
  drawSprites(); //desenha os sprite
  //frameRate(50);
  //console.log(frameCount)
  var noChao = trex.collide(chaoInvisivel)
  
  if (keyDown("space") && noChao) { // E
    trex.velocityY = forcaPulo;
  }

  if(chao.x < 0){ //verifica se saiu da tela esquerda
    chao.x = chao.width/2; 
  }

  trex.velocityY += gravidade;

  //impedir que o trex caia (por conta da gravidade)
  trex.collide(chaoInvisivel);
  //console.log(frameCount)
  //var aleatorio = Math.round(random(1,100))
  //console.log(aleatorio)
  gerarNuvens();

  
}

//gera um resultado igual a zero somente quando o frameCount é múltiplo de 60
//como 0, 60, 120, 180 etc..

//criando a função
function gerarNuvens(){
  if(frameCount % 60 === 0){
    nuvem = createSprite(650,50,40,10);
    nuvem.addImage('nuvem', nuvemImg)
    nuvem.velocityX = -3;
    nuvem.y = Math.round(random(30,100))

 
    //fórmula: tempo = distancia/velocidade
    //meu caso: 600/3 = 200
    //acrescentei mais + porque criei a nuvem 50pixels a mais do 600 de largura

    //problema aqui é que os sprites criados a cada geração das nuvens
    //nao é destruido e é alocado a memoria do computador, para cada sprite que é gerado
  }
  
}

