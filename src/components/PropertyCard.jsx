import { useNavigate } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa";
import "../css/propertyCard.css";

function PropertyCard({
    property,
    showActions = false,
    onDelete
}) {

    const navigate = useNavigate();

    console.log("PROPERTY =", property);
console.log("MEDIA =", property.media);

const image =
    property.media &&
    property.media.length > 0
        ? `http://localhost:8081/${property.media[0].mediaUrl}`
        : null;

console.log("IMAGE URL =", image);

    return (
        <div className="property-card">

            <div
                className="property-image"
                onClick={() => navigate(`/property/${property.id}`)}
            >

                {image ? (
                    <img
                        src={image}
                        alt={property.title}
                    />
                ) : (
                    <div className="property-image-fallback">
                        No Image
                    </div>
                )}

                {showActions && (
                    <div className="card-actions">

                        <button
                            className="edit-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/edit-property/${property.id}`);
                            }}
                        >
                            <FaPen />
                        </button>

                        <button
                            className="delete-btn"
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(property.id);
                            }}
                        >
                            <FaTrash />
                        </button>

                    </div>
                )}

            </div>

            <div className="property-info">

    <div className="title-row">

        <h3>{property.title}</h3>

        {showActions && (
            <div className="action-icons">

                <button
                    className="edit-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/edit-property/${property.id}`);
                    }}
                >
                    <FaPen />
                </button>

                <button
                    className="delete-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(property.id);
                    }}
                >
                    <FaTrash />
                </button>

            </div>
        )}

    </div>

    <p className="location">
        📍 {property.location}
    </p>

    <div className="price">
        ₹ {property.price.toLocaleString()}
    </div>

    <p className="bedrooms">
        🛏 {property.bedrooms} Bedrooms
    </p>

</div>

        </div>
    );
}

export default PropertyCard;