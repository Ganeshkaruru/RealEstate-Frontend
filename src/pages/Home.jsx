import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PropertyCard from "../components/PropertyCard";
import { getProperties } from "../services/propertyService";
import "../css/home.css";

function Home() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        loadProperties();
    }, []);

    const loadProperties = async () => {
        const response = await getProperties();

        console.log("API Response:", response);
        console.log("Content Length:", response.content.length);

        setProperties(response.content);
    };

    console.log("Current State Length:", properties.length);

    return (
        <>
            <Navbar />

            <h1>Total Properties: {properties.length}</h1>

            <div className="property-grid">
                {properties.map((property) => (
                    <PropertyCard
                        key={property.id}
                        property={property}
                    />
                ))}
            </div>
        </>
    );
}export default Home;