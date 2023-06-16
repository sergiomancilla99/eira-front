import { Pagination } from "react-bootstrap"

function Paginador ({ elementosPorPagina, totalElementos, setPaginaActual, paginaActual }) {
    const numeroPaginas = []

    for(let i=1; i <= Math.ceil(totalElementos / elementosPorPagina); i++) {
        numeroPaginas.push(i)
    }

    return (
        <>
            <Pagination className='d-flex justify-content-center mt-3'>
                    {paginaActual !== 1 && <Pagination.Prev className='flechaPag' onClick={() => setPaginaActual(paginaActual - 1)} />}
                        {numeroPaginas.map(pagina =>
                            <Pagination.Item key={pagina} className={pagina === paginaActual ? 'numPag active' : 'numPag'} onClick={() => setPaginaActual(pagina)} >{pagina}</Pagination.Item>
                        )}
                    {paginaActual !== numeroPaginas.length && <Pagination.Next className='flechaPag' onClick={() => setPaginaActual(paginaActual + 1)}/>}
            </Pagination>
        </>
    )
}

export default Paginador