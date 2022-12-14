import { ContentPasteOffSharp } from '@mui/icons-material';
import { Box, Button, CircularProgress } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import { loadFromLocalstorage } from '../../../utils/handleLocalhost';
import Calender from './Calender';
import './service.css'
const Service = () => {
    const { value, setValue } = useAuth();
    const { _id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const getUserData = loadFromLocalstorage();
    const appointMent = (_id) => {
        const timeValue = { time: value, email: getUserData?.email };
        const filter = data.filter(item => item._id === _id);
        const dataAssign = Object.assign({}, ...filter);
        const newData = {
            ...dataAssign,
            ...timeValue,

        }
        fetch('http://localhost:5000/appointment', {
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/doctors')
            .then(res => res.json())
            .then(data => {
                const filter = data.filter((item) => item.specialist === _id);
                setData(filter);
                setLoading(false);
            })
    }, []);
    return (
        <div>
            <div>
                <Calender value={value} setValue={setValue}></Calender>
            </div>
            <Box sx={{ display: 'flex',justifyContent:'center' }}>
               {
                loading  &&  <CircularProgress />
               }
            </Box>
            <Container>
                {
                    data.map((item, index) => <div key={index}>
                        <div className='doctor-card'>
                            <div className='doctor-card1'>
                                <img src={`data:image/*;base64,${item.imageBuffer}`} alt='' />
                            </div>
                            <div className='doctor-card2'>
                                <h3 className='doctor-name'>{item.name}</h3>
                                <h5 className='education'>{item.education}</h5>
                                <span className='specialist'>specialist</span>
                                <h5 className='specialist'>{item.specialist}</h5>
                            </div>
                            <div className='doctor-card3'>
                                <span className='doctor-name'>work place</span>
                                <h5 className='education'>{item.work_in}</h5>
                                <span className='experience'>experience</span>
                                <h5 className='specialist'>{item.experience}</h5>
                            </div>
                            <div className='doctor-card4'>
                                <h3 className='fee'>{item.fee}</h3>
                                <span>(incl. VAT)  Per consultation</span>
                                <br />
                                <span>{value.toDateString()}</span>
                                <br />
                                <Button onClick={(e) => appointMent(item._id)} variant="contained" color="success">Appointment</Button>
                            </div>
                        </div>
                    </div>)
                }
            </Container>
        </div>
    );
};

export default Service;