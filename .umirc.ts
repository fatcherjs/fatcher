import { defineConfig } from 'dumi';

export default defineConfig({
    title: 'Fatcher',
    mode: 'site',
    outputPath: 'docs-dist',
    hash: true,
    dynamicImport: {},
    navs: {
        'en-US': [
            null,
            {
                title: 'GitHub',
                path: 'https://github.com/fanhaoyuan/fatcher',
            },
        ],
        'zh-CN': [
            null,
            {
                title: 'GitHub',
                path: 'https://github.com/fanhaoyuan/fatcher',
            },
        ],
    },
});