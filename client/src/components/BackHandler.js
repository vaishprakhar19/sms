import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BackHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.onpopstate = () => {
            navigate("/");
        }
    }, [navigate]);
};


export default BackHandler