import { serve } from "https://deno.land/std@0.156.0/http/server.ts";
import { handleRequest } from "./src/app.js";
import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";


await serve(handleRequest, { port: 9000 });
