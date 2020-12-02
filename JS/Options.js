let nav_bar = document.querySelector(".nav-bar");
let start_btn = document.querySelector(".start");
let current_opt = document.querySelector(".selection");
let num_ip = document.querySelector(".ip");

// let num = parseInt(num_ip.value);
let data = [];

let method = new Method(parseInt(num_ip.value), data, canvas);
let default_num = parseInt(num_ip.value);

//Options name
for (let i of method.description) {
    let tag = document.createElement("OPTION");
    let text = document.createTextNode(i);
    tag.appendChild(text)
    tag.classList.add("opts");
    // tag.value = i.match(/^(?:\w){2}/g).join("").trim() + "sort";
    tag.value = i.toLowerCase();
    current_opt.appendChild(tag);
}

const eve = new Event("method_changed")

let wrap = document.querySelector(".option-wrap");
let l = current_opt.length;

let cur_select = document.createElement("DIV");
cur_select.setAttribute("class", "current-select");
cur_select.setAttribute("value", current_opt[0].innerHTML.toLowerCase());
cur_select.innerHTML = current_opt[0].innerHTML;

let caret = document.createElement("I");
caret.setAttribute("class", "fas fa-caret-down arrow-down");
cur_select.appendChild(caret);

wrap.appendChild(cur_select);

let select_list = document.createElement("DIV"), select_items = [];
select_list.setAttribute("class", "select-items");
select_list.classList.toggle("hide-items");
for(let i = 0; i < l; i++){
    // console.log(current_opt[i]);
    select_items.push(document.createElement("DIV"));
    select_items[i].setAttribute("class", "choices");
    select_items[i].innerHTML = current_opt[i].innerHTML;
    select_items[i].addEventListener("click",() => {
        cur_select.firstChild.data = select_items[i].innerHTML;
        cur_select.setAttribute("value", select_items[i].innerHTML.toLowerCase());
        cur_select.dispatchEvent(eve);
    });
    select_list.appendChild(select_items[i]);
}

wrap.appendChild(select_list);

wrap.addEventListener("click", toggleList);

function toggleList(){
    cur_select.classList.toggle("active");
    select_list.classList.toggle("hide-items");
}
window.addEventListener("click", (event) => {
    // console.log(event.target);
    if(!(wrap.contains(event.target)) && cur_select.classList.contains("active")){
        toggleList();
    }
});