export function enableBackground(){

    const elements = document.querySelectorAll(".tabs")
    const inputElements = document.querySelectorAll(".inputs")
    const deleteBtns = document.querySelectorAll(".delete-btn")

    elements.forEach((element)=>{
        element.classList.remove("disabled")
    })

    inputElements.forEach((inputEl)=>{
        inputEl.disabled = false
    })

    deleteBtns.forEach((deleteBtn)=>{
        deleteBtn.disabled = false
    })

}