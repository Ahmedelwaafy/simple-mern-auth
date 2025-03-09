import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subject, SubjectDocument } from './schemas/subject.schema';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name)
    private readonly subjectModel: Model<Subject>,
  ) {}

  async create(userId: string, createSubjectDto: CreateSubjectDto) {
    const newSubject = new this.subjectModel({
      ...createSubjectDto,
      user: userId,
    });

    return await newSubject.save();
  }

  async findUserSubjects(userId: string) {
    return await this.subjectModel.find({ user: userId }).select('-__v');
  }
}
