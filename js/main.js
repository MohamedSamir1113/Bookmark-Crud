var websiteNameInput = document.getElementById("websiteNameInput")
var websiteURLInput = document.getElementById("websiteURLInput")
var websiteSearchInput = document.getElementById("websiteSearchInput")
var submitBtn = document.getElementById('submit')
var editBtn = document.getElementById('edit')
var deleteBtn = document.getElementById('delete')
var currIndex = 0;
var websiteList = []

//2) 34an ama a3ml refresh el items bta3t localstorage mtde34 h5zn el elements fe el array we a3ml display
//3) lw el 48lt el app 3la gehaz tany wel local storage fadia fel awl errpr hy7sl

if (localStorage.getItem("List") != null) {
    websiteList = JSON.parse(localStorage.getItem("List"))
    displayWebsite()
}

submitBtn.addEventListener('click', addWebsite)

editBtn.addEventListener('click', function () {
    editWebsite()

})

websiteSearchInput.addEventListener('keyup', function () {
    search()

})

function addWebsite() {
    if (validName() && validURL()) {
        var website =
        {
            name: websiteNameInput.value,
            url: websiteURLInput.value
        }


        websiteList.push(website)
        //1)hamla el local storage bel elements 
        localStorage.setItem('List', JSON.stringify(websiteList))
        console.log(localStorage);
        displayWebsite();
        clearForm()
    }

    websiteNameInput.classList.remove('is-valid')
    websiteURLInput.classList.remove('is-valid')

}

function displayWebsite() {
    var temp = ""
    for (i = 0; i < websiteList.length; i++) {
        temp += `<div class="container mt-3  d-flex flex-row" id="websiteContainer">

        <h2 class="me-5 pe-5">${websiteList[i].name}</h2>
        <a href="${websiteList[i].url}" target="_blank" class="btn btn-primary me-3 ">visit</a>
        <button class="btn btn-danger me-3" id="delete" onClick="deleteWebsite(${i})" >delete</button>
        <button class="btn btn-warning" onClick="updateWebsite(${i})">update</button>

    </div>`

    }


    document.getElementById("websiteContainerBox").innerHTML = temp;


}

function clearForm() {
    websiteNameInput.value = ""
    websiteURLInput.value = ""
}

function deleteWebsite(index) {
    websiteList.splice(index, 1)
    localStorage.setItem('List', JSON.stringify(websiteList))
    displayWebsite()

}

function updateWebsite(index) {
    currIndex = index;
    websiteNameInput.value = websiteList[index].name
    websiteURLInput.value = websiteList[index].url

    submitBtn.classList.add('d-none')
    editBtn.classList.replace('d-none', 'd-block')

}

function editWebsite() {
    websiteList[currIndex].name = websiteNameInput.value
    websiteList[currIndex].url = websiteURLInput.value
    submitBtn.classList.remove('d-none')
    editBtn.classList.replace('d-block', 'd-none')
    localStorage.setItem('List', JSON.stringify(websiteList))
    displayWebsite()
    clearForm()
}

function search() {
    var searchedWord = websiteSearchInput.value.toLowerCase()
    var temp = ""
    for (i = 0; i < websiteList.length; i++) {
        if (websiteList[i].name.toLowerCase().includes(searchedWord) || websiteList[i].url.toLowerCase().includes(searchedWord)) {
            temp += `<div class="container mt-3  d-flex flex-row" id="websiteContainer">

        <h2 class="me-5 pe-5">${websiteList[i].name}</h2>
        <a href="${websiteList[i].url}" target="_blank" class="btn btn-primary me-3 ">visit</a>
        <button class="btn btn-danger me-3" id="delete" onClick="deleteWebsite(${i})" >delete</button>
        <button class="btn btn-warning" onClick="updateWebsite(${i})">update</button>

    </div>`
        }
    }
    document.getElementById("websiteContainerBox").innerHTML = temp;
}


var RegExName = /^[A-Z][a-z]{2,10}$/
var RegexURL = /^https:\/\/www\.[a-zA-z]{3,20}(\.com|\.net)$/
websiteNameInput.addEventListener("keyup", function () {
    validName()

})

websiteURLInput.addEventListener("keyup", function () {

    validURL()

})


function validName() {
    if (RegExName.test(websiteNameInput.value) == false) {
        websiteNameInput.classList.add('is-invalid')
        return false
    }
    else if (RegExName.test(websiteNameInput.value) == true) {
        websiteNameInput.classList.replace('is-invalid', 'is-valid')
        return true
    }
}

function validURL() {
    if (RegexURL.test(websiteURLInput.value) == false) {
        websiteURLInput.classList.add('is-invalid')
        return false
    }
    else if (RegexURL.test(websiteURLInput.value) == true) {
        websiteURLInput.classList.replace('is-invalid', 'is-valid')
        return true
    }


}







