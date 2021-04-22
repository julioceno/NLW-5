import { Entity, Column, CreateDateColumn, PrimaryColumn, JoinColumn, ManyToOne} from "typeorm";

import { v4 as uuid } from "uuid";
import { User } from "./Users";

@Entity("messages") 
class Message {
    @PrimaryColumn() 
    id: string;

    @Column()
    admin_id: string;

    @Column()
    text: string;

    @JoinColumn({ name: "user_id" }) // Vai fazer o join do user
    @ManyToOne(() => User) // Muitas mensagens para um usuário
    user: User;

    @Column()
    user_id: string;
  
    @CreateDateColumn()
    created_at: Date;
    
    constructor() {
        if(!this.id) {
            this.id = uuid();
        };
    };

};

export { Message };