initiateUI();

function initiateUI() {
    clearAll();
    $("#customerContent").css("display", "block");

    setTheLastView();
}

function saveLastView(clickedID) {
    switch (clickedID) {
        case "customerContent":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "itemContent":
            localStorage.setItem("view", "ITEM");
            break;
        case "ordersContent":
            localStorage.setItem("view", "ORDERS");
            break;
        case "placeOrdersContent":
            localStorage.setItem("view", "PLACEORDERS");
            break;
    }
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "CUSTOMER":
            setView($("#customerContent"));
            break;
        case "ITEM":
            setView($("#itemContent"));
            break;
        case "ORDERS":
            setView($("#ordersContent"));
            break;
        case "PLACEORDERS":
            setView($("#placeOrdersContent"));
            break;
        default:
            setView($("#customerContent"));
    }
}

function clearAll() {
    $("#customerContent,#itemContent,#ordersContent,#placeOrdersContent").css('display', 'none');
}

function setView(viewOb) {
    clearAll();
    viewOb.css("display", "block");
    saveLastView(viewOb.get(0).id);
    console.log(viewOb.get(0).id);
}

$("#customers").click(function () {
    setView($("#customerContent"));
});

$("#items").click(function () {
    setView($("#itemContent"));
});

$("#orders").click(function () {
    setView($("#ordersContent"));
});

$("#placeOrders").click(function () {
    setView($("#placeOrdersContent"));
});


var items=[];

$("#btnItmSave").click(function (){
    let itemCodes=$("#txtItemCode").val();
    let itemNames=$("#txtItemName").val();
    let itemQtys=$("#txtItemQty").val();
    let itemPrices=$("#txtItemPrice").val();

    var itemObject={
        itemId:itemCodes,
        descriptions:itemNames,
        qty:itemQtys,
        unitprice:itemPrices

    }

    items.push(itemObject);

    loadAllItems();
  /*  loadAllItemId();*/

    bindRowClickEventsItems();
});


function bindRowClickEventsItems() {
    $("#tblItem>tr").click(function () {
        let itemCodes = $(this).children(":eq(0)").text();
        let itemNames = $(this).children(":eq(1)").text();
        let itemQtys = $(this).children(":eq(2)").text();
        let itemPrices = $(this).children(":eq(3)").text();

        $('#txtItemCode').val(itemCodes);
        $('#txtItemName').val(itemNames);
        $('#txtItemQty').val(itemQtys);
        $('#txtItemPrice').val(itemPrices);


    });
}


function loadAllItems() {

    $("#tblItem").empty();

    for (var item of items) {
        var row = `<tr><td>${item.itemId}</td><td>${item.descriptions}</td><td>${item.qty}</td><td>${item.unitprice}</td></tr>`;

        $("#tblItem").append(row);
    }
}


$("#btnItmDelete").click(function (){
    /*bindRowClickEventsItems();*/
    let deleteIds=$("#txtItemCode").val();

    let option=confirm("Do you Sure?"+deleteIds);
    if (option){
        if (deleteItem(deleteIds)) {
            alert("Item Successfully Deleted..");
            setTextfieldValuesItem("", "", "", "");
        } else {
            alert("No such Item to delete");
        }
    }
});

$("#btnItmClear").click(function (){
    $('#txtItemCode').val("");
    $('#txtItemName').val("");
    $('#txtItemQty').val("");
    $('#txtItemPrice').val("");
});


$("#btnItmUpdate").click(function () {
    /* bindRowClickEventsItems();*/
    let ItemId = $("#txtItemCode").val();
    let responses = updateItem(ItemId);
    if (responses) {
        alert("Item Updated Successfully");
        setTextfieldValuesItem("", "", "", "");
    } else {
        alert("Update Failed..!");

    }
});


$("#txtItemCode").on('keyup', function (event) {
    if (event.code == "Enter") {
        let typedIds = $("#txtItemCode").val();
        let item = searchItem(typedIds);
        if (item != null) {
            setTextfieldValuesItem(item.itemId, item.descriptions, item.qty, item.unitprice);
        } else {
            alert("There is no cusotmer available for that " + typedIds);
            setTextfieldValuesItem("", "", "", "");
        }
    }
});

function deleteItem(ItemID) {
    let Item = searchItem(ItemID);
    if (Item != null) {
        let indexNumber = items.indexOf(Item);
        items.splice(indexNumber, 1);
        loadAllItems();
        return true;
    } else {
        return false;
    }
}

function setTextfieldValuesItem(itemId, descriptions,qty,unitprice) {
    bindRowClickEventsItems();
    $("#txtItemId").val(itemId);
    $("#txtItemDescription").val(descriptions);
    $("#txtItemQty").val(qty);
    $("#txtItemUnitprice").val(unitprice);

}


function searchItem(itemID) {
    for (let item of items) {
        if (item.itemId == itemID) {
            return item;
        }
    }
    return null;
}

function updateItem(Items) {
    let item = searchItem(Items);
    if (item != null) {
        item.itemId = $("#txtItemCode").val();
        item.descriptions = $("#txtItemName").val();
        item.qty = $("#txtItemQty").val();
        item.unitprice = $("#txtItemPrice").val();

        loadAllItems();
        return true;
    } else {
        return false;
    }

}

