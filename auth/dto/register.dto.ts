import { IsString, IsEmail, IsEnum, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(3, 20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)
  password: string;

  @IsEnum(['admin', 'editor', 'viewer'])
  role: string;
}
