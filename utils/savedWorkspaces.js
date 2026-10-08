import { setItems } from "./setItems.js" 
import { getItems } from "./getItems.js" 
// const MyWorkspaces = document.getElementById("my-wokspaces-btn")


export async function savedWorkspaces(name){

    let workspacesNames = await getItems("saved-workspaces") || []

    if(!workspacesNames.includes(name)){
        workspacesNames.push(name)
        await setItems("saved-workspaces", workspacesNames)
        return {message : "Workspace created successfully", ok:true}
    }
    else{
        return {message: "Name already exists, choose a different one", ok:false}
    }
    
}