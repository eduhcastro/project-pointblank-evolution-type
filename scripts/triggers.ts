import { CreateTriggers, ConfigTriggerDB } from "pgsqltriggers-alternative";
import 'dotenv/config'

const Database = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  database: process.env.DB_NAME || "NAME",
  password: process.env.DB_PASSWORD || "PASS"
} as any

(async function () {
  const Create = await CreateTriggers({
    pool: ConfigTriggerDB(Database),
    scripts: [{
      code: "INSERT INTO zevolution_users (login) VALUES (NEW.login)",
      action: "INSERT",
      targetTable: "accounts"
    },
    {
      code: "DELETE FROM zevolution_users WHERE login = OLD.login",
      action: "DELETE",
      targetTable: "accounts"
    }],
    scriptsOpts: {
      extensive: false
    },
    restrict: false
  })

  console.log(Create)
})();

