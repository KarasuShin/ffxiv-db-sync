import type { DataSource } from 'typeorm'
import { ClassJobCategoryEntity, ClassJobEntity } from 'ffxiv-entity'
import { fetchData } from '../util'

export const syncClassJob = async (dataSource: DataSource) => {
  const data = await fetchData('ClassJob.csv')
  const ClassJobList = await Promise.all<ClassJobEntity>(data.slice(3).map(item => (async () => {
    const ClassJob = new ClassJobEntity()
    ClassJob.id = parseInt(item[0])
    ClassJob.nameHans = item[1]
    ClassJob.abbreviationEn = item[2]
    ClassJob.abbreviationHans = item[3]
    const classJobCategory = await dataSource.manager.findOneBy(ClassJobCategoryEntity, { id: parseInt(item[4]) })
    if (classJobCategory) {
      ClassJob.classJobCategory = classJobCategory
    }
    ClassJob.modifierHitPoints = parseInt(item[10])
    ClassJob.modifierManaPoints = parseInt(item[11])
    ClassJob.modifierStrength = parseInt(item[12])
    ClassJob.modifierVitality = parseInt(item[13])
    ClassJob.modifierDexterity = parseInt(item[14])
    ClassJob.modifierIntelligence = parseInt(item[15])
    ClassJob.modifierMind = parseInt(item[16])
    ClassJob.modifierPiety = parseInt(item[17])
    ClassJob.classJobParent = parseInt(item[27])
    ClassJob.nameEn = item[28]
    return ClassJob
  })()))
  await dataSource.manager.save(ClassJobList)
  console.log('ClassJob Sync Success')
}
