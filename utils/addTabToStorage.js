import { getCurrentTab } from './getCurrentTab.js'
import { setItems } from './setItems.js'
import { getItems } from './getItems.js'


export async function addTabToStorage(){

    let leadsArray =  await getItems("leads") || []

    const data = await getCurrentTab()

    if(leadsArray.length!==0){

    
        const existLead = leadsArray.find((lead)=>{
            return lead.id === data.id
        })

        if(!existLead){
            leadsArray.push(data)
            await setItems("leads", leadsArray)
        }
   
    }
    else{
        leadsArray.push(data)
        await setItems("leads", leadsArray)
    }

}
    

    


