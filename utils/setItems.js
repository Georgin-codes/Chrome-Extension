
export async function setItems(key, value){
//    localStorage.setItem(key, JSON.stringify(value))
   await chrome.storage.local.set({ [key]: value})
}