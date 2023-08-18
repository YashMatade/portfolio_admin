import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const [quotes, setQuotes] = useState();
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
    let navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem("name") === null || !localStorage.getItem("name")) {
            navigate("/")
        }
        axios.get("https://type.fit/api/quotes").then((res) => {
            setQuotes(res.data);
            const interval = setInterval(() => {
                setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % res.data.length);
            }, 100000);
            return () => clearInterval(interval);
        });
    }, []);

    return (
        <div>

            <div className="container mt-4">
                <div className="row">
                    <div className="col">
                        <blockquote className="blockquote text-center">
                            <p className="mb-1">{quotes && quotes[currentQuoteIndex]?.text}</p><br />
                            <p className="blockquote-footer">{quotes && quotes[currentQuoteIndex]?.author}</p>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
