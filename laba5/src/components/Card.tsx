import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const MemeCard = (props: any) => {
    const navigate = useNavigate();
    return (
        <Card 
            style={{ 
                width: "18rem", 
                margin: "25px", 
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", 
                borderRadius: "10px", 
                overflow: "hidden",
                backgroundColor: "#ffffff",
                transition: "transform 0.3s"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
            <Card.Img 
                variant="top" 
                src={props.img} 
                style={{ height: "200px", objectFit: "cover" }} 
            />
            <Card.Body>
                <Card.Title style={{ color: "#333", fontWeight: "bold" }}>
                    {props.title}
                </Card.Title>
                <Button 
                    onClick={(e) => navigate(`/edit?url=${props.img}`)}
                    variant="primary"
                    style={{ 
                        backgroundColor: "#007bff", 
                        borderColor: "#007bff", 
                        padding: "0.5rem 1rem", 
                        borderRadius: "5px" 
                    }}
                >
                    Редактировать
                </Button>
            </Card.Body>
        </Card>
    );
};

export default MemeCard;