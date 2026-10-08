import { getCurrentTab } from './getCurrentTab.js'
import { setItems } from './setItems.js'
import { getItems } from './getItems.js'
// let leadsArray =  JSON.parse(localStorage.getItem("leads")) || []



export async function addTabToStorage(){

    let leadsArray =  await getItems("leads") || []

    const data = await getCurrentTab()

    if(leadsArray.length!==0){

        let exist

        for (let lead of leadsArray){

            if(lead.id === data.id){
                exist = true
                break
            }
            else{
                exist = false
                continue
            }
        }

        if(!exist){
            leadsArray.push(data)
            await setItems("leads", leadsArray)
        }
   
    }
    else{
        leadsArray.push(data)
        await setItems("leads", leadsArray)
    }

  
        
}
    
    // console.log(data)
    // console.log(data.url)
    


