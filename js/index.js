
var siteNameInput = document.getElementById("site");
var siteUrlInput = document.getElementById("url");
var submitBtn = document.getElementById("submitBtn");
var ModfiyBtn = document.getElementById("ModfiyBtn");
var alertBtn = document.getElementById("exitAlert");

// localStorage.clear();
// localStorage.setItem("site","[]");
var myindex=-1;
var siteAnchor;
if(localStorage.getItem("site")=="[]" ||localStorage.getItem("site")==null ){
     siteAnchor = [];
    console.log("here");
}
else {
    siteAnchor = JSON.parse(localStorage.getItem("site"));
    display(siteAnchor,0);

}

function validation(inputs) {
    regex = {
        site:/^[\w]{3,50}$/,
        url:/^(https?:\/\/)?[a-zA-Z0-9\-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/  
    }
    if (regex[inputs.id].test(inputs.value) == false) {
        inputs.classList.add("is-invalid");
        inputs.classList.remove("is-valid");
    }
    else {
        inputs.classList.replace("is-invalid", "is-valid");
    }  
}
function clearInput() {
    siteNameInput.value = null;
    siteUrlInput.value = null;
    siteNameInput.classList.remove("is-valid");
    siteUrlInput.classList.remove("is-valid");
}
function exitAlert() {
    alertBtn.classList.replace("d-block", "d-none");
}
function showAlert() {
    alertBtn.classList.replace("d-none", "d-block");

}
function submit() {
   
    if (siteNameInput.classList.contains("is-valid") && siteUrlInput.classList.contains("is-valid")) {
        if (siteUrlInput.value.startsWith("https://") || siteUrlInput.value.startsWith("http://"))
        {
        saveSite = {
            siteName: siteNameInput.value,
            siteUrl: siteUrlInput.value
            }
        }
        else
        {
            saveSite = {
                siteName: siteNameInput.value,
                siteUrl:"https://"+ siteUrlInput.value
                }
            }
        siteAnchor.push(saveSite);
        localStorage.setItem("site", JSON.stringify(siteAnchor));
        display(siteAnchor, 0);
        clearInput();
    }
    else {
        showAlert();
        clearInput();
    }
}
function display(arr,updateHandler) {
    var strHtml="";
    for (var i = 0; i < arr.length; i++){
        strHtml += `<tr class="border">
              <td class="p-2" >${i+1}</td>
              <td  class="p-2">${arr[i].siteName}</td>
              <td class="p-2">
                <a href="${arr[i].siteUrl}" class="text-capitalize btn btn-success pe-2" >
                  <i class="fa-solid fa-eye pe-2"></i>
                 Visit
                </a>
              </td>
              <td class="p-2">
                <button onclick="moveInfoToInput(${i+updateHandler})" id="update" class="text-capitalize btn btn-warning pe-2" >
                  <i class="fa-solid fa-pencil"></i>
                 update
                </button>
              </td>
              <td class="p-2">
                <button onclick="Delete(${i+updateHandler})" id="delete" class="text-capitalize btn btn-danger pe-2" >
                  <i class="fa-solid fa-trash-can"></i>
                  delete
                </button>
              </td>
            </tr>`;
    }
    document.getElementById("content").innerHTML = strHtml;

}
function Delete(index) {
    siteAnchor.splice(index, 1);
    localStorage.removeItem("site");
    localStorage.setItem("site", JSON.stringify(siteAnchor));
    display(siteAnchor, 0);
    if (submitBtn.classList.contains("d-none")) {
        submitBtn.classList.remove("d-none");
    ModfiyBtn.classList.add("d-none");
    }

}



function moveInfoToInput(index) {
    myindex = index;
    siteNameInput.value = siteAnchor[index].siteName;
    siteUrlInput.value = siteAnchor[index].siteUrl;
    siteNameInput.classList.add("is-valid");
    siteUrlInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
    siteUrlInput.classList.remove("is-invalid");
    submitBtn.classList.add("d-none");
    ModfiyBtn.classList.remove("d-none");
    displayUpdate(index,siteAnchor);

}

function displayUpdate(index, arr) {
    
    
    display(arr.slice(index, index+1),index);
    
}
function update() {
    if (siteNameInput.classList.contains("is-valid") && siteUrlInput.classList.contains("is-valid")) {
        if (siteUrlInput.value.startsWith("https://") || siteUrlInput.value.startsWith("http://")) { 
        siteAnchor[myindex].siteName = siteNameInput.value;
        siteAnchor[myindex].siteUrl = siteUrlInput.value;
        }
        else
        {
            siteAnchor[myindex].siteName = siteNameInput.value;
        siteAnchor[myindex].siteUrl = "https://"+siteUrlInput.value;
        }
        submitBtn.classList.remove("d-none");
        ModfiyBtn.classList.add("d-none");
        localStorage.setItem("site", JSON.stringify(siteAnchor));
        clearInput();
        display(siteAnchor, 0); 
    }
    else {
        showAlert();
      
    }
  
}

alertBtn.addEventListener("click", function (e) {
    if (e.target.id == alertBtn.id) {
        exitAlert()
    }
})

document.addEventListener('scroll', function () {

    var scrollableHeight = document.documentElement.scrollHeight; 
    var newHeight =  scrollableHeight;
    alertBtn.style.height = newHeight + 'px' ;
  });
//adjust the alert when scrolling in mobile view