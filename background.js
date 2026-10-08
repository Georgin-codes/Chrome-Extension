import { updateTabTitle } from './utils/updateTabTitle.js' 
import { updateLeadsInStorage } from './utils/updateLeadsInStorage.js'

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab)=>{

    //if the tab's title changes, changeInfo (object) contain title
    if(changeInfo.title){
        await updateTabTitle(tab)
    }

})


//when user directly closes tab in chrome
chrome.tabs.onRemoved.addListener(async (tabId, removeInfo)=>{
    await updateLeadsInStorage("leads", tabId)
    //no need to render if popup is closed
})