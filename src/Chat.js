import { Avatar, IconButton } from '@material-ui/core'
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import {SearchOutlined, MoreVert, AttachFile} from "@material-ui/icons";
import React, { useState, useEffect, useContext } from 'react'
import {useParams} from "react-router-dom"
import "./Chat.css"
import MicIcon from "@material-ui/icons/Mic"
import { db  } from "./firebase"
import { StateContext } from './StateProvider';
import firebase from "firebase"
import $ from "jquery"


function Chat() {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState();
    const { roomId } = useParams();
    const [roomname, setRoomname] = useState("");
    const [messages, setMessages] = useState([])
    const [user] = useContext(StateContext)

    

    useEffect(() => {
        if (roomId) {
            db
                .collection("rooms")
                .doc(roomId)
                .onSnapshot((snapshot) => {
                    return (
                        setRoomname(snapshot.data().name)
                    )
                });
            
            db
                .collection("rooms")
                .doc(roomId)
                .collection("messages")
                .orderBy("timestamp", "asc")
                .onSnapshot((snapshot) => {
                    return (
                        setMessages(snapshot.docs.map((doc) => {
                            return (
                                doc.data()
                            )}
                        )
                    )
            )})
        }
    },[roomId])

    useEffect(() => {
            setSeed(Math.floor(Math.random() * 500))
    }, [roomname])

    // useEffect(() => {
    //     if (window.screen.width < "830") {
    //            $(".chat").css("display", "none")
    //       }
    // })

    
    const sendMessage = async (e) => {
        e.preventDefault();
        const message = {
            name: user.user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }
        await db
            .collection("rooms")
            .doc(roomId)
            .collection("messages")
            .add(message)
    
        setInput("");
    }


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat__headerInfo">
                    <h3>{roomname}</h3>
                    <p>Last seen at {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>

                <div className="chat__headerRight">
                     <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message) => {
                    return (
                        <p className={`chat__message ${message.name === user.user.displayName? "chat__reciever" : ""} `}>
                            <span className="chat__name">{message.name}</span>
                            {message.message}
                            <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                        </p>
                    )
                })}
                        
            </div>


            <div className="chat__footer">
                <InsertEmoticonIcon />
                <form>
                    <input
                        value={input}
                        onChange={(e)=>setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                    />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
