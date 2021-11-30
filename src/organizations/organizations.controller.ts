import {
  Body,
  Controller,
  Post,
  Delete,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { OrganizationsService } from './organizations.service';

@ApiTags('Organizations CRUD')
@Controller('organizations')
export class OrganizationsController {
  constructor(
    private readonly organizationService: OrganizationsService,
  ) {}

  @ApiOperation({ summary: 'Creating Organization' })
  @ApiResponse({ status: 201, type: CreateOrganizationDto })
  @Post()
  createOrganization(@Body() organization: CreateOrganizationDto) {
    return this.organizationService.createOrganization(organization);
  }

  @ApiOperation({ summary: 'Getting organization by id' })
  @ApiResponse({ status: 200 })
  @Get('/:id')
  getOrganizationById(@Param('id') id: string) {
    return this.organizationService.getOrganizationById(id);
  }

  @ApiOperation({ summary: 'Getting all organizations' })
  @ApiResponse({ status: 200 })
  @Get()
  getAllOrganizations() {
    return this.organizationService.getAllOrganizations();
  }

  @ApiOperation({ summary: 'Updating organization by id' })
  @ApiResponse({ status: 200 })
  @Put('/:id')
  updateOrganization(@Param('id') id: string, @Body() organization: CreateOrganizationDto) {
    return this.organizationService.updateOrganization(id, organization);
  }

  @ApiOperation({ summary: 'Deleting organization by id' })
  @ApiResponse({ status: 204 })
  @Delete('/:id')
  deleteOrganization(@Param('id') id: string) {
    return this.organizationService.deleteOrganization(id);
  }
}
