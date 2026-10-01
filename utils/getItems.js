export function getItems(key){
    const leads = JSON.parse(localStorage.getItem(key))
    return leads
}