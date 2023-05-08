import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { EntityBase } from './entity-base'
import { RoleEntity } from './role.entity'

@Entity('contas')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt!: Date

  @Column({ name: 'ativo', type: 'boolean', nullable: false, default: true })
  enable!: boolean

  @Column({ name: 'last_updated_by_user' })
  lastUpdatedByUser!: string

  @Column({ name: 'nome', nullable: false })
  name!: string

  @Column({ name: 'email', unique: true, nullable: false })
  email!: string

  @Column({ name: 'senha', nullable: false })
  password!: string

  // @ManyToMany(() => RoleEntity)
  // @JoinTable()
  // roles!: RoleEntity[]
  @Column({name: 'roles'})
  roles!: string

  @Column({ type: 'timestamptz', name: 'data_expiracao_codigo', nullable: false })
  expireCodeAt!: Date

  @Column({ type: 'varchar', name: 'codigo_recuperacao', nullable: false })
  forgetCode!: string
}
