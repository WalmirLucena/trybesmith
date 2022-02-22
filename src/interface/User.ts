export interface IUser {
  username: 'string',
  classe: 'string',
  level: 1,
  password: 'string'
}

export interface User extends IUser {
  id: number
}
