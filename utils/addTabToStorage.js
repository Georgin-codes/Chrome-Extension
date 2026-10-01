import { getCurrentTab } from './getCurrentTab.js'
import { setItems } from './setItems.js'
let leadsArray =  JSON.parse(localStorage.getItem("leads")) || []


export async function addTabToStorage(){
    const data = await getCurrentTab()
    console.log(data)
    console.log(data.url)
    leadsArray.push(data)
    setItems("leads", leadsArray)
}

// async function main(){
//     const data = await getCurrentTab()
//     console.log(data)
//     console.log(data.url)
//     leadsArray.push(data)
//     return leadsArray
    
// }
