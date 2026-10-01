import { addTabToStorage } from './utils/addTabToStorage.js'
import { getItems } from './utils/getItems.js'
const container = document.getElementById("container")
const form = document.getElementById("form")


form.addEventListener("submit", (e)=>{
    e.preventDefault()
    const formdata = new FormData(form)
    const tabUrls = formdata.getAll("tab")
    console.log(tabUrls)
    }
)
   


function render(){
    const leads = getItems("leads")
    leads.forEach((lead)=>{
        const {title, url, id} = lead
        container.innerHTML += `<div class="tabs">
                                    <input class="inputs" id="checkbox-${id}" type="checkbox" name="tab" value=${url}>
                                    <label class="labels" for="checkbox-${id}" name="tab">${title}</label>
                                </div>`

    })


}

async function start(){
    await addTabToStorage()
    render()
}

 start()