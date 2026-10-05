import { setItems } from "./setItems.js" 
import { getItems } from "./getItems.js" 
const MyWorkspaces = document.getElementById("my-wokspaces-btn")
const dropdownMenu = document.getElementById("workspace-values")

export function savedWorkspaces(name){

    let workspacesNames = getItems("saved-workspaces") || []

    workspacesNames.push(name)
    //rendering saved workspace names as a drop down
    dropdownMenu.innerHTML = ""
    workspacesNames.forEach((workspaceName)=>{
        console.log(workspaceName)
        dropdownMenu.innerHTML += `<option value="">${workspaceName}</option>`
    })
    
    setItems("saved-workspaces", workspacesNames)

    if(workspacesNames.length!==0){
            MyWorkspaces.disabled = false
    }
}