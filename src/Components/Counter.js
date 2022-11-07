import React from 'react'

export default function Counter() {
  return (
    <>
    <div className="time container">
        <span className='demo'>10:10:10</span>
    </div>
    <div className='Container my-3 btn-des'>
            <button type="button" class="btn btn-primary mx-3">Start</button>
            <button type="button" class="btn btn-primary mx-3">Pause</button>
            <button type="button" class="btn btn-primary mx-3">Save</button>
    </div>
    </>
  )
}
