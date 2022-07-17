$(function() {
  
    var $questionList;
    let result = 0;
      

    var $category = $("#category");
    var $difficulty = $("#difficulty");
    var $country = $("#country");
    var $box = $("#box");
    var $questionTemplate = $("#question-template").html();

    var letTest = {
      category,
      difficulty,
      country
  };


    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle.
      while (currentIndex != 0) {
    
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }

    function question_view (questionArray) {
      let html_template = `
      <div id="${questionArray.index}">
        <div class="field">
          <div class="control">
          <h3>Result: <strong id="result"> ${result} </strong>, Num: ${Number(questionArray.index) + 1} / ${$questionList.length}</h3>
            <p>${questionArray.question}</p>
          </div>
        </div>
        <div class="column is-4 options">
      `
      var options = shuffle(questionArray.answers);
      let optIndex = 0;
      for (option in options) {
        html_template += `

          <input type="radio" name="answer" value"${options[optIndex]}" id="${options[optIndex]}">
          <label for="${options[optIndex]}">${options[optIndex]}</label>
          <br>
        `
        optIndex++;
      }
      html_template += `</div>
      <button class="button next" ques-i="${questionArray.index}" id="salt"> next > </button>`
      html_template += `</div>`

      document.getElementById("question-template").innerHTML = html_template;
    }

    $("#take-test").on("click", () => {
      letTest.category = $category.val()
      letTest.difficulty = $difficulty.val()
      letTest.country = $country.val()

        $("#test-query").css("display", "none");
        $("#test-query").remove()
        $.ajax({
            type: "GET",
            url: `https://the-trivia-api.com/api/questions?limit=20&categories=${letTest.category}&difficulty=${letTest.difficulty}&region=${letTest.country}`,
            success:  (questions) => {
                $questionList = questions;
                $.each(questions, (i, item) => {
                  $questionList[i].question = item.question;
                  let answers_string = item.incorrectAnswers;
                  answers_string.toString().split(",");
                  let answers = answers_string;
                  answers.push(item.correctAnswer);
                  $questionList[i].answers = answers;
                  $questionList[i].correctAnswer = item.correctAnswer;
                  $questionList[i].index = i;
                })
                question_view($questionList[0]);
            },
            error: () => {
                alert("error getting questions!!");
            },
        });


        
    });

    $box.delegate(".next", "click", () => {
      let mark = $("input[name=answer]:checked", ".options").prop("id");

      if (!mark) {
        return alert("pick an answer");
      }
      index = $(".next").attr("ques-i");
      index = Number(index);

      index += 1;
      if (index < $questionList.length) {
        index--
        if (mark == $questionList[index].correctAnswer) {
          result += 5;
          $("#result").html(`${result}`);
        }
        document.getElementById("question-template").innerHTML = "";
        question_view($questionList[index + 1]);

      } else if (index == $questionList.length) {
        index--
        if (mark == $questionList[index].correctAnswer) {
          result += 5;
          $("#result").html(`${result}`);
        }
        var data = {
          subject: String(letTest.category),
          score: result
        };
        $.ajax({
          type: "POST",
          url: "/tests",
          data: JSON.stringify(data),
          contentType: "application/json",
          success: (response) => {
            alert("done");
            console.log(response)
          },
          error: () => {
            alert("error saving result");
          }
        });
        alert(`${result}`);
      }

    })
});