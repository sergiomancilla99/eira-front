import { Container, Row, Col, Card  } from 'react-bootstrap';

function TerminosYCondiciones() {
    return (
        <main className="fondo-generico">
            <section className='my-5'>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <Card className='shadow'>
                                <Card.Body>
                                    <h1 className='fs-4 mb-4'>Términos y Condiciones</h1>
                                    <p>¡Bienvenido a Eira!</p>
                                    <p>Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web de Eira, ubicado en eira.ar.</p>
                                    <p>Al acceder a este sitio web, asumimos que aceptas estos términos y condiciones. No continúes usando Eira si no estás de acuerdo con todos los términos y condiciones establecidos en esta página.</p>
                                    <h2 className='fs-5'>Licencia:</h2>
                                    <p>A menos que se indique lo contrario, Eira y/o sus licenciantes poseen los derechos de propiedad intelectual de todo el material en Eira. Todos los derechos de propiedad intelectual son reservados. Puedes acceder desde Eira para tu uso personal sujeto a las restricciones establecidas en estos términos y condiciones.</p>
                                    <p>No debes:</p>
                                    <ul>
                                        <li>Copiar o volver a publicar material de Eira</li>
                                        <li>Vender, alquilar o sublicenciar material de Eira</li>
                                        <li>Reproducir, duplicar o copiar material de Eira</li>
                                        <li>Redistribuir contenido de Eira</li>
                                    </ul>
                                    <p>Partes de este sitio web ofrecen a los usuarios la oportunidad de publicar e intercambiar opiniones e información en determinadas áreas. Eira no filtra, edita, publica ni revisa los comentarios antes de su presencia en el sitio web. Los comentarios no reflejan los puntos de vista ni las opiniones de Eira, sus agentes y/o afiliados. Los comentarios reflejan los puntos de vista y opiniones de la persona que publica. En la medida en que lo permitan las leyes aplicables, Eira no será responsable de los comentarios ni de ninguna responsabilidad, daños o gastos causados o sufridos como resultado de cualquier uso o publicación o apariencia de comentarios en este sitio web.</p>
                                    <h2 className='fs-5'>Hipervínculos a nuestro contenido:</h2>
                                    <p>Las siguientes organizaciones pueden vincularse a nuestro sitio web sin aprobación previa por escrito:</p>
                                    <ul>
                                        <li>Agrencias gubernamentales;</li>
                                        <li>Motores de búsqueda;</li>
                                        <li>Organizaciones de noticias;</li>
                                        <li>Los distribuidores de directorios en línea pueden vincularse a nuestro sitio web de la misma manera que hacen hipervínculos a los sitios web de otras empresas que figuran en la lista;</li>
                                        <li>Empresas acreditadas en todo el sistema, excepto que soliciten organizaciones sin fines de lucro, centros comerciales de caridad y grupos de recaudación de fondos de caridad que no pueden hacer hipervínculos a nuestro sitio web.</li>
                                    </ul>
                                    <p>Estas organizaciones pueden enlazar a nuestra página de inicio o a otra información del sitio siempre que el enlace: (a) no sea engañoso de ninguna manera; (b) no implique falsamente patrocinio, respaldo o aprobación de la parte vinculante y sus productos y/o servicios; y (c) encaja en el contexto del sitio de la parte vinculante.</p>
                                    <h2 className='fs-5'>Reserva de derechos:</h2>
                                    <p>Nos reservamos el derecho de modificar estos términos y condiciones y su política de enlaces en cualquier momento.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default TerminosYCondiciones