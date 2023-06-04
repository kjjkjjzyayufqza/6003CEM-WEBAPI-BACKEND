import { Module } from '@nestjs/common'
import { StaffUserService } from './staff-user.service'
import { StaffUserController } from './staff-user.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { StaffUser, StaffUserSchema } from './staff-user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StaffUser.name, schema: StaffUserSchema },
    ]),
  ],
  controllers: [StaffUserController],
  providers: [StaffUserService],
  exports: [StaffUserService],
})
export class StaffUserModule {}
