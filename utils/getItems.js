export async function getItems(key){
    
    const result = await chrome.storage.local.get([key])
    // console.log(leads)
    return result[key]
}