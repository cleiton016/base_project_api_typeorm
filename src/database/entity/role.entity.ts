import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import { EntityBase } from './entity-base'
import { PermissionEntity } from './permission.entity'

@Entity('roles')
export class RoleEntity extends EntityBase {
  @Column({ name: 'name', nullable: false, unique: true })
  name!: string

  @Column({ name: 'description', nullable: false })
  description!: string

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permissions!: PermissionEntity[]
}
