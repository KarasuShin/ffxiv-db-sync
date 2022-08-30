import { ItemEntity, ItemRepairResourceEntity } from 'ffxiv-entity'
import { fetchData } from '../util'
import BasicSync from '../BasicSync'
import { In } from 'typeorm'

class ItemRepairResourceSync extends BasicSync<ItemRepairResourceEntity> {
  constructor(db) {
    super()
    this.db = db
    this.repository = db.getRepository(ItemRepairResourceEntity)
  }

  public async init() {
    try {
      this.dataSource = await (await fetchData('ItemRepairResource.csv')).slice(4)
      await this.repository.save(this.dataSource.map(row => {
        const itemRepairResource = new ItemRepairResourceEntity()
        itemRepairResource.id = parseInt(row[0])
        return itemRepairResource
      }))
      console.log('ItemRepairResource init success')
    } catch (error) {
      console.error('ItemRepairResource init fail')
      throw (error)
    }
  }

  public async updateItem() {
    try {
      const itemRepairResourceList = await this.repository.find()
      const itemList = await this.db.manager.findBy(ItemEntity, { id: In(this.dataSource.map(row => parseInt(row[1]))) })
      await this.repository.save(this.dataSource.map(row => {
        const itemRepairResource = itemRepairResourceList.find(i => i.id === parseInt(row[0]))!
        itemRepairResource.item = itemList.find(i => i.id === parseInt(row[1]))!
        return itemRepairResource
      }))
      console.log('ItemRepairResource update col item success')
    } catch (error) {
      console.error('ItemRepairResource update col item fail')
      throw (error)
    }
  }
}

export default ItemRepairResourceSync
