var player1 = prompt("Player One Enter your Name Your color is Blue");
var player1Color = 'rgb(2, 83, 245)';

var player2 = prompt("Player Two Enter Your Name Your color is Red");
var player2Color = 'rgb(212, 31, 15)';

var gameOn = true;
var table = $('table tr');

function reportWin(rowNum,colNum){
    console.log("You Won Starting at this "+rowNum+ " Row and "+colNum+ " Column.");    

}

//Check the Color of the Button
function ChangeColor(rowNum,colNum,color){
    return (table.eq(rowNum).find('td').eq(colNum).find('button').css('background-color',color));
}

//Return the Color of the Button
function returnColor(rowNum,colNum){
    return (table.eq(rowNum).find('td').eq(colNum).find('button').css('background-color'));
}

//Return the bottom row that is grey
function checkBottom(colNum){
    var ColorReport = returnColor(5,colNum);
    for(var row = 5; row > -1 ; row--){
        ColorReport = returnColor(row,colNum);
        if (ColorReport === 'rgb(128, 128, 128)'){
            return row;
        }
    }

}

//To check if 4 inputs are of same color
function colorMatchCheck(one,two,three,four){
    return (one===two && one===three && one===four && one !== 'rgb(128, 128, 128)' && one!==undefined);
}

//For Horizontal Win
function horizontalWin(){
    for(var row = 0;row < 6; row++){
        for(var col = 0;col < 4; col++ ){
            if(colorMatchCheck(returnColor(row,col), returnColor(row,col+1), returnColor(row,col+2), returnColor(row,col+3))){
                console.log("Horizontal Win");
                reportWin(row,col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}

//For Vertical Win
function verticalWin(){
    for(var col = 0;col < 7; col++){
        for(var row = 0;row < 3; row++ ){
            if(colorMatchCheck(returnColor(row,col), returnColor(row+1,col), returnColor(row+2,col), returnColor(row+3,col))){
                console.log("Vertical Win");
                reportWin(row,col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}


// Check for Diagonal Wins
function diagonalWin() {
    for (var col = 0; col < 5; col++) {
      for (var row = 0; row < 7; row++) {
        if (colorMatchCheck(returnColor(row,col), returnColor(row+1,col+1) ,returnColor(row+2,col+2), returnColor(row+3,col+3))) {
          console.log('Diagonal');
          reportWin(row,col);
          return true;
        }else if (colorMatchCheck(returnColor(row,col), returnColor(row-1,col+1) ,returnColor(row-2,col+2), returnColor(row-3,col+3))) {
          console.log('Diagonal');
          reportWin(row,col);
          return true;
        }else {
          continue;
        }
      }
    }
  }

function gameEnd(winningPlayer){
    for (var col = 0; col < 7; col++) {
        for (var row = 0; row < 7; row++) {
          $('h3').fadeOut('fast');
          $('#mainHeading').text(winningPlayer+" has Won the game! Refresh your browser to play again!").css("fontSize", "50px"); 
          $('.board button').attr('disabled',true);
        }
      }
}

//Start with Player one

var currentPlayer = 1;
var currentName = player1.toUpperCase();
var currentColor = player1Color;

$('.changetext').text(currentName+" its your turn plz pick up a column to drop your blue chip");

$('.board button').on('click',function(){

    var col = $(this).closest("td").index();

    var bottom = checkBottom(col);

    ChangeColor(bottom,col,currentColor);

    //Check for Win or Tie
    if(horizontalWin() || verticalWin() || diagonalWin() ){
        gameEnd(currentName);
    }

    //If no win or tie,Continue to next player
    currentPlayer = currentPlayer * -1;
    if(currentPlayer === 1){
        currentName = player1.toUpperCase();
        $('.changetext').text(currentName+" its your turn plz pick up a column to drop your blue chip.");
        currentColor = player1Color;
    } else{
        currentName = player2.toUpperCase();
        $('.changetext').text(currentName+" its your turn plz pick up a column to drop your red chip.");
        currentColor = player2Color;
    }
    

})