import { ApiProperty } from '@nestjs/swagger';

export class CreateOrganizationDto {
  @ApiProperty({ example: 'organization_name' })
  readonly name: string;

  @ApiProperty({ example: '123' })
  readonly location_id: number;

  @ApiProperty({ example: '30.11.2021' })
  readonly created_at?: Date;

  @ApiProperty({ example: 'Alex' })
  readonly created_by?: string;

  @ApiProperty({ example: '30.11.2021' })
  readonly updated_at?: Date;

  @ApiProperty({ example: 'Alex' })
  readonly updated_by?: string;

  @ApiProperty({ example: 'Alex' })
  readonly changed_by?: string;
}
