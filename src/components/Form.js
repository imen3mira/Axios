import React from 'react'

function Form({loadweather,value,handlechange}) {
 
    return (
        <form onSubmit={loadweather } className="search-box" >
        
            <input
              type="text"
              placeholder="City"
              name="City"
              className="search-bar"
              autoComplete="on"
              value={value}
              onChange={handlechange}
            />
          
           
            <button className="btn-search">Get Weather</button>
      </form>
    )
}

export default Form
