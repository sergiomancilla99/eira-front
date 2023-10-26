import { Card, Container, Row, Col, Spinner, Button } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import * as PacientesService from '../services/pacientes.service.js'
import { useParams } from 'react-router-dom'
import { saveAs } from 'file-saver'

function VerHistoriaClinica() {
  const [paciente, setPaciente] = useState({})
  const [historiaClinica, setHistoriaClinica] = useState({})
  const { id } = useParams()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    PacientesService.traerHistoriaClinica(id)
      .then((resp) => {
        setHistoriaClinica(resp)
        setLoading(false)
      })

    PacientesService.traerPorId(id)
      .then((resp) => {
        setPaciente(resp)
        setLoading(false)
      })
    // eslint-disable-next-line
  }, [])

  
  function downloadFile(urlFile) {
    saveAs(urlFile, `descarga`)
  }


  return (
    <main className="fondo-generico">
      <section>
        <Container className="py-5">
          <Row>
            <Col>
              <Card body className='shadow px-2 pt-2'>
                <h1 className="titulo">Historia clínica</h1>
                {loading &&
                  <div className='text-center'>
                    <Spinner animation="border" className='color-spinner' />
                  </div>
                }
                {!loading && !historiaClinica && <p><b>{paciente.nombre} {paciente.apellido} </b>todavía no subió su historia clinica</p>}
                {!loading && historiaClinica &&
                  <>
                    <Container className='my-4'>
                      <Row>
                        <Col lg={6}>
                          <p><span className="fw-bold">Paciente:</span> {paciente.nombre}</p>
                          <p><span className="fw-bold">Diagnóstico o condición pre-existente:</span> {historiaClinica.condicion}</p>
                          <p><span className="fw-bold">Alergias:</span> {historiaClinica.alergia}</p>
                        </Col>
                        <Col lg={6}>
                          <p><span className="fw-bold">N° de Documento:</span> {paciente.dni}</p>
                          <p><span className="fw-bold">Peso:</span> {historiaClinica.peso} kg</p>
                          <p><span className="fw-bold">Altura:</span> {historiaClinica.altura} cm</p>
                        </Col>
                      </Row>
                    </Container>

                    {historiaClinica.medicamentos?.length > 0 &&
                      <Card className="border-0 shadow my-4">
                        <Card.Header className="tratamiento-header">Medicamentos</Card.Header>
                        <Card.Body className="px-4">
                          <ul className="lista-agregada mt-3">
                            {historiaClinica.medicamentos?.map((medicamento, i) =>
                              <li className="shadow mx-2 mb-3" key={i}>
                                <span>{medicamento}</span>
                              </li>
                            )}
                          </ul>
                        </Card.Body>
                      </Card>
                    }

                    <Card className="border-0 shadow my-4">
                      <Card.Header className="tratamiento-header">Antecedentes personales</Card.Header>
                      <Card.Body className="px-4">
                        <ul className="lista-antecedentes mt-3">
                          <li>
                            <span className="fw-bold">Fumador:</span> {historiaClinica.fumador}
                          </li>
                          <li>
                            <span className="fw-bold">Consume alcohol:</span> {historiaClinica.alcohol}
                          </li>
                        </ul>
                      </Card.Body>
                    </Card>

                    <Card className="border-0 shadow my-4">
                      <Card.Header className="tratamiento-header">Hábitos</Card.Header>
                      <Card.Body className="px-4">
                        <ul className="lista-antecedentes mt-3">
                        <li>
                            <span className="fw-bold">Cantidad de comidas por día:</span> {!historiaClinica.comidasDiarias ? <span>-</span> : historiaClinica.comidasDiarias}
                          </li>
                          <li>
                            <span className="fw-bold">Sigue una dieta:</span> {!historiaClinica.dieta ? <span>-</span> : historiaClinica.dieta}
                          </li>
                          <li>
                            <span className="fw-bold">Hábitos de sueño:</span> {!historiaClinica.habitosSuenio ? <span>-</span> : historiaClinica.habitosSuenio}
                          </li>
                        </ul>
                      </Card.Body>
                    </Card>

                    {historiaClinica.antecedentesFamiliares?.length > 0 &&
                    <Card className="border-0 shadow my-4">
                      <Card.Header className="tratamiento-header">Antecedentes familiares</Card.Header>
                      <Card.Body className="px-4">
                        <p className='text-antecedentes'>{historiaClinica.antecedentesFamiliares}</p>
                      </Card.Body>
                    </Card>
                    }
                    
              {historiaClinica.imagenes?.length > 0 &&
                    <Card className="border-0 shadow my-4">
                      <Card.Header className="tratamiento-header">Exámenes complementarios</Card.Header>
                      <Card.Body className="px-4">
                        <ul className='lista-archivos d-md-flex text-center row'>
                          {
                            historiaClinica.imagenes?.map((file, i) =>
                              <li key={i} className='col-12 col-lg-4'>

                                <div className="embed-responsive embed-responsive-16by9">
                                  {
                                    file.endsWith(".pdf") ?
                                      <iframe className="embed-responsive-item w-100" src={file} title="PDF Viewer" /> :
                                      <img src={file} alt="" className="img-fluid w-100" />
                                  }
                                </div><br />

                                <span>
                                  <a href={file} target="_blank" rel="noopener noreferrer" className='btn btn-azul me-3 btn-padding'>Ver</a>
                                  <Button onClick={() => downloadFile(file)} variant="verde" className='btn-padding'>Descargar</Button>
                                </span>
                              </li>

                            )
                          }
                        </ul>
                      </Card.Body>
                    </Card>
                    }
                  </>
                }
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </main>
  )
}

export default VerHistoriaClinica