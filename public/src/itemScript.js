function initializeQuillAndEventListeners() {
  var quill1, quill2;
  var originalColumn1 = document.getElementById("field1").innerHTML;
  var originalColumn2 = document.getElementById("field2").innerHTML;

  document.getElementById("edit-button").addEventListener("click", function () {
    document.getElementById("edit-form").style.display = "block";
    document.getElementById("edit-button").style.display = "none";

    quill1 = new Quill('#field1', {
      theme: 'snow'
    });
    quill1.clipboard.dangerouslyPasteHTML(originalColumn1);

    quill2 = new Quill('#field2', {
      theme: 'snow'
    });
    quill2.clipboard.dangerouslyPasteHTML(originalColumn2);
  });

  document.getElementById("cancel-button").addEventListener("click", function () {
    location.reload();
  });

  document.getElementById("save-button").addEventListener("click", function () {
    var column1 = quill1.root.innerHTML;
    var column2 = quill2.root.innerHTML;

    fetch("/api/data/" + document.getElementById("id").textContent, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        column1: column1,
        column2: column2
      })
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      location.reload();
    });
  });
}

if (document.getElementById("edit-button") && document.getElementById("save-button")) {
  initializeQuillAndEventListeners();
}
