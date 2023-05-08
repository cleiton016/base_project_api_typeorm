import { Column, Entity } from 'typeorm'
import { EntityBase } from './entity-base'

@Entity('permissions')
export class PermissionEntity extends EntityBase {
  @Column({ name: 'name', nullable: false, unique: true })
  name!: string

  @Column({ name: 'description', nullable: false })
  description!: string
}
