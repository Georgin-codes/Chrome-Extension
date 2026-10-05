import { getCurrentTab } from './getCurrentTab.js'
import { setItems } from './setItems.js'
let leadsArray =  JSON.parse(localStorage.getItem("leads")) || []


export async function addTabToStorage(){

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
            setItems("leads", leadsArray)
        }
   
    }
    else{
        leadsArray.push(data)
        setItems("leads", leadsArray)
    }

  
        
}
    
    // console.log(data)
    // console.log(data.url)
    


