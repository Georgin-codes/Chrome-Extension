export function disableBackground(){

    const elements = document.querySelectorAll(".tabs")
    const inputElements = document.querySelectorAll(".inputs")
    const deleteBtns = document.querySelectorAll(".delete-btn")

    btn.disabled = true
    elements.forEach((element)=>{
        element.classList.add("disabled")
        
    })

    inputElements.forEach((inputEl)=>{
        inputEl.disabled = true
    })

    deleteBtns.forEach((deleteBtn)=>{
        deleteBtn.disabled = true
    })

}



    
