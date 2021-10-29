import { Request, Response } from "express"
import fs from "fs"
import path from "path"


interface IAttribute {
  codigo: string,
  definicao: string,
  nomeApresentacao: string,
  orientacaoPreenchimento: string,
  formaPreenchimento: string,
  modalidade: string,
  obrigatorio: boolean,
  dataInicioVigencia: string,
  dataFimVigencia: string,
}

interface IAttributes {
  codigoNcm: string,
  listaAtributos: IAttribute[]
}

export class AtribbutesController {
  handle(request: Request, response: Response) {
    let { page } = request.params
    let { filter } = request.query

    fs.readFile(path.resolve(__dirname, "..", "assets", "atributos_ncm.json"), "utf8", (err, data) => {
      const dataJson = JSON.parse(data)
      const limit = 10
      const end = limit * Number(page)
      const init = end <= limit? 0 : end - limit
    
      let dataFiltered = dataJson.listaNcm.map((item: IAttributes) => {
        if(item.listaAtributos.length > 0) {
          return item
        } else {
          return
        }
      }).filter(value => value != null).slice(init, end)

      if(filter) {
        dataFiltered = dataJson.listaNcm.filter((value) => value.codigoNcm == filter).slice(init, end)
      }
    
      return response.json(dataFiltered)
    })
  }
}