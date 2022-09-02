$(document).ready(function () {
    loadlist();
})

$(document).on("change", ".tddCheckbox", function () {
    let todoId = $(this).prop("value");
    let checkedStatus = $(this).prop("checked");

    $.ajax({
        url: "https://api.techstarter.dev/todos ",
        method: "PUT",
        data: JSON.stringify({
            id: todoId,
            done: checkedStatus
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function (data) {
        updateList(data)
    });

})

function loadlist() {
    $.ajax({
        url: "https://api.techstarter.dev/todos ",

    }).done(function (data) {
        updateList(data)
    });
}

function updateList(data) {
    $("#lstTodo").empty();

    for (let i = 0; i < data.length; i++) {

        let completedClass = "";
        let checkboxChecked = "";

        if (data[i]['done'] == "true") {
            completedClass = "done text-muted";
            checkboxChecked = "checked"
        }


        let todoItem = `  <li class="list-group-item  ${completedClass}">
                      <input class="form-check-input me-1 rounded-0 tddCheckbox" type="checkbox" ${checkboxChecked} value="${data[i]['id']}" aria-label="...">
                      ${data[i]['name']} <i onClick="deleteItem('${data[i]['id']}')" class="bi bi-x-square force-pull-right"></i>
                    </li>`

        $("#lstTodo").append(todoItem);
    }

}

function addItemToList() {
    let content = $("#txtTodo").val();
    $.ajax({
        url: "https://api.techstarter.dev/todos ",
        method: "POST",
        data: JSON.stringify({ name: content }),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
    }).done(function (data) {
        updateList(data)
    });

}

function deleteItem(id) {
    $.ajax({
        url: "https://api.techstarter.dev/todos/" + id,
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        method: "DELETE"

    }).done(function (data) {
        updateList(data)
    });
}