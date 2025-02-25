import { Link } from 'react-router-dom';
import Styled from 'styled-components';
import { useState } from 'react';
import NavBar from '../Single_Components/NavBar';
import Aside_Card from '../Single_Components/Aside';

const Wrapper = Styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh; 
    width: 100%;
    margin: 0;
    padding: 0;
    
`;



const Logo = Styled.img`
    height: 50px;
   
`;



//

const Main = Styled.main`
    display: flex;
    justify-content: center;
    align-items: stretch;
    flex-direction: row;
    flex: 1;
    padding: 1rem;
    padding-top: calc(110px + 1rem);
    gap: 5rem;
`;

const Form = Styled.form`
    display: flex;
     flex-direction: column;
     gap: 0.75rem;
`;


const FormContainer = Styled.div`
    background-color: white;
    border-radius: 10px;
    box-shadow:  0 0 20px 5px rgba(0, 0, 0, 0.25);
    padding: 1.5rem;
    width: 100%;
    max-width: 400px;
    border : 1px solid grey;
    
`;

const FormTitle = Styled.h2`
    margin-bottom: 1rem;
    color: #4e342e;
    text-align: center;
`;


const FormLogin = Styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    
`;

const Label = Styled.label`
    font-weight: 500;
    color:rgb(0, 0, 0);
    text-align: left;
`;

const Input = Styled.input`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ffcc80;
    border-radius: 10px;
    background-color: #fffde7;
    color: #4e342e;
    font-size: 1rem;
    transition: border-color 0.3s;
    &:focus {
        outline: none;
        border-color: #ffb300;
    }
`;

const Button = Styled.button`
    background-color: #f9d77e;
    border: none;
    padding: 0.8rem;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    color: #4e342e;
    transition: background-color 0.3s;
    &:hover {
        background-color: #f8c150;
    }
`;

//Aside

const Aside = Styled.aside`
    width: 450px;
    flex: 0 0 auto;
    min-width: 250px;
    max-width: 346px;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    border: 1px solid gray;
    font-size: 1.6rem;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
    margin-bottom: 7rem;
    height: 30rem;
`;

const ProfileImage = Styled.img`
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid ##f9d77e;;
        border: 1px solid grey;
`;

const Footer = Styled.footer`
    background-color: #f9d77e;
    color: #4e342e;
    text-align: center;
    padding: 0.rem;
    font-size: 0.75rem;
    border-radius:12px 12px 0 0;
`;

function Monitoreo(){

    const [formDataMonitoreo, setFormDataMonitoreo] = useState({
        fechaMonitoreo: '',
        observacionesReina: '',
        observacionesAlimento:'',
        ObservacionesReina: '',
        observacionesGenerales: '',
    })


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataMonitoreo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://127.0.0.1:8000/monitoring/beehive-monitoring/",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    monitoring_date : formDataMonitoreo.fechaMonitoreo, 
                    queen_observations: formDataMonitoreo.observacionesReina, 
                    food_observations : formDataMonitoreo.observacionesAlimento,
                    general_observations: formDataMonitoreo.observacionesGenerales, 
                })
            })

            const data = await response.json()

            if (response.ok){
                console.log("Monitoreo exitoso")
            }else{
                console.log("Datos incorrectos")
            }
        } catch(error){
            console.log("Error");
        }
    }

    return (
        <Wrapper>
             <NavBar>


             </NavBar>
    
            <Main>
                <FormContainer>
                    <Form onSubmit={handleSubmit}>
                        <FormTitle>Monitoreo</FormTitle>
    
                        <Label>Fecha de monitoreo</Label>
                        <Input type="date" required placeholder="Ingrese la fecha de recolección" 
                        onChange={handleChange} value={formDataMonitoreo.fechaMonitoreo} name='fechaMonitoreo'/>
    
                        <Label>Observaciones reina</Label>
                        <Input type="text" required placeholder="Ingrese las observaciones de la reina" 
                        onChange={handleChange} value={formDataMonitoreo.observacionesReina} name='observacionesReina'  />
    
                        <Label>Observación de alimentos</Label>
                        <Input type="text" required placeholder="Ingrese las observaciones de alimentos" 
                        onChange={handleChange} value={formDataMonitoreo.observacionesAlimento} name="observacionesAlimento" />
    
                        
    
                        <Label>Observaciones generales</Label>
                        <Input type="text" required placeholder="Ingrese las observaciones generales"
                        onChange={handleChange} value={formDataMonitoreo.observacionesGenerales} name="observacionesGenerales" />
    
                        <Button>Enviar</Button>
                    </Form>
                </FormContainer>
                <Aside_Card>

                    
                </Aside_Card>
            </Main>
           
            <Footer>
                <h2>Colmenares del Eje</h2>
                <p>@2025 Todos los derechos reservados</p>
            </Footer>
        </Wrapper>
    );
}
export default Monitoreo;
