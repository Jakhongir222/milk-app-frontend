import milkImage from './milk.png'
import { MilkInterface } from './interface'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

export default function MilkDetails (){
    const [product, setProduct] = useState<MilkInterface | null>(null);
    const [orderQuantity, setOrderQuantity] = useState(0);
    const { id } = useParams()
    const navigate = useNavigate();
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
        <div className="milk-details">
            <img className="image" src={milkImage}/>
            <div className="info">
                <div className="name">{product.name}</div>
                <div className="type">{product.type}</div>
                <div className="storage">{product.storage + " liters"}</div>
                <label>
                    Order Quantity:
                    <input type="range" min={0} max={product.storage} value={orderQuantity} onChange={(e) => setOrderQuantity(parseInt(e.target.value))} className="slider"  />
                    <span>{orderQuantity} liters</span>
                </label>
                <button>Order</button>
                <button onClick={() => navigate(`/milk`)} >Keep shopping</button>
            </div>
        </div>
    );
}
