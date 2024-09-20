import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { extname } from "path";

export class SignupDto {
    
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  password: string;
  
  }


  export class UserUpdateDto {
    

  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @ApiProperty()
  lastName: string;
  
  @ApiProperty()
  password: string;

  
  }
  
  export class CreateStaffDto  {
    
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    firstName: string;
  
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;
  
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    role: string;

    @IsNotEmpty()
    @ApiProperty()
    department: number;

    @IsNotEmpty()
    @ApiProperty()
    designation: number;

    @IsNotEmpty()
    @ApiProperty()
    status: number;

    @IsNotEmpty()
    @ApiProperty()
    hourly_rate: number;

    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
  
  }

export class LoginDto {
    @IsNotEmpty()
    @ApiProperty()
    email: string;
  
    @IsNotEmpty()
    @ApiProperty()
    password: string;
 }


  export class UpdateStaffDto extends PartialType(CreateStaffDto){
    
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    firstName: string;
  
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;
  
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    role: string;

    @IsNotEmpty()
    @ApiProperty()
    department: number;

    @IsNotEmpty()
    @ApiProperty()
    designation: number;

    @IsNotEmpty()
    @ApiProperty()
    status: number;

    @IsNotEmpty()
    @ApiProperty()
    hourly_rate: number;

    @ApiProperty()
    created_at: Date;

    @ApiProperty()
    updated_at: Date;
  }

  export class CreateStaffDepartmentDto  {
    
    @IsNotEmpty()
    @ApiProperty()
    name: string;
  
  }

  export class UpdateStaffDepartmentDto extends PartialType(CreateStaffDepartmentDto){
    
    @IsNotEmpty()
    @ApiProperty()
    name: string;
  }


  export class CreateStaffDesignationDto  {
    
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    department_id: number;
  
  }

  export class UpdateStaffDesignationDto extends PartialType(CreateStaffDesignationDto){
    
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @ApiProperty()
    department_id: number;
  }
  
  ///////////area ///////////////////////////////////////

export class CreateAreaDto {
  @ApiProperty()
  area: string;

  @ApiProperty()
  country_id: number;

  @ApiProperty()
  city_id: number;
}


export class UpdateAreaDto {
  @ApiProperty()
  area: string;

  @ApiProperty()
  country_id: number;

  @ApiProperty()
  city_id: number;
}


///////////country ///////////////////////////////////////

export class CreateCountryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  country_code: string;
}


export class UpdateCountryDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  country_code: string;
}

///////////city ///////////////////////////////////////

export class CreateCityDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  country_id: number;
}


export class UpdateCityDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  city_id: number;
}

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  return callback(new Error('Only image files are allowed!'), false);
}
callback(null, true);
};  