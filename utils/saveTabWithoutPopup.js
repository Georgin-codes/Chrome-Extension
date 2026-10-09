import { getItems  } from "./getItems"
import { setItems } from "./setItems"

export async function saveTabWithoutPopup(tab){

    //if there is no tab with a proper url
    if(!tab.url){
        return
    }

    //avoiding extension and new window
    if(tab.url.startsWith("chrome://") || tab.url.startsWith("chrome-extension://")){
        return                      
    }

    //avoiding tabs without incomplete url
     if(tab.status !== "complete"){
        return
    }

    const leads = await getItems("leads") || []

    const tabExisted = leads.find((lead)=>{
        return lead.id === tab.id
    })

    //since it is calling from onupdated event
    if(tabExisted){
        //keeping stored information up to date
        tabExisted.title = tab.title
        tabExisted.url = tab.url
    }
    else{
        leads.push(tab)
    }
    await setItems("leads", leads)

}