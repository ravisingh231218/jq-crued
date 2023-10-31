$(document).ready(function () {
    ShowEmployee();
});
function ShowEmployee() {
    $.ajax({
        url: '/Employee/GetEmployee',
        type: 'Get',
        dataType: 'json',
        contentType: 'application/json;charest=utf-8',
        success: function (result, status, xhr) {
            var object = "";
            $.each(result, function (index, item) {
                object += "<tr>";
                object += "<td>" + item.id + "</td>";
                object += "<td>" + item.name + "</td>";
                object += "<td>" + item.email+ "</td>";
                object += "<td>" + item.mobile + "</td>";
                 object += "<td>" + item.dep + "</td>";
                object += "<td><a href='#'class='btn btn-primary'onclick='Edit("+item.id+")'>Edit</a>||<a href='#'class='btn btn-danger'onclick='Delete("+item.id+")'>Delete</a></td > ";
                object += "</tr>";
            });
            $('#table_data').html(object)

        },
        Error: function () {
            alert("data can't get")
        }

    })
}
$("#btnAddEmployee").click(function () {
    $("#EmployeeMadal").modal("show")
    ClearTextBox()
    $("#AddEmployee").show();
    $("#btnUpdate").hide()
    $("#empheader").text("Add Employee")
    $("#empId").hide()
})
function AddEmployee() {
    var objData = {
        Name: $("#txtName").val(),
        Email: $("#txtEmail").val(),
        Mobile: $("#txtMobile").val(),
        Dep: $("#txtDep").val()
    }
    $.ajax({
        url: "/Employee/AddEmployee",
        type: "POST",
        data: objData,
        dataType: "json",
       
        success: function () {
            alert("data is inserted")
            ClearTextBox();
            ShowEmployee();
            HideModelPopUp();
        },
        Error: function () {
         alert("data is not inserted")
        }
    })
    

}
function HideModelPopUp() {
    $("#EmployeeMadal").modal("hide")
}
function ClearTextBox() {
    $("#txtName").val("");
    $("#txtEmail").val("");
    $("#txtMobile").val("");
    $("#txtDep").val("");
    $("#EmployeeId").val("")

}
function Delete(id) {
    $.ajax({
        url: "/Employee/Delete?id=" + id,
        success: function () {
            alert("data deleted successfully")
            ShowEmployee();
        },
        error: function () {
            alert("data is not deleted")
        }
    })
}
function Edit(id) {
    $.ajax({
        url: "/Employee/Edit?id=" +id,
        type: "Get",
        dataType: "json",
        

        success: function (response) {
            $("#EmployeeMadal").modal("show");
            $("#EmployeeId").val(response.id)
            $("#txtName").val(response.name);
            $("#txtEmail").val(response.email);
            $("#txtMobile").val(response.mobile);
            $("#txtDep").val(response.dep);
            $("#AddEmployee").hide();
            $("#btnUpdate").show()
            $("#empheader").text("update record")
            $("#empId").hide()


        },
        error: function () {
            alert("data not found")

        }
    })
}
function UpdateEmployee() { 
    var objData = {
        Id:$("#EmployeeId").val(),
        Name: $("#txtName").val(),
        Email: $("#txtEmail").val(),
        Mobile: $("#txtMobile").val(),
        Dep: $("#txtDep").val()
    }
    $.ajax({
        url: "/Employee/Update",
        dataType: "json",
        data:objData,
        type: "Post",
        success: function () {
            alert("data is updated")
            ClearTextBox()
            ShowEmployee();
            HideModelPopUp();
           
        },
        error: function () {
            alert("data is not updated")
        }
    })
}
