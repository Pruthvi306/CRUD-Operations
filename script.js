let tbody = document.querySelector('tbody');
let addBtn = document.querySelector('.add');
let form = document.querySelector('.form-wrapper');
let saveBtn = document.querySelector('.save');
let cancelBtn = document.querySelector('.cancel');
let mobileElement = document.querySelector('#mobile');
let priceElement = document.querySelector('#price');
let ramElement = document.querySelector('#ram');
let storageElement = document.querySelector('#storage');

let httpm = null;

let url = 'http://localhost:8000/mobiles';
let mobiles = [];
let id = null;
let data={};

addBtn.onclick = function(){
    httpm='POST';
    form.classList.add('active');
}

saveBtn.onclick=function(){
    data.name = mobileElement.value;
    data.price = priceElement.value;
    data.ram = ramElement.value;
    data.storage = storageElement.value;
    if(httpm === 'PUT'){
        data.id = id;
    }

    const requestUrl = (httpm === 'PUT') ? `${url}/${id}` : url;

    fetch(requestUrl, {
        method: httpm,
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(responseData => {
        console.log(responseData);
        clearForm();
        form.classList.remove('active');
        getMobiles();
    })
    .catch(error => console.error('Error:', error)); // Handle any errors
}

cancelBtn.onclick = function(){
    form.classList.remove('active');
}

function getMobiles(){
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data); // Check if data is correct
        mobiles = data;
        updateTable();
    })
    .catch(error => console.error('Error:', error)); // Handle any errors
}

getMobiles();

function updateTable(){
    let data = '';

    if(mobiles.length > 0){
        for(let i = 0; i < mobiles.length; i++){
            data += `
            <tr id="${mobiles[i]['id']}">
                <td>${mobiles[i]['name']}</td>
                <td>${mobiles[i]['price']}</td>
                <td>${mobiles[i]['ram']}GB</td>
                <td>${mobiles[i]['storage']}GB</td>
                <td><button class="btn btn-primary" onclick="editMobile(event)">Edit</button></td>
                <td><button class="btn btn-danger" onclick="deleteMobile(event)">Delete</button></td>
            </tr>`;
        }
        tbody.innerHTML = data;
    }
}   

function clearForm(){
    mobileElement.value = '';
    priceElement.value = '';
    ramElement.value = '';
    storageElement.value = '';
}

function editMobile(e){
    form.classList.add('active');
    httpm = 'PUT';
    id = e.target.parentElement.parentElement.id;
    let mobile = mobiles.find(m => m.id == id);

    mobileElement.value = mobile.name;
    priceElement.value = mobile.price;
    ramElement.value = mobile.ram;
    storageElement.value = mobile.storage;
}

function deleteMobile(e){
    id = e.target.parentElement.parentElement.id;
    fetch(`${url}/${id}`, { method: 'DELETE' })
    .then(() => {
        getMobiles();
    })
    .catch(error => console.error('Error:', error)); 
}
