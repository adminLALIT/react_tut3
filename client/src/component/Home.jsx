import React from 'react'
import { useContext } from 'react';
import { context } from './Contextapi';

const Home = () => {
  const {user} = useContext(context)
  console.log(user);
  return (
    <div>Home</div>
  )
}

export default Home