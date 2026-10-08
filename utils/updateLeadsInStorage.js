import { getItems } from './getItems.js'
import { setItems } from './setItems.js'

export async function updateLeadsInStorage(key, id){

    const tabs = await getItems(key)
    const updatedTabsInStorage = tabs.filter((tab)=>{
        return (tab.id !== id)
    })
            
    await setItems(key, updatedTabsInStorage)
}
