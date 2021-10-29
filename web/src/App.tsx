import React, { useEffect, useState } from 'react';
import "./App.css"
import { Table } from './components/Table';
import api from './services/api';



export interface IDomain {
  codigo: number,
  descricao: string
}

interface IAttribute {
  codigo: string,
  definicao: string,
  nomeApresentacao: string,
  modalidade: string,
  dataInicioVigencia: string,
  dataFimVigencia: string,
  dominio: IDomain[],
  objetivos: IDomain[],
  orgaos: string[]
}

interface INcmList {
  codigoNcm: string,
  listaAtributos: IAttribute[]
}



function App() {
  const [ page, setPage ] = useState(1)
  const [ ncmList, setNcmList ] = useState<INcmList[]>([])
  const [ ncmNumberList, setNcmNumberList ] = useState<string[]>([])
  const [ filter, setFilter ] = useState("")


  async function handleFilter() {
    const response = await api.get<INcmList[]>(`attributes/ncm/1`, {
      params: {
        filter
      }
    })

    setNcmList(response.data)
  }


  useEffect(() => {
    api.get<INcmList[]>(`attributes/ncm/${page}`).then(response => {
      setNcmList([...ncmList, ...response.data])  
    })

    
    const dataNcm = ncmList.map(item => {
      return item.codigoNcm
    })

    setNcmNumberList(dataNcm)
  }, [page])


  return (
    <div className="container">
      <h1 className="title">Desafio NCM</h1>

      <div className="filter-container">
        <select 
          className="ncm-filter"
          onChange={e => setFilter(e.target.value)}
        >
          {ncmNumberList.map(ncmCode => (
            <option value={ncmCode}>{ncmCode}</option>
          ))}
        </select>
        
        <button className="filter-button" onClick={handleFilter}>Filtrar</button>
      </div>

      {ncmList.map(item => (
        <div>
          <h1 className="tableTitle">Código NCM: {item.codigoNcm}</h1>
          <table>
            <tr>
              <th>Código</th>
              <th>Definição</th>
              <th>Apresentação</th>
              <th>Modalidade</th>
              <th>Inicio da Vigência</th>
              <th>Fim da Vigência</th>
              <th>Orgãos</th>
              <th>Dominio</th>
              <th>Objetivos</th>
            </tr>

            {item.listaAtributos.map(attribute => (
              <tr>
                <td>{attribute.codigo}</td>
                <td>{attribute.definicao}</td>
                <td>{attribute.nomeApresentacao}</td>
                <td>{attribute.modalidade}</td>
                <td>{attribute.dataInicioVigencia}</td>
                <td>{attribute.dataFimVigencia}</td>
                <td>{attribute.orgaos.join(" - ")}</td>
                <Table list={attribute.dominio} />
                <Table list={attribute.objetivos}/>
              </tr>
            ))}
          </table>
        </div>
      ))}


      <button className="loadMore" onClick={() => setPage(page + 1)}>Carregar mais</button>
    </div>
  );
}

export default App;
