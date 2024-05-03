import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/config/mysql";

export async function GET() {
    try {
        const db = await pool.getConnection()
        const query = 'select * from tb_user'
        const [rows] = await db.query(query)
        db.release()
        console.log('response', rows)
        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const db = await pool.getConnection()
        const query = 'INSERT INTO tb_user SET ?';
        const data = await request.json();
        const [rows] = await db.query(query, data)
        db.release()
        const res = {
            data: data,
            message: 'User created successfully'
        }
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}