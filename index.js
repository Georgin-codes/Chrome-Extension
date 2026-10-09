import { render } from './utils/render.js' 
import { addTabToStorage } from './utils/addTabToStorage.js'
import { getItems } from './utils/getItems.js'
import { setItems } from './utils/setItems.js'
import { updateLeadsInStorage } from './utils/updateLeadsInStorage.js'
import { savedWorkspaces } from './utils/savedWorkspaces.js'
import { disableBackground } from './utils/disableBackground.js'
import { enableBackground } from './utils/enableBackground.js'


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
const createdWorkspaceForm = document.getElementById("created-workspaces-form")
const workspaceTabs = document.getElementById("tabs-container")
const workspaceEl = document.getElementById("workspace-elements")
const workspaceElementsClose = document.getElementById("workspace-elements-close")


const workspaceElForm = document.getElementById("workspace-elements-form")
const worspaceBtns = document.getElementById("workspace-btns")
const response = document.getElementById("response")
const MyWorkspaces = document.getElementById("my-wokspaces-btn")



async function start(){
    await addTabToStorage()
    await render()

}


// enabling create workspace button 
container.addEventListener("change", (e) => {
    
    if (e.target.matches('input[name="tab"]')) {

        const checked = container.querySelector('input[name="tab"]:checked')
        //checked is not null if atleast one box is checked
        btn.disabled = !checked
    }

})


createdWorkspaceForm.addEventListener("submit", async (e)=>{
    e.preventDefault()
    
    //closing dropdown
    createdWorkspaceContainer.style.display = "none"

     //getting user choice - workspace selection
    const workspaceFormData = new FormData(createdWorkspaceForm)
    const selectedWorkspaceName = workspaceFormData.get("workspace-values") 
    //getting tab details of selected workspace
    const selectedWorkspaceTabs = await getItems(selectedWorkspaceName)

    const btnAction = e.submitter.dataset.userAction

    if(btnAction){
        if(btnAction === "view"){
            workspaceEl.style.display = "block"
            workspaceTabs.innerHTML = ""
            selectedWorkspaceTabs.forEach((tab)=>{
                const { id, url, title} = tab
                workspaceTabs.innerHTML += `<div class="workspace-tabs">
                                            <input class="workspace-elements-inputs" id="checkbox-${id}" type="checkbox" name="workspace-tabs" value="${id}">
                                            <label class="labels" for="checkbox-${id}" name="workspace-tabs">${title}</label>
                                        </div>`

            })

            worspaceBtns.innerHTML = `<button class="select-buttons"id="workspace-el-delete" data-choose="delete" data-workspace-name="${selectedWorkspaceName}" disabled>Delete</button>`


        }
        else if (btnAction === "open"){
           
            
            let selectedworkspaceUrls = []
            selectedWorkspaceTabs.forEach((tab)=>{
                selectedworkspaceUrls.push(tab.url)
            })

            await chrome.windows.create({url:selectedworkspaceUrls})
            enableBackground()
                  
        }
    }

})


workspaceElForm.addEventListener("change", (e)=>{
    // console.log(e)
    const workspaceElDelete = document.getElementById("workspace-el-delete")
    workspaceElDelete.disabled = !e.target.checked

})

workspaceElForm.addEventListener("submit", async (e)=>{
    e.preventDefault()
    const userAction = e.submitter.dataset.choose
    const workspaceName = e.submitter.dataset.workspaceName
    const workspaceTabsArray = await getItems(workspaceName)
    
    if(userAction){

        if(userAction === "delete"){
            const checkedTabsValues = workspaceElForm.querySelectorAll('input[name="workspace-tabs"]:checked')
            //converting nodelist to array
            const checkedTabsValuesArray = Array.from(checkedTabsValues).map(tab => Number(tab.value))
            
            let updatedWorkspaceEl = []
            for (const workspaceTabs of workspaceTabsArray){
                if(!checkedTabsValuesArray.includes(workspaceTabs.id)){
                    updatedWorkspaceEl.push(workspaceTabs)
                }
            }
            
            //updating local storage
            await setItems(workspaceName, updatedWorkspaceEl)
            const updatedWorkspaceInStorage = await getItems(workspaceName)
            workspaceTabs.innerHTML = ""
            updatedWorkspaceInStorage.forEach((tab)=>{
            const { id, url, title} = tab
            workspaceTabs.innerHTML += `<div class="workspace-tabs">
                                            <input class="workspace-elements-inputs" id="checkbox-${id}" type="checkbox" name="workspace-tabs" value="${id}">
                                            <label class="labels" for="checkbox-${id}" name="workspace-tabs">${title}</label>
                                        </div>`

            })
            
            //if user delete all tabs from selected workspace
            if(updatedWorkspaceInStorage.length === 0 ){

                await chrome.storage.local.remove(workspaceName)

                let savedNames = await getItems("saved-workspaces")
                savedNames = savedNames.filter((name)=>{
                    return name !== workspaceName
                })

                //updating and storing workspace names in storage
                if(savedNames.length !== 0){
                    await setItems("saved-workspaces", savedNames)
                }
                else{
                    //removing saved-workspace array if it is empty
                    await chrome.storage.local.remove("saved-workspaces")
                    MyWorkspaces.disabled = true
                }
                
                
                workspaceEl.style.display = "none"
                enableBackground()
            }

        }
        
    }

})

workspaceElementsClose .addEventListener("click", ()=>{
    workspaceEl.style.display = "none"
    enableBackground()

})

closeBtn.addEventListener("click", ()=>{
    createdWorkspaceContainer.style.display = "none"
    enableBackground()
})


form.addEventListener("submit", async (e)=>{
    e.preventDefault()
    let workspacesNames = await getItems("saved-workspaces") || []

    const userDecision = e.submitter.dataset.value

    if(userDecision === "create"){
        response.textContent = "Give a name for your workspace"
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
                dropdownMenu.innerHTML += `<option value="${workspaceName}">${workspaceName}</option>`
            })
        }
        else{
            dropdownMenu.innerHTML = `<option value="">No workspaces yet</option>`
        }
        
    }
    
})




saveForm.addEventListener("submit", async(e)=>{
    e.preventDefault()

    const action = e.submitter.dataset.action

    if(action === "save"){
        
        const checkedTabs = form.querySelectorAll('input[name="tab"]:checked')
        //converting nodelist into array
        const tabIds = Array.from(checkedTabs).map(tab => tab.value)

        // getting details of stored tabs
        const tabsInStorage = await getItems("leads")
        
        
        //getting details of the selected tabs
        let newWorkspace = []
        for (let tabId of tabIds){
            tabsInStorage.forEach((tab)=>{
                if(Number(tabId) === tab.id){
                    newWorkspace.push(tab)
                } 
            })
        } 


        const saveFormData = new FormData(saveForm)
        let workspaceName = saveFormData.get("workspace-input")
        workspaceName = workspaceName.trim()
        const isValid = /^[A-Za-z ]+$/.test(workspaceName)


        if(!workspaceName){
            response.textContent = "Invalid workspace name"
            return console.error("Invalid workspace name")
        }

        if(!isValid){
            response.textContent = "Workspace name can contain letters and spaces only."
            return console.error("Workspace name can contain letters and spaces only.")
        }

        //adding saved workspace name to workspacesNames array in storage
        const output = await savedWorkspaces(workspaceName)

        response.textContent = output.message

        if(!output.ok){
            return     
        }

        //setting new key value pairs in storage
        await setItems(workspaceName, newWorkspace)

        setTimeout(()=>{
            saveBox.style.display="none"
        }, 1000)
        
        enableBackground()
        await render()
        
    }
    else{
        saveBox.style.display="none"
        enableBackground()
        await render()

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
delMsgContainer.addEventListener("click", async (e)=>{

    let { decision, delId, delUrl } = e.target.dataset
    delId = Number(delId)


    if(decision && delId && delUrl){

        if(decision === "remove"){

            await updateLeadsInStorage("leads", delId)
            await render()
            delMsgContainer.style.display = "none"

        }
        else if(decision === "close"){

            const tabs = await getItems("leads")
            const updatedTabsInStorage = tabs.filter((tab)=>{
                return (tab.id !== delId)
            })
            
            await setItems("leads", updatedTabsInStorage)
            chrome.tabs.remove(delId)
            await render()
            delMsgContainer.style.display = "none"

        }

        else if(decision === "cancel"){
            delMsgContainer.style.display = "none"
        }
        
    }

    enableBackground()
    

})

//when user directly closes tab in chrome
// chrome.tabs.onRemoved.addListener(async (tabId, removeInfo)=>{
//     await updateLeadsInStorage("leads", tabId)
//     await render()

// })


 await start()
