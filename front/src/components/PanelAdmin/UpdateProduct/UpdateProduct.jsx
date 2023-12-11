import { useEffect, useState } from "react";
import { getProductById } from '../../../helpers/getProductById.js';
import { useParams } from "react-router-dom";
import { categories as getCategory } from '../../../helpers/getCategories.js';
import { getBenefit } from '../../../helpers/getBenefit.js';
import { updateProduct } from '../../../helpers/updateProduct.js';
import Swall from 'sweetalert2';

const UpdateProduct = () => {
    const [categories, setCategories] = useState([]);
    const [benefits, setBenefits] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        category: "",
        smalldescription: "",
        description: "",
        price: "",
        benefits: [],
        files: [],
    });

    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            const prod = await getProductById(id);
            const cat = await getCategory();
            const benef = await getBenefit();
            setCategories(cat.result);
            setBenefits(benef.result);
            setFormData({
                title: prod.product.title,
                category: prod.product.category,
                smalldescription: prod.product.smalldescription,
                description: prod.product.description,
                price: prod.product.price,
                benefits: prod.product.benefits.map(benefit => String(benefit._id)),
                files: [],
            });
        };
        fetchData();
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "file") {
            setFormData((prevData) => ({
                ...prevData,
                [name]: [...prevData[name], ...Array.from(files)],
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === "checkbox" ? (checked ? [...prevData[name], value] : prevData[name].filter(val => val !== value)) : value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSubmit = new FormData();

        formDataToSubmit.append('id', id);
        formDataToSubmit.append('title', formData.title);
        formDataToSubmit.append('category', formData.category);
        formDataToSubmit.append('smalldescription', formData.smalldescription);
        formDataToSubmit.append('description', formData.description);
        formDataToSubmit.append('price', formData.price);
        formDataToSubmit.append('benefits', formData.benefits.join(','));
        for (let i = 0; i < formData.files.length; i++) {
            formDataToSubmit.append('files', formData.files[i]);
        }
        const result = await updateProduct(formDataToSubmit);

        if (result.error) {
            Swall.fire({
                text: data.error,
                toast: true,
                position: "top-right",
                showConfirmButton: false
            });
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }

        if (result.data.status === 'success') {
            Swall.fire({
                text: 'Producto modificado correctamente',
                toast: true,
                position: "top-right",
                showConfirmButton: false
            });
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        };
    };


    return (
        <div className="form">
            <h2>Modificar Producto</h2>
            <form onSubmit={handleSubmit}>
                <input
                    className='controls'
                    value={formData.title}
                    type="text"
                    name="title"
                    placeholder="Nombre"
                    required
                    onChange={handleInputChange}
                />
                <select
                    className='controls'
                    value={formData.category}
                    name="category"
                    required
                    onChange={handleInputChange}
                >
                    <option value="" disabled>Selecciona una categoría</option>
                    {categories && categories.map((category) => (
                        <option key={category._id} value={category.name}>{category.name}</option>
                    ))}
                </select>
                <input
                    className='controls'
                    value={formData.smalldescription}
                    type="text"
                    name="smalldescription"
                    placeholder="Breve descripcion"
                    required
                    onChange={handleInputChange}
                />
                <input
                    className='controls'
                    value={formData.description}
                    type="text"
                    name="description"
                    placeholder="Descripción"
                    required
                    onChange={handleInputChange}
                />
                <input
                    className='controls'
                    value={formData.price}
                    type="text"
                    name="price"
                    placeholder="Precio"
                    required
                    onChange={handleInputChange}
                />
                <div>
                    <p>Beneficios:</p>
                    {benefits && benefits.map((benefit) => (
                        <label key={benefit._id}>
                            <input
                                type="checkbox"
                                name="benefits"
                                value={String(benefit._id)}
                                checked={formData.benefits.includes(String(benefit._id))}
                                onChange={handleInputChange}
                            />
                            <img src={benefit.icon} alt={benefit.text} />
                            {benefit.text}
                        </label>
                    ))}
                </div>
                <input
                    className='controls'
                    type="file"
                    id="file"
                    name="files"
                    accept="image/*"
                    multiple
                    onChange={handleInputChange}
                />
                <button className='botonsOk' type="submit">Modificar Producto</button>
            </form>
        </div>
    );
};

export default UpdateProduct;