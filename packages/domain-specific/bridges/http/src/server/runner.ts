import swagger from "@elysiajs/swagger";
import app from "./definition";

app.use(swagger()).listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});