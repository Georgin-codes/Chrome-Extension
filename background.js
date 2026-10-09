import { updateTabTitle } from './utils/updateTabTitle.js' 
import { updateLeadsInStorage } from './utils/updateLeadsInStorage.js'
import { saveTabWithoutPopup } from './utils/saveTabWithoutPopup.js'


//if tab status or changes title after opening a tab
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab)=>{

    if(changeInfo.status === "complete"){//when finished loading but URL not guaranteed
        await saveTabWithoutPopup(tab)  //it is to add tabs to leads array if not existing
    }
    if(changeInfo.title){
        await updateTabTitle(tab)  //if the tab's title changes, changeInfo (object) contain title, URL is guaranteed. 
    }                               //It is to change existing tab's 
})


//when user directly closes tab in chrome
chrome.tabs.onRemoved.addListener(async (tabId, removeInfo)=>{
    await updateLeadsInStorage("leads", tabId)
    //no need to render if popup is closed
})

//when new tabs are created and pop up is not opening
chrome.tabs.onCreated.addListener(async (tab)=>{ //valid URL is not guaranteed
    await  saveTabWithoutPopup(tab)

})

//when active tab in a window changes//user switches tab
chrome.tabs.onActivated.addListener(async (activeInfo)=>{   //valid URL is not guaranteed
    try{
        const tabId = activeInfo.tabId
        const tab = await chrome.tabs.get(tabId)
        await saveTabWithoutPopup(tab)
    }
    catch(error){
        //if user closes tab before retreiving details
        console.error(`Error handling activated tab: ${error}`)
    }
    
})