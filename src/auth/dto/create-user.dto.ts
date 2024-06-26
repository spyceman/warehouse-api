import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'email' })
  readonly email: string;

  @ApiProperty({ example: 'password' })
    encrypted_password: string;

  @ApiProperty({ example: 123 })
  readonly organization_id: number;
}
