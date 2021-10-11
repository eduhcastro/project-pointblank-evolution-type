import { CreateTriggers, ConfigTriggerDB } from "pgsqltriggers-alternative";
import 'dotenv/config'

const Database = {
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "postgres",
  database: process.env.DB_NAME || "NAME",
  password: process.env.DB_PASSWORD || "PASS"
} as any

(async function () {
  try{
  const Create = await CreateTriggers({
    pool: ConfigTriggerDB(Database),
    scripts: [{
      code: "INSERT INTO zevolution_users (login) VALUES (NEW.login)",
      action: "INSERT",
      targetTable: "accounts",
      functionName: "zevolution_users_insert",
      triggerName: "zevolution_users_insert_trigger"
    },
    {
      code: "DELETE FROM zevolution_users WHERE login = OLD.login",
      action: "DELETE",
      targetTable: "accounts",
      functionName: "zevolution_users_delete",
      triggerName: "zevolution_users_delete_trigger"
    }],
    scriptsOpts: {
      extensive: false
    },
    restrict: false
  })

  console.log(Create)
}catch(e){
  console.log(e)
}
})();

