// -----------------------------------
// home functions
// -----------------------------------


//Scrape
$(document).on("click", ".scrape-new", function () {
  
    $.ajax({
      method: "GET",
      url: "/api/fetch",
  })
      .done(function (data) {
          window.location = "/"
      });
});

//Save articles
$(document).on("click", ".save", function () {
//   var savedArticleId = $(this).attr("data-id");
//   $.ajax({
//       method: "put",
//       url: "/api/headlines/" + savedArticleId,
//   })
//       .done(function (data) {
//           window.location = "/"
//       });

var articleToSave = $(this)
      .parents(".card")
      .data();

    // Remove card from page
    $(this)
      .parents(".card")
      .remove();

    articleToSave.saved = true;
    // Using a patch method to be semantic since this is an update to an existing record in our collection
    $.ajax({
      method: "PUT",
      url: "/api/headlines/" + articleToSave._id,
      data: articleToSave
    }).then(function(data) {
      // If the data was saved successfully
      if (data.saved) {
        // Run the initPage function again. This will reload the entire list of articles
        initPage();
      }
    });

});
//Delete all articles
$(document).on("click", ".clear", function () {
  
    $.ajax({
      method: "GET",
      url: "/api/clear/",
  })
      .done(function (data) {
          window.location = "/"
      });
});

//Delete an article
$(document).on("click", ".delete", function () {
  
    var deleteArticleId = $(this).attr("data-id");
  $.ajax({
      method: "DELETE",
      url: "/api/headlines/" + deleteArticleId,
  })
      .done(function (data) {
          window.location = "/"
      });
});

// -----------------------------------
// saved functions
// -----------------------------------

//Delete a saved article
$(document).on("click", ".delete", function () {
  var deleteSavedArticleId = $(this).attr("data-id");

  $.ajax({
      method: "DELETE",
      url: "/api/headlines/" + deleteSavedArticleId,
  })
      .done(function (data) {
          window.location = "/saved"
      });
});

// -----------------------------------
// note functions
// -----------------------------------
$(document).on("click", ".show-notes", function () {

});

//Save a note
$(document).on("click", ".notes", function () {
  var newNoteId = $(this).attr("data-id");
debugger
  $.ajax({
      method: "POST",
      url: "/api/notes/" + newNoteId,
      data: {
          text: $("#note" + newNoteId).val(),
          created: new Date()
      }
  })
  .done(function (data) {
      console.log(data);
      $("#note" + newNoteId).val("");
      window.location = "/saved"
  });
});

//Delete a note
$(document).on("click", ".deleteNote", function () {
  var deleteNoteId = $(this).attr("data-id");

  $.ajax({
      method: "DELETE",
      url: "/api/deletenote/" + deleteNoteId,
  })
  .done(function (data) {
      window.location = "/saved"
  });
});
  