import Styled from 'styled-components';

const Pie_Pagina = Styled.footer`
    background-color: #f9d77e;
    color: #4e342e;
    text-align: center;
    padding: 0.5rem;
    font-size: 0.75rem;
    border-radius: 12px 12px 0 0;
    height: 90px;
    @media (max-width: 768px) {
        font-size: 0.6rem;
        padding: 0.3rem;
    }
`;

function Footer() {
    return(

        <Pie_Pagina>
                <h2>Colmenares del Eje</h2>
                <p>@2025 Todos los derechos reservados</p>
        </Pie_Pagina>

    )


};

export default Footer;