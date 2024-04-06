import { Globe, Send, CircleAlert } from 'lucide-react';
import ChatBox from './components/ChatBox';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

function ChatScreen() {
    const [message, setMessage] = useState('');
    const [messagesData, setMessagesData] = useState([]);
    const msgContainerRef = useRef(null);

    const sendMessage = () => {
        axios.post('http://127.0.0.1:8000/messages/', { content: message })
            .then(res => {
                setMessage('');
                fetchMessages();
            })
            .catch(err => {
                console.log("Internal Server Error: ", err);
            });
    };

    const deleteMessage = (id) => {
        axios.delete(`http://127.0.0.1:8000/messages/${id}/`)
            .then(res => {
                console.log(res.data);
                fetchMessages();
            })
            .catch(err => {
                console.log("Internal Server Error: ", err);
            });
    };

    const fetchMessages = () => {
        axios.get('http://127.0.0.1:8000/messages/')
            .then(res => {
                setMessagesData(res.data);
                scrollToBottom();
            })
            .catch(err => {
                console.log("Internal Server Error: ", err);
            });
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && message.trim() !== '') {
            sendMessage();
        }
    };

    const scrollToBottom = () => {
        msgContainerRef.current.scrollTop = msgContainerRef.current.scrollHeight;
    };

    return (
        <div className="chat-container">
            <div className='header-div'>
                <div className='header-left'>
                    <Globe />
                    <h1>EarthTalk</h1>
                </div>

                <div className='header-right'>
                    <p>Anyone can see your chat!</p>
                    <CircleAlert />
                </div>
            </div>

            <div className='messages-container'>
                <div ref={msgContainerRef} className='msg-con-body'>
                    {messagesData.map(msg => (
                        <ChatBox key={msg.id} message={msg.content} datetime={msg.datetime} onDelete={() => deleteMessage(msg.id)} />
                    ))}
                </div>
            </div>

            <div className='input-container'>
                <input value={message} onChange={e => setMessage(e.target.value)} onKeyPress={handleKeyPress} type="text" placeholder='Type your message here...' />
                <button onClick={sendMessage}>
                    <Send />
                </button>
            </div>
        </div>
    )
}

export default ChatScreen;
