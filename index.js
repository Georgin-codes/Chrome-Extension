import { addTabToStorage } from './utils/addTabToStorage.js'
import { getItems } from './utils/getItems.js'
const container = document.getElementById("container")
const form = document.getElementById("form")
const saveBox = document.getElementById("box-container")


function render(){
    const leads = getItems("leads")
    leads.forEach((lead)=>{
        const {title, url, id} = lead
        container.innerHTML += `<div class="tabs">
                                    <input class="inputs" id="checkbox-${id}" type="checkbox" name="tab" value=${url}>
                                    <label class="labels" for="checkbox-${id}" name="tab">${title}</label>
                                </div>`

    })


}


async function start(){
    await addTabToStorage()
    render()
}



form.addEventListener("submit", (e)=>{
    e.preventDefault()
    saveBox.style.display="block"

    const elements = document.querySelectorAll(".tabs")
    const inputElements = document.querySelectorAll(".inputs")
    elements.forEach((element)=>{
        element.classList.add("disabled")
        
    })

    inputElements.forEach((inputEl)=>{
        inputEl.disabled = true
    })


    const formdata = new FormData(form)
    const tabUrls = formdata.getAll("tab")
    console.log(`Selected Tabs ${tabUrls}`)
    //getting details of currently opened tabs
    const tabsInStorage = getItems("leads")
    console.log("Stored tabs:")
    console.log(tabsInStorage)
    //getting details of the selected tabs
    let selectedTabs = []
    for (let tabUrl of tabUrls){
        tabsInStorage.forEach((tab)=>{
            if(tabUrl === tab.url){
                selectedTabs.push(tab)
            } 
        })
    } 

    console.log("Selected tab details:")
    console.log(selectedTabs)
})

// const saveBtn = document.getElementById("save-btn")
// const cancelBtn = document.getElementById("cancel-btn")
const saveForm = document.getElementById("workspace-form")


saveForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    if(e.target.id === "save-btn"){


    }
    else{
        saveBox.style.display="none"

        const elements = document.querySelectorAll(".tabs")
        const inputElements = document.querySelectorAll(".inputs")

        elements.forEach((element)=>{
            element.classList.remove("disabled")
        })

        inputElements.forEach((inputEl)=>{
            inputEl.disabled = false
        })
    }

})
   






 start()
