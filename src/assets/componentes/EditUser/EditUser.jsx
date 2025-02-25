import Styled from 'styled-components';
import { useState } from 'react';
import {  NavLink, useLocation } from 'react-router-dom';
import Admin_Nav_Bar from '../Single_Components/Admin_Nav_Bar';
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



const Title = Styled.h1`
    margin: 0;
    color:rgb(0, 0, 0);
    font-size: 1.8rem;
    text-align: center;
    margin-bottom:1.5rem;
    
`;

const Main = Styled.main`
    background-color: #f9d77e;
    display: flex;
    justify-content: space-between;
    flex: 1;
    background: radial-gradient(circle, white, white);
    padding: 1rem;
    gap:2.6rem;
    margin:  auto; // Centra el contenido
    max-width: 1400px; // Limita el ancho máximo para pantallas muy grandes
    padding-top: calc(150px + 1rem)
    
`;



const FormContainer = Styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem;
    min-width: 460px; // Ancho mínimo para el formulario
    border: 1px solid grey;
    margin-left: 3.9rem;
    box-shadow:  0 0 20px 5px rgba(0, 0, 0, 0.25);
    
`;

const Form = Styled.form`
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




const ProfileImage = Styled.img`
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        border: 3px solid ##f9d77e;;
        border: 1px solid grey;
`;


const ButtonContainer = Styled.div`
    display: flex;
    gap: 1rem;
    justify-content: center;
`;

const Footer = Styled.footer`
    background-color: #f9d77e;
    color: #4e342e;;
    text-align: center;
    padding: 0.2rem;
    font-size: 0.76rem;
    border-radius:12px;
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


function    EditUser() {
    //Estado del PopUp
    const [showPopup, setShowPopup] = useState(false);

    const [formDataUser, setFormDataUser] = useState({
         nombreApicultor : '',
         apellditoApicultor: '',
         telefono: '',
         correo : '',
         nombreContactoEmergencia: '',
         contactoEmergencia: '',
         fechaNacimiento: ''

      })
 
     const handleChange = (e) => {
         const { name, value } = e.target;
         setFormData(prevState => ({
           ...prevState,
           [name]: value
         }));
       };
 
       const handleSubmit = async (e) => {
         e.preventDefault();
         // console.log('Datos del formulario:', formData);

         try {
            const response = await fetch("http://127.0.0.1:8000/beekeper-managment/edit-beekeper/", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: formDataUser.nombreApicultor,
                    last_name: formDataUser.apellditoApicultor,
                    identifications: formDataUser.identificacion,
                    email: formDataUser.correo,
                    phone: formDataUser.telefono,
                    birth_date: formDataUser.fechaNacimiento,
                    emergency_contact_name: formDataUser.nombreContactoEmergencia,
                    emergency_contact_phone: formDataUser.contactoEmergencia,
                    state: 'Active', // Por defecto activo, podrías cambiarlo según necesites
                    assignment_date: new Date().toISOString().split('T')[0] // Fecha actual
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Usuario actualizado exitosamente", data);
                setShowPopup(true);
            } else {
                console.log("Error al actualizar el usuario");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    
         setShowPopup(true);
       };
     
       
    const closePopup = () => {
        setShowPopup(false);
    };

    return(
      <Wrapper> 
         <Admin_Nav_Bar>


         </Admin_Nav_Bar>
        <Main>
            <FormContainer>
            <Form onSubmit={handleSubmit}>
                <Title>Editar Apicultor</Title>
                
                <Label>Ingrese los nombres del apicultor</Label>
                <Input
                    type='text'
                    name='nombreApicultor'
                    placeholder='Ingrese el nombre del apicultor'
                    value={formDataUser.nombreApicultor}
                    onChange={handleChange}
                    required
                />

                <Label>Ingrese los apellidos del apicultor</Label>
                <Input
                    type='text'
                    name='nombreApicultor'
                    placeholder='Ingrese los apellidos del apicultor'
                    value={formDataUser.apellditoApicultor}
                    onChange={handleChange}
                    required
                />
                <Label>Identificacion</Label>
                <Input
                type='number'
                placeholder='Ingrese la identificacion del apicultor'/>

                <Label>Telefono </Label>
                <Input
                    type='number'
                    name='telefono'
                    placeholder='Ingrese el número del apicultor'
                    value={formDataUser.cuadrosCriaOperculada}
                    onChange={handleChange}
                    required
                />
                
                <Label>Correo</Label>
               <Input
               type='email'
               placeholder='Ingrese el correo del apicultor'
               value={formDataUser.correo}
               onChange={handleChange}/>
                
               
                
                <Label>Fecha de Nacimiento</Label>
                <Input 
                type='date'
                placeholder='Ingrese la fecha de nacimiento del apicultor'
                value={formDataUser.fechaNacimiento}
                />

                <Label>Contacto de emergencia</Label>
                <Input
                type='number'
                placeholder='Ingrese el contacto e emergencia'
                value={formDataUser.contactoEmergencia}/>

                <Label>Nombre de contacto</Label>
                <Input
                type='text'
                placeholder='Ingrese el nombre del contacto e emergencia'
                value={formDataUser.contactoEmergencia}/>
                <br></br>
                <ButtonContainer>
                <Button type="submit">Editar</Button>
                <Button>Deshabilitar</Button>
                </ButtonContainer>
            </Form>
            </FormContainer>

               <Aside_Card>

               </Aside_Card>
            </Main>
        

        <Footer>
            <h2>Colmenares del Eje</h2>
            <p>@2025 Todos los derechos reservados</p>
        </Footer>

        <PopupOverlay $isVisible={showPopup}>
                <PopupContent $isVisible={showPopup}>
                    <SuccessIcon />
                    <PopupTitle>Actualización Exitosa </PopupTitle>
                    <p>La colmena ha sido actualizada exitosamente</p>
                    <PopupButton onClick={closePopup}>Aceptar</PopupButton>
                </PopupContent>
            </PopupOverlay>
      </Wrapper> 
    )
}

export default  EditUser;