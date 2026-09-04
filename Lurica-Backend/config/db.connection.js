// db.connection.js
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config()

// Configuración para la base de datos principal
const mainDbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}

// Crear pools de conexiones
const mainPool = mysql.createPool(mainDbConfig)
//const secondPool = mysql.createPool(secondDbConfig)

// Estado de las conexiones
let mainPoolStatus = false
let secondPoolStatus = false

// Función para probar las conexiones
const testConnections = async () => {
    // Probar conexión principal
    try {
        const mainConnection = await mainPool.getConnection()
        console.log('🛢️ | Main database (astraley web database) connected successfully')
        mainConnection.release()
        mainPoolStatus = true
    } catch (error) {
        console.error(`❌ | Error connecting to Main database: ${error.message}`)
        mainPoolStatus = false
    }

    // Probar segunda conexión
/*     try {
        const secondConnection = await secondPool.getConnection()
        console.log('🛢️ | Second database (luckperms minecraft database) connected successfully')
        secondConnection.release()
        secondPoolStatus = true
    } catch (error) {
        console.error(`❌ | Error connecting to Second database: ${error.message}`)
        secondPoolStatus = false
    } */

    // Resumen del estado de las conexiones
    console.log('\n📊 | Database Connection Status:')
    console.log(`  - Main Database: ${mainPoolStatus ? '✅' : '❌'}`)
/*     console.log(`  - Second Database: ${secondPoolStatus ? '✅' : '❌'}\n`) */
}

export { 
    mainPool, 
    //secondPool, 
    testConnections,
    mainPoolStatus,
    //secondPoolStatus
}