import { render } from './utils/render.js' 
import { addTabToStorage } from './utils/addTabToStorage.js'
import { getItems } from './utils/getItems.js'
import { setItems } from './utils/setItems.js'
import { updateLeadsInStorage } from './utils/updateLeadsInStorage.js'
import { savedWorkspaces } from './utils/savedWorkspaces.js'


const container = document.getElementById("container")
const form = document.getElementById("form")
const saveBox = document.getElementById("box-container")
const main = document.getElementById("main")
const btn = document.getElementById("btn")
const delMsgContainer = document.getElementById("delete-msg-container")

const saveForm = document.getElementById("workspace-form")
const cancelDel = document.getElementById("cancel-del-btn")
const nameInput = document.getElementById("workspace-input")
const saveBtn = document.getElementById("save-btn")


const closeBtn = document.getElementById("created-workspaces-close")
const createdWorkspaceContainer = document.getElementById("created-workspaces-container")
const dropdownMenu = document.getElementById("workspace-values")


// const viewBtn =document.getElementById("view-btn")
// const list = document.getElementById("list")


// viewBtn.addEventListener("click", ()=>{
//     list.style.display = "block"
// })


async function start(){
    await addTabToStorage()
    render()
    
    // if(workspacesNamesArray.length!==0){
    //     MyWorkspaces.disabled = false
    // }

    // if(currentLeads.length!==0){
    //     btn.disabled = false
    // }

}


closeBtn.addEventListener("click", ()=>{
    createdWorkspaceContainer.style.display = "none"
    enableackground()

})

function disableBackground(){

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


function enableackground(){

    const elements = document.querySelectorAll(".tabs")
    const inputElements = document.querySelectorAll(".inputs")
    const deleteBtns = document.querySelectorAll(".delete-btn")

    btn.disabled = false
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
    let workspacesNames = getItems("saved-workspaces") || []

    const userDecision = e.submitter.dataset.value

    if(userDecision === "create"){
        saveBox.style.display="block"
        disableBackground()
    }
    else if(userDecision === "view"){
        createdWorkspaceContainer.style.display = "block"
        disableBackground()

        //rendering saved workspace names as a drop down
        if(workspacesNames.length!==0){
            dropdownMenu.innerHTML = ""
            workspacesNames.forEach((workspaceName)=>{
                console.log(workspaceName)
                dropdownMenu.innerHTML += `<option value="">${workspaceName}</option>`
            })
        }
        else{
            dropdownMenu.innerHTML = `<option value="">No workspaces yet</option>`
        }
        


    }
    

    // const formdata = new FormData(form)
    // const tabIds = formdata.getAll("tab")
    // console.log(`Selected Tabs ${tabIds}`)

    //getting details of currently opened tabs

    // const tabsInStorage = getItems("leads")
    // console.log("Stored tabs:")
    // console.log(tabsInStorage)
    // //getting details of the selected tabs
    // let selectedTabs = []
    // for (let tabId of tabIds){
    //     tabsInStorage.forEach((tab)=>{
    //         if(Number(tabId) === tab.id){
    //             selectedTabs.push(tab)
    //         } 
    //     })
    // } 

    // console.log("Selected tab details:")
    // console.log(selectedTabs)
})




saveForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    const action = e.submitter.dataset.action

    if(action === "save"){

        const saveFormData = new FormData(saveForm)
        let workspaceName = saveFormData.get("workspace-input")
        workspaceName.trim()

        if(!workspaceName){
            return console.error("Invalid workspace name")
        }
        
        const checkedTabs = form.querySelectorAll('input[name="tab"]:checked')
        //converting nodelist into array
        const tabIds = Array.from(checkedTabs).map(tab => tab.value)

        // getting details of stored tabs
        const tabsInStorage = getItems("leads")
        
        //getting details of the selected tabs
        let newWorkspace = []
        for (let tabId of tabIds){
            tabsInStorage.forEach((tab)=>{
                if(Number(tabId) === tab.id){
                    newWorkspace.push(tab)
                } 
            })
        } 

        saveBox.style.display="none"
        enableackground()
        //setting new key value pairs in local storage
        setItems(workspaceName, newWorkspace)

        //adding saved workspace name to workspacesNames array in local storage
        savedWorkspaces(workspaceName)
        render()

    }
    else{
        // console.log("Im here in else")
        saveBox.style.display="none"
        enableackground()
        render()

    }

})
   
//enabling save button only when user type a valid workspace name
nameInput.addEventListener("input", ()=>{
    saveBtn.disabled = true
    const name = nameInput.value.trim()
    saveBtn.disabled = !name
})

container.addEventListener("click", (e)=>{

    if(e.target.dataset.id){


        console.log(e.target.dataset.id)
        const deleteTabId = e.target.dataset.id
        const deleteTabUrl = e.target.dataset.url

        delMsgContainer.innerHTML = `<button class="del-buttons" id="remove-btn" data-decision="remove" data-del-id="${deleteTabId}" data-del-url="${deleteTabUrl}">Remove tab</button>
                                <button class="del-buttons" id="remove-close-btn" data-decision="close" data-del-id="${deleteTabId}" data-del-url="${deleteTabUrl}">Remove & Close tab</button>
                                <button class="del-buttons" id="cancel-del-btn" data-decision="cancel" data-del-id="${deleteTabId}" data-del-url="${deleteTabUrl}">Cancel</button>`


        //disabling background
        delMsgContainer.style.display = "flex"
        disableBackground()
        

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
    

})

//when user directly closes tab in chrome
chrome.tabs.onRemoved.addListener((tabId, removeInfo)=>{
    updateLeadsInStorage("leads", tabId)
    render()

})


 start()




 //RENDER SAVED WORKSPACES