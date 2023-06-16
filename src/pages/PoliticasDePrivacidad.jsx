import { Container, Row, Col, Card  } from 'react-bootstrap';

function PoliticasDePrivacidad() {
    return (
        <main className="fondo-generico">
            <section className='my-5'>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <Card className='shadow'>
                                <Card.Body>
                                    <h1 className='fs-4 mb-4'>Políticas de Privacidad</h1>
                                    <p>El sitio web Eira es propiedad de Eira, que es un controlador de datos de tus datos personales.</p>
                                    <p>Hemos adoptado esta Política de privacidad, que determina cómo procesamos la información recopilada por Eira, que también proporciona las razones por las que debemos recopilar ciertos datos personales sobre ti. Por lo tanto, debes leer esta Política de privacidad antes de usar el sitio web de Eira.</p>
                                    <p>Cuidamos tus datos personales y nos comprometemos a garantizar su confidencialidad y seguridad.</p>
                                    <h2 className='fs-5'>Información personal que recopilamos:</h2>
                                    <p>Cuando visitas Eira, recopilamos automáticamente cierta información sobre tu dispositivo, incluida información sobre tu navegador web, dirección IP, zona horaria y algunas de las cookies instaladas en tu dispositivo. Nos referimos a esta información recopilada automáticamente como "Información del dispositivo". Además, podemos recopilar los datos personales que nos proporcionas (incluidos, entre otros, nombre, apellido, dni, etc.) durante el registro para poder cumplir con el acuerdo.</p>
                                    <h2 className='fs-5'>¿Por qué procesamos tus datos?</h2>
                                    <p>Nuestra máxima prioridad es la seguridad de los datos del cliente y, como tal, podemos procesar solo los datos mínimos del usuario, solo en la medida en que sea absolutamente necesario para mantener el sitio web. La información recopilada automáticamente se utiliza solo para identificar casos potenciales de abuso y establecer información estadística sobre el uso del sitio web. Esta información estadística no se agrega de tal manera que identifique a ningún usuario en particular del sistema.</p>
                                    <p>Puedes visitar la web sin decirnos quién eres ni revelar ninguna información por la cual alguien pueda identificarte como una persona específica. Sin embargo, si deseas utilizar algunas de las funciones del sitio web, o proporcionar otros detalles al completar un formulario, puedes proporcionarnos datos personales, como tu correo electrónico, nombre, apellido y número de teléfono. Puedes optar por no proporcionar tus datos personales, pero es posible que no puedas aprovechar algunas de las funciones del sitio web. Los usuarios que no estén seguros de qué información es obligatoria pueden ponerse en contacto con nosotros a través de eiraappinformacion@gmail.com.</p>
                                    <h2 className='fs-5'>Tus derechos:</h2>
                                    <p>Tienes los siguientes derechos relacionados con tus datos personales:</p>
                                    <ul>
                                        <li>El derecho a ser informado.</li>
                                        <li>El derecho de acceso.</li>
                                        <li>El derecho a borrar.</li>
                                        <li>El derecho a restringir el procesamiento.</li>
                                    </ul>
                                    <h2 className='fs-5'>Seguridad de la información:</h2>
                                    <p>Aseguramos la información que proporcionas en servidores informáticos en un entorno controlado y seguro, protegido del acceso, uso o divulgación no autorizados. Mantenemos medidas de seguridad administrativas, técnicas y físicas razonables para proteger contra el acceso no autorizado, el uso, la modificación y la divulgación de datos personales bajo su control y custodia. Sin embargo, no se puede garantizar la transmisión de datos a través de Internet o redes inalámbricas.</p>
                                    <h2 className='fs-5'>Divulgación legal:</h2>
                                    <p>Divulgaremos cualquier información que recopilemos, usemos o recibamos si así lo requiere o lo permite la ley, como para cumplir con una citación o un proceso legal similar, y cuando creemos de buena fe que la divulgación es necesaria para proteger nuestros derechos, proteger tu seguridad o la seguridad de los demás, investigar el fraude o responder a una solicitud del gobierno.</p>
                                    <h2 className='fs-5'>Información de contacto:</h2>
                                    <p>Si deseas comunicarte con nosotros para comprender más sobre esta Política o deseas comunicarte con nosotros en relación con cualquier asunto sobre los derechos individuales y tu información personal, puedes enviarnos un correo electrónico a <a href='mailto:eiraappinformacion@gmail.com' >eiraappinformacion@gmail.com</a>.</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </main>
    )
}

export default PoliticasDePrivacidad