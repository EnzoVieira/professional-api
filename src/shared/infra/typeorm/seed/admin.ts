import { v4 as uuidV4 } from "uuid"
import { hash } from "bcryptjs"

import createConnection from "../database"

async function create() {
  const connection = await createConnection("localhost")

  const id = uuidV4()
  const password = await hash("admin", 8)

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "isAdmin", "createdAt", "driverLicense") 
        values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'XXXXXX')`
  )

  await connection.close()
}

create().then(() => console.log("User admin created!"))
