
showpages(); // why we add this function here, because if the web-page reloaded then all the pages will appear automatically, if we don't call this function here, then all the pages will get vanish with the web-page reloading.

// If user add the pages in the notebook , then it add to the localstorage
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function () {
    // whenever user click on the add button then this will happen.
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let pages = sessionStorage.getItem('pages');
    if (pages == null) {
        pagesObj = [];
    }
    else {
        pagesObj = JSON.parse(pages);
    }
    let TandP = {
        title: addTitle.value,
        text: addTxt.value
    }
    pagesObj.push(TandP);
    sessionStorage.setItem('pages', JSON.stringify(pagesObj)) // convert the notes into string(which is an array now)
    // converting in string from array because in the localstorage , it is mandatory to set the data in strings.

    addTxt.value = ''; // we set add.Txt as blank becuse when we add the page then after adding the textarea get clear for new pages.
    addTitle.value = ''; // we set add.Txt as blank becuse when we add the page then after adding the textarea get clear for new pages.
    // console.log(pagesObj);

    showpages(); // show all the pages after addition of content of the page.
})

function showpages() {
    let pages = sessionStorage.getItem('pages');
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
            <h5 class="card-title">Page ${index + 1} : ${element.title}</h5>
            <p class="card-text"> ${element.text}</p>
            <button id="${index}" onclick="deletePage(this.id)" class="btn btn-primary">Delete Page</button>
            </div>
            </div>    `;

    });

    let pagesElm = document.getElementById('pages');
    // here , if there is no pages then show  message "write somthing to add" 
    if (pagesObj.length != 0) {
        pagesElm.innerHTML = html;
    }
    else {
        pagesElm.innerHTML = '<h3 style="margin-left: 150px;">Here you can add and delete pages of the notebook</h3>';
    }
}

// Deleting the page.
function deletePage(index) {
    let pages = sessionStorage.getItem('pages');
    if (pages == null) {
        pagesObj = [];
    }
    else {
        pagesObj = JSON.parse(pages);
    }
    pagesObj.splice(index, 1);
    sessionStorage.setItem('pages', JSON.stringify(pagesObj))
    showpages();

}

// serching 

let search = document.getElementById("search");
search.addEventListener("input", function () {
    let searchV = search.value;
    
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






