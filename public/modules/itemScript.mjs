function initializeQuillAndEventListeners() {
  document.getElementById("cancel-button").addEventListener("click", function () {
    location.reload();
  });

  document.getElementById("save-button").addEventListener("click", function () {
    var email_name = document.getElementById("email_name").value;
    var program_name = document.getElementById("program_name").value;

    fetch("/api/data/" + document.getElementById("id").textContent, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email_name: email_name,
        program_name: program_name
      })
    }).then(function (response) {
      return response.json();
    }).then(function (data) {
      console.log(data);
      location.reload();
    });
  });
}

if (document.getElementById("cancel-button") && document.getElementById("save-button")) {
  initializeQuillAndEventListeners();
}
