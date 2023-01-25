import React, { useEffect, useState } from 'react'
import { MilkInterface } from './interface'
import './MilkProducts.css'
import milkImage from './milk.png'
import { navigate } from '@reach/router'
import MilkDetails from './MilkDeatails'


export default function MilkProducts () {
    const [products, setProducts] = useState<MilkInterface[]>([]);
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [types, setTypes] = useState<string[]>([]);
    const [showTypes, setShowTypes] = useState(false);
    const baseUrl = 'http://localhost:8080/milk';

    useEffect(()=>{
        setLoading(true);
        fetch(baseUrl)
            .then(data=> data.json())
            .then((data: MilkInterface[]) => {
                setProducts(data);
                setTypes(Array.from(new Set(data.map(product => product.type))));
            })
        setLoading(false)
    }, [])

    const navigateSpecificProductHandler = (id: string) => {
    navigate(`/products/${id}`);
  };
    

    if(isLoading) return <p>Loading</p>
    if(!products) return <p>There are no Milk</p> 

    const filteredProducts = products
    .filter(product => product.name.toLowerCase().includes(search.toLowerCase()))
    .filter(product => filter.toLowerCase() === "" || product.type.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div className='milk-container'>
            <input 
                type="text" 
                placeholder="Search by name" 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                className="search-input"/>
            <button className="filter-button" onClick={() => setShowTypes(!showTypes)}>Filter by type</button>
            {showTypes && (
                <div className="types-container">
                    {types.map(type => (
                        <div key={type} className="type" onClick={() => setFilter(type)}>
                            {type}
                        </div>))}
                </div>)}  
            {filteredProducts.map((product) => (
                <a key={product.id} className='milk-card' onClick={() => navigate(`/milk/${product.id}`)}>
                    <img className= "milk-image" src={milkImage}/>
                    <div className= "milk-name">{product.name}</div>
                    <div className= "milk-type">{product.type}</div>
                    <div className= "milk-storage">{product.storage + " liters"}</div>
                </a>))}
        </div>
      ) 
}
