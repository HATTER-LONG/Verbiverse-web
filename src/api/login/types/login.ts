export interface LoginRequestData {
  /** 账号 */
  username: string
  /** 密码 */
  password: string
}

export type LoginResponseData = ApiResponseData<{ token: string }>

export type UserInfoResponseData = ApiResponseData<{ username: string; roles: string[] }>
