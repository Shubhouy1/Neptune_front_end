function showPopUp(){
    document.querySelector(".overlay").classList.add("show-overlay");
}

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
    pendingText =`<i><small class="pending-first">Waiting for</small><small> ${pendingNumber} ${label}</small></i>`
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
        docId : Date.now(),
        name: docName,
        status: docStatus,
        pendingText: pendingText,
        date: dateString,
        time: timeString,
        className: className,
        buttonText: buttonText
    }
    addDocument(docObject);
    form.reset();
    document.querySelector(".overlay").classList.remove("show-overlay");    
      pendingSelect.style.display="none";
    
   });
 function addDocument(docObject){
    const tbody = document.querySelector(".doc-table tbody");
    const tr = document.createElement("tr");
    tr.setAttribute("data-doc-id", docObject.docId);
    tr.innerHTML = `
                    <td><div class ="first-column"><input type="checkbox" id="checkbox">${docObject.name}</div></td>

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
                    <img src="../Images/more_vert_24dp_5F6368_FILL0_wght400_GRAD0_opsz24 2.svg" alt="">
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

