import { PrismaClient } from "@prisma/client";
import { roles } from "../src/seeders/add_roles";
import { users } from "../src/seeders/add_users";

const {
    roles: Roles,
    users: Users
} = new PrismaClient()

async function main() {
    // for(let role of roles) {
    //     await Roles.create({
    //         data: role
    //     })
    // }
}

main()