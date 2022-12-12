const mysql = require('mysql')
let connection;

export function initDatabaseManager(): void {
    connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Fareham141",
        database: 'beanandbrewdatabase'
    });

    connect();
}

function connect(): void {
    connection.connect((error) => {
        if(error)
            console.log(error);
        else
            console.log('Successfully connected to the database')
    })
}

export default function runQuery(query: string, objects: Array<string>): void {
    void runQueryWithReturn(query, objects, () => {})
}

export async function runQueryWithReturn(query: string, objects: Array<string>, onComplete) {
    try {
        return connection.query(query, objects, onComplete);
    } catch (error) {
        console.log('Error running query: ' + error);
        console.log('Attempting to reconnect...');
        connect();
        return null;
    }
}

export function readPacketAsCSV(packet): string {
    return Object.values(JSON.parse(JSON.stringify(packet))).toString()
}

export function readPacketAsObject(packet): object {
    return JSON.parse(JSON.stringify(packet))[0]
}

export async function getJSONDataFromPacket(error, result): Promise<string> {
    if(error)
        console.error(error);

    if (error || result.length === 0)
        return JSON.stringify({ success: false });

    return JSON.stringify(readPacketAsObject(result));
}
