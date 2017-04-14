const app = require('./app.js');
app.getFileContent();
let anobject = {a:1,b:'hello'};
let result = JSON.stringify(anobject);
console.log("Stringified OBJECT: "+ result);
app.storeFileContent(result);

const form = document.getElementById("guest_form");
const guest_list = document.getElementById("guest_list");
form.addEventListener('submit', e => {
    e.preventDefault();
const name = document.getElementById("name").value;
const guest_num = document.getElementById("guest_number").value;

//guest_type radio buttons
let guest_type = "";
if(document.getElementById("bride").checked) {
    guest_type = "bride";
}else if(document.getElementById("groom").checked) {
    guest_type = "groom";
}

//status radio buttons
let status = "";
if(document.getElementById("yes").checked) {
    status = "yes";
} else if(document.getElementById("undecided").checked) {
    status = "undecided";
} else if(document.getElementById("no").checked) {
    status = "no";
}

console.log(name + guest_num + guest_type + status +"");

//Create new guest entry
const list_item = document.createElement('li');
list_item.innerHTML = "<p>Name: " + name + "</p>" +
    "<p>Number of guests: " + guest_num + "</p>" +
    "<p>Party of the: " + guest_type + "</p>" +
    "<p>Status: " + status + "</p>" +
    "<img src='img/couple.svg' alt='couple'>";
guest_list.appendChild(list_item);
});

