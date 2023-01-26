import milkImage from './milk.png'
import { MilkInterface } from './interface'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MilkDetails (){
    const [product, setProduct] = useState<MilkInterface | null>(null);
    const { id } = useParams()
    const baseUrl = `http://localhost:8080/milk/${id}`;

    useEffect(()=>{
        fetch(baseUrl)
            .then(data=> data.json())
            .then((data: MilkInterface) => {
                setProduct(data);
            })
    }, [])

    if (!product) return <p>Loading...</p>

    return (
        <div>
            <img className="image" src={milkImage}/>
            <div className="name">{product.name}</div>
            <div className="type">{product.type}</div>
            <div className="storage">{product.storage + " liters"}</div>
        </div>
    );
}
