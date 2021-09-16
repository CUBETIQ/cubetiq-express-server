import MetadataKeys from "../constants/metadata.keys"

export const Controller = (basePath: string): ClassDecorator => {
    return (target: any) => {
        Reflect.defineMetadata(MetadataKeys.BASE_PATH, basePath, target)
    }
}
