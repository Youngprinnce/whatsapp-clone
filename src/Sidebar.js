import React, {useState, useEffect, useContext} from 'react'
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import { Avatar, IconButton } from "@material-ui/core"
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert"
import {SearchOutlined} from "@material-ui/icons";
import "./Sidebar.css"
import SidebarChat from './SidebarChat';
import { db } from "./firebase"
import { StateContext } from './StateProvider';


function Sidebar() {
    const [rooms, setRooms] = useState([])
    const [user] = useContext(StateContext)

    useEffect(() => {
        db
            .collection("rooms")
            .onSnapshot((snapshot) => {
                return (
                    setRooms(snapshot.docs.map((doc) => {
                        return ({
                            id: doc.id,
                            data: doc.data(),
                        }
                )
            }))
        )})
    }, [])
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar src={user.user.photoURL}/>
                <div className="sidebar__headerRight">
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
            </div>

            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start new Chat" type="text"/>
                </div>
            </div>

            <div className="sidebar__chats">
                <SidebarChat addNewChat />
                {rooms.map((room) => {
                    return (
                        <SidebarChat key={room.id} id={room.id} name={room.data.name}/>
                )})}
            </div>
        </div>
    )
}

export default Sidebar
