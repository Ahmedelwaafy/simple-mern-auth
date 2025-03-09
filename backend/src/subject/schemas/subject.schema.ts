import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type SubjectDocument = HydratedDocument<Subject>;

@Schema({ timestamps: true })
export class Subject {
  @Prop({
    required: true,
    type: String,
    min: [3, 'Subject name must be at least 3 characters long.'],
    max: [30, 'Subject name must be at most 30 characters long.'],
  })
  name: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: string; 
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
