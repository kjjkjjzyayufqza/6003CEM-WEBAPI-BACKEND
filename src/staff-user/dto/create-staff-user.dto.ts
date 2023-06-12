import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'
import { CentreEnum } from 'src/interfaces/interface'
import { UserRole } from 'src/users/users.schema'

export class StaffUserDto {
  @ApiProperty({ required: true })
  name: string

  @ApiProperty({ required: true })
  email: string

  @ApiProperty({ required: true })
  password: string

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

export class CreateStaffUserNoCentreDto {
  @ApiProperty({ required: true })
  name: string

  @ApiProperty({ required: true, default: 'a@a.com' })
  @IsEmail()
  email: string

  @ApiProperty({ required: true })
  password: string

  @ApiProperty({
    required: true,
    default: UserRole.Staff,
    enum: UserRole,
  })
  role: UserRole
}

export class UpdateStaffUserDto extends PartialType(StaffUserDto) {}
