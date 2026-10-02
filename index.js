import { render } from './utils/render.js' 
import { addTabToStorage } from './utils/addTabToStorage.js'
import { getItems } from './utils/getItems.js'
import { setItems } from './utils/setItems.js'
import { updateLeadsInStorage } from './utils/updateLeadsInStorage.js'


const container = document.getElementById("container")
const form = document.getElementById("form")
const saveBox = document.getElementById("box-container")
const main = document.getElementById("main")
const btn = document.getElementById("btn")
const delMsgContainer = document.getElementById("delete-msg-container")
// const cancelDel = document.getElementById("cancel-del-btn")



async function start(){
    await addTabToStorage()
    render()
}

function disableBackground(){

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

}


function enableackground(){

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

form.addEventListener("submit", (e)=>{
    e.preventDefault()
    saveBox.style.display="block"
    disableBackground()

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
        const deleteTabId = e.target.dataset.id
        const deleteTabUrl = e.target.dataset.url

        delMsgContainer.innerHTML = `<button class="del-buttons" id="remove-btn" data-decision="remove" data-del-id="${deleteTabId}" data-del-url="${deleteTabUrl}">Remove tab</button>
                                <button class="del-buttons" id="remove-close-btn" data-decision="close" data-del-id="${deleteTabId}" data-del-url="${deleteTabUrl}">Remove & Close tab</button>
                                <button class="del-buttons" id="cancel-del-btn" data-decision="cancel" data-del-id="${deleteTabId}" data-del-url="${deleteTabUrl}">Cancel</button>`

        //getting tabs from local storage
        // const tabs = getItems("leads")
        // console.log(tabs)
        // const updatedTabsInStorage = tabs.filter((tab)=>{
        //   return ((tab.id !== deleteTabId) && (tab.url !== deleteTabUrl))
        // })

        // console.log(updatedTabsInStorage)
        // setItems("leads", updatedTabsInStorage)
        // render()

        //disabling background
        delMsgContainer.style.display = "flex"
        disableBackground()
        btn.disabled = true

    }
    
})


//choosing deleting option
delMsgContainer.addEventListener("click", (e)=>{

    let { decision, delId, delUrl } = e.target.dataset
    delId = Number(delId)


    if(decision && delId && delUrl){

        if(decision === "remove"){

            updateLeadsInStorage("leads", delId)
            render()
            delMsgContainer.style.display = "none"


        }
        else if(decision === "close"){

            const tabs = getItems("leads")
            const updatedTabsInStorage = tabs.filter((tab)=>{
                return ((tab.id !== delId) && (tab.url !== delUrl))
            })
            
            setItems("leads", updatedTabsInStorage)
            chrome.tabs.remove(delId)
            render()
            delMsgContainer.style.display = "none"

        }

        else if(decision === "cancel"){
            delMsgContainer.style.display = "none"
        }
        
    }

    enableackground()
    btn.disabled = false

})

//when user directly closes tab in chrome
chrome.tabs.onRemoved.addListener((tabId, removeInfo)=>{
    updateLeadsInStorage("leads", tabId)
    render()

})


 start()
