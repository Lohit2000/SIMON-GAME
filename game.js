
// Adding sounds and animation 
var start=0;
var numOfButtons = $(".btn").length;
  for( var i=0; i<numOfButtons; i++)
  {
    document.querySelectorAll(".btn")[i].addEventListener("click", function()
  {
     var ids = this.getAttribute("id");
     playSound(ids);

    var idr=$("#"+ids);
    animatePress(idr);
    
   });
  }

// Sound function

  function playSound(name)
{
  var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}


// nextSequence function

  var buttonColor=["green","red","yellow","blue"];
  var gamePatten=[];
  var randomChosenColor;
  var level=1;

  function nextSequence()
  { 
    userClickedPattern=[];
    $("#level-title").text("Level "+level);
    level++;
    console.log(level);
    var randomNumber = Math.floor( Math.random()*4);
    randomChosenColor = buttonColor[randomNumber];
    gamePatten.push(randomChosenColor);
    console.log("system "+gamePatten);
  
    var randomButton = "#"+randomChosenColor;
    $(randomButton).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    
  }
  
   // Anumation function

  function animatePress(currentColor)
  {
    currentColor.addClass("pressed");
    setTimeout(function(){currentColor.removeClass("pressed")} ,100);
  }



   // User clicked pattern data


   var userClickedPattern=[];
  $(".btn").on("click" , function()
   {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    console.log("user "+userClickedPattern);
   
    checkAnswer(userClickedPattern.length-1);
   })
  
  // keyboard event 
  

   $(document).keypress(function(event)
  {
    if(start==0)
    {
      nextSequence();
      start=1;
    }
  })

// check answer

function checkAnswer(currentLevel)
{
    {
      if(userClickedPattern[currentLevel] === gamePatten[currentLevel])
        {
          if(userClickedPattern.length === gamePatten.length)
          setTimeout(function(){nextSequence();},1000);
        }

      else
      {
        console.log("Lost");
        userClickedPattern=[];
        gamePatten=[];
        level=1 ; 
        $("#level-title").text("Game over! Press any key to restart");
        start=0;
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){ $("body").removeClass("game-over");}, 500);
       } 
     }
}




