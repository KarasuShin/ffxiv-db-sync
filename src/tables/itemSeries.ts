import type { DataSource } from 'typeorm'
import { ItemSeriesEntity } from 'ffxiv-entity'
import { fetchData } from '../util'

export const syncItemSeries = async (dataSource: DataSource) => {
  try {
    const data = await fetchData('ItemSeries.csv')
    await dataSource.manager.save(data.slice(4).map(item => {
      const ItemSeries = new ItemSeriesEntity()
      ItemSeries.id = parseInt(item[0])
      ItemSeries.nameHans = item[1]
      return ItemSeries
    }))
    console.log('ItemSeries Sync Success')
  } catch (error) {
    console.error(error)
  }
}
