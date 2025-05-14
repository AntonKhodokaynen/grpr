import React, { useState, createRef } from "react";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import Text from "../components/Text"
import { toJpeg } from "html-to-image";

const EditPage = () => {
    const [params] = useSearchParams();
    const [count, setCount] = useState(0);
    const memeRef = createRef();

    const addText = () => {
        setCount(count + 1);
    };

    const handleExport = () => {
        if (memeRef.current === null) {
            return;
        }
    
        const options = {
            quality: 1,
            backgroundColor: "#ffffff",
            pixelRatio: 2, // Увеличим качество для четкости
        };
    
        // Задержка для завершения рендеринга
        setTimeout(() => {
            toJpeg(memeRef.current, options)
                .then((dataUrl) => {
                    const link = document.createElement("a");
                    link.download = "meme.jpeg";
                    link.href = dataUrl;
                    link.click();
                })
                .catch((error) => {
                    console.error("Ошибка экспорта изображения:", error);
                });
        }, 100); // Задержка 100 мс
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div 
                style={{ 
                    width: "700px", 
                    height: "500px", // Фиксированная высота
                    border: "2px solid #007bff", 
                    borderRadius: "10px", 
                    backgroundColor: "#fff", 
                    padding: "1rem",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    marginBottom: "2rem",
                    position: "relative", // Для корректного позиционирования текста
                    overflow: "hidden" // Предотвращаем выход текста за границы
                }}
                ref={memeRef} 
                className="meme mb-5"
            >
                <img 
                    src={params.get("url")} 
                    width="250px" 
                    style={{ borderRadius: "5px", display: "block", margin: "0 auto" }} 
                />
                {Array(count)
                    .fill(0)
                    .map((e, index) => (
                        <Text key={index} />
                    ))}
            </div>
            <div style={{ display: "flex", gap: "1rem" }}>
                <Button 
                    onClick={addText}
                    style={{
                        backgroundColor: "#007bff",
                        borderColor: "#007bff",
                        padding: "0.5rem 1rem",
                        borderRadius: "5px"
                    }}
                >
                    Добавить текст
                </Button>
                <Button 
                    variant="success" 
                    onClick={(e) => handleExport()}
                    style={{
                        backgroundColor: "#28a745",
                        borderColor: "#28a745",
                        padding: "0.5rem 1rem",
                        borderRadius: "5px"
                    }}
                >
                    Сохранить
                </Button>
            </div>
        </div>
    );
};

export default EditPage;