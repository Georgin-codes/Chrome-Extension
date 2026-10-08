import { getItems } from './getItems.js' 
import { setItems } from './setItems.js' 

export async function updateTabTitle(tab){

    const leadsArray = await getItems("leads") || []

    const tabToBeUpdated = leadsArray.find((lead)=>{
        return lead.id === tab.id
    })

    if(tabToBeUpdated){
        tabToBeUpdated.title = tab.title
        tabToBeUpdated.url = tab.url
        await setItems("leads", leadsArray)
    }
    
}