import React from 'react'

const Rating = ({ rating }) => {
  return (
    <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((star) => {
        return (  
          <span
            style={{
              cursor: 'pointer',
              color: rating >= star ? 'gold' : 'gray',
              fontSize: `20px`,
            }}
          >
            {' '}
            ★{' '}
          </span>
        )
      })}
    </div>
  )
}

export default Rating