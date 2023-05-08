import { BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export abstract class EntityBase extends BaseEntity {
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
}
