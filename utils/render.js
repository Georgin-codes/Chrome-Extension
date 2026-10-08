import { getItems } from './getItems.js'

const container = document.getElementById("container")
const  workspacesNamesArray = getItems("saved-workspaces") || []
const leads = getItems("leads") || []
const btn = document.getElementById("btn")
const MyWorkspaces = document.getElementById("my-wokspaces-btn")


export function render(){
    
    container.innerHTML = ""
    leads.forEach((lead)=>{
        const {title, url, id} = lead
        container.innerHTML += `<div class="tabs">
                                    <input class="inputs" id="checkbox-${id}" type="checkbox" name="tab" value="${id}">
                                    <label class="labels" for="checkbox-${id}" name="tab">${title}</label>
                                    <button type="button" class="delete-btn" data-id="${id}" data-url="${url}">X</button>
                                </div>`

    })

    if(workspacesNamesArray.length!==0){
        MyWorkspaces.disabled = false
    }

    // if(leads.length!==0){
    //     btn.disabled = false
    // }
        
}