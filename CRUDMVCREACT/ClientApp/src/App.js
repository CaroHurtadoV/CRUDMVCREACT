import { Container, Row, Col, Card, CardHeader, CardBody, CardFooter, Button } from "reactstrap"
import "bootstrap/dist/css/bootstrap.min.css"
import TablaContacto from "./components/TablaContacto"
import { useEffect, useState } from "react"
import ModalContacto from "./components/ModalContacto"

const App = () => {
    const [contactos, setContactos] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false)
    const [editar, setEditar] = useState(null)
   

    /**
     * Servicios API
     */
    /**
     * Devuelve los datos de la tabla contacto
     */

    const mostrarContactos = async () => {
        const response = await fetch("api/contacto/lista")

        if (response.ok) {
            const data = await response.json()
            setContactos(data)
        }
        
    }

    /**
     * Crea un nuevo elemento de contacto
     */

    const guardarContacto = async (contacto) => {
        const response = await fetch("api/contacto/guardar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(contacto)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarContactos()
        }

    }
    /**
     * Editar un elemento de contacto existente
     */

    const editarContacto = async (contacto) => {
        const response = await fetch("api/contacto/editar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(contacto)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal)
            mostrarContactos()
        }

    }

    /**
     * Eliminar un elemento de contacto existente
     */

    const eliminarContacto = async (id) => {
        var respuesta = window.confirm("¿Desea eliminar el contacto?")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/contacto/eliminar/"+id, {
            method: "DELETE"         
        })

        if (response.ok) {
            mostrarContactos()
        }

    }

    useEffect(() => {
        mostrarContactos()
    }, [])

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>LISTA DE CONTACTOS</h5>
                        </CardHeader>
                        <CardBody>
                             <Button size="sm" color="success" onClick={() => setMostrarModal(!mostrarModal)} >Nuevo contacto</Button>
                            <hr></hr>
                            <TablaContacto
                                data={contactos}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarContacto={eliminarContacto}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalContacto
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarContacto={guardarContacto}
                editar={editar}
                editarContacto={editarContacto}
                
            />
        </Container>
    )
}

export default App