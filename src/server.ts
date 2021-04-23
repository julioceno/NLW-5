import { http } from "./http";
import "./websockets/client";
import "./websockets/admin";

http.listen(3333, () => console.log('Server is running on port 3333'));

