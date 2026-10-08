
export async function setItems(key, value){
   await chrome.storage.local.set({ [key]: value})
}