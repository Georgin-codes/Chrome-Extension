import { getCurrentTab } from './getCurrentTab.js'
let leadsArray =  JSON.parse(localStorage.getItem("leads")) || []


export async function addToStorage(){
    const data = await getCurrentTab()
    console.log(data)
    console.log(data.url)
    leadsArray.push(data)
    localStorage.setItem("leads", JSON.stringify(leadsArray))
}

// async function main(){
//     const data = await getCurrentTab()
//     console.log(data)
//     console.log(data.url)
//     leadsArray.push(data)
//     return leadsArray
    
// }
