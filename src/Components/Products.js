import css from "./Products.css";
import Card from "./Card.js";
import WBCC from "../WBCC.png";
import MetaImage from "../Meta.png";
import opti from "../optimización.jpg";
import opti2 from "../Portafolio de inversion.jpg";


function Products(props) {

    return (
        <div>
            <main>
                <section className="cards">

                    <Card id="" name="Blockchain"  imageURL={MetaImage} description="En esta serie de cursos te enseño lo basico acerca de la tecnología Blockchain" />
                    <Card id="" name="Crear Portafolio " imageURL={opti} description="Aqui te enseno como crear tu portafolio de inversión" />
                    <Card id="" name="Optimización de Portafolio " imageURL={opti2} description="En este modulo te muestro como optimizar tu portafolio de inversión" />

                </section>
            </main>
        </div>


    );
}

export default Products;
