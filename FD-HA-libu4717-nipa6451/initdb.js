import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";

const db = new DB("data/sneakpeakdata.sqlite");
db.query(`INSERT INTO indexCards(brand, imageLink, indexText, directLinkToModellCards)
VALUES
('Nike', 'Bilder/nike.png', 'Jeder kennt den coolen Schuh mit dem weltberühmten Swoosh. Die Marke Nike gibt es bereits seit 1971 und gilt seit 1989 als weltweit führender Sportartikel-Anbieter.', 'UnterseitenMarken/nike.html');
`);
db.close();
