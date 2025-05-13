"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: Number(process.env.PORT),
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});
exports.default = {
    getUserByName(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM users WHERE username = $1";
            const values = [username];
            const result = yield pool.query(query, values);
            return result.rows;
        });
    },
    getUserByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM users WHERE id = $1";
            const values = [id];
            const result = yield pool.query(query, values);
            return result.rows;
        });
    },
    createUser(username, email, user_password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const firstQuery = "INSERT INTO users (username, email) VALUES ($1, $2) RETURNING id";
                const firstValues = [username, email];
                const first_result = yield pool.query(firstQuery, firstValues);
                const id = first_result.rows[0].id;
                const secondQuery = "INSERT INTO user_passwords (user_id, user_password) VALUES ($1, $2)";
                const secondValues = [id, user_password];
                const result = yield pool.query(secondQuery, secondValues);
                return id;
            }
            catch (e) {
                console.error(e);
                throw e;
            }
        });
    },
    deleteUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "DELETE FROM users WHERE username = $1";
                const values = [username];
                const result = yield pool.query(query, values);
                return 200;
            }
            catch (e) {
                console.error(e);
                throw e;
            }
        });
    },
    updateUser() {
        return __awaiter(this, arguments, void 0, function* (id = 900000000, username, column, updateTo) {
            const columns_allowed = ["user_password", "username", "email"];
            if (!columns_allowed.includes(column)) {
                return 207;
            }
            if (column === "user_password") {
                if (id !== 900000000) {
                    const query = "UPDATE user_passwords SET user_password = $1 WHERE user_id = $2";
                    const values = [updateTo, id];
                    const result = yield pool.query(query, values);
                    return result.rows[0];
                }
            }
            else {
                try {
                    const query = "UPDATE users SET ${column} = $1 WHERE username = $2";
                    const values = [updateTo, username];
                    const result = yield pool.query(query, values);
                    return 200;
                }
                catch (e) {
                    console.error(e);
                    throw e;
                }
            }
        });
    },
    getUserID(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT id FROM users WHERE username = $1";
                const values = [username];
                const result = yield pool.query(query, values);
                return result.rows[0].id;
            }
            catch (e) {
                console.error(e);
                throw e;
            }
        });
    },
    UpdateUserPassword(id, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "UPDATE user_passwords SET user_password = $1 WHERE user_id = $2";
                const values = [password, id];
                const result = yield pool.query(query, values);
                return 200;
            }
            catch (e) {
                console.error(e);
                throw (e);
            }
        });
    },
    getEventID(event_name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT id FROM events WHERE event_name = $1";
                const values = [event_name];
                const result = yield pool.query(query, values);
                return result.rows[0].id;
            }
            catch (e) {
                console.error(e);
                throw e;
            }
        });
    },
    getEventData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = "SELECT * FROM event_data WHERE id = $1";
                const values = [id];
                const result = yield pool.query(query, values);
                return result.rows;
            }
            catch (e) {
                console.error(e);
                throw e;
            }
        });
    }
};
