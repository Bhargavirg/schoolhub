import { NextResponse } from 'next/server';
import pool from '../../../lib/db';
import path from 'path';
import fs from 'fs';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get('name');
    const address = formData.get('address');
    const city = formData.get('city');
    const state = formData.get('state');
    const contact = formData.get('contact');
    const email_id = formData.get('email_id');
    const imageFile = formData.get('image');

    let imagePath = '';
    if (imageFile && typeof imageFile.arrayBuffer === 'function') {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const filename = Date.now() + path.extname(imageFile.name);
      const dir = path.join(process.cwd(), 'public', 'schoolImages');
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      const filepath = path.join(dir, filename);
      fs.writeFileSync(filepath, buffer);
      imagePath = `/schoolImages/${filename}`;
    }

    const query = 'INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [name, address, city, state, contact, imagePath, email_id];

    const [result] = await pool.execute(query, values);

    return NextResponse.json({ message: 'School added successfully', id: result.insertId });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const query = 'SELECT * FROM schools';
    const [results] = await pool.execute(query);
    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    const query = 'DELETE FROM schools WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    if (result.affectedRows > 0) {
      return NextResponse.json({ message: 'School deleted successfully' });
    } else {
      return NextResponse.json({ error: 'School not found' }, { status: 404 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
