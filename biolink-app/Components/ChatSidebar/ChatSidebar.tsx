
import Recents from "./Recents/Recents"
import { Contacts } from "./Contacts/Contacts"
import UserDropdown from "./UserDropdown"

const ChatSidebar = () => {
    return (
    <>
        <div id="chat-sidebar" className="w-2/12 h-screen fixed top-0 right-0 bg-primary  overflow-y-scroll">
            <UserDropdown />
            
            <Recents />

            <Contacts />
        </div>

        <div className="w-2/12"></div>
    </>
    )
  }
  
  export default ChatSidebar