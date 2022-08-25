import type { DataSource } from 'typeorm'
import { ClassJobCategoryEntity } from 'ffxiv-entity'
import { fetchData } from '../util'

export const syncClassJobCategory = async (dataSource: DataSource) => {
  const data = await fetchData('ClassJobCategory.csv')
  await dataSource.manager.save(data.slice(3).map(item => {
    const ClassJobCategory = new ClassJobCategoryEntity()
    ClassJobCategory.id = parseInt(item[0])
    ClassJobCategory.nameHans = item[1]
    ClassJobCategory.ADV = item[2] === 'TRUE'
    ClassJobCategory.GLA = item[3] === 'TRUE'
    ClassJobCategory.PGL = item[4] === 'TRUE'
    ClassJobCategory.MRD = item[5] === 'TRUE'
    ClassJobCategory.LNC = item[6] === 'TRUE'
    ClassJobCategory.ARC = item[7] === 'TRUE'
    ClassJobCategory.CNJ = item[8] === 'TRUE'
    ClassJobCategory.THM = item[9] === 'TRUE'
    ClassJobCategory.CRP = item[10] === 'TRUE'
    ClassJobCategory.BSM = item[11] === 'TRUE'
    ClassJobCategory.ARM = item[12] === 'TRUE'
    ClassJobCategory.GSM = item[13] === 'TRUE'
    ClassJobCategory.LTW = item[14] === 'TRUE'
    ClassJobCategory.WVR = item[15] === 'TRUE'
    ClassJobCategory.ALC = item[16] === 'TRUE'
    ClassJobCategory.CUL = item[17] === 'TRUE'
    ClassJobCategory.MIN = item[18] === 'TRUE'
    ClassJobCategory.BTN = item[19] === 'TRUE'
    ClassJobCategory.FSH = item[20] === 'TRUE'
    ClassJobCategory.PLD = item[21] === 'TRUE'
    ClassJobCategory.MNK = item[22] === 'TRUE'
    ClassJobCategory.WAR = item[23] === 'TRUE'
    ClassJobCategory.DRG = item[24] === 'TRUE'
    ClassJobCategory.BRD = item[25] === 'TRUE'
    ClassJobCategory.WHM = item[26] === 'TRUE'
    ClassJobCategory.BLM = item[27] === 'TRUE'
    ClassJobCategory.ACN = item[28] === 'TRUE'
    ClassJobCategory.SMN = item[29] === 'TRUE'
    ClassJobCategory.SCH = item[30] === 'TRUE'
    ClassJobCategory.ROG = item[31] === 'TRUE'
    ClassJobCategory.NIN = item[32] === 'TRUE'
    ClassJobCategory.MCH = item[33] === 'TRUE'
    ClassJobCategory.DRK = item[34] === 'TRUE'
    ClassJobCategory.AST = item[35] === 'TRUE'
    ClassJobCategory.SAM = item[36] === 'TRUE'
    ClassJobCategory.RDM = item[37] === 'TRUE'
    ClassJobCategory.BLU = item[38] === 'TRUE'
    ClassJobCategory.GNB = item[39] === 'TRUE'
    ClassJobCategory.DNC = item[40] === 'TRUE'
    ClassJobCategory.RPR = item[41] === 'TRUE'
    ClassJobCategory.SGE = item[42] === 'TRUE'
    return ClassJobCategory
  }))
  console.log('ClassJobCategory Sync Success')
}
