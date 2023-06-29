let customerValideaction = [];

const cusIDRegex = /^(C00-)[0-9]{1,3}$/;
const cusNameRegex = /^[A-z ]{5,20}$/;
const cusAddressRegex = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegex = /^[0-9]{1,20}$/;

$("#txtCustomerID").focus();


customerValideaction.push({
    reg: cusIDRegex,
    field: $('#txtCustomerID'),

});
customerValideaction.push({
    reg: cusNameRegex,
    field: $('#txtCustomerName'),

});
customerValideaction.push({
    reg: cusAddressRegex,
    field: $('#txtCustomerAddress'),

});
customerValideaction.push({
    reg: cusSalaryRegex,
    field: $('#txtCustomerSalary'),

});


function clearCustomerInputFields() {
    $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").val("");
    $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").css("border", "1px solid #ced4da");
    $("#txtCustomerID").focus();
    setBtn();
}

setBtn();

//disable tab
$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on("keydown keyup", function (e) {

    let indexNo = customerValideaction.indexOf(customerValideaction.find((c) => c.field.attr("id") == e.target.id));


    if (e.key == "Tab") {
        e.preventDefault();
    }


    checkValidations(customerValideaction[indexNo]);

    setBtn();


    if (e.key == "Enter") {

        if (e.target.id != customerValideaction[customerValideaction.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkValidations(customerValideaction[indexNo])) {
                customerValideaction[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(customerValideaction[indexNo])) {
                saveCustomer();
            }
        }
    }
});


function checkValidations(object) {
    if (object.reg.test(object.field.val())) {
        setBorder(true, object)
        return true;
    }
    setBorder(false, object)
    return false;
}

function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    }
}

function checkAll() {
    for (let i = 0; i < customerValideaction.length; i++) {
        if (!checkValidations(customerValideaction[i])) return false;
    }
    return true;
}

function setBtn() {
    $("#btnCusDelete").prop("disabled", true);
    $("#btnCusUpdate").prop("disabled", true);

    if (checkAll()) {
        $("#btnCusSave").prop("disabled", false);
    } else {
        $("#btnCusSave").prop("disabled", true);
    }

    let id = $("#txtCustomerID").val();
    if (searchCustomer(id) == undefined) {
        $("#btnCusDelete").prop("disabled", true);
        $("#btnCusUpdate").prop("disabled", true);
    } else {
        $("#btnCusDelete").prop("disabled", false);
        $("#btnCusUpdate").prop("disabled", false);
    }
}




$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary').on('keyup', function (event) {
    checkCusValidity();
});

$('#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary').on('blur', function (event) {
    checkCusValidity();
});


function checkCusValidity() {
    let errorCounts = 0;
    for (let validation of customerValideaction) {
        if (checkCus(validation.reg, validation.field)) {
            textCusSuccess(validation.field, "");
        } else {
            errorCounts = errorCounts + 1;
            setCusTextError(validation.field, validation.error);
        }
    }

}

function checkCus(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function textCusSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultCusText(txtField, "");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function setCusTextError(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultCusText(txtField, "");
    } else {
        txtField.css('border', '2px solid red');
        txtField.parent().children('span').text(error);
    }
}

function defaultCusText(txtField, error) {
    txtField.css("border", "1px solid #ced4da");
    txtField.parent().children('span').text(error);
}


