# CUBETIQ Express Server
[![Build Status](https://dci.osa.cubetiqs.com/api/badges/CUBETIQ/cubetiq-express-server/status.svg)](https://dci.osa.cubetiqs.com/CUBETIQ/cubetiq-express-server)

-   Express
-   TypeScript
-   Decorators

# Getting Start

-   Add code into your `index.ts`

```ts
import "reflect-metadata"

import { createServer } from "http"
import server from "./server"

const app = server.instance
const httpServer = createServer(app)

httpServer.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port: 3000`)
})
```

-   Create `server.ts`

```ts
import { Request, Response } from "express"
import { Application } from "./application"
import { Controller, Get } from "./decorators"

@Controller("/index")
class IndexController {
    @Get()
    public async index(req: Request, res: Response) {
        res.json({
            status: 200,
        })
    }
}

class Server extends Application {
    get controllers(): any[] {
        return [IndexController]
    }
}

export default new Server()
```

### Contributors

-   Sambo Chea <sombochea@cubetiqs.com>
