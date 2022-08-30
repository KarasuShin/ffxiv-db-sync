import type { DataSource } from 'typeorm'
import { ClassJobCategoryEntity, ClassJobEntity } from 'ffxiv-entity'
import { fetchData } from '../util'
import BasicSync from '../BasicSync'

class ClassJobSync extends BasicSync<ClassJobEntity> {
  constructor(db: DataSource) {
    super()
    this.db = db
    this.repository = db.getRepository(ClassJobEntity)
  }

  async init() {
    try {
      this.dataSource = await fetchData('ClassJob.csv')
      const classJobCategoryList = await this.db.manager.find(ClassJobCategoryEntity)
      await this.repository.save(this.dataSource.slice(3).map(row => {
        const classJob = new ClassJobEntity()
        classJob.id = parseInt(row[0])
        classJob.nameHans = row[1]
        classJob.abbreviationEn = row[2]
        classJob.abbreviationHans = row[3]
        classJob.classJobCategory = classJobCategoryList.find(i => i.id === parseInt(row[4]))!
        classJob.modifierHitPoints = parseInt(row[10])
        classJob.modifierManaPoints = parseInt(row[11])
        classJob.modifierStrength = parseInt(row[12])
        classJob.modifierVitality = parseInt(row[13])
        classJob.modifierDexterity = parseInt(row[14])
        classJob.modifierIntelligence = parseInt(row[15])
        classJob.modifierMind = parseInt(row[16])
        classJob.modifierPiety = parseInt(row[17])
        classJob.classJobParent = parseInt(row[27])
        classJob.nameEn = row[28]
        return classJob
      }))
      console.log('ClassJob init success')
    } catch (error) {
      console.error('ClassJob init fail')
      throw (error)
    }
  }
}

export default ClassJobSync
