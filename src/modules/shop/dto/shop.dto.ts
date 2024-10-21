import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty,PartialType } from '@nestjs/swagger';
import { extname } from "path";
import exp from "constants";

export class addShopDto  {
  

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  ntn: string;
  
  @IsNotEmpty()
  @ApiProperty()
  strn: string;

  @IsNotEmpty()
  @ApiProperty()
  contactPerson: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  cnic: string;

  @ApiProperty()
  cell: string;

  @ApiProperty()
  credit: string;

  
  }



export class updateShopDto {

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  ntn: string;
  
  @IsNotEmpty()
  @ApiProperty()
  strn: string;

  @IsNotEmpty()
  @ApiProperty()
  contactPerson: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  cnic: string;

  @ApiProperty()
  cell: string;

  @ApiProperty()
  credit: string;
} 



export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const curren_data_time = new Date().getTime()
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => curren_data_time+Math.round(Math.random() * 4).toString(5))
    .join('');
  callback(null, `${randomName}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
  return callback(new Error('Only image files are allowed!'), false);
}
callback(null, true);
};  