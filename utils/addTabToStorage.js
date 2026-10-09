import { getCurrentTab } from './getCurrentTab.js'
import { setItems } from './setItems.js'
import { getItems } from './getItems.js'


export async function addTabToStorage(){

    let leadsArray =  await getItems("leads") || []

    const data = await getCurrentTab()

    if(!data?.url){
        return
    }

    if(data.url.startsWith("chrome://") || data.url.startsWith("chrome-extension://")){
        return                      
    }

    const existLead = leadsArray.find((lead)=>{
        return lead.id === data.id
    })

    if(!existLead){
        leadsArray.push(data)
        await setItems("leads", leadsArray)
    }

}
    

    


