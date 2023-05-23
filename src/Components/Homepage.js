import css from "./Homepage.css";
import Metatron from "../Metatron.png.png";


function Homepage(props) {

    return (
        <section>
            <div class="hero">
                <h1>Vuelvete un experto en Criptos conmigo</h1>
                <p>Esta serie de cursos estan concebidos para que cualquier persona pueda entender a profundidad como funcionan las criptomonedas y como invertir en ellas de manera exitosa</p>
                <button class="header-cta"><a href="/Products">Cursos</a></button>
                
            </div>

            <div >
                <img position="absolute" alt="test" width="500" src={Metatron}></img>
            </div>
        </section>
                        
    );
}

export default Homepage;