import type { DataSource } from 'typeorm'
import { GrandCompanyEntity } from 'ffxiv-entity'
import { fetchData } from '../util'

export const syncGrandCompany = async (dataSource: DataSource) => {
  const data = await fetchData('GrandCompany.csv')
  await dataSource.manager.save(data.slice(3).map(item => {
    const GrandCompany = new GrandCompanyEntity()
    GrandCompany.id = parseInt(item[0])
    GrandCompany.nameHans = item[1]
    return GrandCompany
  }))
  console.log('GrandCompany Sync Success')
}
