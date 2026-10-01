import { addToStorage } from './utils/addToStorage.js'
const form = document.getElementById("form")
const container = document.getElementById("container")

form.addEventListener("submit", (e)=>{
    e.preventDefault()
})



function render(){
    const leads = JSON.parse(localStorage.getItem("leads"))
    leads.forEach((lead)=>{
        const {title, url, id} = lead
        container.innerHTML += `<div class="tabs">
                                    <input class="inputs" id="checkbox-${id}" type="checkbox" value=${url}>
                                    <label class="labels" for="checkbox-${id}">${title}</label>
                                </div>`

    })


}



async function start(){
    await addToStorage()
    render()
}

 start()