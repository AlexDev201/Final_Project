import styled from "styled-components";

const breakpoints = {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px'
  };


const Aside = styled.aside`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  border: 1px solid gray;
  font-size: 1.2rem;
  mIN-width: 350px;
  margin: 0 auto;
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
  height: 36rem;
  @media (min-width: ${breakpoints.tablet}) {
    flex: 1;
    font-size: 1.6rem;
    margin: 0;
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid gray;

  @media (min-width: ${breakpoints.tablet}) {
    width: 100px;
    height: 100px;
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


function Aside_Card(){
    let rol= '';
    const username = sessionStorage.getItem('username');
    const role= localStorage.getItem('role');

    if (role === 'admin'){
        rol = `Administrador`
    }

    if (role=== 'beekeeper'){
        rol = 'Apicultor';
    }
    return(
        <Aside>
            <h2>{rol}</h2>
            <ProfileImage src="src/img/profile-pic.jpeg" alt="Perfil" />
            <h3>{username}</h3>
            <Select>
              <option value="">Colmenas Relacionadas</option>
            </Select>
          </Aside>
    )
}

export default Aside_Card;