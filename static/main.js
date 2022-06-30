$(function() {

    var $category = $("#category")
    var $difficulty = $("#difficulty")
    var $country = $("#country")
    var $questions = [];

    $("#take-test").on("click", () => {
        $("#test-query").css("display", "none");
        var letTest = {
            category: $category.val(),
            difficulty: $difficulty.val(),
            country: $country.val()
        };
        $.ajax({
            type: "GET",
            url: "https://the-trivia-api.com/api/questions?limit=20&categories=" + 
            letTest.category + "&difficulty=" + letTest.difficulty + "&" + letTest.country,
            success:  (questions) => {
                $questions = questions;
            },
            error: () => {
                alert("error getting questions!!")
            },
        });
        
    });
    $.ajax({

    });
});