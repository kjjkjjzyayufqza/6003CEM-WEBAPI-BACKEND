import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'
import { UserRole } from 'src/users/users.schema'

export enum CentreEnum {
  KwunTong = 'KwunTong',
  Central = 'Central',
  CausewayBay = 'CausewayBay',
  MongKok = 'MongKok',
  WanChai = 'WanChai',
  SheungWan = 'SheungWan',
  Admiralty = 'Admiralty',
  NorthPoint = 'NorthPoint',
  QuarryBay = 'QuarryBay',
  YauMaTei = 'YauMaTei',
}

export class StaffUserDto {
  @ApiProperty({ required: true })
  name: string

  @ApiProperty({ required: true })
  email: string

  @ApiProperty({ required: true })
  password: string

  @ApiProperty({ required: true })
  photo: string

  @ApiProperty({
    required: true,
    enum: CentreEnum,
    default: CentreEnum.KwunTong,
  })
  centre: CentreEnum

  @ApiProperty({
    required: true,
    default: UserRole.Staff,
    enum: UserRole,
  })
  role: UserRole

  @ApiProperty({ required: true })
  refreshToken: string
}

export class CreateStaffUserDto {
  @ApiProperty({ required: true })
  name: string

  @ApiProperty({ required: true, default: 'a@a.com' })
  @IsEmail()
  email: string

  @ApiProperty({ required: true })
  password: string

  @ApiProperty({ required: true })
  photo: string

  @ApiProperty({
    required: true,
    enum: CentreEnum,
    default: CentreEnum.KwunTong,
  })
  centre: CentreEnum

  @ApiProperty({
    required: true,
    default: UserRole.Staff,
    enum: UserRole,
  })
  role: UserRole
}

export class UpdateStaffUserDto extends PartialType(StaffUserDto) {}
