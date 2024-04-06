import {Trash} from 'lucide-react'

function ChatBox({message, datetime, onDelete}) {
    const parsedDatetime = new Date(datetime);

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    
    const month = months[parsedDatetime.getMonth()];
    const day = parsedDatetime.getDate();
    const year = parsedDatetime.getFullYear();
    
    const formattedDate = `${month} ${day}, ${year}`;    
    const formattedTime = parsedDatetime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="chatbox">
            <div className='content'>
                <p>{message}</p>
                <p className="datetime">{formattedTime} | {formattedDate}</p>
            </div>

            <Trash onClick={onDelete} className='delete-btn'/>
        </div>
    )
}

export default ChatBox;