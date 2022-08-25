import 'reflect-metadata'
import { DataSource } from 'typeorm'
import entities from 'ffxiv-entity'
import { syncItemSeries } from './tables/itemSeries'
import { syncGrandCompany } from './tables/grandCompany'
import { syncClassJobCategory } from './tables/classJobCategory'
import { syncClassJob } from './tables/classJob'

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
  await Promise.all([
    syncItemSeries(AppDataSource),
    syncGrandCompany(AppDataSource),
    syncClassJobCategory(AppDataSource),
    syncClassJob(AppDataSource),
  ])
  console.log('FFXIV SYNC SUCCESS!')
})
