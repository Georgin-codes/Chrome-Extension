const form = document.getElementById("form")
let leadsArray =  JSON.parse(localStorage.getItem("leads")) || []
const container = document.getElementById("container")

form.addEventListener("submit", (e)=>{
    e.preventDefault()
})

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

async function main(){
    const data = await getCurrentTab()
    console.log(data)
    console.log(data.url)
    leadsArray.push(data)
    return leadsArray
    
}

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

async function getLeads(){
    const array = await main()
    localStorage.setItem("leads", JSON.stringify(array))
}

async function start(){
    await getLeads()
    render()
}

 start()