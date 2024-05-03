import { NextRequest, NextResponse } from "next/server";
import pool from "@/app/config/mysql";


export async function GET(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // user id

    try {
        const db = await pool.getConnection()
        const query = 'select * from tb_user where id = ?'
        const [rows] = await db.execute(query, [slug])
        db.release()

        return NextResponse.json(rows)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // user id
    try {
        const db = await pool.getConnection()
        const query = 'UPDATE tb_user SET ? WHERE id = ?';
        const data = await request.json();
        const [rows] = await db.query(query, [data, [slug]])
        db.release()
        const res = {
            data: data,
            message: 'User update successfully'
        }
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { slug: string } }
) {
    const slug = params.slug // user id
    try {
        const db = await pool.getConnection()
        const query = 'DELETE FROM tb_user WHERE id = ?';
        const [rows] = await db.query(query, [slug])
        db.release()
        const res = {
            message: 'User delete successfully'
        }
        return NextResponse.json(res)
    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}