import { PrismaClient } from "@prisma/client";
import { roles } from "../src/seeders/add_roles";
import { skills } from "../src/seeders/add_skills";

const {
    roles: Roles,
    skills:Skills
} = new PrismaClient()

async function main() {
    // for(let role of roles) {
    //     await Roles.create({
    //         data: role
    //     })
    // }

    await Skills.createMany({
        data: skills
    })
}

main()