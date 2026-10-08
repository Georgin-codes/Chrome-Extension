import { getItems } from './getItems.js'

const container = document.getElementById("container")
const MyWorkspaces = document.getElementById("my-wokspaces-btn")


export async function render(){

    const  workspacesNamesArray = await getItems("saved-workspaces") || []
    const leads = await getItems("leads") || []
    
    container.innerHTML = ""

    if(leads.length === 0){

        container.innerHTML = `<div class="extension-intro">
                                    <p>Open tabs to create workspaces. You can access your saved workspaces here even after you close or delete the tabs.</p>
                                </div>`
    }
    else{

        leads.forEach((lead)=>{
            const {title, url, id} = lead
            container.innerHTML += `<div class="tabs">
                                        <input class="inputs" id="checkbox-${id}" type="checkbox" name="tab" value="${id}">
                                        <label class="labels" for="checkbox-${id}" name="tab">${title}</label>
                                        <button type="button" class="delete-btn" data-id="${id}" data-url="${url}">X</button>
                                    </div>`

            })
    }

    if(workspacesNamesArray.length!==0){
        MyWorkspaces.disabled = false
    }

}
