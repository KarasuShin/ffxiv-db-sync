import type { DataSource } from 'typeorm'
import { ClassJobCategoryEntity } from 'ffxiv-entity'
import { fetchData } from '../util'
import BasicSync from '../BasicSync'

class ClassJobCategorySync extends BasicSync<ClassJobCategoryEntity> {
  constructor(dataSource: DataSource) {
    super()
    this.db = dataSource
    this.repository = dataSource.getRepository(ClassJobCategoryEntity)
  }

  public async init() {
    try {
      this.dataSource = await fetchData('ClassJobCategory.csv')
      await this.repository.save(this.dataSource.slice(3).map(row => {
        const classJobCategory = new ClassJobCategoryEntity()
        classJobCategory.id = parseInt(row[0])
        classJobCategory.nameHans = row[1]
        classJobCategory.ADV = row[2] === 'TRUE'
        classJobCategory.GLA = row[3] === 'TRUE'
        classJobCategory.PGL = row[4] === 'TRUE'
        classJobCategory.MRD = row[5] === 'TRUE'
        classJobCategory.LNC = row[6] === 'TRUE'
        classJobCategory.ARC = row[7] === 'TRUE'
        classJobCategory.CNJ = row[8] === 'TRUE'
        classJobCategory.THM = row[9] === 'TRUE'
        classJobCategory.CRP = row[10] === 'TRUE'
        classJobCategory.BSM = row[11] === 'TRUE'
        classJobCategory.ARM = row[12] === 'TRUE'
        classJobCategory.GSM = row[13] === 'TRUE'
        classJobCategory.LTW = row[14] === 'TRUE'
        classJobCategory.WVR = row[15] === 'TRUE'
        classJobCategory.ALC = row[16] === 'TRUE'
        classJobCategory.CUL = row[17] === 'TRUE'
        classJobCategory.MIN = row[18] === 'TRUE'
        classJobCategory.BTN = row[19] === 'TRUE'
        classJobCategory.FSH = row[20] === 'TRUE'
        classJobCategory.PLD = row[21] === 'TRUE'
        classJobCategory.MNK = row[22] === 'TRUE'
        classJobCategory.WAR = row[23] === 'TRUE'
        classJobCategory.DRG = row[24] === 'TRUE'
        classJobCategory.BRD = row[25] === 'TRUE'
        classJobCategory.WHM = row[26] === 'TRUE'
        classJobCategory.BLM = row[27] === 'TRUE'
        classJobCategory.ACN = row[28] === 'TRUE'
        classJobCategory.SMN = row[29] === 'TRUE'
        classJobCategory.SCH = row[30] === 'TRUE'
        classJobCategory.ROG = row[31] === 'TRUE'
        classJobCategory.NIN = row[32] === 'TRUE'
        classJobCategory.MCH = row[33] === 'TRUE'
        classJobCategory.DRK = row[34] === 'TRUE'
        classJobCategory.AST = row[35] === 'TRUE'
        classJobCategory.SAM = row[36] === 'TRUE'
        classJobCategory.RDM = row[37] === 'TRUE'
        classJobCategory.BLU = row[38] === 'TRUE'
        classJobCategory.GNB = row[39] === 'TRUE'
        classJobCategory.DNC = row[40] === 'TRUE'
        classJobCategory.RPR = row[41] === 'TRUE'
        classJobCategory.SGE = row[42] === 'TRUE'
        return classJobCategory
      }))
      console.log('ClassJobCategory init success')
    } catch (error) {
      console.error('ClassJobCategory init fail')
      throw (error)
    }
  }
}

export default ClassJobCategorySync
