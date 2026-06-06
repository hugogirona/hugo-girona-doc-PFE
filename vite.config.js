import {defineConfig} from 'vite'
import {resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import handlebars from 'vite-plugin-handlebars'

const root = fileURLToPath(new URL('.', import.meta.url))
const at = (p) => resolve(root, p)

export default defineConfig({
    plugins: [
        tailwindcss(),
        handlebars({partialDirectory: at('partials')}),
    ],
    build: {
        rollupOptions: {
            input: {
                main: at('index.html'),
                'code-html': at('pages/code-html.html'),
                performance: at('pages/performance.html'),
                accessibilite: at('pages/accessibilite.html'),
                serveur: at('pages/serveur.html'),
                'tests-automatises': at('pages/tests-automatises.html'),
                opquast: at('pages/opquast.html'),
                'recherche-utilisateur': at('pages/recherche-utilisateur.html'),
                'tests-utilisateurs': at('pages/tests-utilisateurs.html'),
                javascript: at('pages/javascript.html'),
            },
        },
    },
})
