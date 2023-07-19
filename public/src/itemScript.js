function initializeQuillAndEventListeners() {
    var quill1, quill2;

    document.getElementById("edit-button").addEventListener("click", function () {
        document.getElementById("edit-form").style.display = "block";

        quill1 = new Quill('#editor1', {
            theme: 'snow'
        });
        quill1.setContents([{ insert: document.getElementsByClassName("field")[0].textContent }]);

        quill2 = new Quill('#editor2', {
            theme: 'snow'
        });
        quill2.setContents([{ insert: document.getElementsByClassName("field")[1].textContent }]);
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
        });
    });
}

if (document.getElementById("edit-button") && document.getElementById("save-button")) {
    initializeQuillAndEventListeners();
}
