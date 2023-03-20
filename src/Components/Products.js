import css from "./Products.css";
import Card from "./Card.js";
import WBCC from "../WBCC.png";

function Products(props) {

    return (
        <div>
            <main>
                <section className="cards">

                    <Card id="1" name="Curso "  imageURL={WBCC} description="Aqui te enseno como invertir en Cripto como un crack" />
                    <Card id="2" name="Curso " imageURL={WBCC} description="Aqui te enseno como optimizar tu portafolio" />
                    <Card id="3" name="Curso " imageURL={WBCC} description="Aqui te muestro como hacer analisis tecnico" />

                </section>
            </main>
        </div>


    );
}

export default Products;
