import FolloThruMailer from "./FolloThruMailer";
import configDatabase from "./configs/configDatabase";

configDatabase().then(() => {
  const mailer = new FolloThruMailer();
  mailer.start();
});

