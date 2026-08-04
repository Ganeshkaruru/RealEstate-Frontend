import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import {
    addProperty,
    uploadMedia
} from "../services/propertyService";
import "../css/addProperty.css";

function AddProperty() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        price: "",
        propertyType: "",
        status: "",
        bedrooms: ""
    });

    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

    };

    const handleFileChange = (e) => {

        setFiles(Array.from(e.target.files));

    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);
    setError("");

    try {

        const payload = {
            ...formData,
            price: Number(formData.price),
            bedrooms: Number(formData.bedrooms)
        };

        const property = await addProperty(payload);

        console.log("PROPERTY =", property);

        if (!property || !property.id) {
            throw new Error("Property ID not returned");
        }

        for (const file of files) {

            console.log("Uploading:", file.name);

            await uploadMedia(property.id, file);

        }

        alert("Property Added Successfully");

        navigate("/home");

    } catch (err) {

        console.log(err);

        console.log("Status:", err.response?.status);
        console.log("Data:", err.response?.data);

        setError("Failed to add property");

    } finally {

        setLoading(false);

    }

};

    return (
        <>
            <Navbar />

            <div className="add-property-page">

                <div className="add-property-card">

                    <h1>Add Property</h1>

                    <p>Create a new property listing</p>

                    {error && <div className="error-box">{error}</div>}

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
                                value={formData.description}
                                onChange={handleChange}
                                rows="5"
                                required
                            />

                        </div>

                        <div className="form-group">

                            <label>Images / Videos</label>

                            <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                onChange={handleFileChange}
                            />

                        </div>

                        <div className="preview-grid">

                            {files.map((file, index) => (

                                <div
                                    className="preview-card"
                                    key={index}
                                >

                                    {file.type.startsWith("image") ? (

                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt={file.name}
                                        />

                                    ) : (

                                        <video controls>

                                            <source
                                                src={URL.createObjectURL(file)}
                                                type={file.type}
                                            />

                                        </video>

                                    )}

                                    <div className="file-name">
                                        {file.name}
                                    </div>

                                </div>

                            ))}

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
                                    <option value="">Select Type</option>
                                    <option value="APARTMENT">Apartment</option>
                                    <option value="HOUSE">House</option>
                                    <option value="VILLA">Villa</option>
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
                                    <option value="">Select Status</option>
                                    <option value="AVAILABLE">Available</option>
                                    <option value="SOLD">Sold</option>
                                    <option value="PENDING">Pending</option>
                                </select>

                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Adding..." : "Add Property"}
                        </button>

                    </form>

                </div>

            </div>

        </>
    );

}

export default AddProperty;