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

@Entity("shops")
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:null})
  name: string;

  @Column({default:null})
  ntn: string;

  @Column({default:null})
  strn: string;

  @Column({default:null})
  contactPerson: string;

  @Column({default:null})
  channel: string;

  @Column({default:null})
  cell: string;

  @Column({default:null})
  credit: string;

  @Column({
    default:null,
  })
  createdAt: Date;


}
