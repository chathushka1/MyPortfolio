let itemValideaction = [];

const itmIDRegex = /^(I00-)[0-9]{1,3}$/;
const itemNameRegex = /^[A-z ]{2,20}$/;
const itemPriceRegex = /^[0-9]{1,}[.]?[0-9]{1,2}$/;
const itemQTYtRegex = /^[0-9]{1,7}$/;

$("#txtItemCode").focus();


itemValideaction.push({
    reg: itmIDRegex, field: $('#txtItemCode'),
});
itemValideaction.push({
    reg: itemNameRegex,
    field: $('#txtItemName'),
});
itemValideaction.push({
    reg: itemQTYtRegex,
    field: $('#txtItemQty'),
});
itemValideaction.push({
    reg: itemPriceRegex, field: $('#txtItemPrice'),
});


function clearCustomerInputFieldsItem() {
    $("#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice").val("");
    $("#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice").css("border", "1px solid #ced4da");
    $("#txtItemCode").focus();
    setBtnItem();
}

setBtnItem();

//disable tab
$("#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice").on("keydown keyup", function (e) {
    //get the index number of data input fields indexNo
    let indexNo = itemValideaction.indexOf(itemValideaction.find((c) => c.field.attr("id") == e.target.id));

    //Disable tab key
    if (e.key == "Tab") {
        e.preventDefault();
    }

    //check validations
    checkValidationsItem(itemValideaction[indexNo]);

    setBtnItem();

    //If the enter key pressed cheque and focus
    if (e.key == "Enter") {

        if (e.target.id != itemValideaction[itemValideaction.length - 1].field.attr("id")) {
            //check validation is ok
            if (checkValidations(itemValideaction[indexNo])) {
                itemValideaction[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(itemValideaction[indexNo])) {
                saveItem();
            }
        }
    }
});


function checkValidationsItem(object) {
    if (object.reg.test(object.field.val())) {
        setBorderItems(true, object)
        return true;
    }
    setBorderItems(false, object)
    return false;
}

function setBorderItems(bol, ob) {
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

function checkAllItem() {
    for (let i = 0; i < itemValideaction.length; i++) {
        if (!checkValidationsItem(itemValideaction[i])) return false;
    }
    return true;
}

function setBtnItem() {
    $("#btnItmDelete").prop("disabled", true);
    $("#btnItmUpdate").prop("disabled", true);

    if (checkAllItem()) {
        $("#btnItmSave").prop("disabled", false);
    } else {
        $("#btnItmSave").prop("disabled", true);
    }

    let id = $("#txtItemCode").val();
    if (searchItem(id) == undefined) {
        $("#btnItmDelete").prop("disabled", true);
        $("#btnItmUpdate").prop("disabled", true);
    } else {
        $("#btnItmDelete").prop("disabled", false);
        $("#btnItmUpdate").prop("disabled", false);
    }

}


$('#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice').on('keyup', function (event) {
    checkCusValidityItem();
});

$('#txtItemCode,#txtItemName,#txtItemQty,#txtItemPrice').on('blur', function (event) {
    checkCusValidityItem();
});


function checkCusValidityItem() {
    let errorCount = 0;
    for (let validation of itemValideaction) {
        if (checkItem(validation.reg, validation.field)) {
            textItemSuccess(validation.field, "");
        } else {
            errorCount = errorCount + 1;
            setItemTextError(validation.field, validation.error);
        }
    }
    setItemButtonState(errorCount);
}

function checkItem(regex, txtField) {
    let inputValue = txtField.val();
    return regex.test(inputValue) ? true : false;
}

function textItemSuccess(txtField, error) {
    if (txtField.val().length <= 0) {
        defaultCusText(txtField, "");
    } else {
        txtField.css('border', '2px solid green');
        txtField.parent().children('span').text(error);
    }
}

function setItemTextError(txtField, error) {
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


