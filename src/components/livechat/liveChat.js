import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import st from '../../styles/livechat/liveChat.module.scss'

function LiveChat() {
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const access_token = useSelector((state) => (state.app.access_token))

    const chatBody = useRef(0)
    const [fakeConversation, setFakeConversation] = useState([]);
    const [message, setMessage] = useState('')
    const [select, setSelect] = useState()

    useEffect(() => {
        API_GET_DATA().then(res => {
            setFakeConversation(res);
            setTimeout(() => {
                if (chatBody.current != null) {
                    chatBody.current
                        .scrollTo({
                            behavior: "smooth",
                            top: chatBody.current.scrollHeight,
                        })
                }
            }, 500)
        })
        document.addEventListener('visibilitychange', function () {
            document.title = document.visibilityState;
            console.log(document.visibilityState);
        });
    }, [])



    function API_GET_DATA() {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve([
                    {
                        id: 1,
                        is_admin: true,
                        message: 'Admin'
                    },
                    {
                        id: 2,
                        is_admin: false,
                        message: 'member'
                    },
                    {
                        id: 3,
                        is_admin: true,
                        message: 'Admin'
                    },
                    {
                        id: 4,
                        is_admin: true,
                        message: 'Admin'
                    },
                    {
                        id: 5,
                        is_admin: false,
                        message: 'member'
                    },

                ])
            }, 350)
        })
    }

    function onSendMessageClick() {
        setFakeConversation(prev => ([
            ...prev,
            {
                id: Math.random(),
                is_admin: false,
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
    }

    const something = (event) => {
        if (event.keyCode === 13) {
            onSendMessageClick()
        }
    }

    const numMock = [
        { id: 0, names: "123" },
        { id: 1, names: "qwe" },
        { id: 2, names: "ase" },
        { id: 3, names: "asd" },
        { id: 4, names: "asd" },
        { id: 5, names: "xcxc" },
        { id: 6, names: "sd" },
        { id: 7, names: "sdf" },
        { id: 0, names: "sdf" },
        { id: 1, names: "sds" },
        { id: 2, names: "sdf" },
        { id: 3, names: "sdf" },
        { id: 4, names: "sdf" },
        { id: 5, names: "ghj" },
        { id: 6, names: "fgh" },
        { id: 7, names: "sds" },
        { id: 0, names: "ghj" },
        { id: 1, names: "ghj" },
        { id: 2, names: "jjkl" },
        { id: 3, names: "gh" },
        { id: 4, names: "aDS" },
        { id: 5, names: "WEWE" },
        { id: 6, names: "SADF" },
        { id: 7, names: "SDF" },
        { id: 0, names: "ASDF" },
        { id: 1, names: "ASDF" },
        { id: 2, names: "EWE" },
        { id: 3, names: "SDSD" },
        { id: 4, names: "DFDF" },
        { id: 5, names: "SD" },
        { id: 6, names: "WEFWEF" },
        { id: 7, names: "WEFWEF" },
    ]

    return (
        <div className={`${st.content} animate-[fade_0.3s_ease-in-out]`}>
            <p className={st.title}>LiveChat</p>
            <div className={st.inContent}>
                <div className={st.displayScroller}>
                    {numMock?.map((num, index) => (
                        <div
                            key={index}
                            className={`${select == index && 'text-pink-500 border-2 border-pink-700 bg-pink-500 w-[95%] rounded-r-full'} ${st.chatList}`}
                            onClick={() => setSelect(index)}>
                            <img className={`rounded-full  my-auto ml-4 w-[20%] p-2`} width={20} height={20} src="/assets/product.png" alt="image-contactUs" />
                            <div className={st.username}>{num.names}</div>
                        </div>
                    ))}
                </div>
                <div className={st.boxChat}>
                    <div className={`${st.chatContent}`}>
                        <div className={st.chatHeader}>
                            <p>Fillfin Admin</p>
                        </div>
                        <div className={st.chatBody} ref={chatBody}>
                            {fakeConversation?.map((data, index) => (
                                <div key={data.id}>
                                    {!data.is_admin
                                        ? <div className={st.memberChat}>
                                            <img className={st.iconMember} src="/assets/contact.jpg" alt="image-contactUs" />
                                            <p>{data.message}</p>
                                        </div>
                                        : <div className={st.adminChat}>
                                            <img className={st.iconAdmin} src="/assets/product.png" alt="image-contactUs" />
                                            <p>{data.message}</p>
                                        </div>
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
                </div>
            </div>
        </div>
    )
}

export default LiveChat
