const form = document.getElementById("form")

form.addEventListener("submit", (e)=>{
    e.preventDefault()
})

  async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true };
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await browser.tabs.query(queryOptions);
    return tab;
  }


  const data = getCurrentTab()
  console.log(data)