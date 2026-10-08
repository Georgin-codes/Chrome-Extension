import { updateTabTitle } from './utils/updateTabTitle.js' 

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab)=>{
    console.log(tabId)
    console.log(changeInfo)
    console.log(tab)

    //if the tab's title changes, changeInfo (object) contain title
    if(changeInfo.title){
        await updateTabTitle(tab)
    }

})