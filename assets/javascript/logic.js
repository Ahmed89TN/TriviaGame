$(document).ready(function(){
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
    
    questions: {
      q1: 'When Juventus was founded?',
      q2: 'How many times does Juventus won Serie A?',
      q3: 'Who is Juventus coach?',
      q4: 'What is Juventus stadium called?',
      q5: "Who is the current captain of Juventus?",
      q6: 'Where is Juventus FC from?',
      q7: "What is Juventus nickname?"
    },
    options: {
      q1: ['1902', '1881', '1897', '1928'],
      q2: ['36', '18', '40', '34'],
      q3: ['Z.Zidane', 'D.Simeone', 'M.Allegri', 'F.Capello'],
      q4: ['Allianz Stadium', 'Juventus Arena', 'Old lady Stadium', 'San Siro Stadium'],
      q5: ['C.Ronaldo','P.Dybala','G.Buffon','G.Chiellini'],
      q6: ['Turin','Milan','Naples','Bizerte'],
      q7: ['Merengues ', 'Blaugrana', 'Vecchia Signora','Red Devils']
    },
    answers: {
      q1: '1897',
      q2: '36',
      q3: 'M.Allegri',
      q4: 'Allianz Stadium',
      q5: 'G.Chiellini',
      q6: 'Turin',
      q7: 'Vecchia Signora'
    },
    startGame: function(){
    
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      
      $('#game').show();
      
      
      $('#results').html('');
      
      
      $('#timer').text(trivia.timer);
      
      
      $('#start').hide();
  
      $('#remaining-time').show();
      
      
      trivia.nextQuestion();
      
    },
    nextQuestion : function(){
      
     
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);
      
     
      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }
      
      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);
      
      
      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    timerRunning : function(){
      
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      
      else if(trivia.currentSet === Object.keys(trivia.questions).length){

        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Score: '+ trivia.correct +'/7</p>'+
          '<p>Please play again!</p>');
        
        $('#game').hide();
        $('#start').show();
      }
      
    },
    guessChecker : function() {
      var resultId;
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
      if($(this).text() === currentAnswer){
        $(this).addClass('btn-success').removeClass('btn-info');
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
      else{
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    guessResult : function(){
      trivia.currentSet++;
      $('.option').remove();
      $('#results h3').remove();
      trivia.nextQuestion();
       
    }
  
  }