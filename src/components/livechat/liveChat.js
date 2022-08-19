import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import st from '../../styles/livechat/liveChat.module.scss'
import axios from 'axios'
const { io } = require("socket.io-client");

function LiveChat() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const apiSocket = useSelector((state) => (state.app.socketPath))
    const access_token = useSelector((state) => (state.app.access_token))

    const chatBody = useRef(0)
    const [message, setMessage] = useState('')
    const [select, setSelect] = useState()
    const [selectUser, setSelectUser] = useState()
    const socket = io(apiSocket);
    const [userList, setUserList] = useState([])
    const [chatList, setChatList] = useState([])
    const [conversation, setConversation] = useState([]);
    const [statusRead, setStatusRead] = useState(true)

    useEffect(() => {

        apiGetChat()
        if (selectUser) {
            apiReadChat()
        }
    }, [selectUser])

    async function apiGetChat() {
        try {
            await axios({
                method: 'GET',
                url: `${apiUrl}/api/admin/getOldChat`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
            }).then(res => {
                const filterChat = res.data.allMessage.filter(user => user.memberCode == selectUser)
                console.log(filterChat);
                setConversation(filterChat);
                setChatList(res.data.allMessage);
                setUserList(res.data.allMember)
                setStatusRead(res.data.allMember.isRead)
                if (chatBody.current != null) {
                    chatBody.current
                        .scrollTo({
                            // behavior: "smooth",
                            top: chatBody.current.scrollHeight,
                        })
                }
            })
        } catch (err) {
            console.log(err);
        }
    }

    async function apiReadChat() {
        try {
            await axios({
                method: 'GET',
                url: `${apiUrl}/api/admin/readChat/${selectUser}`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
            }).then(() => {
                apiGetChat()
            })
        } catch (err) {
            console.log(err);
        }
    }



    socket.on("connect", () => {
        console.log('connected');
    });

    socket.on('admin', (req, res) => {
        console.log(res)
        console.log(req)
        // document.addEventListener('visibilitychange', function () {
        //     if (document.visibilityState == 'hidden') {
        //         document.title = "Fillfin [มีข้อความใหม่]"
        //     }
        // });
        onSetChatMessage(req)
    })

    function onSetChatMessage(req) {
        setUserList(prev => ([
            ...prev,
            {
                username: req.username,
            }
        ]))
        setChatList(prev => ([
            ...prev,
            {
                username: req.username,
                role: req.role,
                message: req.message
            }
        ]))

        setConversation(prev => ([
            ...prev,
            {
                username: req.username,
                role: req.role,
                message: req.message
            }
        ]))
        apiGetChat()
        setMessage('')
        setTimeout(() => {
            chatBody.current
                .scrollTo({
                    behavior: "smooth",
                    top: chatBody.current.scrollHeight,
                })
        }, 200)
    }


    async function onSendMessageClick() {
        setConversation(prev => ([
            ...prev,
            {
                role: 'admin',
                message: message
            }
        ]))
        setMessage('')
        setTimeout(() => {
            chatBody.current
                .scrollTo({
                    behavior: "smooth",
                    top: chatBody.current.scrollHeight,
                })
        }, 200)
        try {
            await axios({
                method: 'POST',
                url: `${apiUrl}/api/admin/chatToMember`,
                headers: {
                    Authorization: `Bearer ${access_token}`
                },
                data: {
                    memberCode: selectUser,
                    message: message,
                }
            }).then(res => {

                console.log(res);
            })
        } catch (err) {
            console.log(err);
        }
    }

    const something = (event) => {
        if (event.keyCode === 13) {
            onSendMessageClick()
        }
    }

    return (
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            <p className={st.title}>LiveChat</p>
            <div className={st.inContent}>
                <div className={`${st.displayScroller}`}>
                    <div className='w-full h-10 rounded-t-md mb-4 bg-[#f4a4ce] '>
                        <p className="my-auto h-full p-1 text-lg text-white">รายการแชท</p>
                    </div>
                    {userList?.map((user, index) => (
                        <div
                            key={index}
                            className={`${select == index && 'text-pink-500 border-2 border-pink-700 bg-pink-500 w-[95%] rounded-r-full'} ${st.chatList}`}
                            onClick={() => (setSelect(index), setSelectUser(user.memberCode))}>
                            <img className={`rounded-full  my-auto ml-4 w-[20%] p-2`} width={20} height={20} src="/assets/product.png" alt="image-contactUs" />
                            <div className={st.username}>{user.username}</div>
                            {user.isRead == 0 &&
                                <div className='relative'>
                                    <div className='w-[13px] h-[13px] rounded-full bg-green-500 absolute right-1 top-5'></div>
                                    <div className='w-[13px] h-[13px] rounded-full bg-green-500 animate-ping absolute right-1 top-5'></div>
                                </div>
                            }
                        </div>
                    ))}
                </div>
                <div className={st.boxChat}>
                    {selectUser &&
                        <div className={`${st.chatContent}`}>
                            <div className={st.chatHeader}>
                                <p>Fillfin Admin</p>
                            </div>
                            <div className={st.chatBody} ref={chatBody}>
                                {conversation?.map((data, index) => (
                                    <div key={index}>
                                        {selectUser &&
                                            <>
                                                {data.role == "admin"
                                                    ? <div className={st.memberChat}>
                                                        <img className={st.iconMember} src="/assets/contact.jpg" alt="image-contactUs" />
                                                        <p>{data.message}</p>
                                                    </div>
                                                    : <div className={st.adminChat}>
                                                        <img className={st.iconAdmin} src="/assets/product.png" alt="image-contactUs" />
                                                        <p>{data.message}</p>
                                                    </div>
                                                }
                                            </>
                                        }
                                    </div>
                                ))}
                            </div>
                            <div className={st.chatFooter}>
                                {/* <span className={st.iconPlus}>
                                <i className="fa-solid fa-circle-plus"></i>
                            </span> */}
                                <input
                                    value={message}
                                    type="text"
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyDown={(e) => something(e)}
                                />
                                <span className={st.iconSend}>
                                    <i className="fa-solid fa-paper-plane" onClick={onSendMessageClick}></i>
                                </span>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default LiveChat
