import React from 'react'
import { createContext,useState } from 'react'

export const context = createContext()

const Contextapi = ({children}) => {
    const [user,setUser] = useState({}); 
  return (
    <context.Provider value={{user,setUser}} >
        {children}
    </context.Provider>
  )
}

export default Contextapi