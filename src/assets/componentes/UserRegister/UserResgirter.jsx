import { useState, useEffect } from 'react';
import Styled from 'styled-components';
import { Eye, EyeOff } from 'lucide-react';
import { useRef } from 'react';
import Admin_Nav_Bar from '../Single_Components/Admin_Nav_Bar';
import Aside_Card from '../Single_Components/Aside';


//Estilos del modulo
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
    color: rgb(0, 0, 0);
    font-size: 1.8rem;
    text-align: center;
    margin-bottom: 1.5rem;
`;

const Main = Styled.main`
    background-color: #f9d77e;
    display: flex;
    justify-content: space-between;
    flex: 1;
    background: radial-gradient(circle, white, white);
    padding: 1rem;
    gap: 2.6rem;
    margin: auto;
    max-width: 1400px;
`;

const FormContainer = Styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 1.5rem;
    flex: 3;
    min-width: 460px;
    border: 1px solid grey;
    margin-left: 3.9rem;
    box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
    margin-top: 10rem;
`;

const Form = Styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const Label = Styled.label`
    font-weight: 500;
    color: rgb(0, 0, 0);
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

const Aside = Styled.aside`
    flex: 1;
    min-width: 350px;
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
    height: 36rem;
    margin-top: 10rem;

`;

const ProfileImage = Styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid #f9d77e;
    border: 1px solid grey;
`;

const Footer = Styled.footer`
    background-color: #f9d77e;
    color: #4e342e;
    text-align: center;
    padding: 0.2rem;
    font-size: 0.76rem;
    border-radius: 12px;
`;


//Estilos del PopUp
const PopupOverlay = Styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: ${props => props.$isVisible ? 'flex' : 'none'};
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
    transform: ${props => props.$isVisible ? 'scale(1)' : 'scale(0.1)'};
    transition: transform 0.4s ease-in-out;
`;

const SuccessIcon = Styled.div`
    width: 80px;
    height: 80px;
    margin: -40px auto 20px;
    border-radius: 50%;
    background: #f9d77e;
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
    background: #f9d77e;
    color: black;
    border: none;
    padding: 10px 30px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    
    &:hover {
        background: #f8c150;
    }
`;

//Ojito para el password

const PasswordInputWrapper = Styled.div`
    position: relative;
    width: 100%;
`;

const PasswordToggleIcon = Styled.div`
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #4e342e;
`;

function UserRegister() {
    //Variable para el reseteo del formulario
    const formRef = useRef(null);
    const TodayDate = new Date();
    const assignedDate = TodayDate.toISOString().split('T')[0];

    const [showPopup, setShowPopup] = useState(false);

    //Guadamos la informacion del formulario
    const [formDataRegister, setFormDataRegister] = useState({
        username: '',
        nombreApicultor: '',
        apellidoApicultor: '',
        identificacion: '',
        password: '',
        correo: '',
        telefono: '',
        fechaNacimiento: '',
        estado: '',
        nombreContactoEmergencia: '',
        contactoEmergencia: '',
        rol: ''
    });

   
    // New state for password visibility
    const [showPassword, setShowPassword] = useState({
        password: false,
        confirmPassword: false
    });

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setShowPassword(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataRegister(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

 

    const handleSubmit = async (e) => {
        e.preventDefault();
        const accessToken = localStorage.getItem('token') 
        if (!accessToken) {
            alert('No se encontró el access token');
            return;
        }

        // Validar que las contraseñas coincidan
        // if (formDataRegister.password !== formDataRegister.confirmPassword) {
        //     alert("Las contraseñas no coinciden");
        //     return;
        //  }
         // Crear el objeto de datos que espera el backend
        const userData = {
            username: formDataRegister.username,
            first_name: formDataRegister.nombreApicultor,
            last_name: formDataRegister.apellidoApicultor,
            identifications: formDataRegister.identificacion,
            password: formDataRegister.password,
            email: formDataRegister.correo,
            phone: formDataRegister.telefono,
            assignment_date: assignedDate,
            birth_date: formDataRegister.fechaNacimiento,
            state: formDataRegister.estado,
            emergency_contact_name: formDataRegister.nombreContactoEmergencia,
            emergency_contact_phone: formDataRegister.contactoEmergencia,
            role: formDataRegister.rol
        };

        alert(JSON.stringify(userData));

      
        
       //Conexion al backend

       try {
        const response = await fetch('http://127.0.0.1:8000/beekeepers/create-beekeeper/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}` ,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.Error || 'Error en el registro');
            console.log(Error);
        }



        const data = await response.json();
        
        // Si el registro es exitoso
        setShowPopup(true);
        //Limpiar el formulario
        setFormDataRegister({
            username: '',
            nombreApicultor: '',
            apellidoApicultor: '',
            identificacion: '',
            password: '',
            correo: '',
            telefono: '',
            fechaNacimiento: '',
            estado: '',
            contactoEmergencia: '',
            nombreContactoEmergencia: '',
            rol: ''
        });

    } catch (error) {
        alert(`Error: ${error.message}`);
    }
};
        
    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <Wrapper>
            <Admin_Nav_Bar>


            </Admin_Nav_Bar>
            <Main>
                <FormContainer>
                    <Form onSubmit={handleSubmit} ref={formRef}>
                        <Title>Crear Apicultor</Title>

                        <Label>Username</Label>
                        <Input
                            type='text'
                            name='username'
                            placeholder='Ingrese el username del apicultor'
                            value={formDataRegister.username}
                            onChange={handleChange}
                            required
                        />
                        
                        <Label>Nombre del apicultor</Label>
                        <Input
                            type='text'
                            name='nombreApicultor'
                            placeholder='Ingrese el nombre del apicultor'
                            value={formDataRegister.nombreApicultor}
                            onChange={handleChange}
                            required
                        />

                        <Label>Apellido del apicultor</Label>
                        <Input
                            type='text'
                            name='apellidoApicultor'
                            placeholder='Ingrese el apellido del apicultor'
                            value={formDataRegister.apellidoApicultor}
                            onChange={handleChange}
                            required
                        />

                        <Label>Identificación</Label>
                        <Input
                            type='number'
                            name='identificacion'
                            placeholder='Ingrese la identificación del apicultor'
                            value={formDataRegister.identificacion}
                            onChange={handleChange}
                            required
                        />

                        <Label>Contraseña</Label>
                        <PasswordInputWrapper>
                            <Input
                                type={showPassword.password ? 'text' : 'password'}
                                name='password'
                                placeholder='Ingrese la contraseña del apicultor'
                                value={formDataRegister.password}
                                onChange={handleChange}
                                required
                            />
                            <PasswordToggleIcon 
                                onClick={() => togglePasswordVisibility('password')}
                            >
                                {showPassword.password ? (
                                    <EyeOff size={20} />
                                ) : (
                                    <Eye size={20} />
                                )}
                            </PasswordToggleIcon>
                        </PasswordInputWrapper>


                        <Label>Correo</Label>
                        <Input
                            type='email'
                            name='correo'
                            placeholder='Ingrese el correo del apicultor'
                            value={formDataRegister.correo}
                            onChange={handleChange}
                            required
                        />

                        <Label>Teléfono</Label>
                        <Input
                            type='number'
                            name='telefono'
                            placeholder='Ingrese el número del apicultor'
                            value={formDataRegister.telefono}
                            onChange={handleChange}
                            required
                        />

                        <Label>Fecha de Nacimiento</Label>
                        <Input
                            type='date'
                            name='fechaNacimiento'
                            value={formDataRegister.fechaNacimiento}
                            onChange={handleChange}
                            required
                        />
                        <Label>Estado</Label>
                        <Select
                            name='estado'
                            value={formDataRegister.estado}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Seleccione un estado</option> {/* Opción vacía */}
                            <option value="Active">Activo</option>
                            {/* <option value="Deactivate">Desactivo</option> */}
                        </Select>

                        <Label>Nombre de contacto de emergencia</Label>
                        <Input
                            type='text'
                            placeholder='Ingrese el nombre del contacto de emergencia' 
                            name='nombreContactoEmergencia'
                            required
                            value={formDataRegister.nombreContactoEmergencia}
                            onChange={handleChange}/>

                        <Label>Contacto de emergencia</Label>
                            <Input
                            type='tel'
                            name= 'contactoEmergencia'
                            placeholder='Ingrese el contacto de emergencia' 
                            required
                            value={formDataRegister.contactoEmergencia}
                            onChange={handleChange}/>

                            

                        <Label>Rol</Label>
                        <Select
                        name='rol'
                        value={formDataRegister.rol}
                        onChange={handleChange}
                        required
                    >
                        {/* <option value="admin">Administrador</option> */}
                        <option value="">Seleccione un rol</option> {/* Opción vacía */}
                        <option value="beekeeper">Apicultor</option>
                    </Select>
                        <Button type="submit">Crear</Button>
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
                    <PopupTitle>Registro Exitoso</PopupTitle>
                    <p>El apicultor ha sido registrado exitosamente</p>
                    <PopupButton onClick={closePopup}>Aceptar</PopupButton>
                </PopupContent>
            </PopupOverlay>
        </Wrapper>
    );
}
export default UserRegister;