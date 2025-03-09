import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthenticationGuard } from 'src/auth/gaurds/authentication/authentication.guard';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user.interface';

@Controller('v1/subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Add new favorite subject' })
  @ApiResponse({ status: 201, description: 'Subject added successfully' })
  @UseGuards(AuthenticationGuard)
  @ResponseMessage('Subject added successfully')
  create(
    @ActiveUser('id') userId: ActiveUserData['id'],
    @Body() createSubjectDto: CreateSubjectDto,
  ) {
    return this.subjectService.create(userId, createSubjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve user favorite subjects' })
  @ApiResponse({ status: 200, description: 'Subjects retrieved successfully' })
  @UseGuards(AuthenticationGuard)
  findUserSubjects(@ActiveUser('id') userId: ActiveUserData['id']) {
    return this.subjectService.findUserSubjects(userId);
  }
}
