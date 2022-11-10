import React from 'react'
import './card.css'

function Card({src,title,desc,price}) {
    return (
        <div className='card'>
            <img src={src} alt=''/>
            <div className='card_text'>
                <h2>{title}</h2>
                <h4>{desc}</h4>
                <h4>{price}</h4>
                
            </div>
        </div>
    )
}

export default Card
