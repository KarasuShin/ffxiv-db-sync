import type { DataSource, Repository } from 'typeorm'

class BasicSync<T> {
  repository: Repository<T>

  dataSource: string[][]

  db: DataSource
}

export default BasicSync
