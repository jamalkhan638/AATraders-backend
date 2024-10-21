import { BaseEntity } from "../../models/base.entity";
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { TokenPayload } from "../../types/token-payload.type";
import { ApiProperty } from "@nestjs/swagger";

@Entity("products")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:null})
  name: string;

  @Column({default:null})
  total_weight: string;

  @Column({default:null})
  unit: string;

  @Column({default:null})
  productCode: string;

  @Column({default:null})
  rateCode: string;
  @Column({default:null})
  quantity_ctn: string;
  @Column({default:null})
  quantity_pcs: string;

  @Column({default:null})
  price: string;

  @Column({
    default:null,
  })
  createdAt: Date;





}
