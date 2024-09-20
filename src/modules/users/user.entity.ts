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

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:null})
  firstName: string;

  @Column({default:null})
  lastName: string;

  @Column()
  email: string;

  @Column({default:null})
  password: string;

  @Column({default:null})
  isSuperAdmin: string;

  @Column({default:null})
  status: string;

  @Column({
    type: 'datetime',
    default:null,
  })
  createdAt: Date;


  public async comparePassword(attempt: string) {

    // console.log("attemptattempt",this.password);
    return await bcrypt.compare(attempt, this.password);
  }

  toResponseObject() {
    const { id, firstName, lastName, email } = this;
    const responseObject: TokenPayload = {
      id,
      firstName,
      lastName,
      email
    };

    return responseObject;
  }

  //Model Hooks
  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  
  // @BeforeUpdate()
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
     
    }
  }
}
