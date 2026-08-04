import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
    getPropertyById,
    updateProperty
} from "../services/propertyService";
import "../css/addProperty.css";

function EditProperty() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        price: "",
        propertyType: "",
        status: "",
        bedrooms: ""
    });

    useEffect(() => {
        loadProperty();
    }, []);

    const loadProperty = async () => {

        try {

            const property = await getPropertyById(id);

            setFormData({
                title: property.title,
                description: property.description,
                location: property.location,
                price: property.price,
                propertyType: property.propertyType,
                status: property.status,
                bedrooms: property.bedrooms
            });

        } catch (error) {

            console.log(error);

            alert("Unable to load property.");

        } finally {

            setLoading(false);

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await updateProperty(id, {
                ...formData,
                price: Number(formData.price),
                bedrooms: Number(formData.bedrooms)
            });

            alert("Property Updated Successfully");

            navigate("/my-properties");

        } catch (error) {

            console.log(error);

            alert("Failed to update property");

        }

    };

    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (

        <>
            <Navbar />

            <div className="add-property-page">

                <div className="add-property-card">

                    <h1>Edit Property</h1>

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">

                            <label>Title</label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Description</label>

                            <textarea
                                name="description"
                                rows="5"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Location</label>

                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label>Price</label>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                            <div className="form-group">

                                <label>Bedrooms</label>

                                <input
                                    type="number"
                                    name="bedrooms"
                                    value={formData.bedrooms}
                                    onChange={handleChange}
                                    required
                                />

                            </div>

                        </div>

                        <div className="form-row">

                           <div className="form-group">

    <label>Property Type</label>

    <select
        name="propertyType"
        value={formData.propertyType}
        onChange={handleChange}
        required
    >
        <option value="APARTMENT">Apartment</option>
        <option value="VILLA">Villa</option>
        <option value="HOUSE">House</option>
        <option value="PLOT">Plot</option>
        <option value="COMMERCIAL">Commercial</option>
    </select>

</div>

                            <div className="form-group">

    <label>Status</label>

    <select
        name="status"
        value={formData.status}
        onChange={handleChange}
        required
    >
        <option value="AVAILABLE">Available</option>
        <option value="SOLD">Sold</option>
        <option value="PENDING">Pending</option>
    </select>

</div>

                        </div>

                        <button type="submit">
                            Update Property
                        </button>

                    </form>

                </div>

            </div>

        </>

    );

}

export default EditProperty;