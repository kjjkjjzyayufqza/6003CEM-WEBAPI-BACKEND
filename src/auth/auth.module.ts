import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UsersModule } from '../users/users.module'
import { JwtModule } from '@nestjs/jwt'
import { AuthController } from './auth.controller'
import { APP_GUARD } from '@nestjs/core'
import { StaffUserModule } from 'src/staff-user/staff-user.module'

@Module({
  imports: [UsersModule,StaffUserModule],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
