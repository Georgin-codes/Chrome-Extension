import { getItems } from './getItems.js'
import { setItems } from './setItems.js'

export function updateLeadsInStorage(key, id){

    const tabs = getItems(key)
    const updatedTabsInStorage = tabs.filter((tab)=>{
        return (tab.id !== id)
    })
            
    setItems(key, updatedTabsInStorage)
}
