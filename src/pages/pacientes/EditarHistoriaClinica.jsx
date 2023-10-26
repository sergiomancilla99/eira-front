import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import * as PacienteService from "../../services/pacientes.service.js"
import * as apiMedicamentos from '../../services/apiMedicamentos.service.js'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import IconoEliminar from '../../imgs/eliminar-25.png'
import { toast } from "react-hot-toast"
import Select from 'react-select'

function EditarHistoriaClinica() {
	const usuarioLogueado = JSON.parse(localStorage.getItem('usuario'))
	const location = useLocation()
	const [condicion, setCondicion] = useState(location.state.historiaClinica?.condicion)
	const [alergia, setAlergia] = useState(location.state.historiaClinica?.alergia)
	const [peso, setPeso] = useState(location.state.historiaClinica?.peso)
	const [altura, setAltura] = useState(location.state.historiaClinica?.altura)
	const [medicamento, setMedicamento] = useState(location.state.historiaClinica?.medicamento)
	const [medicamentos, setMedicamentos] = useState(location.state.historiaClinica?.medicamentos)
	const [fumador, setFumador] = useState(location.state.historiaClinica?.fumador)
	const [alcohol, setAlcohol] = useState(location.state.historiaClinica?.alcohol)
	const [comidasDiarias, setComidasDiarias] = useState(location.state.historiaClinica?.comidasDiarias)
	const [dieta, setDieta] = useState(location.state.historiaClinica?.medicamento)
	const [habitosSuenio, setHabitosSuenio] = useState(location.state.historiaClinica?.dieta)
	const [antecedentesFamiliares, setAntecedentesFamiliares] = useState(location.state.historiaClinica?.antecedentesFamiliares)
	const [imagen, setImagen] = useState([])
	const [imagenes, setImagenes] = useState(location.state.historiaClinica?.imagenes)
	const [loadingButton, setLoadingButton] = useState(false)
	const [listaMedicamentos, setListaMedicamentos] = useState([])
	const [busqueda, setBusqueda] = useState("")
	let navigate = useNavigate();

	function agregarMedicamento(ev) {
		if (!medicamento) {
			console.log(medicamento, "MEDICAMENTO VACIO")
			toast.error("No podés agregar medicamento vacío")
		} else {
			setMedicamentos(prev => [...prev, medicamento])
			setMedicamento("")
			setBusqueda("")
		}
	}

	function eliminarMedicamento(nombre) {
		let filteredArray = medicamentos.filter(function (e) { return e !== nombre })
		setMedicamentos(filteredArray)
	}

	function eliminarImagen(url) {
		let filteredArray = imagenes.filter(function (e) { return e !== url })
		setImagenes(filteredArray)
	}

	async function handleSubmit(ev) {
		ev.preventDefault()
		if(!condicion || !alergia || !peso || !altura) {
            toast.error(`Los siguientes campos son obligatorios: ${!condicion ? "diagnostico," : ""} ${!alergia ? "alergia," : ""} ${!peso ? "peso," : ""} ${!altura ? "altura" : ""}`)
        } else {
			setLoadingButton(true)
			const arrayURLs = []
			let data = new FormData()
			data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
			data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME)
			for (let img of imagen) {
				if (img.type === "image/jpeg" || img.type === "image/png" || img.type === "application/pdf") {
					data.append('file', img)
	
					await fetch(`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`, {
						method: "POST",
						body: data
					})
						.then(resp => resp.json())
						.then(data => {
							const urlFile = data.secure_url
							arrayURLs.push(urlFile)
						})
				}
			}
			for (let file of imagenes) {
				arrayURLs.unshift(file)
			}
			PacienteService.editarHistoriaClinica(
				usuarioLogueado?._id,
				{
					condicion,
					alergia,
					peso,
					altura,
					medicamentos,
					fumador,
					alcohol,
					comidasDiarias,
					dieta,
					habitosSuenio,
					antecedentesFamiliares,
					imagenes: arrayURLs
				})
				.then(resp => {
					setLoadingButton(false)
					navigate(`/paciente/historia-clinica`, { replace: true })
				})
		}
	
	}
	useEffect(() => {
        apiMedicamentos.traer(busqueda)
        .then((data) => setListaMedicamentos(data.resultados))
    }, [busqueda])

	return (
		<main className="fondo-generico">
			<section>
				<Container className="py-5">
					<Row>
						<Col>
							<Card body className='shadow px-2 pt-2'>
								<h1 className="titulo">Mi historia clínica</h1>
								<Form onSubmit={handleSubmit}>
									<FloatingLabel className="my-3" controlId="condicion" label="¿Ya tenés un diagnóstico o alguna condición pre-existente? De ser así ¿cuál?">
										<Form.Control aria-describedby="passwordHelpBlock" placeholder="¿Ya tenés un diagnóstico o alguna condición pre-existente? De ser así ¿cuál?" value={condicion} onChange={(ev) => setCondicion(ev.target.value)} />
									</FloatingLabel>

									<FloatingLabel className="my-3" controlId="alergia" label="¿Tenés alguna alergía? De ser así, ¿cuál?">
										<Form.Control placeholder="¿Tenés alguna alergía? De ser así, ¿cuál?" value={alergia} onChange={(ev) => setAlergia(ev.target.value)} />
									</FloatingLabel>

									<Row className="my-3">
										<Col>
											<FloatingLabel controlId="peso" label="¿Cuál es tu peso (kg)?">
												<Form.Control type="number" min="0" placeholder="¿Cuál es tu peso (kg)?" name="peso" value={peso} onChange={(ev) => setPeso(ev.target.value)} />
											</FloatingLabel>
										</Col>
										<Col>
											<FloatingLabel controlId="altura" label="¿Cuál es tu altura (cm)?">
												<Form.Control type="number" min="0" placeholder="¿Cuál es tu altura (cm)?" name="altura" value={altura} onChange={(ev) => setAltura(ev.target.value)} />
											</FloatingLabel>
										</Col>
									</Row>

									<Card className="border-0 shadow my-4">
										<Card.Header className="tratamiento-header">Medicamentos</Card.Header>
										<Card.Body className="px-4">

											<div className="mb-4">
												<Select
													defaultValue={{ label: "Nombre medicamento", value: "" }}
													options={listaMedicamentos.map(medi => ({ label: medi.nombre, value: medi.nombre }))}
													onChange={(ev) => ev ? setMedicamento(ev.value) : ""}
													onInputChange={(ev) => setBusqueda(ev)}
													noOptionsMessage={() => "No se encuentra el medicamento que busca..."}
													isSearchable
												/>
											</div>
											<div className="d-flex justify-content-center">
												<Button onClick={agregarMedicamento} variant="agregar">
													Agregar
												</Button>
											</div>
											<p className="fw-bold text-center mt-4">Lista medicamentos</p>
											<ul className="lista-agregada">
												{medicamentos.map((medicamento, i) =>
													<li key={i} className="shadow mx-2 mb-3 d-flex justify-content-between">
														<span>{medicamento}</span>
														<Button variant="eliminar-trat" className="py-0 px-1" onClick={() => eliminarMedicamento(medicamento)}><img src={IconoEliminar} alt="Icono eliminar" /></Button>
													</li>
												)}
											</ul>
										</Card.Body>
									</Card>

									<Card className="border-0 shadow my-4">
										<Card.Header className="tratamiento-header">Antecedentes personales</Card.Header>
										<Card.Body className="px-4">
											<Row>
												<Col>
													<FloatingLabel className="my-3" controlId="fumador" label="¿Sos fumador?">
														<Form.Select aria-label="¿Sos fumador?" value={fumador} onChange={(ev) => setFumador(ev.target.value)}>
															<option value="No">No</option>
															<option value="Si">Si</option>
															<option value="Ocasionalmente">Ocasionalmente</option>
														</Form.Select>
													</FloatingLabel>
												</Col>
												<Col>
													<FloatingLabel className="my-3" controlId="alcohol" label="¿Consumís alcohol?">
														<Form.Select aria-label="Elige una opcion" value={alcohol} onChange={(ev) => setAlcohol(ev.target.value)}>
															<option value="No">No</option>
															<option value="Si">Si</option>
															<option value="Ocasionalmente">Ocasionalmente</option>
														</Form.Select>
													</FloatingLabel>
												</Col>
											</Row>
										</Card.Body>
									</Card>

									<Card className="border-0 shadow my-4">
										<Card.Header className="tratamiento-header">Hábitos</Card.Header>
										<Card.Body className="px-4">
											<FloatingLabel className="my-3" controlId="comidaDiaria" label="¿Cuántas comidas por día ingerís?">
												<Form.Control type="number" name="comidaDiaria" min="0" placeholder="¿Cuántas comidas por día ingerís?" value={comidasDiarias} onChange={(ev) => setComidasDiarias(ev.target.value)} />
											</FloatingLabel>
											<FloatingLabel className="my-3" controlId="dieta" label="¿Seguís alguna dieta?">
												<Form.Control as="textarea" rows={3} name="dieta" placeholder="¿Seguís alguna dieta?" value={dieta} onChange={(ev) => setDieta(ev.target.value)} />
											</FloatingLabel>
											<FloatingLabel className="my-3" controlId="habitosSuenio" label="¿Cómo son tus hábitos de sueño?">
												<Form.Control as="textarea" rows={3} name="habitosSuenio" placeholder="¿Cómo son tus hábitos de sueño?" value={habitosSuenio} onChange={(ev) => setHabitosSuenio(ev.target.value)} />
											</FloatingLabel>
										</Card.Body>
									</Card>

									<Card className="border-0 shadow my-4">
										<Card.Header className="tratamiento-header">Antecedentes familiares</Card.Header>
										<Card.Body className="px-4">
											<FloatingLabel className="my-3" controlId="antecedentesFamiliares" label="Indicá tus antecedentes familiares">
												<Form.Control as="textarea" rows={3} name="antecedentesFamiliares" placeholder="Indicá tus antecedentes familiares" value={antecedentesFamiliares} onChange={(ev) => setAntecedentesFamiliares(ev.target.value)} />
											</FloatingLabel>
										</Card.Body>
									</Card>

									<Card className="border-0 shadow my-4">
										<Card.Header className="tratamiento-header">Exámenes complementarios</Card.Header>
										<Card.Body className="px-4">
											<Row>
												<Col lg={12}>
													<ul className='lista-archivos d-md-flex text-center row'>
														{imagenes.length > 0 && imagenes.map((file, i) =>
															<li key={i} className='col-12 col-lg-4 d-flex flex-column justify-content-between'>
																<span className="d-block embed-responsive embed-responsive-16by9">
																	{
																		file.endsWith(".pdf") ?
																			<iframe className="embed-responsive-item w-100" src={file} title="PDF Viewer" /> :
																			<img src={file} alt="" className="img-fluid" />
																	}
																</span>
																<span>
																	<Button variant="naranja" className="btn-padding mt-2" onClick={() => eliminarImagen(file)}>Eliminar</Button>
																</span>
															</li>
														)}
													</ul>
												</Col>
												<Col lg={12}>
													<FloatingLabel className="my-3 floating-distance-2" controlId="imagen" label="Imagen">
														<Form.Control type="file" placeholder="Imagen" name="imagen" multiple onChange={(ev) => setImagen(ev.target.files)} />
													</FloatingLabel>
												</Col>
											</Row>
										</Card.Body>
									</Card>

									<div className='mt-5 mb-3 d-flex justify-content-center'>
										<Button type="submit" variant="editar" disabled={loadingButton}>
											{loadingButton &&
												<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
											}
											{!loadingButton &&
												<span>Guardar cambios</span>
											}
										</Button>
									</div>
								</Form>
							</Card>
						</Col>
					</Row>
				</Container>
			</section>
		</main>
	)
}

export default EditarHistoriaClinica