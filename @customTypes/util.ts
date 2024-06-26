export type JsonValue<T> = string | JsonObjectArray<T>
export type JsonObject<T> = { [key: string]: T }
export type JsonObjectArray<T> = JsonObject<T>[]
export type JsonArray<T> = Array<JsonValue<T>>

export type FullJsonArray = Array<FullJsonValue>
export type FullJsonValue = string | number | boolean | FullJsonObject | FullJsonArray | null
export type FullJsonObject = {
    [key: string]: FullJsonValue
}
