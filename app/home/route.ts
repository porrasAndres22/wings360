import { promises as fs } from 'fs';

export const GET = async () => {
    
    const homeHtml: string = await fs.readFile(`${process.cwd()}/asset/home.html`, 'utf8')

    return new Response(homeHtml, {
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
        },
    });
}