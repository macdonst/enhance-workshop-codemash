import { readFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));

export const set =  {
  http() {
    const redirects = readFileSync(path.join(__dirname, 'redirects.json'), 'utf8')
    const redirectHandler = path.join(__dirname, 'routes', 'redirects')
    const redirectRoutes = Object.keys(JSON.parse(redirects)).map(route => (
      {
        method: 'get',
        path: route,
        src: redirectHandler,
        config: {
          // shared: false,
          views: true,
        }
      }
    )
    )

    return [
      ...redirectRoutes,
    ]
  }

}
