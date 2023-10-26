import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import NavbarEira from './components/NavbarEira'
import NavbarEiraLanding from './components/NavbarEiraLanding'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tratamiento from './pages/Tratamiento'
import VerTratamiento from './pages/VerTratamiento'
import EditarTratamiento from './pages/EditarTratamiento'
import MiPerfilProfesional from './pages/MiPerfilProfesional'
import EditarPerfilProfesional from './pages/EditarPerfilProfesional'
import VerHistoriaClinica from './pages/VerHistoriaClinica'
import ListaPacientes from './pages/ListaPacientes'
import MiPerfilPaciente from './pages/pacientes/MiPerfilPaciente'
import EditarPerfilPaciente from './pages/pacientes/EditarPerfilPaciente'
import HistoriaClinicaPaciente from './pages/pacientes/HistoriaClinica'
import FormHistorialClinico from './pages/pacientes/FormHistorialClinico'
import DashboardPaciente from './pages/pacientes/Dashboard'
import Login from './pages/Login'
import UsuarioRegistro from './pages/UsuarioRegistro'
import OlvideContrasena from './pages/OlvideContrasena'
import RecuperarContrasena from './pages/RecuperarContrasena'
import ListadoMedicos from './pages/admin/ListadoMedicos'
import ListadoPacientesAdmin from './pages/admin/ListadoPacientes'
import MensajeFaltaVerificacion from './pages/MensajeFaltaVerificación'
import DashboardMedico from './pages/DashboardMedico'
import DashboardAdmin from './pages/admin/Dashboard'
import PedirRecetas from './pages/pacientes/PedirRecetas'
import SolicitudesPacientes from './pages/pacientes/Solicitudes'
import Solicitudes from './pages/Solicitudes'
import { useEffect, useState } from 'react'
import Error404 from './pages/Error404';
import PedidosRecetas from './pages/PedidosRecetas'
import { UsuarioContext } from './context/UsuarioContext'
import { useContext } from 'react'
import { RecordatoriosContext } from './context/RecordatoriosContext'
import * as RecordatoriosService from './services/recordatorios.service.js'
import * as PacientesService from './services/pacientes.service.js'
import { Toaster, toast } from 'react-hot-toast';
import { SocketContext } from './context/SocketContext'
import Chat from './pages/Chat'
import { getAuth, signInAnonymously } from 'firebase/auth'
import { getToken, onMessage } from 'firebase/messaging'
import { messaging } from './firebase/firebase.js'
import ConfirmacionTratamiento from './pages/ConfirmacionTratamiento'
import ProgresoTratamiento from './pages/ProgresoTratamiento'
import AgregarComidas from './pages/AgregarComidas'
import AgregarMedicamentos from './pages/AgregarMedicamentos'
import AgregarEjercicios from './pages/AgregarEjercicios'
import VerTratamientoUnico from './pages/pacientes/verTratamientoUnico'
import ProgresoTratamientoProfesional from './pages/ProgresoTratamientoProfesional'
import RutasPrivadas from './components/RutasPrivadas'
import EditarHistoriaClinica from './pages/pacientes/EditarHistoriaClinica'
import TerminosYCondiciones from './pages/TerminosYCondiciones'
import PoliticasDePrivacidad from './pages/PoliticasDePrivacidad'
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import * as RecordatorioService from './services/recordatorios.service.js'

function App() {
  const [usuarioLogueado, setUsuarioLogueado] = useState(JSON.parse(localStorage.getItem('usuario')))
  // eslint-disable-next-line no-unused-vars
  const [tokenFB, setTokenFB] = useState(localStorage.getItem('tokenFB'))
  // eslint-disable-next-line no-unused-vars
  const [misRecordatorios, setMisRecordatorios] = useState(JSON.parse(localStorage.getItem('recordatorios')))
  const location = useLocation()
  let navigate = useNavigate();
  const socket = useContext(SocketContext)
  const recordatorios = useContext(RecordatoriosContext)
  const [historial, setHistorial] = useState({})

  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then(function (permission) { })
  }


  function onLogin({ usuario, token }) {
    signInAnonymously(getAuth())
    .then(user => {})
    setUsuarioLogueado(usuario)
    activarMensajes(usuario)
    localStorage.setItem('usuario', JSON.stringify(usuario))
    localStorage.setItem('token', token)

    if (usuario.admin) {
      navigate(`/admin`, { replace: true })
    } else if (!usuario.matricula) {
      navigate(`/paciente`, { replace: true })
    } else {
      navigate(`/medico`, { replace: true })
    }
    socket.emit("agregarUsuario", usuario._id) // cuando me logueo, comunico al socket
  }

  const activarMensajes = async (usuario) => {
    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_VAPID_KEY
    })
      .catch(error => console.log("Hubo un error al generar el token."))
    if (token) {
      setTokenFB(token)

      localStorage.setItem('tokenFB', token)
      PacientesService.editar(usuario._id, { nombre: usuario.nombre, apellido: usuario.apellido, telefono: usuario.telefono, email: usuario.email, dni: usuario.dni, "fbNotification": token })
    }
  }

  // state={{ medicamento, profesional: tratamiento.profesional, idTratamiento: tratamiento._id, diagnostico: tratamiento.diagnostico }}
  useEffect(() => {
    onMessage(messaging, message => {
      const medicamento = message.notification.body
      toast(<span>
        <Link to={`/paciente/confirmacion`} state={{ medicamento: {nombre: medicamento}, profesional: JSON.parse(message.data.profesional), idTratamiento: message.data.idTratamiento, diagnostico: "" }}>{message.notification.body}</Link>
      </span>, {
        icon: '🔔',
        duration: 20000
      })
    })
  }, [])



  return (
    <UsuarioContext.Provider value={{ usuarioLogueado, setUsuarioLogueado }} >
      <SocketContext.Provider value={socket} >
        <RecordatoriosContext.Provider value={{recordatorios, historial}} >
      {!usuarioLogueado && <NavbarEiraLanding />}
      {usuarioLogueado && <NavbarEira />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/terminos-y-condiciones' element={<TerminosYCondiciones />} />
        <Route path='/politicas-de-privacidad' element={<PoliticasDePrivacidad />} />
        <Route path='/login' element={<Login onLogin={onLogin}/>} />
        <Route path='/olvideContrasena' element={<OlvideContrasena />} />
        <Route path='/recuperarContrasena/:token/:email' element={<RecuperarContrasena />} />
        <Route path='/registro' element={<UsuarioRegistro />} />
        <Route path='/profesional/pacientes' element={
          <RutasPrivadas>
            <ListaPacientes activarMensajes={activarMensajes} />
          </RutasPrivadas>
        } />
        <Route path='/historia-clinica/:id' element={
          <RutasPrivadas>
            <VerHistoriaClinica />
          </RutasPrivadas>
        } />
        <Route path='/tratamiento/:id' element={
          <RutasPrivadas>
            <Tratamiento />
          </RutasPrivadas>
        } />
        <Route path='/ver-tratamiento/:id' element={
          <RutasPrivadas>
            <VerTratamiento />
          </RutasPrivadas>
        } />
        <Route path='/editar-tratamiento/:id' element={
          <RutasPrivadas>
            <EditarTratamiento />
          </RutasPrivadas>
        } />
        <Route path='/mi-perfil/:id' element={
          <RutasPrivadas>
            <MiPerfilProfesional />
          </RutasPrivadas>
        } />
        <Route path='/editar-perfil/:id' element={
          <RutasPrivadas>
            <EditarPerfilProfesional onLogin={onLogin} />
          </RutasPrivadas>
        } />
        <Route path='/home/perfil-paciente/:id' element={
          <RutasPrivadas>
            <MiPerfilPaciente />
          </RutasPrivadas>
        } />
        <Route path='/paciente' element={
          <RutasPrivadas>
            <DashboardPaciente />
          </RutasPrivadas>
        } />
        <Route path='/paciente/editar-perfil/:id' element={
          <RutasPrivadas>
            <EditarPerfilPaciente onLogin={onLogin} />
          </RutasPrivadas>
        } />
        <Route path='/paciente/historia-clinica' element={
          <RutasPrivadas>
            <HistoriaClinicaPaciente />
          </RutasPrivadas>
        } />
        <Route path='/paciente/formulario-historia-clinica' element={
          <RutasPrivadas>
            <FormHistorialClinico />
          </RutasPrivadas>
        } />
        <Route path='/paciente/editar-historia-clinica' element={
          <RutasPrivadas>
            <EditarHistoriaClinica />
          </RutasPrivadas>
        } />
        <Route path='/paciente/pedir-recetas' element={
          <RutasPrivadas>
            <PedirRecetas />
          </RutasPrivadas>
        } />
        <Route path='/chat' element={
          <RutasPrivadas>
            <Chat />
          </RutasPrivadas>
        } />
        <Route path='/admin' element={
          <RutasPrivadas>
            <DashboardAdmin />
          </RutasPrivadas>
        } />
        <Route path='/admin/medicos' element={
          <RutasPrivadas>
            <ListadoMedicos />
          </RutasPrivadas>
        } />
        <Route path='/admin/Pacientes' element={
          <RutasPrivadas>
            <ListadoPacientesAdmin />
          </RutasPrivadas>
        } />
        <Route path='/falta-verificacion' element={
          <RutasPrivadas>
            <MensajeFaltaVerificacion />
          </RutasPrivadas>
        } />
        <Route path='/medico' element={
          <RutasPrivadas>
            <DashboardMedico />
          </RutasPrivadas>
        } />
        <Route path='/solicitudes' element={
          <RutasPrivadas>
            <Solicitudes />
          </RutasPrivadas>
        } />
        <Route path='/paciente/solicitudes' element={
          <RutasPrivadas>
            <SolicitudesPacientes />
          </RutasPrivadas>
        } />
        <Route path='/medico/pedidos-recetas' element={
          <RutasPrivadas>
            <PedidosRecetas />
          </RutasPrivadas>
        }/>
        <Route path='/paciente/confirmacion' element={
          <RutasPrivadas>
            <ConfirmacionTratamiento />
          </RutasPrivadas>
        } />
        <Route path='/progreso-tratamiento' element={
          <RutasPrivadas>
            <ProgresoTratamiento />
          </RutasPrivadas>
        } />
        <Route path='/tratamiento/:id/agregar-comida' element={
          <RutasPrivadas>
            <AgregarComidas />
          </RutasPrivadas>
        } />
        <Route path='/tratamiento/:id/agregar-medicamento' element={
          <RutasPrivadas>
            <AgregarMedicamentos />
          </RutasPrivadas>
        } />
        <Route path='/tratamiento/:id/agregar-ejercicio' element={
          <RutasPrivadas>
            <AgregarEjercicios />
          </RutasPrivadas>
        } />
        <Route path='/ver-tratamiento-unico' element={
          <RutasPrivadas>
            <VerTratamientoUnico />
          </RutasPrivadas>
        } />
        <Route path='/progreso-paciente/:id' element={
          <RutasPrivadas>
            <ProgresoTratamientoProfesional />
          </RutasPrivadas>
        } />
        <Route path='*' element={<Error404 />} />
      </Routes>
      <Footer />
      <Toaster position="top-right" />
      </RecordatoriosContext.Provider>
      </SocketContext.Provider>
    </UsuarioContext.Provider>
  );
}

export default App;
