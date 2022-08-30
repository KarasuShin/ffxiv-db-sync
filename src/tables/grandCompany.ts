import type { DataSource } from 'typeorm'
import { GrandCompanyEntity } from 'ffxiv-entity'
import { fetchData } from '../util'
import BasicSync from '../BasicSync'

class GrandCompanySync extends BasicSync<GrandCompanyEntity> {
  constructor(db: DataSource) {
    super()
    this.db = db
    this.repository = db.getRepository(GrandCompanyEntity)
  }

  public async init() {
    try {
      this.dataSource = await fetchData('GrandCompany.csv')
      await this.repository.save(this.dataSource.slice(3).map(row => {
        const grandCompany = new GrandCompanyEntity()
        grandCompany.id = parseInt(row[0])
        grandCompany.nameHans = row[1]
        return grandCompany
      }))
      console.log('GrandCompany init success')
    } catch (error) {
      console.error('GrandCompany init fail')
      throw (error)
    }
  }
}

export default GrandCompanySync
