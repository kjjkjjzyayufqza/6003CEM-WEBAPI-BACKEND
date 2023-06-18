import { ApiProperty, PartialType } from '@nestjs/swagger'

export class AuthDto {
  @ApiProperty({ required: true, default: 'a@a.com' })
  email: string

  @ApiProperty({ required: true })
  password: string
}

export class AuthRefreshDto {
  @ApiProperty({ required: true })
  refreshToken: string
}

export class AuthLogoutDto {}

export class TokenDto {
  @ApiProperty({ required: true })
  accessToken: string

  @ApiProperty({ required: true })
  refreshToken: string
}
