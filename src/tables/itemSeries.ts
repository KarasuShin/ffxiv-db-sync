import type { DataSource } from 'typeorm'
import { ItemSeriesEntity } from 'ffxiv-entity'
import { fetchData } from '../util'
import BasicSync from '../BasicSync'

class ItemSeriesSync extends BasicSync<ItemSeriesEntity> {
  constructor(db: DataSource) {
    super()
    this.db = db
    this.repository = this.db.getRepository(ItemSeriesEntity)
  }

  public async init() {
    try {
      this.dataSource = await fetchData('ItemSeries.csv')
      await this.repository.save(this.dataSource.slice(4).map(row => {
        const itemSeries = new ItemSeriesEntity()
        itemSeries.id = parseInt(row[0])
        itemSeries.nameHans = row[1]
        return itemSeries
      }))
      console.log('ItemSeries init success')
    } catch (error) {
      console.error('ItemSeries init fail')
      throw (error)
    }
  }
}

export default ItemSeriesSync
