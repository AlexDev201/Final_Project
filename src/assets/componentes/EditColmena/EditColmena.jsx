import Styled from 'styled-components';
import { useState } from 'react';
import {  NavLink, useLocation } from 'react-router-dom';
import NavBar from '../Single_Components/NavBar';
import Aside_Card from '../Single_Components/Aside';
import Footer from '../Single_Components/Footer';
const breakpoints = {
    mobile: '480px',
    tablet: '768px',
    laptop: '1024px'
};
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





const Main = Styled.main`
    display: flex;
    justify-content: center;
    flex: 1;
    background: radial-gradient(circle, white, white);
    padding: 1rem;
    gap: 2rem;
    margin: auto;
    max-width: 1000px;
    padding-top: calc(120px + 1rem);
    flex-wrap: wrap;

    @media (max-width: ${breakpoints.laptop}) {
        flex-direction: column;
        align-items: center;
        padding: 1rem;
        gap: 1.5rem;
        max-width: 95%;
        padding-top: calc(150px + 1rem);
    }
`;



const FormContainer = Styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem;
    width: 450px;
    min-height: 600px;
    height: 100%;
    border: 1px solid grey;
    margin: 0;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    
    @media (max-width: ${breakpoints.tablet}) {
        width: 95%;
        max-width: 450px;
        margin-top: calc(100px + 1rem);
    }
`;

const Form = Styled.form`
     display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
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



const Select = Styled.select`
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ffcc80;
    border-radius: 10px;
    background-color: #fffde7;
    color: #4e342e;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
`;


const ButtonContainer = Styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

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
    width: 150px;
    transition: background-color 0.3s;
    &:hover {
        background-color: #f8c150;
    }
`;




//PopUp


const PopupOverlay = Styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: ${props => props.isVisible ? 'flex' : 'none'};
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PopupContent = Styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  position: relative;
  width: 400px;
  transform: ${props => props.isVisible ? 'scale(1)' : 'scale(0.1)'};
  transition: transform 0.4s ease-in-out;
`;

const SuccessIcon = Styled.div`
  width: 80px;
  height: 80px;
  margin: -40px auto 20px;
  border-radius: 50%;
  background:  #f9d77e;;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &::after {
    content: '✓';
    font-size: 40px;
    color: white;
  }
`;

const PopupTitle = Styled.h2`
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
`;

const PopupButton = Styled.button`
  background:  #f9d77e;;
  color: black;
  border: none;
  padding: 10px 30px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  
  &:hover {
    background:#f8c150;
  }
`;


function EditColmena() {
    //Estado del PopUp
    const [showPopup, setShowPopup] = useState(false);

    const [formData, setFormData] = useState({
         cantidadCriasAbierta : '',
         cantidadCriasOperculada : '',
         presenciaReina : '',
         colorReina : '',
         origenReina: '',
         reportesGenerales: '' })
 
     const handleChange = (e) => {
         const { name, value } = e.target;
         setFormData(prevState => ({
           ...prevState,
           [name]: value
         }));
       };
 
       const handleSubmit =  async (e) => {
         e.preventDefault();
         // console.log('Datos del formulario:', formData);

         try {
            // Estructura los datos según el formato esperado por el serializador
            const apiData = {
                // Campos del formulario mapeados a los nombres del backend
                open_brood_frames: parseFloat(formData.cuadrosCriaAbierta),
                capped_brood_frames: parseFloat(formData.cuadrosCriaOperculada),
                queen_presence: formData.presenciaReina === 'Si' ? true : false,
                queen_color: formData.colorReina,
                origin: formData.origenReina,
                observations: formData.reportesGenerales
            };
    
            // Asumiendo que recibes el ID de la colmena como parámetro en la URL o en el estado
            const colmenaId = ''
    
            const response = await fetch(`http://127.0.0.1:8000//beehives/edit-hive${colmenaId}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    // Agrega aquí headers de autorización si son necesarios
                },
                body: JSON.stringify(apiData)
            });
    
            if (!response.ok) {
                throw new Error('Error al actualizar los datos');
            }
    
            const data = await response.json();
            console.log('Colmena actualizada exitosamente:', data);
            
            setShowPopup(true);
    
        } catch (error) {
            console.error('Error al enviar datos:', error);
            alert('Error al actualizar la colmena');
        }


         setShowPopup(true);
       };
     
       
    const closePopup = () => {
        setShowPopup(false);
    };

    return(
      <Wrapper> 
        <NavBar>
            
        </NavBar>
        <Main>
            <FormContainer>
            <Form onSubmit={handleSubmit}>
                <h1>Editar Colmena</h1>                
                <Label>Cantidad de Cuadros de Cria Abierta</Label>
                <Input
                    type='number'
                    name='cuadrosCriaAbierta'
                    placeholder='Ingrese el número de cuadros'
                    value={formData.cuadrosCriaAbierta}
                    onChange={handleChange}
                    required
                />
                
                <Label>Cantidad de Cuadros de Cria Operculada</Label>
                <Input
                    type='number'
                    name='cuadrosCriaOperculada'
                    placeholder='Ingrese el número de cuadros'
                    value={formData.cuadrosCriaOperculada}
                    onChange={handleChange}
                    required
                />
                
                <Label>Presencia de la Reina</Label>
                <Select
                    name='presenciaReina'
                    value={formData.presenciaReina}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione una opción</option>
                    <option value="Si">Sí</option>
                    <option value="No">No</option>
                </Select>
                
                <Label>Color de Reina</Label>
                <Select
                    name='colorReina'
                    value={formData.colorReina}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione una opción</option>
                    <option value="Blanca">Blanca</option>
                    <option value="Amarilla">Amarilla</option>
                    <option value="Roja">Roja</option>
                    <option value="Verde">Verde</option>
                    <option value="Azul">Azul</option>
                </Select>
                
                <Label>Origen de la Reina</Label>
                <Select
                    name='origenReina'
                    value={formData.origenReina}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione una opción</option>
                    <option value="Africanita">Africanita</option>
                    <option value="Europea">Europea</option>
                    <option value="Asiatica">Asiática</option>
                </Select>
                
                <Label>Observaciones Generales</Label>
                <Input
                    type='text'
                    name='observaciones'
                    placeholder='Ingrese las observaciones generales'
                    value={formData.observaciones}
                    onChange={handleChange}
                    required
                />
                <ButtonContainer>
                <Button type="submit">Actualizar</Button>
                </ButtonContainer>
            </Form>
            </FormContainer>

                <Aside_Card>

                </Aside_Card>
            </Main>
        

        <Footer>

        </Footer>

        <PopupOverlay isVisible={showPopup}>
                <PopupContent isVisible={showPopup}>
                    <SuccessIcon />
                    <PopupTitle>Actualización Exitosa </PopupTitle>
                    <p>La colmena ha sido actualizada exitosamente</p>
                    <PopupButton onClick={closePopup}>Aceptar</PopupButton>
                </PopupContent>
            </PopupOverlay>
      </Wrapper> 
    )
}

export default EditColmena;