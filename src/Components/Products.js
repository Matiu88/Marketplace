import css from "./Products.css";
import Card from "./Card.js";
import WBCC from "../WBCC.png";

function Products(props) {

    return (
        <div>
            <main>
                <section className="cards">

                    <Card name="Curso 1" imageURL={WBCC} description="Aqui te enseno como invertir en Cripto" />
                    <Card name="Curso 2" imageURL={WBCC} description="Aqui te enseno como optimizar tu portafolio" />

                </section>
            </main>
        </div>


    );
}

export default Products;