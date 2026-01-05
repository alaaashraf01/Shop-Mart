'use client'
import { CartContext } from '@/components/context/CartContext'
import React, { useContext } from 'react'
import Loading from './loading'

export default function loadcon() {
    const{CartData,isLoading}= useContext(CartContext)
  return <>
  {
    isLoading&&<Loading/>
  }
  
  
  </>
}
