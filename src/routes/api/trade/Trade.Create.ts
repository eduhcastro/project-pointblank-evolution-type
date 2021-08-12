import { Request, Response } from "express";
import NodeJsonCore from "../../../core/NodeJson.core"
import Utils from "../../../core/Utils.core"

const tools = {

  searchCategory: (data: Array<any>): boolean => {
    const categorysList = ['0', '1', '2', '3']
    if (Array.isArray(data)) {
      for (var Category of data) {
        if (categorysList.indexOf(Category) === -1) {
          return false
        }
      }
      return true
    }
    return false
  },

  searchBolean: (status: any): boolean => {
    if (['true', 'false'].indexOf(status) === -1) {
      return false
    }
    return true
  }

}

const cleanParams = (params: any): any => {

  if (typeof params.title === 'undefined' || typeof params.categorys === 'undefined' || typeof params.description === 'undefined' || typeof params.thumbnail === 'undefined' || typeof params.background === 'undefined' || typeof params.public === 'undefined') {
    return { status: false, message: "Missing parameters" }
  }

  if (params.title.length < 1 || params.title.length > 50) {
    return { status: false, message: "Title invalid" }
  }

  if (params.description.length < 1 || params.description.length > 50) {
    return { status: false, message: "Description invalid" }
  }

  if (params.categorys.length < 1 || params.categorys.length > 4 || !tools.searchCategory(params.categorys)) {
    return { status: false, message: "Category invalid" }
  }

  if (params.thumbnail.length < 1 || isNaN(params.thumbnail) || Number(params.thumbnail) > 5) {
    return { status: false, message: "Thumbnail invalid" }
  }

  if (params.background.length < 1 || isNaN(params.background)) {
    return { status: false, message: "Background invalid" }
  }

  if (!tools.searchCategory(params.categorys)) {
    return { status: false, message: "Type trade invalid" }
  }

  return { status: true }
}


export default async function (req: Request, res: Response) {

  const { title, categorys, description, thumbnail, background, publics } = req.body



  if (!cleanParams(req.body).status) {
    return res.status(400).send({
      status: false,
      message: cleanParams(req.body).message
    })
  }

  const CheckTradeUserArray = NodeJsonCore.getData({ data: "Sessions" }).Sessions
  const FindTradeUser = CheckTradeUserArray.filter((x: any) => x.owner === req.session.autorizacao)

  if (typeof FindTradeUser[0] !== 'undefined') {
    res.json({
      status: false,
      errorcode: 401
    })
    return res.end()
  }

  const SessionKey = Utils.generateKey(64)

  NodeJsonCore.setData("Sessions", {
    id: Math.floor(Math.random() * (999 - 0 + 1)) + 0,
    name: title,
    sessionkey: SessionKey,
    public: publics,
    owner: req.session.user.login,
    ownerid: Number(req.session.user.id),
    participant: null,
    online: 0,
    reconnect: false,
    ownerdone: false,
    participantdone: false,
    personalization: {
      categorys,
      background,
      description,
      thumbnail
    }
  })

  res.json({
    status: true,
    sessionkey: SessionKey
  })

  return res.end()
}