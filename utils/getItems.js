export async function getItems(key){
    // const leads = JSON.parse(localStorage.getItem(key))
    const result = await chrome.storage.local.get([key])
    // console.log(leads)
    return result[key]
}