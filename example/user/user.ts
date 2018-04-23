import { Column, PrimaryColumn, Entity } from "typeorm"

@Entity({
    name: 'users'
})
export class User {

    @PrimaryColumn()
    id: string
    
    @Column()
    firstname: string

    @Column()
    lastname: string

}
