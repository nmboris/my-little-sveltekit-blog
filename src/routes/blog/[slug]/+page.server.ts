import { error } from '@sveltejs/kit';
import type { BlogpostMetadata } from 'src/types';
import type { PageServerLoad } from './$types';
import matter from "gray-matter";

import fs from 'fs';

export const load: PageServerLoad = async ({ params }) => {
    try {
        const fc = fs.readFileSync(`content/${params.slug}.md`, 'utf8');
        const { content, data } = matter(fc);
        const metadata: BlogpostMetadata = {
            slug: params.slug,
            src: content,
            meta: data
        };

        return metadata;
    } catch (e) {
        return error(404, 'Not found');
    }
};