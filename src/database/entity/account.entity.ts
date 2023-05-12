import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { RoleEntity } from './role.entity'
import { EntityBase } from './entity-base'

@Entity('contas')
export class AccountEntity extends EntityBase {
  @Column({ name: 'nome', nullable: false })
  name!: string

  @Column({ name: 'email', unique: true, nullable: false })
  email!: string

  @Column({ name: 'senha', nullable: false })
  password!: string

  @ManyToMany(() => RoleEntity)
  @JoinTable()
  roles!: RoleEntity[]


  @Column({ type: 'timestamptz', name: 'data_expiracao_codigo', nullable: true })
  expireCodeAt!: Date

  @Column({ type: 'varchar', name: 'codigo_recuperacao', nullable: true})
  forgetCode!: string
}
