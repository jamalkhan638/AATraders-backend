import { UpdateDateColumn, CreateDateColumn, DeleteDateColumn } from 'typeorm';
export abstract class BaseEntity {

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_at: any;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_at: any;

    @DeleteDateColumn({ type: 'timestamptz' })
    deleted_at?: any;
}