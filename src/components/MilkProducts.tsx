import React, { useEffect, useState } from 'react'
import { MilkInterface } from './interface'
import './MilkProducts.css'
import milkImage from './milk.png'

export default function MilkProducts () {

    const [products, setProducts] = useState<MilkInterface[]>([]);
    const [isLoading, setLoading] = useState(false)
    const baseUrl = 'http://localhost:8080/milk';

    useEffect(()=>{
        setLoading(true);
        fetch(baseUrl)
            .then(data=> data.json())
            .then((data) => 
            setProducts(data))
                setLoading(false)
    }, [])

    if(isLoading) return <p>Loading</p>
    if(!products) return <p>There are no Milk</p> 

  return (
    <div className='milk-container'>
        {products.map((product) => (
            <div key={product.id} className='milk-card' >
                <img className= "milk-image" src={milkImage}/>
                <div className= "milk-name">{product.name}</div>
                <div className= "milk-type">{product.type}</div>
                <div className= "milk-storage">{product.storage + " liters"}</div>
            </div>))}
    </div>
  )
}


