export namespace Account {
    export type Account = {
        id?: string
        name?: string
        email?: string
        enable?: boolean
        permissions?: string[]
        roles?: any[]
        createdAt?: Date
        updatedAt?: Date
      }
    
      export type Body = {
        name?: string
        email?: string
        enable?: boolean
        password?: string
        role?: string
        permissions?: string[]
        last_updated_by_user?: string
      }
    
      export type Criteria = {
        id: string
        email: string
      }
}