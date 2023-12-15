const pool = require("../database/database")
const tukangController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query("select * from tukang")
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("select * from tukang where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        const { jasa_pelayanan, urlgambar, rating, kota, alamat, deskripsi } = req.body;
        const sql = "INSERT INTO tukang (jasa_pelayanan, urlgambar, rating, kota, alamat, deskripsi) VALUES (?, ?, ?, ?, ?, ?)";
    
        const connection = await pool.getConnection();
    
        try {
            await connection.beginTransaction();
    
            const [rows, fields] = await connection.query(sql, [jasa_pelayanan, urlgambar, rating, kota, alamat, deskripsi]);
    
            await connection.commit();
    
            res.json({
                data: rows
            });
        } catch (error) {
            await connection.rollback();
            console.log(error);
            res.json({
                status: "error"
            });
        } finally {
            connection.release();
        }
    },

    
    update: async (req, res) => {
        try {
            const { jasa_pelayanan, urlgambar, rating, kota, alamat, deskripsi } = req.body
            const { id } = req.params
            const sql = "update tukang set jasa_pelayanan = ?, urlgambar = ?, rating = ?, kota = ?, alamat = ?, deskripsi = ? where id = ?"
            const [rows, fields] = await pool.query(sql, [jasa_pelayanan, urlgambar, rating, kota, alamat, deskripsi, id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }, 
    delete: async (req, res) => {
        try {
            const { id } = req.params
            const [rows, fields] = await pool.query("delete from tukang where id = ?", [id])
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }

}

module.exports = tukangController