import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSubjectDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 30)
  name: string;
}
