




import {Sequelize} from "sequelize"
const db= new Sequelize ('ecomarce', 'root', '',{
 host:'127.0.0.1',
 dialect:'mysql'
});

export default db;
