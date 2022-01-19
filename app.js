const addForm = document.getElementById("addForm");
const itemList = document.getElementById("items");
const del = document.querySelector(".delete");
const filter = document.getElementById("filter");
const msg = document.querySelector(".msg");

addForm.addEventListener('submit', function(e) {
    e.preventDefault();

    let item = document.getElementById("item").value;

    if (item.length>0) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.appendChild(document.createTextNode(item));

        const btn = document.createElement('button');
        btn.className = 'delete btn btn-danger btn-sm float-right';
        btn.appendChild(document.createTextNode("X"));
        li.appendChild(btn);
        itemList.appendChild(li);

        document.getElementById("item").value="";
    } else {
        msg.textContent="Atleast Enter One Character";
        setTimeout(() => {msg.textContent=""}, 1000);
    }
})

itemList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        const li = e.target.parentElement;
        itemList.removeChild(li);
    }
})

filter.addEventListener('keyup', function(e) {
    const text = e.target.value.toLowerCase();

    const items = itemList.getElementsByTagName('li');

    Array.from(items).forEach(function(item){
   		const itemName = item.firstChild.textContent;

   		if(itemName.toLowerCase().indexOf(text) != -1){
   			item.style.display = 'block';
   		} else{
   			item.style.display = 'none';
   		}
    })
})
