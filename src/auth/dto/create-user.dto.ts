import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'email' })
  readonly email: string;

  @ApiProperty({ example: 'password' })
    password: string;

  @ApiProperty({ example: 'organization_id' })
  readonly organization_id: string;
}
