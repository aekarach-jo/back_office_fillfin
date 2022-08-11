import { useState } from 'react'
import { Tab } from '@headlessui/react'
import CreatePost from './createPost'
import AllPost from './allPost'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Post({postList, apiGetStore}) {
  console.log(postList);
  let [categories] = useState({
    'โพสต์ทั้งหมด': [],
    'เพิ่มโพสต์': [],
  })

  return (
    <div className="w-full sm:px-0">
      <Tab.Group>
        <Tab.List className="w-[32.5%] h-[35px] flex space-x-1 rounded-xl bg-pink-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg  text-sm font-bold leading-5 text-pink-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-pink-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow  animate-[fade_0.3s_ease-in-out] '
                    : 'text-pink-100 hover:bg-white/[0.12] hover:text-white '
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
              'rounded-xl bg-white ',
              'ring-white ring-opacity-60 ring-offset-2 '
            )}
          >
            <AllPost postList={postList} apiGetStore={apiGetStore}/>
          </Tab.Panel>
          <Tab.Panel
            className={classNames(
              'rounded-xl bg-white',
              'ring-white ring-opacity-60 ring-offset-2 '
            )}
          >
            <CreatePost apiGetStore={apiGetStore}/>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}
