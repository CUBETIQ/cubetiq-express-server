import express, { Application as ExpressApp, Handler } from "express"
import MetadataKeys from "./constants/metadata.keys"
import { RouteHandler } from "./decorators/handlers.decorator"

export abstract class Application {
    private readonly _instance: ExpressApp

    get instance(): ExpressApp {
        return this._instance
    }

    constructor() {
        this._instance = express()
        this._instance.use(express.json())
        this._instance.use(express.urlencoded({ extended: false }))
        this.registerRoutes()
    }

    private registerRoutes(): void {
        const info: Array<{ api: string; handler: string }> = []

        this.controllers.forEach((controller) => {
            const controllerInstance: { [handlerName: string]: Handler } =
                new controller() as any
            const basePath: string = Reflect.getMetadata(
                MetadataKeys.BASE_PATH,
                controller
            )
            const routers: RouteHandler[] = Reflect.getMetadata(
                MetadataKeys.ROUTERS,
                controller
            )
            const exRouter = express.Router()

            routers.forEach(({ method, path, handlerName }) => {
                exRouter[method](
                    path,
                    controllerInstance[String(handlerName)]
                ).bind(controllerInstance)
                info.push({
                    api: `${method.toLocaleUpperCase()} ${basePath + path}`,
                    handler: `${controller.name}.${String(handlerName)}`,
                })
            })

            this._instance.use(basePath, exRouter)
        })

        console.table(info)
    }

    abstract get controllers(): Array<any>
}
