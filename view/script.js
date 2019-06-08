var selected = 0;
var max = 0;

fetch('../input.txt')
  .then(response => response.text())
  .then(function (text) {
    var tr = document.createElement("tr");
    var tr2 = document.createElement("tr");
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
  });

function getTable3() {
  fetch('../result.json')
    .then(response => response.json())
    .then(function (data) {
      max = data.length;
      var table = document.getElementById("t3");
      var row = table.insertRow(0);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      cell1.innerHTML = "s-line".bold();
      cell2.innerHTML = "s-col".bold();
      cell3.innerHTML = "e-line".bold();
      cell4.innerHTML = "e-col".bold();
      cell5.innerHTML = "type".bold();
      cell6.innerHTML = "rule".bold();

      for (var i = 0; i < data.length; i++) {
        var table = document.getElementById("t3");
        var row = table.insertRow(i + 1);
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);

        var space = "\xa0";
        space = space.repeat(data[i].indentLevel);

        cell1.innerHTML = data[i].location.start.line;
        cell2.innerHTML = data[i].location.start.column;
        cell3.innerHTML = data[i].location.end.line;
        cell4.innerHTML = data[i].location.end.column;
        cell5.innerHTML = data[i].type;
        cell6.innerHTML = space.concat(data[i].rule);
        row.setAttribute("id", i + 1);
        if (data[i].type == 'rule.match') {
          row.setAttribute("value", "green", 0);
        } else if (data[i].type == 'rule.fail') {
          row.setAttribute("value", "red", 0);
        }
      }
    });
}

function nextButton() {
  if (selected >= 1) {
    var prevTr = document.getElementById(selected);
    prevTr.removeAttribute("selected");
  }
  if (selected <= max) {
    selected += 1;
  }
  highlightInTable1(selected);
  var tr = document.getElementById(selected);
  tr.setAttribute("selected", "1", 0);
}

function prevButton() {
  if (selected >= 1) {
    var prevTr = document.getElementById(selected);
    prevTr.removeAttribute("selected");
    selected -= 1;
  }
  highlightInTable1(selected);
  var tr = document.getElementById(selected);
  tr.setAttribute("selected", "1", 0);
}

function highlightInTable1(ele) {
  removeSelectedAttr(document.getElementsByClassName("tdClass"));
  var tr = document.getElementById(ele);
  var startLine = tr.childNodes[0].innerHTML;
  var startCol = tr.childNodes[1].innerHTML;
  var getTd = document.getElementById('r1c' + startCol);
  getTd.setAttribute('selected', '1', 0);
}

function removeSelectedAttr(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute("selected");
  }
}

function tabs(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

//function to clear the text area in Create Grammar tab
function clearGrammar() {
  document.getElementById("gtextArea").value = "";
}

//function to save the grammar in Create Grammar tab
function saveGrammar() {
  
  var grammar = document.getElementById("gtextArea").value;
  $.ajax({
    url: 'http://localhost:5000/api/grammar',
    type: 'post',
    data: grammar,
    headers: {
      'Content-Type': 'text/plain'
    },
    success: function (data) {
      if(data == "") {
        document.getElementById("saveMessage").setAttribute('style','color:green;')
        document.getElementById("saveMessage").innerHTML = "Parser created";
      } else {
        alert(data)
      }
    },
    error: function (err) {
      document.getElementById("saveMessage").setAttribute('style','color:red;')
      saveMessage = "Something failed when creating parser";
    }
  });
  setTimeout(() => {
    document.getElementById("saveMessage").innerHTML = "";
  }, 10000)
}

function selectGrammar() {
  var dropDown = document.getElementById("grammarSelect");
  $.ajax({
    url: 'http://localhost:5000/api/allGrammar',
    type: 'get',
    success: function (data) {
      if( typeof data == 'object' && data.length > 0) {
        data.forEach(file => {
          let option = document.createElement('option');
          option.innerHTML = file;
          dropDown.appendChild(option);
        });
      }
    },
    error: function (err) {
      document.getElementById("saveMessage").setAttribute('style','color:red;')
      saveMessage = "Something failed when creating parser";
    }
  });
}
