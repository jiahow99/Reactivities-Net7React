'use client'
import React, { useState } from 'react'
import SearchComponent from './SearchComponent'
import SearchResult from './SearchResult'
import SearchKeyword from '@/models/SearchKeyword'
import { Activity } from '@/models/Activity'
import { X } from 'react-feather'
import commonStore from '@/stores/CommonStore'
import { observer } from 'mobx-react-lite'

const SearchPage = () => {
  // States
  const [searchLoading, setSearchLoading] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [activities, setActivities] = useState<Activity[]>([])

  // Close modal
  const { closeSearch, searchOpen } = commonStore;

  // Search activity by title
  const search = async (search: SearchKeyword) => {    
    // No word
    if (search.title.length === 0) {
      setKeyword('')
      return 
    }

    // Show loading
    setSearchLoading(true)

    // Set search keyword
    setKeyword(search.title)

    setTimeout(async () => {
      // Call API
      const response = await fetch(process.env.NEXT_PUBLIC_API_PREFIX + `/activity/search?title=${search.title}`)
        .finally(() => setSearchLoading(false))
      const activities: Activity[] = await response.json()
  
      // Set activities state
      setActivities(activities);
    }, 1000)
  }


  return searchOpen && (
    <div className="realtive fixed top-0 left-0 w-full h-screen bg-black/50 backdrop-blur-md z-50">
      <div className="absolute top-7 right-10">
        <X onClick={closeSearch} className='cursor-pointer scale-125 hover:scale-150 duration-300' />
      </div>
      <div className="w-10/12 lg:w-7/12 mx-auto flex flex-col justify-center mt-20">
        <SearchComponent search={search} />

        {keyword.length > 0 && 
          <p className='my-3'>Search keyword : {keyword}</p>
        }

        <div className="w-full mt-5 bg-gray-700/60 flex flex-col gap-3 rounded-lg max-h-[70vh] overflow-y-scroll overscroll-contain">
          {activities.length > 0 && !searchLoading && activities.map(activity => 
            <SearchResult activity={activity} />  
          )}
        </div>

        {searchLoading && 
          <div className="flex flex-col justify-center items-center my-20">
            <div className="loader"></div>
            <p className='mt-7 text-xl'>Fetching data . . .</p>
          </div>
        }
        
      </div>
      
    </div>
  )
}

export default observer(SearchPage)