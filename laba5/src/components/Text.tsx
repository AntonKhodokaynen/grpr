import React, { useState } from "react";

const Text = () => {
    const [editMode, setEditMode] = useState(false);
    const [val, setVal] = useState("Дважды щелкните для редактирования");
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setOffset({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setPosition({
                x: e.clientX - offset.x,
                y: e.clientY - offset.y,
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div
            style={{
                position: "absolute",
                left: `${position.x}px`,
                top: `${position.y}px`,
                cursor: isDragging ? "grabbing" : "grab",
                backgroundColor: editMode ? "rgba(255, 255, 255, 0.9)" : "transparent",
                padding: editMode ? "5px" : "0",
                borderRadius: "5px",
                boxShadow: editMode ? "0 2px 4px rgba(0, 0, 0, 0.2)" : "none",
                transform: "translate(-50%, -50%)",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            {editMode ? (
                <input
                    onDoubleClick={() => setEditMode(false)}
                    value={val}
                    onChange={(e) => setVal(e.target.value)}
                    style={{
                        fontSize: "1.5rem",
                        padding: "5px",
                        border: "1px solid #007bff",
                        borderRadius: "5px",
                        outline: "none",
                    }}
                />
            ) : (
                <h1 
                    onDoubleClick={() => {
                        setEditMode(true);
                        setVal(""); // Очищаем текст при двойном клике
                    }}
                    style={{
                        color: "#000",
                        fontSize: "1.5rem",
                        margin: 0,
                        fontWeight: "bold",
                    }}
                >
                    {val}
                </h1>
            )}
        </div>
    );
};

export default Text;