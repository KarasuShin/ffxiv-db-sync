import type { DataSource } from 'typeorm'
import { ClassJobCategoryEntity, ClassJobEntity, GrandCompanyEntity, ItemEntity, ItemRepairResourceEntity, ItemSeriesEntity } from 'ffxiv-entity'
import { fetchData } from '../util'
import BasicSync from '../BasicSync'

class ItemSync extends BasicSync<ItemEntity> {
  constructor(db: DataSource) {
    super()
    this.db = db
    this.repository = db.getRepository(ItemEntity)
  }

  public async init() {
    try {
      this.dataSource = await fetchData('Item.csv')
      let classJobCategoryList: ClassJobCategoryEntity[] = []
      let classJobList: ClassJobEntity[] = []
      let grandCompanyList: GrandCompanyEntity[] = []
      let itemRepairResourceList: ItemRepairResourceEntity[] = []
      let itemSeriesList: ItemSeriesEntity[] = []
      await Promise.all([
        (async () => {
          classJobCategoryList = await this.db.manager.find(ClassJobCategoryEntity)
        })(),
        (async () => {
          classJobList = await this.db.manager.find(ClassJobEntity)
        })(),
        (async () => {
          grandCompanyList = await this.db.manager.find(GrandCompanyEntity)
        })(),
        (async () => {
          itemRepairResourceList = await this.db.manager.find(ItemRepairResourceEntity)
        })(),
        (async () => {
          itemSeriesList = await this.db.manager.find(ItemSeriesEntity)
        })(),
      ])
      await Promise.all(this.dataSource.slice(4).map(row => (async () => {
        const item = new ItemEntity()
        item.id = parseInt(row[0])
        item.aetherialReduce = parseInt(row[40])
        item.canBeHQ = row[28] === 'TRUE'
        item.castTime = parseInt(row[32])
        item.cooldown = parseInt(row[33])
        item.description = row[9]
        item.equipRestriction = parseInt(row[43])
        item.iconId = row[11]
        item.isAdvancedMeldingPermitted = row[88] === 'TRUE'
        item.isAlwaysCollectable = row[39] === 'TRUE'
        item.isCollectable = row[38] === 'TRUE'
        item.isDyeable = row[29] === 'TRUE'
        item.isIndisposable = row[24] === 'TRUE'
        item.IsGlamourous = row[91] === 'TRUE'
        item.isLot = row[25] === 'TRUE'
        item.isPvP = row[89] === 'TRUE'
        item.isUnique = row[22] === 'TRUE'
        item.isUntradable = row[23] === 'TRUE'
        item.levelItem = parseInt(row[12])
        item.levelEquip = parseInt(row[41])
        item.nameHans = row[10]
        item.priceLow = parseInt(row[27])
        item.priceMid = parseInt(row[26])
        item.rarity = parseInt(row[13])
        item.stackSize = parseInt(row[21])
        const itemSeriesId = parseInt(row[46])
        if (itemSeriesId > 0) {
          item.itemSeries = itemSeriesList.find(i => i.id === itemSeriesId)!
        }
        const classJobCategoryId = parseInt(row[44])
        if (classJobCategoryId > 0) {
          item.classJobCategory = classJobCategoryList.find(i => i.id === classJobCategoryId)!
        }
        item.classJobUse = classJobList.find(i => i.id === parseInt(row[50]))!
        item.grandCompany = grandCompanyList.find(i => i.id === parseInt(row[45]))!
        item.damagePhys = parseInt(row[52])
        item.damageMag = parseInt(row[53])
        item.defenseMag = parseInt(row[59])
        item.defensePhys = parseInt(row[58])
        item.delay = parseInt(row[54])
        const itemRepairResourceId = parseInt(row[35])
        if (itemRepairResourceId > 0) {
          item.itemRepairResource = itemRepairResourceList.find(i => i.id === itemRepairResourceId)!
        }
        await this.repository.save(item)
      })()))
      console.log('Item init success')
    } catch (error) {
      console.error('Item init fail')
      throw (error)
    }
  }
}

export default ItemSync
