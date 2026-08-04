import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import {
    getMyProperties,
    deleteProperty
} from "../services/propertyService";
import "../css/home.css";

function MyProperties() {

    const [properties, setProperties] = useState([]);

    useEffect(() => {
        loadMyProperties();
    }, []);

    const loadMyProperties = async () => {

        try {

            const response = await getMyProperties();

            console.log("My Properties:", response);

            setProperties(response);

        } catch (error) {

            console.log(error);

        }

    };

    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this property?"
        );

        if (!confirmDelete) return;

        try {

            await deleteProperty(id);

            setProperties((prev) =>
                prev.filter((property) => property.id !== id)
            );

            alert("Property deleted successfully.");

        } catch (error) {

            console.log(error);

            alert("Failed to delete property.");

        }

    };

    return (
        <>
            <Navbar />

            <section className="featured-properties">

                <h2>My Properties</h2>

                <h3>Total Properties: {properties.length}</h3>

                <div className="property-grid">

                    {properties.length > 0 ? (

                        properties.map((property) => (

                            <PropertyCard
                                key={property.id}
                                property={property}
                                showActions={true}
                                onDelete={handleDelete}
                            />

                        ))

                    ) : (

                        <h2>No Properties Added Yet</h2>

                    )}

                </div>

            </section>

        </>
    );

}

export default MyProperties;