
showpaeges(); // why we add this function here, because if the web-page reloaded then all the pages will appear automatically, if we don't call this function here, then all the pages will get vanish with the web-page reloading.

// If user add the pages in the notebook , then it add to the localstorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    // whenever user click on the add button then this will happen.
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let name = document.getElementById('name');
    let pages = localStorage.getItem('pages');
    if (pages == null) {
        pagesObj = [];
    }
    else {
        pagesObj = JSON.parse(pages);
    }
    let TandP = {
        Email: email.value,
        Password: password.value,
        Name: name.value
    }
    pagesObj.push(TandP);
    localStorage.setItem('pages', JSON.stringify(pagesObj)) // convert the notes into string(which is an array now)
    // converting in string from array because in the localstorage , it is mandatory to set the data in strings.

    email.value = ''; // we set add.Txt as blank ecuse when we add the page then after adding the textarea get clear for new pages.
    password.value = ''; // we set add.Txt as blank ecuse when we add the page then after adding the textarea get clear for new pages.
    name.value = ''; // we set add.Txt as blank ecuse when we add the page then after adding the textarea get clear for new pages.
    console.log(pagesObj);

    showpaeges();
})

function showpaeges() {
    let pages = localStorage.getItem('pages');
    if (pages == null) {
        pagesObj = [];
    }
    else {
        pagesObj = JSON.parse(pages);
    }
    let html = '';

    pagesObj.forEach(function (element, index) {

        html += `
                    <div class="pageCard card my2 mx-2" style="width: 1088px; margin: 12px;  border: 2px solid grey;">
                    <div class="card-body" style="margin: 20px 23px;
            padding: 15px 15px;border: 2px solid black; box-shadow: 9px 9px 10px;">
            <h5 class="card-title">Student No. ( ${index + 1} ) : ${element.Name}</h5>
            <p class="card-text"> Email is : ${element.Email}</p>
            <a href="/notebook/index.html"> <button id="${index}"   class="c btn btn-primary">Go to the NoteBook</button></a>
            <button id="${index}" onclick="deletePage(this.id)" class="btn btn-primary">Delete NoteBook</button>
            </div>
            </div>    `;

    });

    let pagesElm = document.getElementById('pages');
    // here , if there is no pages then show shoe message "write somthing to add" 
    if (pagesObj.length != 0) {
        pagesElm.innerHTML = html;
    }
    else {
        pagesElm.innerHTML = '<h3 style="margin-left: 150px;">Please Enter Your Name and Details to get the Note-Book</h3>';
    }
}

let c = document.getElementsByClassName('c');



// Logic for Deleting the page.
function deletePage(index) {
    let pages = localStorage.getItem('pages');
    if (pages == null) {
        pagesObj = [];
    }
    else {
        pagesObj = JSON.parse(pages);
    }
    pagesObj.splice(index, 1);
    localStorage.setItem('pages', JSON.stringify(pagesObj))
    showpaeges();

}

// serching

let search = document.getElementById("search");
search.addEventListener("input", function () {
    let searchV = search.value;
    console.log("input event fired");
    let pagecards = document.getElementsByClassName("pageCard");
    Array.from(pagecards).forEach(function (element) {
        let cardtext = element.getElementsByTagName('p')[0].innerText; // if user input text in the search bar
        let cardIndex = element.getElementsByTagName('h5')[0].innerText; // if user input page Number in the search bar
        console.log(cardtext);
        // console.log(cardIndex[index]);
        if (cardtext.includes(searchV) || cardIndex.includes(searchV)) {
            element.style.display = 'block';
        }
        else {
            element.style.display = 'none';

        }

    })
})









 


