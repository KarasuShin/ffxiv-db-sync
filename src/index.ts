import 'reflect-metadata'
import { DataSource } from 'typeorm'
import entities from 'ffxiv-entity'
import { ClassJobCategorySync, ClassJobSync, GrandCompanySync, ItemRepairResourceSync, ItemSeriesSync, ItemSync } from './tables'

const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: '',
  password: '',
  database: 'ffxiv',
  synchronize: true,
  logging: false,
  entities,
})

AppDataSource.initialize().then(async () => {
  const classJobSync = new ClassJobSync(AppDataSource)
  const classJobCategorySync = new ClassJobCategorySync(AppDataSource)
  const itemSync = new ItemSync(AppDataSource)
  const itemRepairResourceSync = new ItemRepairResourceSync(AppDataSource)
  const itemSeriesSync = new ItemSeriesSync(AppDataSource)
  const grandCompanySync = new GrandCompanySync(AppDataSource)
  await Promise.all([
    classJobCategorySync.init(),
    grandCompanySync.init(),
    itemRepairResourceSync.init(),
    itemSeriesSync.init(),
  ])
  await classJobSync.init()
  await itemSync.init()
  await itemRepairResourceSync.updateItem()
  console.log('FFXIV SYNC SUCCESS!')
  process.exit()
})
