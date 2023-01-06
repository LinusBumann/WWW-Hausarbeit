import { DB } from "https://deno.land/x/sqlite@v3.7.0/mod.ts";

const db = new DB("data/sneakpeakdata.sqlite");

/*db.query(`INSERT INTO modellCards(modellName, modellImageLink, descriptionText, directLinkToShoeCards)
VALUES
('Yeezy V2', 'Bilder/adidas-Yeezy-Boost-350-V2-Beluga-Reflective.png', 'Hier kannst du dich über einige Modelle des "YEEZY Boost 350 V2" informieren', '/nunjucksschuhseite.html');
`);*/

db.query(`INSERT INTO shoeCards(shoeName, shoeImageLink, shoeText)
VALUES
('Yeezy 350 V1 "Turtledove"', 'Bilder/Adidas-Yeezy-Boost-350-Low-Turtledove.png', 'Der Adidas Yeezy ist ein besonderes Schuhmodell, das von US Rapper
Kanye West entworfen und in Kooperation mit Adidas veröffentlicht
wurde. Im Jahr 2015 startete die Zusammenarbeit von Kanye West und
Adidas. Der Yeezy Boost 350 erschien am 27.06.2015 und der Hype brach
aus. Bis heute verkauft sich jedes neue Modell wie von selbst. Bei
einem Release Preis von ca. 190€ und einem Wiederverkaufspreis von ca.
1200€ ist der Hype um den Schuh zu erkennen.');
`);

/*db.query(`INSERT INTO indexCards(brand, imageLink, indexText, directLinkToModellCards)
VALUES
('Adidas', 'Bilder/adidas.png', 'Adidas Sneaker überzeugen mit ihrem optimalen Fußklima und gutem Sitz. Entdecke ausgewählte Schuhklassiker von Adidas und lasse dich von zeitlosem Design überzeugen.', '/nunjucksmarkenseite.html');
`);*/

//db.execute(`DELETE FROM shoeCards;`);

db.close();
