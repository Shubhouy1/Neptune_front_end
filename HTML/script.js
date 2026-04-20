function showPopUp(){
    document.querySelector(".overlay").classList.add("show-overlay");
}

const pendingSelect = document.querySelector(".pending-wrapper");
const statusSelect = document.getElementById("status");
statusSelect.addEventListener("change", function() {
    if(statusSelect.value === "pending"){
        pendingSelect.style.display = "block";
    } else {
        pendingSelect.style.display = "none";
    }
});