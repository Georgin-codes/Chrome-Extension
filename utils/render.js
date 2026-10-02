const container = document.getElementById("container")
import { getItems } from './getItems.js'

export function render(){
    const leads = getItems("leads")
    container.innerHTML = ""
    leads.forEach((lead)=>{
        const {title, url, id} = lead
        container.innerHTML += `<div class="tabs">
                                    <input class="inputs" id="checkbox-${id}" type="checkbox" name="tab" value="${id}">
                                    <label class="labels" for="checkbox-${id}" name="tab">${title}</label>
                                    <button type="button" class="delete-btn" data-id="${id}" data-url="${url}">X</button>
                                </div>`

    })


}