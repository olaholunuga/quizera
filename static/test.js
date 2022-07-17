$(function() {
  
  var $lists = [
    {
      "category": "History",
      "id": "622a1c3c7cc59eab6f9517be",
      "correctAnswer": "The Bayeux Tapestry",
      "incorrectAnswers": [
        "The Hastings Tapestry",
        "The Calais Tapestry",
        "The Wynton Tapestry",
      ],
      "question": "Which famous tapestry commemorates the Norman conquest of England?",
      "tags": [
        "medieval",
        "middle_ages",
        "uk",
        "wars",
        "history",
        "art"
      ],
      "type": "Multiple Choice",
      "difficulty": "medium"
    },
    {
      "category": "Society & Culture",
      "id": "622a1c357cc59eab6f94fd02",
      "correctAnswer": "Spinoza",
      "incorrectAnswers": [
        "Thomas Hobbes",
        "Denis Diderot",
        "Albert Camus"
      ],
      "question": "Which philosopher famously said 'I can control my passions and emotions if I can understand their nature'?",
      "tags": [
        "philosophy",
        "quotes",
        "society_and_culture"
      ],
      "type": "Multiple Choice",
      "difficulty": "hard"
    },
    {
      "category": "Film & TV",
      "id": "6256987c9da29df7b05f728a",
      "correctAnswer": "Sebastian Stan",
      "incorrectAnswers": [
        "Stellan Skarsgård",
        "John Slattery",
        "Jeff Goldblum"
      ],
      "question": "Which actor plays the role of Bucky Barnes in the Marvel Cinematic Universe?",
      "tags": [
        "mcu",
        "film",
        "acting",
        "marvel",
        "comics",
        "film_and_tv"
      ],
      "type": "Multiple Choice",
      "difficulty": "medium"
    },
    {
      "category": "Film & TV",
      "id": "622a1c347cc59eab6f94fa79",
      "correctAnswer": "Kevin Kline",
      "incorrectAnswers": [
        "Alec Guinness",
        "Martin Landau",
        "River Phoenix"
      ],
      "question": "Who won the 1988 Academy Award for Best Supporting Actor for playing the role of Otto in A Fish Called Wanda?",
      "tags": [
        "academy_awards",
        "acting",
        "film",
        "film_and_tv"
      ],
      "type": "Multiple Choice",
      "difficulty": "hard"
    },
    {
      "category": "Film & TV",
      "id": "622a1c347cc59eab6f94f8dc",
      "correctAnswer": "Peter Sellers",
      "incorrectAnswers": [
        "James Cagney",
        "Michael Douglas",
        "Johnny Depp"
      ],
      "question": "Which actor played the role of Chance the Gardener in Being There?",
      "tags": [
        "acting",
        "film",
        "film_and_tv"
      ],
      "type": "Multiple Choice",
      "difficulty": "hard"
    },
    {
      "category": "Science",
      "id": "622a1c377cc59eab6f95051a",
      "correctAnswer": "study of horses",
      "incorrectAnswers": [
        "cetaceans - whales, dolphins, and porpoise",
        "the field of dermatological anatomical pathology",
        "the medical study of the causation of disease"
      ],
      "question": "What is Hippology the study of?",
      "tags": [
        "science"
      ],
      "type": "Multiple Choice",
      "difficulty": "hard"
    },
    {
      "category": "Film & TV",
      "id": "622a1c377cc59eab6f9506e3",
      "correctAnswer": "Gerard Butler",
      "incorrectAnswers": [
        "Hugh Jackman",
        "Robert Redford",
        "Jim Carrey"
      ],
      "question": "Which actor has featured in films including 300 and James Bond: Tomorrow Never Dies?",
      "tags": [
        "film",
        "acting",
        "film_and_tv"
      ],
      "type": "Multiple Choice",
      "difficulty": "medium"
    },
    {
      "category": "Geography",
      "id": "623b580bfd6c701a92118394",
      "correctAnswer": "USA",
      "incorrectAnswers": [
        "Croatia",
        "Spain",
        "Australia"
      ],
      "question": "In which country would you find the Carlsbad Caverns National Park?",
      "tags": [
        "tourist_attractions",
        "geography"
      ],
      "type": "Multiple Choice",
      "difficulty": "hard"
    },
    {
      "category": "Arts & Literature",
      "id": "622a1c347cc59eab6f94f953",
      "correctAnswer": "Winnie the Pooh",
      "incorrectAnswers": [
        "In Our Time",
        "Nine Stories",
        "1984"
      ],
      "question": "Which book contains the character 'Eeyore'?",
      "tags": [
        "literature",
        "fictitious_characters",
        "arts_and_literature"
      ],
      "type": "Multiple Choice",
      "difficulty": "easy"
    },
    {
      "category": "Music",
      "id": "62506471e12f6dec240bdfb3",
      "correctAnswer": "House of Pain",
      "incorrectAnswers": [
        "Haddaway",
        "Digable Planets",
        "Brownsville Station"
      ],
      "question": "Who had a hit in 1992 with Jump Around?",
      "tags": [
        "songs",
        "one_hit_wonders",
        "1990's",
        "music"
      ],
      "type": "Multiple Choice",
      "difficulty": "medium"
    }
  ];

  var $questionList = $lists;
    $lists.forEach((item, i, array) => {
      $questionList[i].question = item.question;
      let answers_string = item.incorrectAnswers;
      answers_string.toString().split(",")
      let answers = answers_string
      answers.push(item.correctAnswer);
      $questionList[i].answers = answers;
      $questionList[i].correctAnswer = item.correctAnswer;
      $questionList[i].index = i;
    });

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
        // letTest = {
        //     category: $category.val(),
        //     difficulty: $difficulty.val(),
        //     country: $country.val()
        // };
        $("#test-query").css("display", "none");
        $("#test-query").remove()
        question_view($questionList[0]);


        
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
        $(".next").attr("ques-i").html = `${$questionList.length + 1}`
        index--
        if (mark == $questionList[index].correctAnswer) {
          result += 5;
          $("#result").html(`${result}`);
        }
        // String(letTest.category)
        var data = {
          subject: "HIGN",
          score: Number(result)
        };
        $.ajax({
          type: "POST",
          url: "/tests",
          data: JSON.stringify({
            subject: String(letTest.category),
            score: String(result)
          }),
          contentType: "application/json",
          success: (response) => {
            alert(response);
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