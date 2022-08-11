import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import Product from './storeProduct/product'
import PreOrder from './storePreOrder/preOrder'
import Post from './storePOST/post'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ManageCreate() {
    const query = new URLSearchParams(useLocation().search);
    const [storeCode, setStoreCode] = useState(query.get('storeCode'))
    const access_token = useSelector((state) => (state.app.access_token))
    const apiUrl = useSelector((state) => (state.app.apiPath))
    const [postList, setPostList] = useState([])
    const [productList, setProductList] = useState([])
    const [preOrderList, setPreOrderList] = useState([])

    useEffect(() => {
        apiGetStore()
    }, [])

    async function apiGetStore() {
        await axios({
            method: 'GET',
            url: `${apiUrl}/api/admin/store/getDetails/${storeCode}`,
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        }).then(res => {
            setPostList(res.data.data.store_post)
            setProductList(res.data.data.all_product)
            setPreOrderList(res.data.data.pre_order)
        })
        
    }

    let [categories] = useState({
        POST: [],
        PRODUCT: [],
        PREORDER: [],
    })

    return (
        <div className="w-full  sm:px-0">
            <Tab.Group>
                <Tab.List className="flex space-x-1 rounded-xl bg-pink-900/20 h-[35px] w-[32.5] p-1">
                    {Object.keys(categories).map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) =>
                                classNames(
                                    'w-full rounded-lg text-sm font-bold leading-5 text-pink-700',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-400 focus:outline-none focus:ring-2',
                                    selected
                                        ? 'bg-white shadow  animate-[fade_0.3s_ease-in-out]'
                                        : 'text-pink-100 hover:bg-white/[0.12] hover:text-white'
                                )
                            }
                        >
                            {category}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    <Tab.Panel
                        className={classNames(
                            'rounded-xl bg-white p-1 ',
                            'ring-white ring-opacity-60 ring-offset-2 '
                        )}
                    >
                        <Post postList={postList} apiGetStore={apiGetStore}/>
                    </Tab.Panel>
                    <Tab.Panel
                        className={classNames(
                            'rounded-xl bg-white p-1',
                            'ring-white ring-opacity-60 ring-offset-2 '
                        )}
                    >
                        <Product productList={productList} apiGetStore={apiGetStore}/>
                    </Tab.Panel>
                    <Tab.Panel
                        className={classNames(
                            'rounded-xl bg-white p-1',
                            'ring-white ring-opacity-60 ring-offset-2 '
                        )}
                    >
                        <PreOrder  preOrderList={preOrderList} apiGetStore={apiGetStore}/>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}
