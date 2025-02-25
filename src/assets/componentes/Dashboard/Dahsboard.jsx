import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import imagen1 from 'src/img/abejitas.jpeg';
import imagen2 from 'src/img/imagen_ejemplo.jpg';
import imagen3 from 'src/img/images.jpeg';
import { useEffect, useState } from 'react';
import NavBar from '../Single_Components/NavBar';
import Footer from '../Single_Components/Footer';
import Aside_Card from '../Single_Components/Aside';

const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px'
};


const Logo = styled.img`
  height: 35px;
  margin-bottom: 0.5rem;

  @media (min-width: ${breakpoints.tablet}) {
    height: 50px;
    margin-bottom: 0;
  }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;





const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;

  @media (min-width: ${breakpoints.tablet}) {
    flex: 2;
    margin: 0;
  }
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  margin-top: 10px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  flex: 1;

  
  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    padding: 20px;
    margin-top: 0;
  }
`;

const Section = styled.section`
  background-color: white;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
  border: 1px solid gray;
  max-width: 100%;

  @media (min-width: ${breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;


const Select = styled.select`
width: 100%;
padding: 8px;
border-radius: 12px;
background-color: rgb(248, 227, 174);
border: 2px solid #f6e7ff;
font-family: 'Poppins', sans-serif;
font-size: 0.9rem;
margin-top: 5px;
cursor: pointer;

/* Estilos para las opciones */
option {
  padding: 8px;
  font-size: 0.9rem;
  background-color: white;
}

/* Móvil pequeño */
@media (max-width: ${breakpoints.mobile}) {
  padding: 6px;
  font-size: 0.8rem;
  
  option {
    padding: 6px;
    font-size: 0.8rem;
  }
}

/* Tablet */
@media (min-width: ${breakpoints.tablet}) {
  width: auto;
  min-width: 150px;
  margin-top: 0;
  padding: 10px;
  font-size: 1rem;
  
  option {
    padding: 10px;
    font-size: 1rem;
  }
}

/* Desktop */
@media (min-width: ${breakpoints.desktop}) {
  min-width: 180px;
  padding: 12px;
  font-size: 1rem;
  
  option {
    padding: 12px;
    font-size: 1rem;
  }
}

&:focus {
  outline: none;
  border-color: #f8c150;
}
`;




const Img = styled.img`
  width: 100%;
  height: 250px;
  border-radius: 8px;
  border: 1px solid gray;
  object-fit: cover;

  @media (min-width: ${breakpoints.tablet}) {
    width: 300px;
    height: 150px;
  }
`;

const DivSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-align: center;

  h3 {
    margin: 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
  }

  @media (min-width: ${breakpoints.tablet}) {
    text-align: left;
  }
`;




//PopUp Styles
const PopupOverlay = styled.div`
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
opacity: ${props => props.isVisible ? 1 : 0};
visibility: ${props => props.isVisible ? 'visible' : 'hidden'};
transition: opacity 0.2s, visibility 0.2s;
display: flex;
justify-content: center;
align-items: center;
z-index: 1000;
`;

const PopupContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  position: relative;
  width: 90%;
  max-width: 400px;
  margin: 0 auto;
  transform: ${props => props.isVisible ? 'scale(1)' : 'scale(0.1)'};
  transition: transform 0.4s ease-in-out;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
  @media (max-width: ${breakpoints.mobile}) {
      padding: 1.5rem;
  }
`;



const PopupHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const PopupBody = styled.div`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: ${breakpoints.mobile}) {
      flex-direction: column;
      align-items: center;
  }
`;


const PopupImageSection = styled.div`
  flex: 0 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 19.5px;
`;

const PopupInfoSection = styled.div`
  flex: 1;
  text-align: left;
  padding: 4px:

  p {
      margin: 8px 0;
      font-size: 1rem;
      line-height: 1.5;
  }

  @media (max-width: ${breakpoints.mobile}) {
      text-align: center;
  }
`;

const CloseIcon = styled.button`
    width: 30px;
    height: 30px;
    background: #f9d77e;
    border-radius: 100%;
    position: absolute;
    left: 88%;
    bottom: 90%;
    border: none;
    &::after {
        content: 'X';
        font-size: 20px;
        color: white;
    }

    @media (max-width: ${breakpoints.mobile}) {
        width: 60px;
        height: 60px;
        margin: -30px auto 15px;
        
        &::after {
            font-size: 30px;
        }
    }
`;


const PopupTitle = styled.h2`
    color: #333;
    font-size: 24px;
    margin-bottom: 10px;

    @media (max-width: ${breakpoints.mobile}) {
        font-size: 20px;
    }
`;



const PopupButtonsContainer = styled.div`
   display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  position: absolute;
  width: 150px;  // El mismo ancho que la imagen
  margin-top: -190px;  // Un poco más que el alto de la imagen (150px) para dar espacio
  left: 1.8rem;  // Alinear con el margen izquierdo donde está la imagen
`;


const PopupButton = styled.button`
    background: #f9d77e;
    color: black;
    border: none;
    padding: 10px 30px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    margin-top: 20px;
    margin: 15px;
    height:40px;
    width:138px;
    text-align:center;
    border-radius: 12px;
    &:hover {
        background: #f8c150;
    }

    @media (max-width: ${breakpoints.mobile}) {
        font-size: 14px;
        padding: 8px 24px;
    }
`;



function Dashboard() {
  // Estado para almacenar los datos obtenidos
  const [data, setData] = useState(null);
  // Estado para manejar posibles errores
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  //Estado para la seleccion de Id en las colmenas
  const [selectedColmenaId, setSelectedColmenaId] = useState(null);
  //Estado para la apertura del PopUp con la informacion del apicultor
  const [showPopup, setShowPopup] = useState(false);

  const colmenasIniciales = [
    { id: 12345, finca: "Finca La Margarita", imagen: imagen1 },
    { id: 25485, finca: "Finca Los Alpes", imagen: imagen2 },
    { id: 98712, finca: "Finca La Graciela", imagen: imagen3 },
    { id: 22334, finca: "Finca La Margarita", imagen: imagen1 },
    { id: 22663, finca: "Finca Los Alpes", imagen: imagen2 },
    { id: 11223, finca: "Finca La Graciela", imagen: imagen3 },


  ];

  const colmenasCompletas= [
    {
      cod: 12345,
      cantidadCriasAbierta : 24,
      cantidadCriasOperculada : 54,
      presenciaReina : 'Si',
      colorReina : 'Amarilla',
      origenReina: 'Europea',
      reportesGenerales: 'Sin novedad' 
    },

    {
      cod: 25485,
      cantidadCriasAbierta : 34,
      cantidadCriasOperculada : 45,
      presenciaReina : 'Si',
      colorReina : 'Amarilla',
      origenReina: 'Africanita',
      reportesGenerales: 'Sin novedad' 
    },
    {
      cod: 98712,
      cantidadCriasAbierta: 25,
      cantidadCriasOperculada: 43,
      presenciaReina: 'Si',
      colorReina: 'Negra',
      origenReina : 'Europea',
      reportesGenerales: 'Sin novedad'
    },

    {
      cod: 22334,
      cantidadCriasAbierta : 24,
      cantidadCriasOperculada : 54,
      presenciaReina : 'Si',
      colorReina : 'Amarilla',
      origenReina: 'Europea',
      reportesGenerales: 'Sin novedad' 
    },

    {
      cod: 22663,
      cantidadCriasAbierta : 34,
      cantidadCriasOperculada : 45,
      presenciaReina : 'Si',
      colorReina : 'Amarilla',
      origenReina: 'Africanita',
      reportesGenerales: 'Sin novedad' 
    },
    {
      cod: 11223,
      cantidadCriasAbierta: 25,
      cantidadCriasOperculada: 43,
      presenciaReina: 'Si',
      colorReina: 'Negra',
      origenReina : 'Europea',
      reportesGenerales: 'Pene'
    } 



  ]

  

  

  const handleSelectChange = (e, colmenaId) => {
    switch(e.target.value) {
      case 'editar':
        navigate('/EditColmena');
        break;
      case 'monitoreo':
        navigate('/Monitoreo');
        break;
      case 'recoleccion':
        navigate('/Recoleccion');
        break;
        case 'visualizar-detalles':
          setSelectedColmenaId(null); // Primero resetea
          setTimeout(() => {
            setSelectedColmenaId(colmenaId);
            setShowPopup(true);
          }, 10);
          break;
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/beehive/list-hives/');
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  

  

  const closePopup = () => {
    setShowPopup(false);

    setTimeout(() => {
      setSelectedColmenaId(null);
    }, 400)
}
  return (
    <PageWrapper>
      <ContentWrapper>
      <NavBar>


      </NavBar>

        <Container>
          <Main>
            {colmenasIniciales.map((colmena) => (
              <Section key={colmena.id}>
                <Img src={colmena.imagen} alt="Imagen de la colmena" 
                style={{
                  
                }}/>
                <DivSection>
              <h3>Cod {colmena.id}</h3>
              {colmena.finca && <p>{colmena.finca}</p>}
            </DivSection>
            <Select onChange={(e) => handleSelectChange(e, colmena.id)}>
                  <option value="">Seleccionar</option>
                  <option value='editar'>Editar</option>
                  <option value='recoleccion'>Recolección</option>
                  <option value='monitoreo'>Monitoreo</option>
                  <option value="visualizar-detalles">Visualizar Detalles</option>
                </Select>
              </Section>
            ))}
          </Main>

         <Aside_Card>

         </Aside_Card>

        </Container>
      </ContentWrapper>

      <Footer>
        
      </Footer>

      <PopupOverlay isVisible={showPopup}>
        <PopupContent isVisible={showPopup}>
          <CloseIcon onClick={closePopup}></CloseIcon>
          <Logo src="src/img/Colmenares_del_eje_logo.png" alt="Logo" />
          {selectedColmenaId && (
            (() => {
              const selectedColmena = colmenasCompletas.find(c => c.cod === selectedColmenaId);
              if (selectedColmena) {
                return (
                 <>
                            <PopupTitle>Información de la colmena</PopupTitle>
                            <PopupBody>
                                <PopupImageSection>
                                    <img 
                                        src={imagen1} 
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                            borderRadius: '50%',
                                            objectFit: 'cover',
                                            border: '3px solid gray'
                                        }}
                                    />
                                </PopupImageSection>
                                <PopupInfoSection>
                                    <p><strong>Cantidad cuadros cria abierta:</strong> {selectedColmena.cantidadCriasAbierta}</p>
                                    <p><strong>Cantidad de cuadros de cria operculada:</strong> {selectedColmena.cantidadCriasOperculada}</p>
                                    <p><strong>Presencia reina:</strong> {selectedColmena.presenciaReina || 'No especificado'}</p>
                                    <p><strong>ColorReina:</strong> {selectedColmena.colorReina}</p>
                                    <p><strong>Origen Reina :</strong> {selectedColmena.origenReina}</p>
                                    <p><strong>Reportes generales :</strong> {selectedColmena.reportesGenerales}</p>
                                </PopupInfoSection>
                            </PopupBody>
                            <PopupButtonsContainer>
                                <PopupButton>Editar</PopupButton>
                                <PopupButton>Deshabilitar</PopupButton>
                            </PopupButtonsContainer>
                        </>
                ); } else {
                  return <p>No se encontró información detallada para esta colmena.</p>;
              }
          })()
        )}
        </PopupContent>
        </PopupOverlay>
    </PageWrapper>
  );
};

export default Dashboard;