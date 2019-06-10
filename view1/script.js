var selected = 0;
var max = 0;
var traceJson = {};
var inputLength = 0;

$(function () {
    $('#tbody3').on('click', 'tr', function () {
        if (selected >= 1) {
            var prevTr = document.getElementById(selected);
            prevTr.removeAttribute("selected");
        }
        selected = Number(this.id)
        highlightInTable(selected);
    });
});

function getTable3() {

    max = traceJson.length;

    for (var i = 0; i < traceJson.length; i++) {
        var table = document.getElementById("tbody3");
        var row = table.insertRow(i);
        var cell0 = row.insertCell(0)
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);

        var space = "*";
        space = space.repeat(traceJson[i].indentLevel);

        cell0.innerHTML = i + 1;
        cell1.innerHTML = traceJson[i].location.start.line;
        cell2.innerHTML = traceJson[i].location.start.column;
        cell3.innerHTML = traceJson[i].location.end.line;
        cell4.innerHTML = traceJson[i].location.end.column;
        cell5.innerHTML = traceJson[i].type;
        cell6.innerHTML = space.concat(traceJson[i].rule);
        row.setAttribute("id", i + 1);
        row.setAttribute("class", "test");
        if (traceJson[i].type == 'rule.match') {
            row.setAttribute("value", "green", 0);
        } else if (traceJson[i].type == 'rule.fail') {
            row.setAttribute("value", "red", 0);
        }
    }
}

function nextButton() {
    if (selected < max) {
        if (selected >= 1) {
            var prevTr = document.getElementById(selected);
            prevTr.removeAttribute("selected");
        }
        if (selected <= max) {
            selected += 1;
        }
        highlightInTable(selected);
        var tr = document.getElementById(selected);
        if (selected % 12 == 0) {
            tr.scrollIntoView();
        }
    }
}

function prevButton() {
    if (selected > 0 && selected - 1 > 0) {
        var prevTr = document.getElementById(selected);
        prevTr.removeAttribute("selected");
        selected -= 1;
        highlightInTable(selected);
        var tr = document.getElementById(selected);
        tr.scrollIntoView();
    }
}

function getTdElement(startCol, endCol, type, tr) {
    var startColumn = Number(startCol);
    var endColumn = Number(endCol);
    if (endColumn < inputLength) {
        for (var i = startColumn; i <= endColumn; i++) {
            var getTd = document.getElementById('r1c' + i.toString());
            highlightInTableColor(type, getTd, tr);
        }
    } else if (endColumn > inputLength && startColumn < inputLength) {
        var getTd = document.getElementById('r1c' + startCol);
        highlightInTableColor(type, getTd, tr);
    } else {
        highlightInTableColor(null, null, tr);
    }
}

function highlightInTable(ele) {
    removeSelectedAttr(document.getElementsByClassName("tdClass"));
    var tr = document.getElementById(ele);
    var startCol = tr.childNodes[2].innerHTML;
    var endCol = tr.childNodes[4].innerHTML;
    var type = tr.childNodes[5].innerHTML;
    getTdElement(startCol, endCol, type, tr);
}

function highlightInTableColor(type, getTd, tr) {
    if (type === 'rule.match') {
        tr.setAttribute("selected", "2", 0);
        getTd.setAttribute('selected', '2', 0);
    } else if (type === 'rule.fail') {
        tr.setAttribute("selected", "3", 0);
        getTd.setAttribute('selected', '3', 0);
    } else if(selected < max && getTd){
        tr.setAttribute("selected", "1", 0);
        getTd.setAttribute('selected', '1', 0);
    } else {
        tr.setAttribute("selected", "1", 0);
    }
}

function removeSelectedAttr(elements) {
    for (var i = 0; i < elements.length; i++) {
        elements[i].setAttribute('selected', 'some', 0);
    }
}


/**
 * Methods in main.html
 */

function clearFields() {
    document.getElementById('textarea1').value = '';
    document.getElementById('textarea2').value = '';
}

function trace() {
    var completeObj = JSON.parse(document.getElementById('textarea1').value);
    traceJson = completeObj.obj;
    var text = completeObj.input;
    inputLength = text.length;

    document.getElementById('mainDiv').style.display = 'none';
    document.getElementById('traceDiv').style.display = 'block';
    var tr = document.createElement("tr");
    for (var i = 0; i < text.length; i++) {
        var td = document.createElement("td");
        td.setAttribute("id", "r1c" + (i + 1), 0);
        td.setAttribute("class", "tdClass");
        var tdNode = document.createTextNode(text[i]);
        td.appendChild(tdNode);
        tr.appendChild(td);
    }
    getTable3();
    setTimeout(() => {
        var table1 = document.getElementById("t1");
        table1.appendChild(tr);
    }, 100);

}

/**
 * Divs trace
 */

function viewMain() {
    document.getElementById('mainDiv').style.display = 'block';
    document.getElementById('traceDiv').style.display = 'none';
}

function viewTrace() {
    document.getElementById('mainDiv').style.display = 'none';
    document.getElementById('traceDiv').style.display = 'block';
}