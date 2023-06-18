import { Type, applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger'

export const ApiOkResponseCustom = <DataDto extends Type<any>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(CustomOkResponse, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(CustomOkResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  )

export const ApiBadResponseCustom = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(CustomBadResponse, dataDto),
    ApiBadRequestResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(CustomBadResponse) },
          {
            properties: {
              data: {
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  )

export const ApiCreatedResponseCustom = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(CustomCreatedResponse, dataDto),
    ApiCreatedResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(CustomCreatedResponse) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  )

export const ApiUnauthorizedResponseCustom = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(CustomUnauthorizedResponse, dataDto),
    ApiUnauthorizedResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(CustomUnauthorizedResponse) },
          {
            properties: {
              data: {
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  )

export class CustomOkResponse<T> {
  @ApiProperty()
  data: T

  @ApiProperty()
  message: boolean

  @ApiProperty({ default: 200 })
  statusCode: number = 200
}

export class CustomCreatedResponse<T> {
  @ApiProperty()
  data: T

  @ApiProperty()
  message: boolean

  @ApiProperty({ default: 201 })
  statusCode: number
}

export class CustomBadResponse<T> {
  @ApiProperty({ default: {} })
  data: T

  @ApiProperty({ default: false })
  message: boolean

  @ApiProperty({ default: 400 })
  statusCode: number
}

export class CustomUnauthorizedResponse<T> {
  @ApiProperty({ default: {} })
  data: {}

  @ApiProperty({ default: 'Unauthorized' })
  message: string

  @ApiProperty({ default: 401 })
  statusCode: number
}

export enum RoleEnum {
  Admin = 'Admin',
  Staff = 'Staff',
}

export enum GenderEnum {
  Male = 'Male',
  Female = 'Female',
}

export enum VaccineEnum {
  Sinovac = 'Sinovac',
  BioNtech = 'BioNtech',
}

export enum CatBreedEnum {
  Abyssinian = 'Abyssinian',
  AmericanBobtail = 'American Bobtail',
  AmericanCurl = 'American Curl',
  AmericanShorthair = 'American Shorthair',
  AmericanWirehair = 'American Wirehair',
  Balinese = 'Balinese',
  Bengal = 'Bengal',
  Birman = 'Birman',
  Bombay = 'Bombay',
  BritishShorthair = 'British Shorthair',
  Burmese = 'Burmese',
  Burmilla = 'Burmilla',
  Chartreux = 'Chartreux',
  ColorpointShorthair = 'Colorpoint Shorthair',
  CornishRex = 'Cornish Rex',
  Cymric = 'Cymric',
  DevonRex = 'Devon Rex',
  DomesticLonghair = 'Domestic Longhair',
  DomesticMediumHair = 'Domestic Medium Hair',
  DomesticShorthair = 'Domestic Shorthair',
  EgyptianMau = 'Egyptian Mau',
  ExoticShorthair = 'Exotic Shorthair',
  HavanaBrown = 'Havana Brown',
  Himalayan = 'Himalayan',
  JapaneseBobtail = 'Japanese Bobtail',
  Javanese = 'Javanese',
  Korat = 'Korat',
  LaPerm = 'LaPerm',
  MaineCoon = 'Maine Coon',
  Manx = 'Manx',
  NorwegianForestCat = 'Norwegian Forest Cat',
  Ocicat = 'Ocicat',
  Oriental = 'Oriental',
  Persian = 'Persian',
  RagaMuffin = 'RagaMuffin',
  Ragdoll = 'Ragdoll',
  RussianBlue = 'Russian Blue',
  ScottishFold = 'Scottish Fold',
  SelkirkRex = 'Selkirk Rex',
  Siamese = 'Siamese',
  Siberian = 'Siberian',
  Singapura = 'Singapura',
  Somali = 'Somali',
  Sphynx = 'Sphynx',
  Tonkinese = 'Tonkinese',
  TurkishAngora = 'Turkish Angora',
  TurkishVan = 'Turkish Van',
}

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

export enum CentreCodeEnum {
  KwunTong = 'cW1LdC4m',
  Central = 'dE2FfB9p',
  CausewayBay = 'bA7JgH5n',
  MongKok = 'aI3KlE8o',
  WanChai = 'fG5ShJ7q',
  SheungWan = 'gF2HrN1m',
  Admiralty = 'eX9JcD4p',
  NorthPoint = 'hL6KmW3s',
  QuarryBay = 'iV8NfT2r',
  YauMaTei = 'jU1PqB5n',
}
