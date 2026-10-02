import { render } from './utils/render.js' 
import { addTabToStorage } from './utils/addTabToStorage.js'
import { getItems } from './utils/getItems.js'
import { setItems } from './utils/setItems.js'

const container = document.getElementById("container")
const form = document.getElementById("form")
const saveBox = document.getElementById("box-container")
const main = document.getElementById("main")





async function start(){
    await addTabToStorage()
    render()
}



form.addEventListener("submit", (e)=>{
    e.preventDefault()
    saveBox.style.display="block"

    const elements = document.querySelectorAll(".tabs")
    const inputElements = document.querySelectorAll(".inputs")
    const deleteBtns = document.querySelectorAll(".delete-btn")

    elements.forEach((element)=>{
        element.classList.add("disabled")
        
    })

    inputElements.forEach((inputEl)=>{
        inputEl.disabled = true
    })

    deleteBtns.forEach((deleteBtn)=>{
        deleteBtn.disabled = true
    })


    const formdata = new FormData(form)
    const tabIds = formdata.getAll("tab")
    console.log(`Selected Tabs ${tabIds}`)
    //getting details of currently opened tabs
    const tabsInStorage = getItems("leads")
    console.log("Stored tabs:")
    console.log(tabsInStorage)
    //getting details of the selected tabs
    let selectedTabs = []
    for (let tabId of tabIds){
        tabsInStorage.forEach((tab)=>{
            if(Number(tabId) === tab.id){
                selectedTabs.push(tab)
            } 
        })
    } 

    console.log("Selected tab details:")
    console.log(selectedTabs)
})


// const saveForm = document.getElementById("workspace-form")


// saveForm.addEventListener("submit", (e)=>{
//     e.preventDefault()

//     if(e.target.id === "save-btn"){


//     }
//     else{
//         saveBox.style.display="none"

//         const elements = document.querySelectorAll(".tabs")
//         const inputElements = document.querySelectorAll(".inputs")
//         const deleteBtns = document.querySelectorAll(".delete-btn")

//         elements.forEach((element)=>{
//             element.classList.remove("disabled")
//         })

//         inputElements.forEach((inputEl)=>{
//             inputEl.disabled = false
//         })

//         deleteBtns.forEach((deleteBtn)=>{
//             deleteBtn.disabled = false
//         })

//     }

// })
   


container.addEventListener("click", (e)=>{
    if(e.target.dataset.id){
        console.log(e.target.dataset.id)
        const deleteTabId = Number(e.target.dataset.id)
        const deleteTabUrl = Number(e.target.dataset.url)
        //getting tabs from local storage
        const tabs = getItems("leads")
        console.log(tabs)
        const updatedTabsInStorage = tabs.filter((tab)=>{
          return ((tab.id !== deleteTabId) && (tab.url !== deleteTabUrl))
        })

        console.log(updatedTabsInStorage)
        setItems("leads", updatedTabsInStorage)
        render()

    }
    
})



 start()
