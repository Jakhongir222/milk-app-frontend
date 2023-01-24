import React, { useEffect, useState } from 'react'
import { MilkInterface } from './interface'

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
    <div>
        {products.map((product) => (
            <div key={product.id}>
                <h2>{product.name}</h2>
                <p>{product.type}</p>
                <p>{product.storage}</p>
            </div>))}
    </div>
  )
}


