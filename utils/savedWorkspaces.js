import { setItems } from "./setItems.js" 
import { getItems } from "./getItems.js" 
const MyWorkspaces = document.getElementById("my-wokspaces-btn")

export function savedWorkspaces(name){

    let workspacesNames = getItems("saved-workspaces") || []

    workspacesNames.push(name)
    setItems("saved-workspaces", workspacesNames)

    if(workspacesNames.length!==0){
            MyWorkspaces.disabled = false
    }
}