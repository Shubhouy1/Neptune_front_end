function showPopUp(){
    const overlay = document.querySelector(".overlay");
    const heading = document.querySelector(".form h2");
    const button = document.querySelector(".submit-btn");

    overlay.classList.add("show-overlay");

    if(editId){
        heading.textContent = "Edit Document";
        button.textContent = "Update";
    } else {
        heading.textContent = "Add Document";
        button.textContent = "Add";
    }
}
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("overlay")){
        document.querySelector(".overlay").classList.remove("show-overlay");   
    }
})
const pendingSelect = document.querySelector(".pending-wrapper");
const statusSelect = document.getElementById("status");
statusSelect.addEventListener("change", function() {
    if(statusSelect.value === "Pending"){
        pendingSelect.style.display = "block";
    } else {
        pendingSelect.style.display = "none";
    }
});
const form = document.querySelector(".form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const docName = document.getElementById("doc-name").value;
    const docStatus= document.getElementById("status").value;
    const pendingNumber = document.getElementById("pendingNumber").value;
    
    if(docName.trim() === ""){
        alert("Please enter a document name.");
        return;
    }
    let className="";
    let buttonText="";
    let pendingText="";
    const label = pendingNumber =="1"? "person":"people";
    if(docStatus==="Pending"){
    className="pending";
    buttonText="Preview";
    pendingText =`<i><small class="pending-first">Waiting for</small><small><span class="pnum"> ${pendingNumber}</span> ${label}</small></i>`
    }
    if(docStatus==="Completed"){
    className="completed";
    buttonText="Download PDF";
    }
    if(docStatus==="Need Signing"){
    className=" status-bar blue";
    buttonText="Sign Now";
    }

    const date = new Date();
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    const docObject = {
        docId : editId ? editId : Date.now(),
        name: docName,
        status: docStatus,
        pendingText: pendingText,
        date: dateString,
        time: timeString,
        className: className,
        buttonText: buttonText
    }
   
    let docs = JSON.parse(localStorage.getItem("documents")) ||[];
    if(editId){
    docs = docs.map(doc =>
        doc.docId === editId ? docObject : doc
    );

    const row = document.querySelector(`tr[data-doc-id="${editId}"]`);

    row.querySelector(".first-column").innerHTML =
        `<input type="checkbox" class="checkbox">${docObject.name}`;

    row.querySelector(".status").innerHTML =
        `<span class="${docObject.className}">${docObject.status}</span><br>${docObject.pendingText}`;

    row.querySelector(".date").innerHTML =
        `<span>${docObject.date}</span><br><small>${docObject.time}</small>`;

    row.querySelector(".button").textContent = docObject.buttonText;

    editId = null;
    }else{
    docs.push(docObject);
    addDocument(docObject);
   }
    localStorage.setItem("documents",JSON.stringify(docs));

    document.querySelector(".overlay").classList.remove("show-overlay");    
    form.reset();
    pendingSelect.style.display="none";
    
   });
function addDocument(docObject){
    const tbody = document.querySelector(".doc-table tbody");
    const tr = document.createElement("tr");
    tr.setAttribute("data-doc-id", docObject.docId);
    tr.innerHTML = `
                    <td><div class ="first-column"><input type="checkbox" class="checkbox">${docObject.name}</div></td>

                    <td>
                        <div class="status">
                        <span class="${docObject.className}">${docObject.status}</span><br>${docObject.pendingText}
                        </div>
                    </td>
                    <td>
                    <div class="date">
                        <span>${docObject.date}</span><br>
                        <small>${docObject.time}</small>
                    </div>
                    </td>

                    <td><div class="last-column">
                    <button class="button">
                    ${docObject.buttonText}
                    </button>
                    <img src="../Images/more_vert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24 2.svg" alt="" class="three-dots">
                       <div class="edit-delete-menu">
                        <button class="update edit-btn">Edit</button>
                        <button class="update delete-btn">Delete</button>
                    </div>
                    </div>
                    
                    </td>
    `;
    tbody.appendChild(tr);
 }
 const cancelBtn = document.querySelector(".cancel-btn");
    cancelBtn.addEventListener("click",()=>{
        form.reset();
        document.querySelector(".overlay").classList.remove("show-overlay");
        pendingSelect.style.display="none";
    })

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("three-dots")) {
        document.querySelectorAll(".edit-delete-menu")
            .forEach(menu => menu.classList.remove("show-menu"));
        const menu = e.target.closest("td").querySelector(".edit-delete-menu");
        menu.classList.add("show-menu");
    }
    else {
        document.querySelectorAll(".edit-delete-menu")
            .forEach(menu => menu.classList.remove("show-menu"));
    }
});
window.addEventListener("DOMContentLoaded",()=>{
        const docs =JSON.parse(localStorage.getItem("documents"))||[];
        docs.forEach(doc=>addDocument(doc));
});

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("delete-btn")){
        deleteDocument(e);
    }
});

function deleteDocument(e){
    const row = e.target.closest("tr");
    const docID = Number(row.getAttribute("data-doc-id"));
    row.remove();
    let docs = JSON.parse(localStorage.getItem("documents"))||[];
    docs=docs.filter((doc)=>doc.docId!==docID)
    localStorage.setItem("documents",JSON.stringify(docs));
}

const searchInput = document.getElementById("search");
searchInput.addEventListener("input",()=>{
    searchDocuments(searchInput.value)
});
function searchDocuments(query){
    const rows = document.querySelectorAll(".doc-table tbody tr");
    let found = false;

    query = query.toLowerCase();

    rows.forEach(row => {
        const docName = row.querySelector(".first-column").innerText.toLowerCase();

        if(docName.includes(query)){
            row.style.display = "";
            found = true;
        } else {
            row.style.display = "none";
        }
    });

    if(!found){
        console.log("No results found");
    }
} 
let editId = null;
document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("edit-btn")){
        const row = e.target.closest("tr")
        editId = Number(row.getAttribute("data-doc-id"));
        const name = row.querySelector(".first-column").textContent;
        const status = row.querySelector(".status span").textContent;
        if(status==="Pending"){
        const pendingNum = row.querySelector(".pnum").textContent;
        const check=document.getElementById("pendingNumber").value =Number(pendingNum);
        console.log("check pen",check);
        pendingSelect.style.display = "block";
         console.log(pendingNum)
    }
        
        console.log(status + name)
        document.getElementById("doc-name").value = name;
        document.querySelector(".form h2").textContent = "Edit Document";
        console.log("inside edit")
        document.getElementById("status").value =status;
        showPopUp();
    }
})
