import app from "./src/app.js";
import connectToDb from "./src/config/db.js";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server is listening on PORT ${PORT}`);
});
