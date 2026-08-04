import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getPropertyById, deleteProperty } from "../services/propertyService";
import "../css/propertyDetails.css";

function PropertyDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);

    const loggedInEmail = localStorage.getItem("email");
    const loggedInRole = localStorage.getItem("role");

    useEffect(() => {
        loadProperty();
    }, [id]);

    const loadProperty = async () => {

        try {

            const response = await getPropertyById(id);

            setProperty(response);

        } catch (error) {

            console.log(error);
            alert("Property not found");

        } finally {

            setLoading(false);

        }

    };

    const handleDelete = async () => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this property?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await deleteProperty(property.id);

            alert("Property deleted successfully");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert("Unable to delete property");

        }

    };

    if (loading) {
        return (
            <>
                <Navbar />
                <div className="details-container">
                    <h2>Loading Property...</h2>
                </div>
            </>
        );
    }

    if (!property) {
        return (
            <>
                <Navbar />
                <div className="details-container">
                    <h2>Property Not Found</h2>
                </div>
            </>
        );
    }

   const imageUrl =
    property.media && property.media.length > 0
        ? buildImageUrl(property.media[0].mediaUrl)
        : noImage;

    const isOwner =
        loggedInRole === "SELLER" &&
        property.seller &&
        property.seller.email === loggedInEmail;

    return (
        <>
            <Navbar />

            <div className="details-container">

                <div className="details-card">

                    <img
                        src={imageUrl}
                        alt={property.title}
                        className="property-image"
                    />

                    <div className="details-content">

                        <h1>{property.title}</h1>

                        <h2 className="price">
                            ₹ {property.price.toLocaleString()}
                        </h2>

                        <div className="details-grid">

                            <div>
                                <strong>Location</strong>
                                <p>{property.location}</p>
                            </div>

                            <div>
                                <strong>Property Type</strong>
                                <p>{property.propertyType}</p>
                            </div>

                            <div>
                                <strong>Status</strong>
                                <p>{property.status}</p>
                            </div>

                            <div>
                                <strong>Bedrooms</strong>
                                <p>{property.bedrooms}</p>
                            </div>

                        </div>

                        <div className="description">

                            <h3>Description</h3>

                            <p>{property.description}</p>

                        </div>

                        <div className="seller-section">

                            <h3>Seller Information</h3>

                            <p>
                                <strong>Name :</strong>{" "}
                                {property.seller?.userName}
                            </p>

                            <p>
                                <strong>Email :</strong>{" "}
                                {property.seller?.email}
                            </p>

                        </div>

                        <div className="button-group">

                            <button
                                className="back-btn"
                                onClick={() => navigate("/")}
                            >
                                Back
                            </button>

                            {isOwner && (
                                <>
                                    <button
                                        className="edit-btn"
                                        onClick={() =>
                                            navigate(
                                                `/properties/edit/${property.id}`
                                            )
                                        }
                                    >
                                        Edit Property
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={handleDelete}
                                    >
                                        Delete Property
                                    </button>
                                </>
                            )}

                        </div>

                    </div>

                </div>

            </div>

        </>
    );

}

export default PropertyDetails;