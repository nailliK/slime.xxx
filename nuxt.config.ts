import {defineNuxtConfig} from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
        '@/assets/css/components/_fonts.scss',
        '@/assets/css/main.scss'
    ],
    ssr: false,
    loaders: {
        vue: {
            transformAssetUrls: {
                audio: 'src'
            }
        }
    },
    extend(config, ctx) {
        config.module.rules.push({
            test: /\.(ogg|mp3|wav|mpe?g)$/i,
            loader: 'file-loader',
            options: {
                name: '[path][name].[ext]'
            }
        });
    }
});
