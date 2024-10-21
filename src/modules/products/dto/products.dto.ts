import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty,PartialType } from '@nestjs/swagger';
import { extname } from "path";
import exp from "constants";

export class addProductDto  {
  

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  total_weight: string;
  
  @IsNotEmpty()
  @ApiProperty()
  unit: string;

  @IsNotEmpty()
  @ApiProperty()
  productCode: string;

  @ApiProperty()
  rateCode: string;

  @ApiProperty()
  quantity_ctn: string;

  @ApiProperty()
  quantity_pcs: string;

  @ApiProperty()
  price: string;
  
  }



export class UpdateProductDto {

  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  total_weight: string;
  
  @IsNotEmpty()
  @ApiProperty()
  unit: string;

  @IsNotEmpty()
  @ApiProperty()
  productCode: string;

  @ApiProperty()
  rateCode: string;
  
  @ApiProperty()
  quantity_ctn: string;

  @ApiProperty()
  quantity_pcs: string;

  @ApiProperty()
  price: string;
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