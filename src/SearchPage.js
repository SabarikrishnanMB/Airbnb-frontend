import React, { useContext } from 'react'
import './searchPage.css'
import { Button } from '@mui/material'
import SearchResults from './SearchResults'
import dataContext from './ContextData'


function SearchPage() {
    
    const data = useContext(dataContext)
    

    return (
        <div className='searchPage'>
            <div className='searchPage_text'>
                <div>
                <p>45 stays &#183; @ {data.loc} &#183; {data.startDate.toString()}/{data.month.toString()}/{data.year.toString()} to {data.endDate.toString()}/{data.month.toString()}/{data.year.toString()} {data.days} Days &#183; {data.adults} adults &#183; {data.kids} kids  </p>
                </div>
                <h2>Stays Nearby</h2>
            <Button variant="outlined">Cancellation Flexibility</Button>
                <Button variant="outlined">Type of place</Button>
                <Button variant="outlined">Price</Button>
                <Button variant="outlined">Rooms and Beds</Button>
                <Button variant="outlined">More Filters</Button>
                <SearchResults/>
            </div>
        </div>
    )
}

export default SearchPage
