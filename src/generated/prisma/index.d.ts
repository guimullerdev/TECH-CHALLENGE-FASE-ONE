
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model Vehicle
 * 
 */
export type Vehicle = $Result.DefaultSelection<Prisma.$VehiclePayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model Part
 * 
 */
export type Part = $Result.DefaultSelection<Prisma.$PartPayload>
/**
 * Model ServiceOrder
 * 
 */
export type ServiceOrder = $Result.DefaultSelection<Prisma.$ServiceOrderPayload>
/**
 * Model OrderService
 * 
 */
export type OrderService = $Result.DefaultSelection<Prisma.$OrderServicePayload>
/**
 * Model OrderPart
 * 
 */
export type OrderPart = $Result.DefaultSelection<Prisma.$OrderPartPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const OrderStatus: {
  RECEIVED: 'RECEIVED',
  DIAGNOSING: 'DIAGNOSING',
  WAITING_APPROVAL: 'WAITING_APPROVAL',
  IN_PROGRESS: 'IN_PROGRESS',
  FINISHED: 'FINISHED',
  DELIVERED: 'DELIVERED'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]

}

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Customers
 * const customers = await prisma.customer.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Customers
   * const customers = await prisma.customer.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vehicle`: Exposes CRUD operations for the **Vehicle** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vehicles
    * const vehicles = await prisma.vehicle.findMany()
    * ```
    */
  get vehicle(): Prisma.VehicleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.part`: Exposes CRUD operations for the **Part** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Parts
    * const parts = await prisma.part.findMany()
    * ```
    */
  get part(): Prisma.PartDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceOrder`: Exposes CRUD operations for the **ServiceOrder** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceOrders
    * const serviceOrders = await prisma.serviceOrder.findMany()
    * ```
    */
  get serviceOrder(): Prisma.ServiceOrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderService`: Exposes CRUD operations for the **OrderService** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderServices
    * const orderServices = await prisma.orderService.findMany()
    * ```
    */
  get orderService(): Prisma.OrderServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.orderPart`: Exposes CRUD operations for the **OrderPart** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OrderParts
    * const orderParts = await prisma.orderPart.findMany()
    * ```
    */
  get orderPart(): Prisma.OrderPartDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.5.0
   * Query Engine version: 280c870be64f457428992c43c1f6d557fab6e29e
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Customer: 'Customer',
    Vehicle: 'Vehicle',
    Service: 'Service',
    Part: 'Part',
    ServiceOrder: 'ServiceOrder',
    OrderService: 'OrderService',
    OrderPart: 'OrderPart'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "customer" | "vehicle" | "service" | "part" | "serviceOrder" | "orderService" | "orderPart"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      Vehicle: {
        payload: Prisma.$VehiclePayload<ExtArgs>
        fields: Prisma.VehicleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VehicleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VehicleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findFirst: {
            args: Prisma.VehicleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VehicleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          findMany: {
            args: Prisma.VehicleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          create: {
            args: Prisma.VehicleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          createMany: {
            args: Prisma.VehicleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VehicleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          delete: {
            args: Prisma.VehicleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          update: {
            args: Prisma.VehicleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          deleteMany: {
            args: Prisma.VehicleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VehicleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VehicleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>[]
          }
          upsert: {
            args: Prisma.VehicleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VehiclePayload>
          }
          aggregate: {
            args: Prisma.VehicleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVehicle>
          }
          groupBy: {
            args: Prisma.VehicleGroupByArgs<ExtArgs>
            result: $Utils.Optional<VehicleGroupByOutputType>[]
          }
          count: {
            args: Prisma.VehicleCountArgs<ExtArgs>
            result: $Utils.Optional<VehicleCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      Part: {
        payload: Prisma.$PartPayload<ExtArgs>
        fields: Prisma.PartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findFirst: {
            args: Prisma.PartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          findMany: {
            args: Prisma.PartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          create: {
            args: Prisma.PartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          createMany: {
            args: Prisma.PartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PartCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          delete: {
            args: Prisma.PartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          update: {
            args: Prisma.PartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          deleteMany: {
            args: Prisma.PartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PartUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>[]
          }
          upsert: {
            args: Prisma.PartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PartPayload>
          }
          aggregate: {
            args: Prisma.PartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePart>
          }
          groupBy: {
            args: Prisma.PartGroupByArgs<ExtArgs>
            result: $Utils.Optional<PartGroupByOutputType>[]
          }
          count: {
            args: Prisma.PartCountArgs<ExtArgs>
            result: $Utils.Optional<PartCountAggregateOutputType> | number
          }
        }
      }
      ServiceOrder: {
        payload: Prisma.$ServiceOrderPayload<ExtArgs>
        fields: Prisma.ServiceOrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceOrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceOrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrderPayload>
          }
          findFirst: {
            args: Prisma.ServiceOrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceOrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrderPayload>
          }
          findMany: {
            args: Prisma.ServiceOrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrderPayload>[]
          }
          create: {
            args: Prisma.ServiceOrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrderPayload>
          }
          createMany: {
            args: Prisma.ServiceOrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceOrderCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrderPayload>[]
          }
          delete: {
            args: Prisma.ServiceOrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrderPayload>
          }
          update: {
            args: Prisma.ServiceOrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrderPayload>
          }
          deleteMany: {
            args: Prisma.ServiceOrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceOrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceOrderUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrderPayload>[]
          }
          upsert: {
            args: Prisma.ServiceOrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceOrderPayload>
          }
          aggregate: {
            args: Prisma.ServiceOrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceOrder>
          }
          groupBy: {
            args: Prisma.ServiceOrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceOrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceOrderCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceOrderCountAggregateOutputType> | number
          }
        }
      }
      OrderService: {
        payload: Prisma.$OrderServicePayload<ExtArgs>
        fields: Prisma.OrderServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderServicePayload>
          }
          findFirst: {
            args: Prisma.OrderServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderServicePayload>
          }
          findMany: {
            args: Prisma.OrderServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderServicePayload>[]
          }
          create: {
            args: Prisma.OrderServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderServicePayload>
          }
          createMany: {
            args: Prisma.OrderServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderServiceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderServicePayload>[]
          }
          delete: {
            args: Prisma.OrderServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderServicePayload>
          }
          update: {
            args: Prisma.OrderServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderServicePayload>
          }
          deleteMany: {
            args: Prisma.OrderServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderServiceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderServicePayload>[]
          }
          upsert: {
            args: Prisma.OrderServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderServicePayload>
          }
          aggregate: {
            args: Prisma.OrderServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderService>
          }
          groupBy: {
            args: Prisma.OrderServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderServiceCountArgs<ExtArgs>
            result: $Utils.Optional<OrderServiceCountAggregateOutputType> | number
          }
        }
      }
      OrderPart: {
        payload: Prisma.$OrderPartPayload<ExtArgs>
        fields: Prisma.OrderPartFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderPartFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPartPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderPartFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPartPayload>
          }
          findFirst: {
            args: Prisma.OrderPartFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPartPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderPartFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPartPayload>
          }
          findMany: {
            args: Prisma.OrderPartFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPartPayload>[]
          }
          create: {
            args: Prisma.OrderPartCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPartPayload>
          }
          createMany: {
            args: Prisma.OrderPartCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OrderPartCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPartPayload>[]
          }
          delete: {
            args: Prisma.OrderPartDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPartPayload>
          }
          update: {
            args: Prisma.OrderPartUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPartPayload>
          }
          deleteMany: {
            args: Prisma.OrderPartDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderPartUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OrderPartUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPartPayload>[]
          }
          upsert: {
            args: Prisma.OrderPartUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPartPayload>
          }
          aggregate: {
            args: Prisma.OrderPartAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrderPart>
          }
          groupBy: {
            args: Prisma.OrderPartGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderPartGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderPartCountArgs<ExtArgs>
            result: $Utils.Optional<OrderPartCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    customer?: CustomerOmit
    vehicle?: VehicleOmit
    service?: ServiceOmit
    part?: PartOmit
    serviceOrder?: ServiceOrderOmit
    orderService?: OrderServiceOmit
    orderPart?: OrderPartOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type CustomerCountOutputType
   */

  export type CustomerCountOutputType = {
    vehicles: number
    orders: number
  }

  export type CustomerCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicles?: boolean | CustomerCountOutputTypeCountVehiclesArgs
    orders?: boolean | CustomerCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CustomerCountOutputType
     */
    select?: CustomerCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountVehiclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
  }

  /**
   * CustomerCountOutputType without action
   */
  export type CustomerCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceOrderWhereInput
  }


  /**
   * Count Type VehicleCountOutputType
   */

  export type VehicleCountOutputType = {
    orders: number
  }

  export type VehicleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | VehicleCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VehicleCountOutputType
     */
    select?: VehicleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VehicleCountOutputType without action
   */
  export type VehicleCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceOrderWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    orderServices: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderServices?: boolean | ServiceCountOutputTypeCountOrderServicesArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountOrderServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderServiceWhereInput
  }


  /**
   * Count Type PartCountOutputType
   */

  export type PartCountOutputType = {
    orderParts: number
  }

  export type PartCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderParts?: boolean | PartCountOutputTypeCountOrderPartsArgs
  }

  // Custom InputTypes
  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PartCountOutputType
     */
    select?: PartCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PartCountOutputType without action
   */
  export type PartCountOutputTypeCountOrderPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderPartWhereInput
  }


  /**
   * Count Type ServiceOrderCountOutputType
   */

  export type ServiceOrderCountOutputType = {
    services: number
    parts: number
  }

  export type ServiceOrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    services?: boolean | ServiceOrderCountOutputTypeCountServicesArgs
    parts?: boolean | ServiceOrderCountOutputTypeCountPartsArgs
  }

  // Custom InputTypes
  /**
   * ServiceOrderCountOutputType without action
   */
  export type ServiceOrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrderCountOutputType
     */
    select?: ServiceOrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceOrderCountOutputType without action
   */
  export type ServiceOrderCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderServiceWhereInput
  }

  /**
   * ServiceOrderCountOutputType without action
   */
  export type ServiceOrderCountOutputTypeCountPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderPartWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    name: string | null
    document: string | null
    email: string | null
    phone: string | null
    createdAt: Date | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    document: string | null
    email: string | null
    phone: string | null
    createdAt: Date | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    name: number
    document: number
    email: number
    phone: number
    createdAt: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    name?: true
    document?: true
    email?: true
    phone?: true
    createdAt?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    name?: true
    document?: true
    email?: true
    phone?: true
    createdAt?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    name?: true
    document?: true
    email?: true
    phone?: true
    createdAt?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    name: string
    document: string
    email: string
    phone: string
    createdAt: Date
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    document?: boolean
    email?: boolean
    phone?: boolean
    createdAt?: boolean
    vehicles?: boolean | Customer$vehiclesArgs<ExtArgs>
    orders?: boolean | Customer$ordersArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    document?: boolean
    email?: boolean
    phone?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    document?: boolean
    email?: boolean
    phone?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    name?: boolean
    document?: boolean
    email?: boolean
    phone?: boolean
    createdAt?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "document" | "email" | "phone" | "createdAt", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vehicles?: boolean | Customer$vehiclesArgs<ExtArgs>
    orders?: boolean | Customer$ordersArgs<ExtArgs>
    _count?: boolean | CustomerCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      vehicles: Prisma.$VehiclePayload<ExtArgs>[]
      orders: Prisma.$ServiceOrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      document: string
      email: string
      phone: string
      createdAt: Date
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vehicles<T extends Customer$vehiclesArgs<ExtArgs> = {}>(args?: Subset<T, Customer$vehiclesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Customer$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Customer$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly document: FieldRef<"Customer", 'String'>
    readonly email: FieldRef<"Customer", 'String'>
    readonly phone: FieldRef<"Customer", 'String'>
    readonly createdAt: FieldRef<"Customer", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.vehicles
   */
  export type Customer$vehiclesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    cursor?: VehicleWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Customer.orders
   */
  export type Customer$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrder
     */
    select?: ServiceOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrder
     */
    omit?: ServiceOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrderInclude<ExtArgs> | null
    where?: ServiceOrderWhereInput
    orderBy?: ServiceOrderOrderByWithRelationInput | ServiceOrderOrderByWithRelationInput[]
    cursor?: ServiceOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceOrderScalarFieldEnum | ServiceOrderScalarFieldEnum[]
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model Vehicle
   */

  export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  export type VehicleAvgAggregateOutputType = {
    year: number | null
  }

  export type VehicleSumAggregateOutputType = {
    year: number | null
  }

  export type VehicleMinAggregateOutputType = {
    id: string | null
    plate: string | null
    brand: string | null
    model: string | null
    year: number | null
    customerId: string | null
  }

  export type VehicleMaxAggregateOutputType = {
    id: string | null
    plate: string | null
    brand: string | null
    model: string | null
    year: number | null
    customerId: string | null
  }

  export type VehicleCountAggregateOutputType = {
    id: number
    plate: number
    brand: number
    model: number
    year: number
    customerId: number
    _all: number
  }


  export type VehicleAvgAggregateInputType = {
    year?: true
  }

  export type VehicleSumAggregateInputType = {
    year?: true
  }

  export type VehicleMinAggregateInputType = {
    id?: true
    plate?: true
    brand?: true
    model?: true
    year?: true
    customerId?: true
  }

  export type VehicleMaxAggregateInputType = {
    id?: true
    plate?: true
    brand?: true
    model?: true
    year?: true
    customerId?: true
  }

  export type VehicleCountAggregateInputType = {
    id?: true
    plate?: true
    brand?: true
    model?: true
    year?: true
    customerId?: true
    _all?: true
  }

  export type VehicleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicle to aggregate.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vehicles
    **/
    _count?: true | VehicleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: VehicleAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: VehicleSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VehicleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VehicleMaxAggregateInputType
  }

  export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
        [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVehicle[P]>
      : GetScalarType<T[P], AggregateVehicle[P]>
  }




  export type VehicleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VehicleWhereInput
    orderBy?: VehicleOrderByWithAggregationInput | VehicleOrderByWithAggregationInput[]
    by: VehicleScalarFieldEnum[] | VehicleScalarFieldEnum
    having?: VehicleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VehicleCountAggregateInputType | true
    _avg?: VehicleAvgAggregateInputType
    _sum?: VehicleSumAggregateInputType
    _min?: VehicleMinAggregateInputType
    _max?: VehicleMaxAggregateInputType
  }

  export type VehicleGroupByOutputType = {
    id: string
    plate: string
    brand: string
    model: string
    year: number
    customerId: string
    _count: VehicleCountAggregateOutputType | null
    _avg: VehicleAvgAggregateOutputType | null
    _sum: VehicleSumAggregateOutputType | null
    _min: VehicleMinAggregateOutputType | null
    _max: VehicleMaxAggregateOutputType | null
  }

  type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VehicleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VehicleGroupByOutputType[P]>
            : GetScalarType<T[P], VehicleGroupByOutputType[P]>
        }
      >
    >


  export type VehicleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plate?: boolean
    brand?: boolean
    model?: boolean
    year?: boolean
    customerId?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    orders?: boolean | Vehicle$ordersArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plate?: boolean
    brand?: boolean
    model?: boolean
    year?: boolean
    customerId?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    plate?: boolean
    brand?: boolean
    model?: boolean
    year?: boolean
    customerId?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vehicle"]>

  export type VehicleSelectScalar = {
    id?: boolean
    plate?: boolean
    brand?: boolean
    model?: boolean
    year?: boolean
    customerId?: boolean
  }

  export type VehicleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "plate" | "brand" | "model" | "year" | "customerId", ExtArgs["result"]["vehicle"]>
  export type VehicleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    orders?: boolean | Vehicle$ordersArgs<ExtArgs>
    _count?: boolean | VehicleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }
  export type VehicleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
  }

  export type $VehiclePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vehicle"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      orders: Prisma.$ServiceOrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      plate: string
      brand: string
      model: string
      year: number
      customerId: string
    }, ExtArgs["result"]["vehicle"]>
    composites: {}
  }

  type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = $Result.GetResult<Prisma.$VehiclePayload, S>

  type VehicleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VehicleCountAggregateInputType | true
    }

  export interface VehicleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'], meta: { name: 'Vehicle' } }
    /**
     * Find zero or one Vehicle that matches the filter.
     * @param {VehicleFindUniqueArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VehicleFindUniqueArgs>(args: SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vehicle that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VehicleFindUniqueOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VehicleFindFirstArgs>(args?: SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vehicle that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindFirstOrThrowArgs} args - Arguments to find a Vehicle
     * @example
     * // Get one Vehicle
     * const vehicle = await prisma.vehicle.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vehicles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vehicles
     * const vehicles = await prisma.vehicle.findMany()
     * 
     * // Get first 10 Vehicles
     * const vehicles = await prisma.vehicle.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VehicleFindManyArgs>(args?: SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vehicle.
     * @param {VehicleCreateArgs} args - Arguments to create a Vehicle.
     * @example
     * // Create one Vehicle
     * const Vehicle = await prisma.vehicle.create({
     *   data: {
     *     // ... data to create a Vehicle
     *   }
     * })
     * 
     */
    create<T extends VehicleCreateArgs>(args: SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vehicles.
     * @param {VehicleCreateManyArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VehicleCreateManyArgs>(args?: SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vehicles and returns the data saved in the database.
     * @param {VehicleCreateManyAndReturnArgs} args - Arguments to create many Vehicles.
     * @example
     * // Create many Vehicles
     * const vehicle = await prisma.vehicle.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vehicle.
     * @param {VehicleDeleteArgs} args - Arguments to delete one Vehicle.
     * @example
     * // Delete one Vehicle
     * const Vehicle = await prisma.vehicle.delete({
     *   where: {
     *     // ... filter to delete one Vehicle
     *   }
     * })
     * 
     */
    delete<T extends VehicleDeleteArgs>(args: SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vehicle.
     * @param {VehicleUpdateArgs} args - Arguments to update one Vehicle.
     * @example
     * // Update one Vehicle
     * const vehicle = await prisma.vehicle.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VehicleUpdateArgs>(args: SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vehicles.
     * @param {VehicleDeleteManyArgs} args - Arguments to filter Vehicles to delete.
     * @example
     * // Delete a few Vehicles
     * const { count } = await prisma.vehicle.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VehicleDeleteManyArgs>(args?: SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VehicleUpdateManyArgs>(args: SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vehicles and returns the data updated in the database.
     * @param {VehicleUpdateManyAndReturnArgs} args - Arguments to update many Vehicles.
     * @example
     * // Update many Vehicles
     * const vehicle = await prisma.vehicle.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vehicles and only return the `id`
     * const vehicleWithIdOnly = await prisma.vehicle.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vehicle.
     * @param {VehicleUpsertArgs} args - Arguments to update or create a Vehicle.
     * @example
     * // Update or create a Vehicle
     * const vehicle = await prisma.vehicle.upsert({
     *   create: {
     *     // ... data to create a Vehicle
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vehicle we want to update
     *   }
     * })
     */
    upsert<T extends VehicleUpsertArgs>(args: SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vehicles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleCountArgs} args - Arguments to filter Vehicles to count.
     * @example
     * // Count the number of Vehicles
     * const count = await prisma.vehicle.count({
     *   where: {
     *     // ... the filter for the Vehicles we want to count
     *   }
     * })
    **/
    count<T extends VehicleCountArgs>(
      args?: Subset<T, VehicleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VehicleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VehicleAggregateArgs>(args: Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>

    /**
     * Group by Vehicle.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VehicleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VehicleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VehicleGroupByArgs['orderBy'] }
        : { orderBy?: VehicleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vehicle model
   */
  readonly fields: VehicleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vehicle.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    orders<T extends Vehicle$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Vehicle$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vehicle model
   */
  interface VehicleFieldRefs {
    readonly id: FieldRef<"Vehicle", 'String'>
    readonly plate: FieldRef<"Vehicle", 'String'>
    readonly brand: FieldRef<"Vehicle", 'String'>
    readonly model: FieldRef<"Vehicle", 'String'>
    readonly year: FieldRef<"Vehicle", 'Int'>
    readonly customerId: FieldRef<"Vehicle", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Vehicle findUnique
   */
  export type VehicleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findUniqueOrThrow
   */
  export type VehicleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle findFirst
   */
  export type VehicleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findFirstOrThrow
   */
  export type VehicleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicle to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle findMany
   */
  export type VehicleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter, which Vehicles to fetch.
     */
    where?: VehicleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vehicles to fetch.
     */
    orderBy?: VehicleOrderByWithRelationInput | VehicleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vehicles.
     */
    cursor?: VehicleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vehicles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vehicles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vehicles.
     */
    distinct?: VehicleScalarFieldEnum | VehicleScalarFieldEnum[]
  }

  /**
   * Vehicle create
   */
  export type VehicleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to create a Vehicle.
     */
    data: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
  }

  /**
   * Vehicle createMany
   */
  export type VehicleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vehicle createManyAndReturn
   */
  export type VehicleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to create many Vehicles.
     */
    data: VehicleCreateManyInput | VehicleCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle update
   */
  export type VehicleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The data needed to update a Vehicle.
     */
    data: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
    /**
     * Choose, which Vehicle to update.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle updateMany
   */
  export type VehicleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
  }

  /**
   * Vehicle updateManyAndReturn
   */
  export type VehicleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * The data used to update Vehicles.
     */
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyInput>
    /**
     * Filter which Vehicles to update
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vehicle upsert
   */
  export type VehicleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * The filter to search for the Vehicle to update in case it exists.
     */
    where: VehicleWhereUniqueInput
    /**
     * In case the Vehicle found by the `where` argument doesn't exist, create a new Vehicle with this data.
     */
    create: XOR<VehicleCreateInput, VehicleUncheckedCreateInput>
    /**
     * In case the Vehicle was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VehicleUpdateInput, VehicleUncheckedUpdateInput>
  }

  /**
   * Vehicle delete
   */
  export type VehicleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
    /**
     * Filter which Vehicle to delete.
     */
    where: VehicleWhereUniqueInput
  }

  /**
   * Vehicle deleteMany
   */
  export type VehicleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vehicles to delete
     */
    where?: VehicleWhereInput
    /**
     * Limit how many Vehicles to delete.
     */
    limit?: number
  }

  /**
   * Vehicle.orders
   */
  export type Vehicle$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrder
     */
    select?: ServiceOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrder
     */
    omit?: ServiceOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrderInclude<ExtArgs> | null
    where?: ServiceOrderWhereInput
    orderBy?: ServiceOrderOrderByWithRelationInput | ServiceOrderOrderByWithRelationInput[]
    cursor?: ServiceOrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceOrderScalarFieldEnum | ServiceOrderScalarFieldEnum[]
  }

  /**
   * Vehicle without action
   */
  export type VehicleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vehicle
     */
    select?: VehicleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vehicle
     */
    omit?: VehicleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VehicleInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    price: Decimal | null
    estimatedTime: number | null
  }

  export type ServiceSumAggregateOutputType = {
    price: Decimal | null
    estimatedTime: number | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    estimatedTime: number | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    estimatedTime: number | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    name: number
    description: number
    price: number
    estimatedTime: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    price?: true
    estimatedTime?: true
  }

  export type ServiceSumAggregateInputType = {
    price?: true
    estimatedTime?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    estimatedTime?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    estimatedTime?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    estimatedTime?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    name: string
    description: string | null
    price: Decimal
    estimatedTime: number
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    estimatedTime?: boolean
    orderServices?: boolean | Service$orderServicesArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    estimatedTime?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    estimatedTime?: boolean
  }, ExtArgs["result"]["service"]>

  export type ServiceSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    estimatedTime?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "price" | "estimatedTime", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderServices?: boolean | Service$orderServicesArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      orderServices: Prisma.$OrderServicePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      price: Prisma.Decimal
      estimatedTime: number
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Services and returns the data saved in the database.
     * @param {ServiceCreateManyAndReturnArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services and returns the data updated in the database.
     * @param {ServiceUpdateManyAndReturnArgs} args - Arguments to update many Services.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Services and only return the `id`
     * const serviceWithIdOnly = await prisma.service.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orderServices<T extends Service$orderServicesArgs<ExtArgs> = {}>(args?: Subset<T, Service$orderServicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly name: FieldRef<"Service", 'String'>
    readonly description: FieldRef<"Service", 'String'>
    readonly price: FieldRef<"Service", 'Decimal'>
    readonly estimatedTime: FieldRef<"Service", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service createManyAndReturn
   */
  export type ServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service updateManyAndReturn
   */
  export type ServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.orderServices
   */
  export type Service$orderServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderService
     */
    select?: OrderServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderService
     */
    omit?: OrderServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderServiceInclude<ExtArgs> | null
    where?: OrderServiceWhereInput
    orderBy?: OrderServiceOrderByWithRelationInput | OrderServiceOrderByWithRelationInput[]
    cursor?: OrderServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderServiceScalarFieldEnum | OrderServiceScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model Part
   */

  export type AggregatePart = {
    _count: PartCountAggregateOutputType | null
    _avg: PartAvgAggregateOutputType | null
    _sum: PartSumAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  export type PartAvgAggregateOutputType = {
    price: Decimal | null
    stockQty: number | null
  }

  export type PartSumAggregateOutputType = {
    price: Decimal | null
    stockQty: number | null
  }

  export type PartMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    stockQty: number | null
  }

  export type PartMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    price: Decimal | null
    stockQty: number | null
  }

  export type PartCountAggregateOutputType = {
    id: number
    name: number
    description: number
    price: number
    stockQty: number
    _all: number
  }


  export type PartAvgAggregateInputType = {
    price?: true
    stockQty?: true
  }

  export type PartSumAggregateInputType = {
    price?: true
    stockQty?: true
  }

  export type PartMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    stockQty?: true
  }

  export type PartMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    stockQty?: true
  }

  export type PartCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    price?: true
    stockQty?: true
    _all?: true
  }

  export type PartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Part to aggregate.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Parts
    **/
    _count?: true | PartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PartMaxAggregateInputType
  }

  export type GetPartAggregateType<T extends PartAggregateArgs> = {
        [P in keyof T & keyof AggregatePart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePart[P]>
      : GetScalarType<T[P], AggregatePart[P]>
  }




  export type PartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PartWhereInput
    orderBy?: PartOrderByWithAggregationInput | PartOrderByWithAggregationInput[]
    by: PartScalarFieldEnum[] | PartScalarFieldEnum
    having?: PartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PartCountAggregateInputType | true
    _avg?: PartAvgAggregateInputType
    _sum?: PartSumAggregateInputType
    _min?: PartMinAggregateInputType
    _max?: PartMaxAggregateInputType
  }

  export type PartGroupByOutputType = {
    id: string
    name: string
    description: string | null
    price: Decimal
    stockQty: number
    _count: PartCountAggregateOutputType | null
    _avg: PartAvgAggregateOutputType | null
    _sum: PartSumAggregateOutputType | null
    _min: PartMinAggregateOutputType | null
    _max: PartMaxAggregateOutputType | null
  }

  type GetPartGroupByPayload<T extends PartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PartGroupByOutputType[P]>
            : GetScalarType<T[P], PartGroupByOutputType[P]>
        }
      >
    >


  export type PartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    stockQty?: boolean
    orderParts?: boolean | Part$orderPartsArgs<ExtArgs>
    _count?: boolean | PartCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["part"]>

  export type PartSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    stockQty?: boolean
  }, ExtArgs["result"]["part"]>

  export type PartSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    stockQty?: boolean
  }, ExtArgs["result"]["part"]>

  export type PartSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    price?: boolean
    stockQty?: boolean
  }

  export type PartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "price" | "stockQty", ExtArgs["result"]["part"]>
  export type PartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orderParts?: boolean | Part$orderPartsArgs<ExtArgs>
    _count?: boolean | PartCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PartIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PartIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Part"
    objects: {
      orderParts: Prisma.$OrderPartPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      price: Prisma.Decimal
      stockQty: number
    }, ExtArgs["result"]["part"]>
    composites: {}
  }

  type PartGetPayload<S extends boolean | null | undefined | PartDefaultArgs> = $Result.GetResult<Prisma.$PartPayload, S>

  type PartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PartCountAggregateInputType | true
    }

  export interface PartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Part'], meta: { name: 'Part' } }
    /**
     * Find zero or one Part that matches the filter.
     * @param {PartFindUniqueArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PartFindUniqueArgs>(args: SelectSubset<T, PartFindUniqueArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Part that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PartFindUniqueOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PartFindUniqueOrThrowArgs>(args: SelectSubset<T, PartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Part that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PartFindFirstArgs>(args?: SelectSubset<T, PartFindFirstArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Part that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindFirstOrThrowArgs} args - Arguments to find a Part
     * @example
     * // Get one Part
     * const part = await prisma.part.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PartFindFirstOrThrowArgs>(args?: SelectSubset<T, PartFindFirstOrThrowArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Parts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Parts
     * const parts = await prisma.part.findMany()
     * 
     * // Get first 10 Parts
     * const parts = await prisma.part.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const partWithIdOnly = await prisma.part.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PartFindManyArgs>(args?: SelectSubset<T, PartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Part.
     * @param {PartCreateArgs} args - Arguments to create a Part.
     * @example
     * // Create one Part
     * const Part = await prisma.part.create({
     *   data: {
     *     // ... data to create a Part
     *   }
     * })
     * 
     */
    create<T extends PartCreateArgs>(args: SelectSubset<T, PartCreateArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Parts.
     * @param {PartCreateManyArgs} args - Arguments to create many Parts.
     * @example
     * // Create many Parts
     * const part = await prisma.part.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PartCreateManyArgs>(args?: SelectSubset<T, PartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Parts and returns the data saved in the database.
     * @param {PartCreateManyAndReturnArgs} args - Arguments to create many Parts.
     * @example
     * // Create many Parts
     * const part = await prisma.part.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Parts and only return the `id`
     * const partWithIdOnly = await prisma.part.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PartCreateManyAndReturnArgs>(args?: SelectSubset<T, PartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Part.
     * @param {PartDeleteArgs} args - Arguments to delete one Part.
     * @example
     * // Delete one Part
     * const Part = await prisma.part.delete({
     *   where: {
     *     // ... filter to delete one Part
     *   }
     * })
     * 
     */
    delete<T extends PartDeleteArgs>(args: SelectSubset<T, PartDeleteArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Part.
     * @param {PartUpdateArgs} args - Arguments to update one Part.
     * @example
     * // Update one Part
     * const part = await prisma.part.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PartUpdateArgs>(args: SelectSubset<T, PartUpdateArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Parts.
     * @param {PartDeleteManyArgs} args - Arguments to filter Parts to delete.
     * @example
     * // Delete a few Parts
     * const { count } = await prisma.part.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PartDeleteManyArgs>(args?: SelectSubset<T, PartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Parts
     * const part = await prisma.part.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PartUpdateManyArgs>(args: SelectSubset<T, PartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Parts and returns the data updated in the database.
     * @param {PartUpdateManyAndReturnArgs} args - Arguments to update many Parts.
     * @example
     * // Update many Parts
     * const part = await prisma.part.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Parts and only return the `id`
     * const partWithIdOnly = await prisma.part.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PartUpdateManyAndReturnArgs>(args: SelectSubset<T, PartUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Part.
     * @param {PartUpsertArgs} args - Arguments to update or create a Part.
     * @example
     * // Update or create a Part
     * const part = await prisma.part.upsert({
     *   create: {
     *     // ... data to create a Part
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Part we want to update
     *   }
     * })
     */
    upsert<T extends PartUpsertArgs>(args: SelectSubset<T, PartUpsertArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Parts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartCountArgs} args - Arguments to filter Parts to count.
     * @example
     * // Count the number of Parts
     * const count = await prisma.part.count({
     *   where: {
     *     // ... the filter for the Parts we want to count
     *   }
     * })
    **/
    count<T extends PartCountArgs>(
      args?: Subset<T, PartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PartAggregateArgs>(args: Subset<T, PartAggregateArgs>): Prisma.PrismaPromise<GetPartAggregateType<T>>

    /**
     * Group by Part.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PartGroupByArgs['orderBy'] }
        : { orderBy?: PartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Part model
   */
  readonly fields: PartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Part.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    orderParts<T extends Part$orderPartsArgs<ExtArgs> = {}>(args?: Subset<T, Part$orderPartsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Part model
   */
  interface PartFieldRefs {
    readonly id: FieldRef<"Part", 'String'>
    readonly name: FieldRef<"Part", 'String'>
    readonly description: FieldRef<"Part", 'String'>
    readonly price: FieldRef<"Part", 'Decimal'>
    readonly stockQty: FieldRef<"Part", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Part findUnique
   */
  export type PartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part findUniqueOrThrow
   */
  export type PartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part findFirst
   */
  export type PartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part findFirstOrThrow
   */
  export type PartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Part to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part findMany
   */
  export type PartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter, which Parts to fetch.
     */
    where?: PartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Parts to fetch.
     */
    orderBy?: PartOrderByWithRelationInput | PartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Parts.
     */
    cursor?: PartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Parts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Parts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Parts.
     */
    distinct?: PartScalarFieldEnum | PartScalarFieldEnum[]
  }

  /**
   * Part create
   */
  export type PartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to create a Part.
     */
    data: XOR<PartCreateInput, PartUncheckedCreateInput>
  }

  /**
   * Part createMany
   */
  export type PartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Parts.
     */
    data: PartCreateManyInput | PartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Part createManyAndReturn
   */
  export type PartCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * The data used to create many Parts.
     */
    data: PartCreateManyInput | PartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Part update
   */
  export type PartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The data needed to update a Part.
     */
    data: XOR<PartUpdateInput, PartUncheckedUpdateInput>
    /**
     * Choose, which Part to update.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part updateMany
   */
  export type PartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Parts.
     */
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyInput>
    /**
     * Filter which Parts to update
     */
    where?: PartWhereInput
    /**
     * Limit how many Parts to update.
     */
    limit?: number
  }

  /**
   * Part updateManyAndReturn
   */
  export type PartUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * The data used to update Parts.
     */
    data: XOR<PartUpdateManyMutationInput, PartUncheckedUpdateManyInput>
    /**
     * Filter which Parts to update
     */
    where?: PartWhereInput
    /**
     * Limit how many Parts to update.
     */
    limit?: number
  }

  /**
   * Part upsert
   */
  export type PartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * The filter to search for the Part to update in case it exists.
     */
    where: PartWhereUniqueInput
    /**
     * In case the Part found by the `where` argument doesn't exist, create a new Part with this data.
     */
    create: XOR<PartCreateInput, PartUncheckedCreateInput>
    /**
     * In case the Part was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PartUpdateInput, PartUncheckedUpdateInput>
  }

  /**
   * Part delete
   */
  export type PartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
    /**
     * Filter which Part to delete.
     */
    where: PartWhereUniqueInput
  }

  /**
   * Part deleteMany
   */
  export type PartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Parts to delete
     */
    where?: PartWhereInput
    /**
     * Limit how many Parts to delete.
     */
    limit?: number
  }

  /**
   * Part.orderParts
   */
  export type Part$orderPartsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPart
     */
    select?: OrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderPart
     */
    omit?: OrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderPartInclude<ExtArgs> | null
    where?: OrderPartWhereInput
    orderBy?: OrderPartOrderByWithRelationInput | OrderPartOrderByWithRelationInput[]
    cursor?: OrderPartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderPartScalarFieldEnum | OrderPartScalarFieldEnum[]
  }

  /**
   * Part without action
   */
  export type PartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Part
     */
    select?: PartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Part
     */
    omit?: PartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PartInclude<ExtArgs> | null
  }


  /**
   * Model ServiceOrder
   */

  export type AggregateServiceOrder = {
    _count: ServiceOrderCountAggregateOutputType | null
    _avg: ServiceOrderAvgAggregateOutputType | null
    _sum: ServiceOrderSumAggregateOutputType | null
    _min: ServiceOrderMinAggregateOutputType | null
    _max: ServiceOrderMaxAggregateOutputType | null
  }

  export type ServiceOrderAvgAggregateOutputType = {
    totalPrice: Decimal | null
  }

  export type ServiceOrderSumAggregateOutputType = {
    totalPrice: Decimal | null
  }

  export type ServiceOrderMinAggregateOutputType = {
    id: string | null
    customerId: string | null
    vehicleId: string | null
    description: string | null
    status: $Enums.OrderStatus | null
    totalPrice: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceOrderMaxAggregateOutputType = {
    id: string | null
    customerId: string | null
    vehicleId: string | null
    description: string | null
    status: $Enums.OrderStatus | null
    totalPrice: Decimal | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceOrderCountAggregateOutputType = {
    id: number
    customerId: number
    vehicleId: number
    description: number
    status: number
    totalPrice: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceOrderAvgAggregateInputType = {
    totalPrice?: true
  }

  export type ServiceOrderSumAggregateInputType = {
    totalPrice?: true
  }

  export type ServiceOrderMinAggregateInputType = {
    id?: true
    customerId?: true
    vehicleId?: true
    description?: true
    status?: true
    totalPrice?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceOrderMaxAggregateInputType = {
    id?: true
    customerId?: true
    vehicleId?: true
    description?: true
    status?: true
    totalPrice?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceOrderCountAggregateInputType = {
    id?: true
    customerId?: true
    vehicleId?: true
    description?: true
    status?: true
    totalPrice?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceOrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceOrder to aggregate.
     */
    where?: ServiceOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceOrders to fetch.
     */
    orderBy?: ServiceOrderOrderByWithRelationInput | ServiceOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceOrders
    **/
    _count?: true | ServiceOrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceOrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceOrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceOrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceOrderMaxAggregateInputType
  }

  export type GetServiceOrderAggregateType<T extends ServiceOrderAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceOrder[P]>
      : GetScalarType<T[P], AggregateServiceOrder[P]>
  }




  export type ServiceOrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceOrderWhereInput
    orderBy?: ServiceOrderOrderByWithAggregationInput | ServiceOrderOrderByWithAggregationInput[]
    by: ServiceOrderScalarFieldEnum[] | ServiceOrderScalarFieldEnum
    having?: ServiceOrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceOrderCountAggregateInputType | true
    _avg?: ServiceOrderAvgAggregateInputType
    _sum?: ServiceOrderSumAggregateInputType
    _min?: ServiceOrderMinAggregateInputType
    _max?: ServiceOrderMaxAggregateInputType
  }

  export type ServiceOrderGroupByOutputType = {
    id: string
    customerId: string
    vehicleId: string
    description: string
    status: $Enums.OrderStatus
    totalPrice: Decimal
    createdAt: Date
    updatedAt: Date
    _count: ServiceOrderCountAggregateOutputType | null
    _avg: ServiceOrderAvgAggregateOutputType | null
    _sum: ServiceOrderSumAggregateOutputType | null
    _min: ServiceOrderMinAggregateOutputType | null
    _max: ServiceOrderMaxAggregateOutputType | null
  }

  type GetServiceOrderGroupByPayload<T extends ServiceOrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceOrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceOrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceOrderGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceOrderGroupByOutputType[P]>
        }
      >
    >


  export type ServiceOrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    vehicleId?: boolean
    description?: boolean
    status?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    services?: boolean | ServiceOrder$servicesArgs<ExtArgs>
    parts?: boolean | ServiceOrder$partsArgs<ExtArgs>
    _count?: boolean | ServiceOrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceOrder"]>

  export type ServiceOrderSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    vehicleId?: boolean
    description?: boolean
    status?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceOrder"]>

  export type ServiceOrderSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    customerId?: boolean
    vehicleId?: boolean
    description?: boolean
    status?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceOrder"]>

  export type ServiceOrderSelectScalar = {
    id?: boolean
    customerId?: boolean
    vehicleId?: boolean
    description?: boolean
    status?: boolean
    totalPrice?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "customerId" | "vehicleId" | "description" | "status" | "totalPrice" | "createdAt" | "updatedAt", ExtArgs["result"]["serviceOrder"]>
  export type ServiceOrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
    services?: boolean | ServiceOrder$servicesArgs<ExtArgs>
    parts?: boolean | ServiceOrder$partsArgs<ExtArgs>
    _count?: boolean | ServiceOrderCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceOrderIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }
  export type ServiceOrderIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    customer?: boolean | CustomerDefaultArgs<ExtArgs>
    vehicle?: boolean | VehicleDefaultArgs<ExtArgs>
  }

  export type $ServiceOrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceOrder"
    objects: {
      customer: Prisma.$CustomerPayload<ExtArgs>
      vehicle: Prisma.$VehiclePayload<ExtArgs>
      services: Prisma.$OrderServicePayload<ExtArgs>[]
      parts: Prisma.$OrderPartPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      customerId: string
      vehicleId: string
      description: string
      status: $Enums.OrderStatus
      totalPrice: Prisma.Decimal
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serviceOrder"]>
    composites: {}
  }

  type ServiceOrderGetPayload<S extends boolean | null | undefined | ServiceOrderDefaultArgs> = $Result.GetResult<Prisma.$ServiceOrderPayload, S>

  type ServiceOrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceOrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceOrderCountAggregateInputType | true
    }

  export interface ServiceOrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceOrder'], meta: { name: 'ServiceOrder' } }
    /**
     * Find zero or one ServiceOrder that matches the filter.
     * @param {ServiceOrderFindUniqueArgs} args - Arguments to find a ServiceOrder
     * @example
     * // Get one ServiceOrder
     * const serviceOrder = await prisma.serviceOrder.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceOrderFindUniqueArgs>(args: SelectSubset<T, ServiceOrderFindUniqueArgs<ExtArgs>>): Prisma__ServiceOrderClient<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceOrder that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceOrderFindUniqueOrThrowArgs} args - Arguments to find a ServiceOrder
     * @example
     * // Get one ServiceOrder
     * const serviceOrder = await prisma.serviceOrder.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceOrderFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceOrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceOrderClient<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceOrder that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrderFindFirstArgs} args - Arguments to find a ServiceOrder
     * @example
     * // Get one ServiceOrder
     * const serviceOrder = await prisma.serviceOrder.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceOrderFindFirstArgs>(args?: SelectSubset<T, ServiceOrderFindFirstArgs<ExtArgs>>): Prisma__ServiceOrderClient<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceOrder that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrderFindFirstOrThrowArgs} args - Arguments to find a ServiceOrder
     * @example
     * // Get one ServiceOrder
     * const serviceOrder = await prisma.serviceOrder.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceOrderFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceOrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceOrderClient<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceOrders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceOrders
     * const serviceOrders = await prisma.serviceOrder.findMany()
     * 
     * // Get first 10 ServiceOrders
     * const serviceOrders = await prisma.serviceOrder.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceOrderWithIdOnly = await prisma.serviceOrder.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceOrderFindManyArgs>(args?: SelectSubset<T, ServiceOrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceOrder.
     * @param {ServiceOrderCreateArgs} args - Arguments to create a ServiceOrder.
     * @example
     * // Create one ServiceOrder
     * const ServiceOrder = await prisma.serviceOrder.create({
     *   data: {
     *     // ... data to create a ServiceOrder
     *   }
     * })
     * 
     */
    create<T extends ServiceOrderCreateArgs>(args: SelectSubset<T, ServiceOrderCreateArgs<ExtArgs>>): Prisma__ServiceOrderClient<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceOrders.
     * @param {ServiceOrderCreateManyArgs} args - Arguments to create many ServiceOrders.
     * @example
     * // Create many ServiceOrders
     * const serviceOrder = await prisma.serviceOrder.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceOrderCreateManyArgs>(args?: SelectSubset<T, ServiceOrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceOrders and returns the data saved in the database.
     * @param {ServiceOrderCreateManyAndReturnArgs} args - Arguments to create many ServiceOrders.
     * @example
     * // Create many ServiceOrders
     * const serviceOrder = await prisma.serviceOrder.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceOrders and only return the `id`
     * const serviceOrderWithIdOnly = await prisma.serviceOrder.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceOrderCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceOrderCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceOrder.
     * @param {ServiceOrderDeleteArgs} args - Arguments to delete one ServiceOrder.
     * @example
     * // Delete one ServiceOrder
     * const ServiceOrder = await prisma.serviceOrder.delete({
     *   where: {
     *     // ... filter to delete one ServiceOrder
     *   }
     * })
     * 
     */
    delete<T extends ServiceOrderDeleteArgs>(args: SelectSubset<T, ServiceOrderDeleteArgs<ExtArgs>>): Prisma__ServiceOrderClient<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceOrder.
     * @param {ServiceOrderUpdateArgs} args - Arguments to update one ServiceOrder.
     * @example
     * // Update one ServiceOrder
     * const serviceOrder = await prisma.serviceOrder.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceOrderUpdateArgs>(args: SelectSubset<T, ServiceOrderUpdateArgs<ExtArgs>>): Prisma__ServiceOrderClient<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceOrders.
     * @param {ServiceOrderDeleteManyArgs} args - Arguments to filter ServiceOrders to delete.
     * @example
     * // Delete a few ServiceOrders
     * const { count } = await prisma.serviceOrder.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceOrderDeleteManyArgs>(args?: SelectSubset<T, ServiceOrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceOrders
     * const serviceOrder = await prisma.serviceOrder.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceOrderUpdateManyArgs>(args: SelectSubset<T, ServiceOrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceOrders and returns the data updated in the database.
     * @param {ServiceOrderUpdateManyAndReturnArgs} args - Arguments to update many ServiceOrders.
     * @example
     * // Update many ServiceOrders
     * const serviceOrder = await prisma.serviceOrder.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceOrders and only return the `id`
     * const serviceOrderWithIdOnly = await prisma.serviceOrder.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceOrderUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceOrderUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceOrder.
     * @param {ServiceOrderUpsertArgs} args - Arguments to update or create a ServiceOrder.
     * @example
     * // Update or create a ServiceOrder
     * const serviceOrder = await prisma.serviceOrder.upsert({
     *   create: {
     *     // ... data to create a ServiceOrder
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceOrder we want to update
     *   }
     * })
     */
    upsert<T extends ServiceOrderUpsertArgs>(args: SelectSubset<T, ServiceOrderUpsertArgs<ExtArgs>>): Prisma__ServiceOrderClient<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceOrders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrderCountArgs} args - Arguments to filter ServiceOrders to count.
     * @example
     * // Count the number of ServiceOrders
     * const count = await prisma.serviceOrder.count({
     *   where: {
     *     // ... the filter for the ServiceOrders we want to count
     *   }
     * })
    **/
    count<T extends ServiceOrderCountArgs>(
      args?: Subset<T, ServiceOrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceOrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceOrderAggregateArgs>(args: Subset<T, ServiceOrderAggregateArgs>): Prisma.PrismaPromise<GetServiceOrderAggregateType<T>>

    /**
     * Group by ServiceOrder.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceOrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceOrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceOrderGroupByArgs['orderBy'] }
        : { orderBy?: ServiceOrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceOrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceOrder model
   */
  readonly fields: ServiceOrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceOrder.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceOrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    customer<T extends CustomerDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CustomerDefaultArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    vehicle<T extends VehicleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VehicleDefaultArgs<ExtArgs>>): Prisma__VehicleClient<$Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    services<T extends ServiceOrder$servicesArgs<ExtArgs> = {}>(args?: Subset<T, ServiceOrder$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    parts<T extends ServiceOrder$partsArgs<ExtArgs> = {}>(args?: Subset<T, ServiceOrder$partsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServiceOrder model
   */
  interface ServiceOrderFieldRefs {
    readonly id: FieldRef<"ServiceOrder", 'String'>
    readonly customerId: FieldRef<"ServiceOrder", 'String'>
    readonly vehicleId: FieldRef<"ServiceOrder", 'String'>
    readonly description: FieldRef<"ServiceOrder", 'String'>
    readonly status: FieldRef<"ServiceOrder", 'OrderStatus'>
    readonly totalPrice: FieldRef<"ServiceOrder", 'Decimal'>
    readonly createdAt: FieldRef<"ServiceOrder", 'DateTime'>
    readonly updatedAt: FieldRef<"ServiceOrder", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceOrder findUnique
   */
  export type ServiceOrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrder
     */
    select?: ServiceOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrder
     */
    omit?: ServiceOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrderInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrder to fetch.
     */
    where: ServiceOrderWhereUniqueInput
  }

  /**
   * ServiceOrder findUniqueOrThrow
   */
  export type ServiceOrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrder
     */
    select?: ServiceOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrder
     */
    omit?: ServiceOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrderInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrder to fetch.
     */
    where: ServiceOrderWhereUniqueInput
  }

  /**
   * ServiceOrder findFirst
   */
  export type ServiceOrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrder
     */
    select?: ServiceOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrder
     */
    omit?: ServiceOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrderInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrder to fetch.
     */
    where?: ServiceOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceOrders to fetch.
     */
    orderBy?: ServiceOrderOrderByWithRelationInput | ServiceOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceOrders.
     */
    cursor?: ServiceOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceOrders.
     */
    distinct?: ServiceOrderScalarFieldEnum | ServiceOrderScalarFieldEnum[]
  }

  /**
   * ServiceOrder findFirstOrThrow
   */
  export type ServiceOrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrder
     */
    select?: ServiceOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrder
     */
    omit?: ServiceOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrderInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrder to fetch.
     */
    where?: ServiceOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceOrders to fetch.
     */
    orderBy?: ServiceOrderOrderByWithRelationInput | ServiceOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceOrders.
     */
    cursor?: ServiceOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceOrders.
     */
    distinct?: ServiceOrderScalarFieldEnum | ServiceOrderScalarFieldEnum[]
  }

  /**
   * ServiceOrder findMany
   */
  export type ServiceOrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrder
     */
    select?: ServiceOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrder
     */
    omit?: ServiceOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrderInclude<ExtArgs> | null
    /**
     * Filter, which ServiceOrders to fetch.
     */
    where?: ServiceOrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceOrders to fetch.
     */
    orderBy?: ServiceOrderOrderByWithRelationInput | ServiceOrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceOrders.
     */
    cursor?: ServiceOrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceOrders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceOrders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceOrders.
     */
    distinct?: ServiceOrderScalarFieldEnum | ServiceOrderScalarFieldEnum[]
  }

  /**
   * ServiceOrder create
   */
  export type ServiceOrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrder
     */
    select?: ServiceOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrder
     */
    omit?: ServiceOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrderInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceOrder.
     */
    data: XOR<ServiceOrderCreateInput, ServiceOrderUncheckedCreateInput>
  }

  /**
   * ServiceOrder createMany
   */
  export type ServiceOrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceOrders.
     */
    data: ServiceOrderCreateManyInput | ServiceOrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceOrder createManyAndReturn
   */
  export type ServiceOrderCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrder
     */
    select?: ServiceOrderSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrder
     */
    omit?: ServiceOrderOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceOrders.
     */
    data: ServiceOrderCreateManyInput | ServiceOrderCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrderIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceOrder update
   */
  export type ServiceOrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrder
     */
    select?: ServiceOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrder
     */
    omit?: ServiceOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrderInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceOrder.
     */
    data: XOR<ServiceOrderUpdateInput, ServiceOrderUncheckedUpdateInput>
    /**
     * Choose, which ServiceOrder to update.
     */
    where: ServiceOrderWhereUniqueInput
  }

  /**
   * ServiceOrder updateMany
   */
  export type ServiceOrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceOrders.
     */
    data: XOR<ServiceOrderUpdateManyMutationInput, ServiceOrderUncheckedUpdateManyInput>
    /**
     * Filter which ServiceOrders to update
     */
    where?: ServiceOrderWhereInput
    /**
     * Limit how many ServiceOrders to update.
     */
    limit?: number
  }

  /**
   * ServiceOrder updateManyAndReturn
   */
  export type ServiceOrderUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrder
     */
    select?: ServiceOrderSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrder
     */
    omit?: ServiceOrderOmit<ExtArgs> | null
    /**
     * The data used to update ServiceOrders.
     */
    data: XOR<ServiceOrderUpdateManyMutationInput, ServiceOrderUncheckedUpdateManyInput>
    /**
     * Filter which ServiceOrders to update
     */
    where?: ServiceOrderWhereInput
    /**
     * Limit how many ServiceOrders to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrderIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ServiceOrder upsert
   */
  export type ServiceOrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrder
     */
    select?: ServiceOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrder
     */
    omit?: ServiceOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrderInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceOrder to update in case it exists.
     */
    where: ServiceOrderWhereUniqueInput
    /**
     * In case the ServiceOrder found by the `where` argument doesn't exist, create a new ServiceOrder with this data.
     */
    create: XOR<ServiceOrderCreateInput, ServiceOrderUncheckedCreateInput>
    /**
     * In case the ServiceOrder was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceOrderUpdateInput, ServiceOrderUncheckedUpdateInput>
  }

  /**
   * ServiceOrder delete
   */
  export type ServiceOrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrder
     */
    select?: ServiceOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrder
     */
    omit?: ServiceOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrderInclude<ExtArgs> | null
    /**
     * Filter which ServiceOrder to delete.
     */
    where: ServiceOrderWhereUniqueInput
  }

  /**
   * ServiceOrder deleteMany
   */
  export type ServiceOrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceOrders to delete
     */
    where?: ServiceOrderWhereInput
    /**
     * Limit how many ServiceOrders to delete.
     */
    limit?: number
  }

  /**
   * ServiceOrder.services
   */
  export type ServiceOrder$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderService
     */
    select?: OrderServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderService
     */
    omit?: OrderServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderServiceInclude<ExtArgs> | null
    where?: OrderServiceWhereInput
    orderBy?: OrderServiceOrderByWithRelationInput | OrderServiceOrderByWithRelationInput[]
    cursor?: OrderServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderServiceScalarFieldEnum | OrderServiceScalarFieldEnum[]
  }

  /**
   * ServiceOrder.parts
   */
  export type ServiceOrder$partsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPart
     */
    select?: OrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderPart
     */
    omit?: OrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderPartInclude<ExtArgs> | null
    where?: OrderPartWhereInput
    orderBy?: OrderPartOrderByWithRelationInput | OrderPartOrderByWithRelationInput[]
    cursor?: OrderPartWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderPartScalarFieldEnum | OrderPartScalarFieldEnum[]
  }

  /**
   * ServiceOrder without action
   */
  export type ServiceOrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceOrder
     */
    select?: ServiceOrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceOrder
     */
    omit?: ServiceOrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceOrderInclude<ExtArgs> | null
  }


  /**
   * Model OrderService
   */

  export type AggregateOrderService = {
    _count: OrderServiceCountAggregateOutputType | null
    _min: OrderServiceMinAggregateOutputType | null
    _max: OrderServiceMaxAggregateOutputType | null
  }

  export type OrderServiceMinAggregateOutputType = {
    id: string | null
    serviceOrderId: string | null
    serviceId: string | null
  }

  export type OrderServiceMaxAggregateOutputType = {
    id: string | null
    serviceOrderId: string | null
    serviceId: string | null
  }

  export type OrderServiceCountAggregateOutputType = {
    id: number
    serviceOrderId: number
    serviceId: number
    _all: number
  }


  export type OrderServiceMinAggregateInputType = {
    id?: true
    serviceOrderId?: true
    serviceId?: true
  }

  export type OrderServiceMaxAggregateInputType = {
    id?: true
    serviceOrderId?: true
    serviceId?: true
  }

  export type OrderServiceCountAggregateInputType = {
    id?: true
    serviceOrderId?: true
    serviceId?: true
    _all?: true
  }

  export type OrderServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderService to aggregate.
     */
    where?: OrderServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderServices to fetch.
     */
    orderBy?: OrderServiceOrderByWithRelationInput | OrderServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderServices
    **/
    _count?: true | OrderServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderServiceMaxAggregateInputType
  }

  export type GetOrderServiceAggregateType<T extends OrderServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderService[P]>
      : GetScalarType<T[P], AggregateOrderService[P]>
  }




  export type OrderServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderServiceWhereInput
    orderBy?: OrderServiceOrderByWithAggregationInput | OrderServiceOrderByWithAggregationInput[]
    by: OrderServiceScalarFieldEnum[] | OrderServiceScalarFieldEnum
    having?: OrderServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderServiceCountAggregateInputType | true
    _min?: OrderServiceMinAggregateInputType
    _max?: OrderServiceMaxAggregateInputType
  }

  export type OrderServiceGroupByOutputType = {
    id: string
    serviceOrderId: string
    serviceId: string
    _count: OrderServiceCountAggregateOutputType | null
    _min: OrderServiceMinAggregateOutputType | null
    _max: OrderServiceMaxAggregateOutputType | null
  }

  type GetOrderServiceGroupByPayload<T extends OrderServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderServiceGroupByOutputType[P]>
            : GetScalarType<T[P], OrderServiceGroupByOutputType[P]>
        }
      >
    >


  export type OrderServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceOrderId?: boolean
    serviceId?: boolean
    serviceOrder?: boolean | ServiceOrderDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderService"]>

  export type OrderServiceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceOrderId?: boolean
    serviceId?: boolean
    serviceOrder?: boolean | ServiceOrderDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderService"]>

  export type OrderServiceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceOrderId?: boolean
    serviceId?: boolean
    serviceOrder?: boolean | ServiceOrderDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderService"]>

  export type OrderServiceSelectScalar = {
    id?: boolean
    serviceOrderId?: boolean
    serviceId?: boolean
  }

  export type OrderServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "serviceOrderId" | "serviceId", ExtArgs["result"]["orderService"]>
  export type OrderServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceOrder?: boolean | ServiceOrderDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type OrderServiceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceOrder?: boolean | ServiceOrderDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }
  export type OrderServiceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceOrder?: boolean | ServiceOrderDefaultArgs<ExtArgs>
    service?: boolean | ServiceDefaultArgs<ExtArgs>
  }

  export type $OrderServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderService"
    objects: {
      serviceOrder: Prisma.$ServiceOrderPayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      serviceOrderId: string
      serviceId: string
    }, ExtArgs["result"]["orderService"]>
    composites: {}
  }

  type OrderServiceGetPayload<S extends boolean | null | undefined | OrderServiceDefaultArgs> = $Result.GetResult<Prisma.$OrderServicePayload, S>

  type OrderServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderServiceCountAggregateInputType | true
    }

  export interface OrderServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderService'], meta: { name: 'OrderService' } }
    /**
     * Find zero or one OrderService that matches the filter.
     * @param {OrderServiceFindUniqueArgs} args - Arguments to find a OrderService
     * @example
     * // Get one OrderService
     * const orderService = await prisma.orderService.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderServiceFindUniqueArgs>(args: SelectSubset<T, OrderServiceFindUniqueArgs<ExtArgs>>): Prisma__OrderServiceClient<$Result.GetResult<Prisma.$OrderServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderService that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderServiceFindUniqueOrThrowArgs} args - Arguments to find a OrderService
     * @example
     * // Get one OrderService
     * const orderService = await prisma.orderService.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderServiceClient<$Result.GetResult<Prisma.$OrderServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderService that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderServiceFindFirstArgs} args - Arguments to find a OrderService
     * @example
     * // Get one OrderService
     * const orderService = await prisma.orderService.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderServiceFindFirstArgs>(args?: SelectSubset<T, OrderServiceFindFirstArgs<ExtArgs>>): Prisma__OrderServiceClient<$Result.GetResult<Prisma.$OrderServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderService that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderServiceFindFirstOrThrowArgs} args - Arguments to find a OrderService
     * @example
     * // Get one OrderService
     * const orderService = await prisma.orderService.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderServiceClient<$Result.GetResult<Prisma.$OrderServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderServices that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderServices
     * const orderServices = await prisma.orderService.findMany()
     * 
     * // Get first 10 OrderServices
     * const orderServices = await prisma.orderService.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderServiceWithIdOnly = await prisma.orderService.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderServiceFindManyArgs>(args?: SelectSubset<T, OrderServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderService.
     * @param {OrderServiceCreateArgs} args - Arguments to create a OrderService.
     * @example
     * // Create one OrderService
     * const OrderService = await prisma.orderService.create({
     *   data: {
     *     // ... data to create a OrderService
     *   }
     * })
     * 
     */
    create<T extends OrderServiceCreateArgs>(args: SelectSubset<T, OrderServiceCreateArgs<ExtArgs>>): Prisma__OrderServiceClient<$Result.GetResult<Prisma.$OrderServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderServices.
     * @param {OrderServiceCreateManyArgs} args - Arguments to create many OrderServices.
     * @example
     * // Create many OrderServices
     * const orderService = await prisma.orderService.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderServiceCreateManyArgs>(args?: SelectSubset<T, OrderServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderServices and returns the data saved in the database.
     * @param {OrderServiceCreateManyAndReturnArgs} args - Arguments to create many OrderServices.
     * @example
     * // Create many OrderServices
     * const orderService = await prisma.orderService.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderServices and only return the `id`
     * const orderServiceWithIdOnly = await prisma.orderService.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderServiceCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderService.
     * @param {OrderServiceDeleteArgs} args - Arguments to delete one OrderService.
     * @example
     * // Delete one OrderService
     * const OrderService = await prisma.orderService.delete({
     *   where: {
     *     // ... filter to delete one OrderService
     *   }
     * })
     * 
     */
    delete<T extends OrderServiceDeleteArgs>(args: SelectSubset<T, OrderServiceDeleteArgs<ExtArgs>>): Prisma__OrderServiceClient<$Result.GetResult<Prisma.$OrderServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderService.
     * @param {OrderServiceUpdateArgs} args - Arguments to update one OrderService.
     * @example
     * // Update one OrderService
     * const orderService = await prisma.orderService.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderServiceUpdateArgs>(args: SelectSubset<T, OrderServiceUpdateArgs<ExtArgs>>): Prisma__OrderServiceClient<$Result.GetResult<Prisma.$OrderServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderServices.
     * @param {OrderServiceDeleteManyArgs} args - Arguments to filter OrderServices to delete.
     * @example
     * // Delete a few OrderServices
     * const { count } = await prisma.orderService.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderServiceDeleteManyArgs>(args?: SelectSubset<T, OrderServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderServices
     * const orderService = await prisma.orderService.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderServiceUpdateManyArgs>(args: SelectSubset<T, OrderServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderServices and returns the data updated in the database.
     * @param {OrderServiceUpdateManyAndReturnArgs} args - Arguments to update many OrderServices.
     * @example
     * // Update many OrderServices
     * const orderService = await prisma.orderService.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderServices and only return the `id`
     * const orderServiceWithIdOnly = await prisma.orderService.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderServiceUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderService.
     * @param {OrderServiceUpsertArgs} args - Arguments to update or create a OrderService.
     * @example
     * // Update or create a OrderService
     * const orderService = await prisma.orderService.upsert({
     *   create: {
     *     // ... data to create a OrderService
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderService we want to update
     *   }
     * })
     */
    upsert<T extends OrderServiceUpsertArgs>(args: SelectSubset<T, OrderServiceUpsertArgs<ExtArgs>>): Prisma__OrderServiceClient<$Result.GetResult<Prisma.$OrderServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderServices.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderServiceCountArgs} args - Arguments to filter OrderServices to count.
     * @example
     * // Count the number of OrderServices
     * const count = await prisma.orderService.count({
     *   where: {
     *     // ... the filter for the OrderServices we want to count
     *   }
     * })
    **/
    count<T extends OrderServiceCountArgs>(
      args?: Subset<T, OrderServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderServiceAggregateArgs>(args: Subset<T, OrderServiceAggregateArgs>): Prisma.PrismaPromise<GetOrderServiceAggregateType<T>>

    /**
     * Group by OrderService.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderServiceGroupByArgs['orderBy'] }
        : { orderBy?: OrderServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderService model
   */
  readonly fields: OrderServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderService.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    serviceOrder<T extends ServiceOrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceOrderDefaultArgs<ExtArgs>>): Prisma__ServiceOrderClient<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    service<T extends ServiceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceDefaultArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderService model
   */
  interface OrderServiceFieldRefs {
    readonly id: FieldRef<"OrderService", 'String'>
    readonly serviceOrderId: FieldRef<"OrderService", 'String'>
    readonly serviceId: FieldRef<"OrderService", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OrderService findUnique
   */
  export type OrderServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderService
     */
    select?: OrderServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderService
     */
    omit?: OrderServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderServiceInclude<ExtArgs> | null
    /**
     * Filter, which OrderService to fetch.
     */
    where: OrderServiceWhereUniqueInput
  }

  /**
   * OrderService findUniqueOrThrow
   */
  export type OrderServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderService
     */
    select?: OrderServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderService
     */
    omit?: OrderServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderServiceInclude<ExtArgs> | null
    /**
     * Filter, which OrderService to fetch.
     */
    where: OrderServiceWhereUniqueInput
  }

  /**
   * OrderService findFirst
   */
  export type OrderServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderService
     */
    select?: OrderServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderService
     */
    omit?: OrderServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderServiceInclude<ExtArgs> | null
    /**
     * Filter, which OrderService to fetch.
     */
    where?: OrderServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderServices to fetch.
     */
    orderBy?: OrderServiceOrderByWithRelationInput | OrderServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderServices.
     */
    cursor?: OrderServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderServices.
     */
    distinct?: OrderServiceScalarFieldEnum | OrderServiceScalarFieldEnum[]
  }

  /**
   * OrderService findFirstOrThrow
   */
  export type OrderServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderService
     */
    select?: OrderServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderService
     */
    omit?: OrderServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderServiceInclude<ExtArgs> | null
    /**
     * Filter, which OrderService to fetch.
     */
    where?: OrderServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderServices to fetch.
     */
    orderBy?: OrderServiceOrderByWithRelationInput | OrderServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderServices.
     */
    cursor?: OrderServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderServices.
     */
    distinct?: OrderServiceScalarFieldEnum | OrderServiceScalarFieldEnum[]
  }

  /**
   * OrderService findMany
   */
  export type OrderServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderService
     */
    select?: OrderServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderService
     */
    omit?: OrderServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderServiceInclude<ExtArgs> | null
    /**
     * Filter, which OrderServices to fetch.
     */
    where?: OrderServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderServices to fetch.
     */
    orderBy?: OrderServiceOrderByWithRelationInput | OrderServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderServices.
     */
    cursor?: OrderServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderServices from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderServices.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderServices.
     */
    distinct?: OrderServiceScalarFieldEnum | OrderServiceScalarFieldEnum[]
  }

  /**
   * OrderService create
   */
  export type OrderServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderService
     */
    select?: OrderServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderService
     */
    omit?: OrderServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderService.
     */
    data: XOR<OrderServiceCreateInput, OrderServiceUncheckedCreateInput>
  }

  /**
   * OrderService createMany
   */
  export type OrderServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderServices.
     */
    data: OrderServiceCreateManyInput | OrderServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderService createManyAndReturn
   */
  export type OrderServiceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderService
     */
    select?: OrderServiceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderService
     */
    omit?: OrderServiceOmit<ExtArgs> | null
    /**
     * The data used to create many OrderServices.
     */
    data: OrderServiceCreateManyInput | OrderServiceCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderServiceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderService update
   */
  export type OrderServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderService
     */
    select?: OrderServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderService
     */
    omit?: OrderServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderService.
     */
    data: XOR<OrderServiceUpdateInput, OrderServiceUncheckedUpdateInput>
    /**
     * Choose, which OrderService to update.
     */
    where: OrderServiceWhereUniqueInput
  }

  /**
   * OrderService updateMany
   */
  export type OrderServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderServices.
     */
    data: XOR<OrderServiceUpdateManyMutationInput, OrderServiceUncheckedUpdateManyInput>
    /**
     * Filter which OrderServices to update
     */
    where?: OrderServiceWhereInput
    /**
     * Limit how many OrderServices to update.
     */
    limit?: number
  }

  /**
   * OrderService updateManyAndReturn
   */
  export type OrderServiceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderService
     */
    select?: OrderServiceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderService
     */
    omit?: OrderServiceOmit<ExtArgs> | null
    /**
     * The data used to update OrderServices.
     */
    data: XOR<OrderServiceUpdateManyMutationInput, OrderServiceUncheckedUpdateManyInput>
    /**
     * Filter which OrderServices to update
     */
    where?: OrderServiceWhereInput
    /**
     * Limit how many OrderServices to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderServiceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderService upsert
   */
  export type OrderServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderService
     */
    select?: OrderServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderService
     */
    omit?: OrderServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderService to update in case it exists.
     */
    where: OrderServiceWhereUniqueInput
    /**
     * In case the OrderService found by the `where` argument doesn't exist, create a new OrderService with this data.
     */
    create: XOR<OrderServiceCreateInput, OrderServiceUncheckedCreateInput>
    /**
     * In case the OrderService was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderServiceUpdateInput, OrderServiceUncheckedUpdateInput>
  }

  /**
   * OrderService delete
   */
  export type OrderServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderService
     */
    select?: OrderServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderService
     */
    omit?: OrderServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderServiceInclude<ExtArgs> | null
    /**
     * Filter which OrderService to delete.
     */
    where: OrderServiceWhereUniqueInput
  }

  /**
   * OrderService deleteMany
   */
  export type OrderServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderServices to delete
     */
    where?: OrderServiceWhereInput
    /**
     * Limit how many OrderServices to delete.
     */
    limit?: number
  }

  /**
   * OrderService without action
   */
  export type OrderServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderService
     */
    select?: OrderServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderService
     */
    omit?: OrderServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderServiceInclude<ExtArgs> | null
  }


  /**
   * Model OrderPart
   */

  export type AggregateOrderPart = {
    _count: OrderPartCountAggregateOutputType | null
    _avg: OrderPartAvgAggregateOutputType | null
    _sum: OrderPartSumAggregateOutputType | null
    _min: OrderPartMinAggregateOutputType | null
    _max: OrderPartMaxAggregateOutputType | null
  }

  export type OrderPartAvgAggregateOutputType = {
    quantity: number | null
  }

  export type OrderPartSumAggregateOutputType = {
    quantity: number | null
  }

  export type OrderPartMinAggregateOutputType = {
    id: string | null
    serviceOrderId: string | null
    partId: string | null
    quantity: number | null
  }

  export type OrderPartMaxAggregateOutputType = {
    id: string | null
    serviceOrderId: string | null
    partId: string | null
    quantity: number | null
  }

  export type OrderPartCountAggregateOutputType = {
    id: number
    serviceOrderId: number
    partId: number
    quantity: number
    _all: number
  }


  export type OrderPartAvgAggregateInputType = {
    quantity?: true
  }

  export type OrderPartSumAggregateInputType = {
    quantity?: true
  }

  export type OrderPartMinAggregateInputType = {
    id?: true
    serviceOrderId?: true
    partId?: true
    quantity?: true
  }

  export type OrderPartMaxAggregateInputType = {
    id?: true
    serviceOrderId?: true
    partId?: true
    quantity?: true
  }

  export type OrderPartCountAggregateInputType = {
    id?: true
    serviceOrderId?: true
    partId?: true
    quantity?: true
    _all?: true
  }

  export type OrderPartAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderPart to aggregate.
     */
    where?: OrderPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderParts to fetch.
     */
    orderBy?: OrderPartOrderByWithRelationInput | OrderPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OrderParts
    **/
    _count?: true | OrderPartCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderPartAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderPartSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderPartMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderPartMaxAggregateInputType
  }

  export type GetOrderPartAggregateType<T extends OrderPartAggregateArgs> = {
        [P in keyof T & keyof AggregateOrderPart]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrderPart[P]>
      : GetScalarType<T[P], AggregateOrderPart[P]>
  }




  export type OrderPartGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderPartWhereInput
    orderBy?: OrderPartOrderByWithAggregationInput | OrderPartOrderByWithAggregationInput[]
    by: OrderPartScalarFieldEnum[] | OrderPartScalarFieldEnum
    having?: OrderPartScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderPartCountAggregateInputType | true
    _avg?: OrderPartAvgAggregateInputType
    _sum?: OrderPartSumAggregateInputType
    _min?: OrderPartMinAggregateInputType
    _max?: OrderPartMaxAggregateInputType
  }

  export type OrderPartGroupByOutputType = {
    id: string
    serviceOrderId: string
    partId: string
    quantity: number
    _count: OrderPartCountAggregateOutputType | null
    _avg: OrderPartAvgAggregateOutputType | null
    _sum: OrderPartSumAggregateOutputType | null
    _min: OrderPartMinAggregateOutputType | null
    _max: OrderPartMaxAggregateOutputType | null
  }

  type GetOrderPartGroupByPayload<T extends OrderPartGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderPartGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderPartGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderPartGroupByOutputType[P]>
            : GetScalarType<T[P], OrderPartGroupByOutputType[P]>
        }
      >
    >


  export type OrderPartSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceOrderId?: boolean
    partId?: boolean
    quantity?: boolean
    serviceOrder?: boolean | ServiceOrderDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderPart"]>

  export type OrderPartSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceOrderId?: boolean
    partId?: boolean
    quantity?: boolean
    serviceOrder?: boolean | ServiceOrderDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderPart"]>

  export type OrderPartSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    serviceOrderId?: boolean
    partId?: boolean
    quantity?: boolean
    serviceOrder?: boolean | ServiceOrderDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["orderPart"]>

  export type OrderPartSelectScalar = {
    id?: boolean
    serviceOrderId?: boolean
    partId?: boolean
    quantity?: boolean
  }

  export type OrderPartOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "serviceOrderId" | "partId" | "quantity", ExtArgs["result"]["orderPart"]>
  export type OrderPartInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceOrder?: boolean | ServiceOrderDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
  }
  export type OrderPartIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceOrder?: boolean | ServiceOrderDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
  }
  export type OrderPartIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceOrder?: boolean | ServiceOrderDefaultArgs<ExtArgs>
    part?: boolean | PartDefaultArgs<ExtArgs>
  }

  export type $OrderPartPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OrderPart"
    objects: {
      serviceOrder: Prisma.$ServiceOrderPayload<ExtArgs>
      part: Prisma.$PartPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      serviceOrderId: string
      partId: string
      quantity: number
    }, ExtArgs["result"]["orderPart"]>
    composites: {}
  }

  type OrderPartGetPayload<S extends boolean | null | undefined | OrderPartDefaultArgs> = $Result.GetResult<Prisma.$OrderPartPayload, S>

  type OrderPartCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderPartFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderPartCountAggregateInputType | true
    }

  export interface OrderPartDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OrderPart'], meta: { name: 'OrderPart' } }
    /**
     * Find zero or one OrderPart that matches the filter.
     * @param {OrderPartFindUniqueArgs} args - Arguments to find a OrderPart
     * @example
     * // Get one OrderPart
     * const orderPart = await prisma.orderPart.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderPartFindUniqueArgs>(args: SelectSubset<T, OrderPartFindUniqueArgs<ExtArgs>>): Prisma__OrderPartClient<$Result.GetResult<Prisma.$OrderPartPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OrderPart that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderPartFindUniqueOrThrowArgs} args - Arguments to find a OrderPart
     * @example
     * // Get one OrderPart
     * const orderPart = await prisma.orderPart.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderPartFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderPartFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderPartClient<$Result.GetResult<Prisma.$OrderPartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderPart that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderPartFindFirstArgs} args - Arguments to find a OrderPart
     * @example
     * // Get one OrderPart
     * const orderPart = await prisma.orderPart.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderPartFindFirstArgs>(args?: SelectSubset<T, OrderPartFindFirstArgs<ExtArgs>>): Prisma__OrderPartClient<$Result.GetResult<Prisma.$OrderPartPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OrderPart that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderPartFindFirstOrThrowArgs} args - Arguments to find a OrderPart
     * @example
     * // Get one OrderPart
     * const orderPart = await prisma.orderPart.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderPartFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderPartFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderPartClient<$Result.GetResult<Prisma.$OrderPartPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OrderParts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderPartFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OrderParts
     * const orderParts = await prisma.orderPart.findMany()
     * 
     * // Get first 10 OrderParts
     * const orderParts = await prisma.orderPart.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderPartWithIdOnly = await prisma.orderPart.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderPartFindManyArgs>(args?: SelectSubset<T, OrderPartFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPartPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OrderPart.
     * @param {OrderPartCreateArgs} args - Arguments to create a OrderPart.
     * @example
     * // Create one OrderPart
     * const OrderPart = await prisma.orderPart.create({
     *   data: {
     *     // ... data to create a OrderPart
     *   }
     * })
     * 
     */
    create<T extends OrderPartCreateArgs>(args: SelectSubset<T, OrderPartCreateArgs<ExtArgs>>): Prisma__OrderPartClient<$Result.GetResult<Prisma.$OrderPartPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OrderParts.
     * @param {OrderPartCreateManyArgs} args - Arguments to create many OrderParts.
     * @example
     * // Create many OrderParts
     * const orderPart = await prisma.orderPart.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderPartCreateManyArgs>(args?: SelectSubset<T, OrderPartCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OrderParts and returns the data saved in the database.
     * @param {OrderPartCreateManyAndReturnArgs} args - Arguments to create many OrderParts.
     * @example
     * // Create many OrderParts
     * const orderPart = await prisma.orderPart.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OrderParts and only return the `id`
     * const orderPartWithIdOnly = await prisma.orderPart.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OrderPartCreateManyAndReturnArgs>(args?: SelectSubset<T, OrderPartCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPartPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OrderPart.
     * @param {OrderPartDeleteArgs} args - Arguments to delete one OrderPart.
     * @example
     * // Delete one OrderPart
     * const OrderPart = await prisma.orderPart.delete({
     *   where: {
     *     // ... filter to delete one OrderPart
     *   }
     * })
     * 
     */
    delete<T extends OrderPartDeleteArgs>(args: SelectSubset<T, OrderPartDeleteArgs<ExtArgs>>): Prisma__OrderPartClient<$Result.GetResult<Prisma.$OrderPartPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OrderPart.
     * @param {OrderPartUpdateArgs} args - Arguments to update one OrderPart.
     * @example
     * // Update one OrderPart
     * const orderPart = await prisma.orderPart.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderPartUpdateArgs>(args: SelectSubset<T, OrderPartUpdateArgs<ExtArgs>>): Prisma__OrderPartClient<$Result.GetResult<Prisma.$OrderPartPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OrderParts.
     * @param {OrderPartDeleteManyArgs} args - Arguments to filter OrderParts to delete.
     * @example
     * // Delete a few OrderParts
     * const { count } = await prisma.orderPart.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderPartDeleteManyArgs>(args?: SelectSubset<T, OrderPartDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderPartUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OrderParts
     * const orderPart = await prisma.orderPart.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderPartUpdateManyArgs>(args: SelectSubset<T, OrderPartUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OrderParts and returns the data updated in the database.
     * @param {OrderPartUpdateManyAndReturnArgs} args - Arguments to update many OrderParts.
     * @example
     * // Update many OrderParts
     * const orderPart = await prisma.orderPart.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OrderParts and only return the `id`
     * const orderPartWithIdOnly = await prisma.orderPart.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OrderPartUpdateManyAndReturnArgs>(args: SelectSubset<T, OrderPartUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPartPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OrderPart.
     * @param {OrderPartUpsertArgs} args - Arguments to update or create a OrderPart.
     * @example
     * // Update or create a OrderPart
     * const orderPart = await prisma.orderPart.upsert({
     *   create: {
     *     // ... data to create a OrderPart
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OrderPart we want to update
     *   }
     * })
     */
    upsert<T extends OrderPartUpsertArgs>(args: SelectSubset<T, OrderPartUpsertArgs<ExtArgs>>): Prisma__OrderPartClient<$Result.GetResult<Prisma.$OrderPartPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OrderParts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderPartCountArgs} args - Arguments to filter OrderParts to count.
     * @example
     * // Count the number of OrderParts
     * const count = await prisma.orderPart.count({
     *   where: {
     *     // ... the filter for the OrderParts we want to count
     *   }
     * })
    **/
    count<T extends OrderPartCountArgs>(
      args?: Subset<T, OrderPartCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderPartCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OrderPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderPartAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderPartAggregateArgs>(args: Subset<T, OrderPartAggregateArgs>): Prisma.PrismaPromise<GetOrderPartAggregateType<T>>

    /**
     * Group by OrderPart.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderPartGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderPartGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderPartGroupByArgs['orderBy'] }
        : { orderBy?: OrderPartGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderPartGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderPartGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OrderPart model
   */
  readonly fields: OrderPartFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OrderPart.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderPartClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    serviceOrder<T extends ServiceOrderDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ServiceOrderDefaultArgs<ExtArgs>>): Prisma__ServiceOrderClient<$Result.GetResult<Prisma.$ServiceOrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    part<T extends PartDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PartDefaultArgs<ExtArgs>>): Prisma__PartClient<$Result.GetResult<Prisma.$PartPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OrderPart model
   */
  interface OrderPartFieldRefs {
    readonly id: FieldRef<"OrderPart", 'String'>
    readonly serviceOrderId: FieldRef<"OrderPart", 'String'>
    readonly partId: FieldRef<"OrderPart", 'String'>
    readonly quantity: FieldRef<"OrderPart", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * OrderPart findUnique
   */
  export type OrderPartFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPart
     */
    select?: OrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderPart
     */
    omit?: OrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderPartInclude<ExtArgs> | null
    /**
     * Filter, which OrderPart to fetch.
     */
    where: OrderPartWhereUniqueInput
  }

  /**
   * OrderPart findUniqueOrThrow
   */
  export type OrderPartFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPart
     */
    select?: OrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderPart
     */
    omit?: OrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderPartInclude<ExtArgs> | null
    /**
     * Filter, which OrderPart to fetch.
     */
    where: OrderPartWhereUniqueInput
  }

  /**
   * OrderPart findFirst
   */
  export type OrderPartFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPart
     */
    select?: OrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderPart
     */
    omit?: OrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderPartInclude<ExtArgs> | null
    /**
     * Filter, which OrderPart to fetch.
     */
    where?: OrderPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderParts to fetch.
     */
    orderBy?: OrderPartOrderByWithRelationInput | OrderPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderParts.
     */
    cursor?: OrderPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderParts.
     */
    distinct?: OrderPartScalarFieldEnum | OrderPartScalarFieldEnum[]
  }

  /**
   * OrderPart findFirstOrThrow
   */
  export type OrderPartFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPart
     */
    select?: OrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderPart
     */
    omit?: OrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderPartInclude<ExtArgs> | null
    /**
     * Filter, which OrderPart to fetch.
     */
    where?: OrderPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderParts to fetch.
     */
    orderBy?: OrderPartOrderByWithRelationInput | OrderPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OrderParts.
     */
    cursor?: OrderPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderParts.
     */
    distinct?: OrderPartScalarFieldEnum | OrderPartScalarFieldEnum[]
  }

  /**
   * OrderPart findMany
   */
  export type OrderPartFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPart
     */
    select?: OrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderPart
     */
    omit?: OrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderPartInclude<ExtArgs> | null
    /**
     * Filter, which OrderParts to fetch.
     */
    where?: OrderPartWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OrderParts to fetch.
     */
    orderBy?: OrderPartOrderByWithRelationInput | OrderPartOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OrderParts.
     */
    cursor?: OrderPartWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OrderParts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OrderParts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OrderParts.
     */
    distinct?: OrderPartScalarFieldEnum | OrderPartScalarFieldEnum[]
  }

  /**
   * OrderPart create
   */
  export type OrderPartCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPart
     */
    select?: OrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderPart
     */
    omit?: OrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderPartInclude<ExtArgs> | null
    /**
     * The data needed to create a OrderPart.
     */
    data: XOR<OrderPartCreateInput, OrderPartUncheckedCreateInput>
  }

  /**
   * OrderPart createMany
   */
  export type OrderPartCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OrderParts.
     */
    data: OrderPartCreateManyInput | OrderPartCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OrderPart createManyAndReturn
   */
  export type OrderPartCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPart
     */
    select?: OrderPartSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderPart
     */
    omit?: OrderPartOmit<ExtArgs> | null
    /**
     * The data used to create many OrderParts.
     */
    data: OrderPartCreateManyInput | OrderPartCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderPartIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderPart update
   */
  export type OrderPartUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPart
     */
    select?: OrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderPart
     */
    omit?: OrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderPartInclude<ExtArgs> | null
    /**
     * The data needed to update a OrderPart.
     */
    data: XOR<OrderPartUpdateInput, OrderPartUncheckedUpdateInput>
    /**
     * Choose, which OrderPart to update.
     */
    where: OrderPartWhereUniqueInput
  }

  /**
   * OrderPart updateMany
   */
  export type OrderPartUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OrderParts.
     */
    data: XOR<OrderPartUpdateManyMutationInput, OrderPartUncheckedUpdateManyInput>
    /**
     * Filter which OrderParts to update
     */
    where?: OrderPartWhereInput
    /**
     * Limit how many OrderParts to update.
     */
    limit?: number
  }

  /**
   * OrderPart updateManyAndReturn
   */
  export type OrderPartUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPart
     */
    select?: OrderPartSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OrderPart
     */
    omit?: OrderPartOmit<ExtArgs> | null
    /**
     * The data used to update OrderParts.
     */
    data: XOR<OrderPartUpdateManyMutationInput, OrderPartUncheckedUpdateManyInput>
    /**
     * Filter which OrderParts to update
     */
    where?: OrderPartWhereInput
    /**
     * Limit how many OrderParts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderPartIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OrderPart upsert
   */
  export type OrderPartUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPart
     */
    select?: OrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderPart
     */
    omit?: OrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderPartInclude<ExtArgs> | null
    /**
     * The filter to search for the OrderPart to update in case it exists.
     */
    where: OrderPartWhereUniqueInput
    /**
     * In case the OrderPart found by the `where` argument doesn't exist, create a new OrderPart with this data.
     */
    create: XOR<OrderPartCreateInput, OrderPartUncheckedCreateInput>
    /**
     * In case the OrderPart was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderPartUpdateInput, OrderPartUncheckedUpdateInput>
  }

  /**
   * OrderPart delete
   */
  export type OrderPartDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPart
     */
    select?: OrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderPart
     */
    omit?: OrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderPartInclude<ExtArgs> | null
    /**
     * Filter which OrderPart to delete.
     */
    where: OrderPartWhereUniqueInput
  }

  /**
   * OrderPart deleteMany
   */
  export type OrderPartDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OrderParts to delete
     */
    where?: OrderPartWhereInput
    /**
     * Limit how many OrderParts to delete.
     */
    limit?: number
  }

  /**
   * OrderPart without action
   */
  export type OrderPartDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderPart
     */
    select?: OrderPartSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OrderPart
     */
    omit?: OrderPartOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderPartInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    document: 'document',
    email: 'email',
    phone: 'phone',
    createdAt: 'createdAt'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const VehicleScalarFieldEnum: {
    id: 'id',
    plate: 'plate',
    brand: 'brand',
    model: 'model',
    year: 'year',
    customerId: 'customerId'
  };

  export type VehicleScalarFieldEnum = (typeof VehicleScalarFieldEnum)[keyof typeof VehicleScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    price: 'price',
    estimatedTime: 'estimatedTime'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const PartScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    price: 'price',
    stockQty: 'stockQty'
  };

  export type PartScalarFieldEnum = (typeof PartScalarFieldEnum)[keyof typeof PartScalarFieldEnum]


  export const ServiceOrderScalarFieldEnum: {
    id: 'id',
    customerId: 'customerId',
    vehicleId: 'vehicleId',
    description: 'description',
    status: 'status',
    totalPrice: 'totalPrice',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceOrderScalarFieldEnum = (typeof ServiceOrderScalarFieldEnum)[keyof typeof ServiceOrderScalarFieldEnum]


  export const OrderServiceScalarFieldEnum: {
    id: 'id',
    serviceOrderId: 'serviceOrderId',
    serviceId: 'serviceId'
  };

  export type OrderServiceScalarFieldEnum = (typeof OrderServiceScalarFieldEnum)[keyof typeof OrderServiceScalarFieldEnum]


  export const OrderPartScalarFieldEnum: {
    id: 'id',
    serviceOrderId: 'serviceOrderId',
    partId: 'partId',
    quantity: 'quantity'
  };

  export type OrderPartScalarFieldEnum = (typeof OrderPartScalarFieldEnum)[keyof typeof OrderPartScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus[]'
   */
  export type ListEnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    name?: StringFilter<"Customer"> | string
    document?: StringFilter<"Customer"> | string
    email?: StringFilter<"Customer"> | string
    phone?: StringFilter<"Customer"> | string
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    vehicles?: VehicleListRelationFilter
    orders?: ServiceOrderListRelationFilter
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    document?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    vehicles?: VehicleOrderByRelationAggregateInput
    orders?: ServiceOrderOrderByRelationAggregateInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    document?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    name?: StringFilter<"Customer"> | string
    email?: StringFilter<"Customer"> | string
    phone?: StringFilter<"Customer"> | string
    createdAt?: DateTimeFilter<"Customer"> | Date | string
    vehicles?: VehicleListRelationFilter
    orders?: ServiceOrderListRelationFilter
  }, "id" | "document">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    document?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    name?: StringWithAggregatesFilter<"Customer"> | string
    document?: StringWithAggregatesFilter<"Customer"> | string
    email?: StringWithAggregatesFilter<"Customer"> | string
    phone?: StringWithAggregatesFilter<"Customer"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Customer"> | Date | string
  }

  export type VehicleWhereInput = {
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    plate?: StringFilter<"Vehicle"> | string
    brand?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    year?: IntFilter<"Vehicle"> | number
    customerId?: StringFilter<"Vehicle"> | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    orders?: ServiceOrderListRelationFilter
  }

  export type VehicleOrderByWithRelationInput = {
    id?: SortOrder
    plate?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    year?: SortOrder
    customerId?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    orders?: ServiceOrderOrderByRelationAggregateInput
  }

  export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    plate?: string
    AND?: VehicleWhereInput | VehicleWhereInput[]
    OR?: VehicleWhereInput[]
    NOT?: VehicleWhereInput | VehicleWhereInput[]
    brand?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    year?: IntFilter<"Vehicle"> | number
    customerId?: StringFilter<"Vehicle"> | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    orders?: ServiceOrderListRelationFilter
  }, "id" | "plate">

  export type VehicleOrderByWithAggregationInput = {
    id?: SortOrder
    plate?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    year?: SortOrder
    customerId?: SortOrder
    _count?: VehicleCountOrderByAggregateInput
    _avg?: VehicleAvgOrderByAggregateInput
    _max?: VehicleMaxOrderByAggregateInput
    _min?: VehicleMinOrderByAggregateInput
    _sum?: VehicleSumOrderByAggregateInput
  }

  export type VehicleScalarWhereWithAggregatesInput = {
    AND?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    OR?: VehicleScalarWhereWithAggregatesInput[]
    NOT?: VehicleScalarWhereWithAggregatesInput | VehicleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vehicle"> | string
    plate?: StringWithAggregatesFilter<"Vehicle"> | string
    brand?: StringWithAggregatesFilter<"Vehicle"> | string
    model?: StringWithAggregatesFilter<"Vehicle"> | string
    year?: IntWithAggregatesFilter<"Vehicle"> | number
    customerId?: StringWithAggregatesFilter<"Vehicle"> | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    name?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    price?: DecimalFilter<"Service"> | Decimal | DecimalJsLike | number | string
    estimatedTime?: IntFilter<"Service"> | number
    orderServices?: OrderServiceListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    estimatedTime?: SortOrder
    orderServices?: OrderServiceOrderByRelationAggregateInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    name?: StringFilter<"Service"> | string
    description?: StringNullableFilter<"Service"> | string | null
    price?: DecimalFilter<"Service"> | Decimal | DecimalJsLike | number | string
    estimatedTime?: IntFilter<"Service"> | number
    orderServices?: OrderServiceListRelationFilter
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    estimatedTime?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    name?: StringWithAggregatesFilter<"Service"> | string
    description?: StringNullableWithAggregatesFilter<"Service"> | string | null
    price?: DecimalWithAggregatesFilter<"Service"> | Decimal | DecimalJsLike | number | string
    estimatedTime?: IntWithAggregatesFilter<"Service"> | number
  }

  export type PartWhereInput = {
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    id?: StringFilter<"Part"> | string
    name?: StringFilter<"Part"> | string
    description?: StringNullableFilter<"Part"> | string | null
    price?: DecimalFilter<"Part"> | Decimal | DecimalJsLike | number | string
    stockQty?: IntFilter<"Part"> | number
    orderParts?: OrderPartListRelationFilter
  }

  export type PartOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    stockQty?: SortOrder
    orderParts?: OrderPartOrderByRelationAggregateInput
  }

  export type PartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PartWhereInput | PartWhereInput[]
    OR?: PartWhereInput[]
    NOT?: PartWhereInput | PartWhereInput[]
    name?: StringFilter<"Part"> | string
    description?: StringNullableFilter<"Part"> | string | null
    price?: DecimalFilter<"Part"> | Decimal | DecimalJsLike | number | string
    stockQty?: IntFilter<"Part"> | number
    orderParts?: OrderPartListRelationFilter
  }, "id">

  export type PartOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    price?: SortOrder
    stockQty?: SortOrder
    _count?: PartCountOrderByAggregateInput
    _avg?: PartAvgOrderByAggregateInput
    _max?: PartMaxOrderByAggregateInput
    _min?: PartMinOrderByAggregateInput
    _sum?: PartSumOrderByAggregateInput
  }

  export type PartScalarWhereWithAggregatesInput = {
    AND?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    OR?: PartScalarWhereWithAggregatesInput[]
    NOT?: PartScalarWhereWithAggregatesInput | PartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Part"> | string
    name?: StringWithAggregatesFilter<"Part"> | string
    description?: StringNullableWithAggregatesFilter<"Part"> | string | null
    price?: DecimalWithAggregatesFilter<"Part"> | Decimal | DecimalJsLike | number | string
    stockQty?: IntWithAggregatesFilter<"Part"> | number
  }

  export type ServiceOrderWhereInput = {
    AND?: ServiceOrderWhereInput | ServiceOrderWhereInput[]
    OR?: ServiceOrderWhereInput[]
    NOT?: ServiceOrderWhereInput | ServiceOrderWhereInput[]
    id?: StringFilter<"ServiceOrder"> | string
    customerId?: StringFilter<"ServiceOrder"> | string
    vehicleId?: StringFilter<"ServiceOrder"> | string
    description?: StringFilter<"ServiceOrder"> | string
    status?: EnumOrderStatusFilter<"ServiceOrder"> | $Enums.OrderStatus
    totalPrice?: DecimalFilter<"ServiceOrder"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"ServiceOrder"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceOrder"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    services?: OrderServiceListRelationFilter
    parts?: OrderPartListRelationFilter
  }

  export type ServiceOrderOrderByWithRelationInput = {
    id?: SortOrder
    customerId?: SortOrder
    vehicleId?: SortOrder
    description?: SortOrder
    status?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    customer?: CustomerOrderByWithRelationInput
    vehicle?: VehicleOrderByWithRelationInput
    services?: OrderServiceOrderByRelationAggregateInput
    parts?: OrderPartOrderByRelationAggregateInput
  }

  export type ServiceOrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceOrderWhereInput | ServiceOrderWhereInput[]
    OR?: ServiceOrderWhereInput[]
    NOT?: ServiceOrderWhereInput | ServiceOrderWhereInput[]
    customerId?: StringFilter<"ServiceOrder"> | string
    vehicleId?: StringFilter<"ServiceOrder"> | string
    description?: StringFilter<"ServiceOrder"> | string
    status?: EnumOrderStatusFilter<"ServiceOrder"> | $Enums.OrderStatus
    totalPrice?: DecimalFilter<"ServiceOrder"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"ServiceOrder"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceOrder"> | Date | string
    customer?: XOR<CustomerScalarRelationFilter, CustomerWhereInput>
    vehicle?: XOR<VehicleScalarRelationFilter, VehicleWhereInput>
    services?: OrderServiceListRelationFilter
    parts?: OrderPartListRelationFilter
  }, "id">

  export type ServiceOrderOrderByWithAggregationInput = {
    id?: SortOrder
    customerId?: SortOrder
    vehicleId?: SortOrder
    description?: SortOrder
    status?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceOrderCountOrderByAggregateInput
    _avg?: ServiceOrderAvgOrderByAggregateInput
    _max?: ServiceOrderMaxOrderByAggregateInput
    _min?: ServiceOrderMinOrderByAggregateInput
    _sum?: ServiceOrderSumOrderByAggregateInput
  }

  export type ServiceOrderScalarWhereWithAggregatesInput = {
    AND?: ServiceOrderScalarWhereWithAggregatesInput | ServiceOrderScalarWhereWithAggregatesInput[]
    OR?: ServiceOrderScalarWhereWithAggregatesInput[]
    NOT?: ServiceOrderScalarWhereWithAggregatesInput | ServiceOrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceOrder"> | string
    customerId?: StringWithAggregatesFilter<"ServiceOrder"> | string
    vehicleId?: StringWithAggregatesFilter<"ServiceOrder"> | string
    description?: StringWithAggregatesFilter<"ServiceOrder"> | string
    status?: EnumOrderStatusWithAggregatesFilter<"ServiceOrder"> | $Enums.OrderStatus
    totalPrice?: DecimalWithAggregatesFilter<"ServiceOrder"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeWithAggregatesFilter<"ServiceOrder"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceOrder"> | Date | string
  }

  export type OrderServiceWhereInput = {
    AND?: OrderServiceWhereInput | OrderServiceWhereInput[]
    OR?: OrderServiceWhereInput[]
    NOT?: OrderServiceWhereInput | OrderServiceWhereInput[]
    id?: StringFilter<"OrderService"> | string
    serviceOrderId?: StringFilter<"OrderService"> | string
    serviceId?: StringFilter<"OrderService"> | string
    serviceOrder?: XOR<ServiceOrderScalarRelationFilter, ServiceOrderWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }

  export type OrderServiceOrderByWithRelationInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    serviceId?: SortOrder
    serviceOrder?: ServiceOrderOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
  }

  export type OrderServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderServiceWhereInput | OrderServiceWhereInput[]
    OR?: OrderServiceWhereInput[]
    NOT?: OrderServiceWhereInput | OrderServiceWhereInput[]
    serviceOrderId?: StringFilter<"OrderService"> | string
    serviceId?: StringFilter<"OrderService"> | string
    serviceOrder?: XOR<ServiceOrderScalarRelationFilter, ServiceOrderWhereInput>
    service?: XOR<ServiceScalarRelationFilter, ServiceWhereInput>
  }, "id">

  export type OrderServiceOrderByWithAggregationInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    serviceId?: SortOrder
    _count?: OrderServiceCountOrderByAggregateInput
    _max?: OrderServiceMaxOrderByAggregateInput
    _min?: OrderServiceMinOrderByAggregateInput
  }

  export type OrderServiceScalarWhereWithAggregatesInput = {
    AND?: OrderServiceScalarWhereWithAggregatesInput | OrderServiceScalarWhereWithAggregatesInput[]
    OR?: OrderServiceScalarWhereWithAggregatesInput[]
    NOT?: OrderServiceScalarWhereWithAggregatesInput | OrderServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderService"> | string
    serviceOrderId?: StringWithAggregatesFilter<"OrderService"> | string
    serviceId?: StringWithAggregatesFilter<"OrderService"> | string
  }

  export type OrderPartWhereInput = {
    AND?: OrderPartWhereInput | OrderPartWhereInput[]
    OR?: OrderPartWhereInput[]
    NOT?: OrderPartWhereInput | OrderPartWhereInput[]
    id?: StringFilter<"OrderPart"> | string
    serviceOrderId?: StringFilter<"OrderPart"> | string
    partId?: StringFilter<"OrderPart"> | string
    quantity?: IntFilter<"OrderPart"> | number
    serviceOrder?: XOR<ServiceOrderScalarRelationFilter, ServiceOrderWhereInput>
    part?: XOR<PartScalarRelationFilter, PartWhereInput>
  }

  export type OrderPartOrderByWithRelationInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
    serviceOrder?: ServiceOrderOrderByWithRelationInput
    part?: PartOrderByWithRelationInput
  }

  export type OrderPartWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderPartWhereInput | OrderPartWhereInput[]
    OR?: OrderPartWhereInput[]
    NOT?: OrderPartWhereInput | OrderPartWhereInput[]
    serviceOrderId?: StringFilter<"OrderPart"> | string
    partId?: StringFilter<"OrderPart"> | string
    quantity?: IntFilter<"OrderPart"> | number
    serviceOrder?: XOR<ServiceOrderScalarRelationFilter, ServiceOrderWhereInput>
    part?: XOR<PartScalarRelationFilter, PartWhereInput>
  }, "id">

  export type OrderPartOrderByWithAggregationInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
    _count?: OrderPartCountOrderByAggregateInput
    _avg?: OrderPartAvgOrderByAggregateInput
    _max?: OrderPartMaxOrderByAggregateInput
    _min?: OrderPartMinOrderByAggregateInput
    _sum?: OrderPartSumOrderByAggregateInput
  }

  export type OrderPartScalarWhereWithAggregatesInput = {
    AND?: OrderPartScalarWhereWithAggregatesInput | OrderPartScalarWhereWithAggregatesInput[]
    OR?: OrderPartScalarWhereWithAggregatesInput[]
    NOT?: OrderPartScalarWhereWithAggregatesInput | OrderPartScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"OrderPart"> | string
    serviceOrderId?: StringWithAggregatesFilter<"OrderPart"> | string
    partId?: StringWithAggregatesFilter<"OrderPart"> | string
    quantity?: IntWithAggregatesFilter<"OrderPart"> | number
  }

  export type CustomerCreateInput = {
    id?: string
    name: string
    document: string
    email: string
    phone: string
    createdAt?: Date | string
    vehicles?: VehicleCreateNestedManyWithoutCustomerInput
    orders?: ServiceOrderCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    name: string
    document: string
    email: string
    phone: string
    createdAt?: Date | string
    vehicles?: VehicleUncheckedCreateNestedManyWithoutCustomerInput
    orders?: ServiceOrderUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUpdateManyWithoutCustomerNestedInput
    orders?: ServiceOrderUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUncheckedUpdateManyWithoutCustomerNestedInput
    orders?: ServiceOrderUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    name: string
    document: string
    email: string
    phone: string
    createdAt?: Date | string
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VehicleCreateInput = {
    id?: string
    plate: string
    brand: string
    model: string
    year: number
    customer: CustomerCreateNestedOneWithoutVehiclesInput
    orders?: ServiceOrderCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateInput = {
    id?: string
    plate: string
    brand: string
    model: string
    year: number
    customerId: string
    orders?: ServiceOrderUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    customer?: CustomerUpdateOneRequiredWithoutVehiclesNestedInput
    orders?: ServiceOrderUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    customerId?: StringFieldUpdateOperationsInput | string
    orders?: ServiceOrderUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleCreateManyInput = {
    id?: string
    plate: string
    brand: string
    model: string
    year: number
    customerId: string
  }

  export type VehicleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
  }

  export type VehicleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    customerId?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceCreateInput = {
    id?: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    estimatedTime: number
    orderServices?: OrderServiceCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    estimatedTime: number
    orderServices?: OrderServiceUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estimatedTime?: IntFieldUpdateOperationsInput | number
    orderServices?: OrderServiceUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estimatedTime?: IntFieldUpdateOperationsInput | number
    orderServices?: OrderServiceUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    estimatedTime: number
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estimatedTime?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estimatedTime?: IntFieldUpdateOperationsInput | number
  }

  export type PartCreateInput = {
    id?: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    stockQty?: number
    orderParts?: OrderPartCreateNestedManyWithoutPartInput
  }

  export type PartUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    stockQty?: number
    orderParts?: OrderPartUncheckedCreateNestedManyWithoutPartInput
  }

  export type PartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stockQty?: IntFieldUpdateOperationsInput | number
    orderParts?: OrderPartUpdateManyWithoutPartNestedInput
  }

  export type PartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stockQty?: IntFieldUpdateOperationsInput | number
    orderParts?: OrderPartUncheckedUpdateManyWithoutPartNestedInput
  }

  export type PartCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    stockQty?: number
  }

  export type PartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stockQty?: IntFieldUpdateOperationsInput | number
  }

  export type PartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stockQty?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceOrderCreateInput = {
    id?: string
    description: string
    status?: $Enums.OrderStatus
    totalPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    vehicle: VehicleCreateNestedOneWithoutOrdersInput
    services?: OrderServiceCreateNestedManyWithoutServiceOrderInput
    parts?: OrderPartCreateNestedManyWithoutServiceOrderInput
  }

  export type ServiceOrderUncheckedCreateInput = {
    id?: string
    customerId: string
    vehicleId: string
    description: string
    status?: $Enums.OrderStatus
    totalPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: OrderServiceUncheckedCreateNestedManyWithoutServiceOrderInput
    parts?: OrderPartUncheckedCreateNestedManyWithoutServiceOrderInput
  }

  export type ServiceOrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutOrdersNestedInput
    services?: OrderServiceUpdateManyWithoutServiceOrderNestedInput
    parts?: OrderPartUpdateManyWithoutServiceOrderNestedInput
  }

  export type ServiceOrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: OrderServiceUncheckedUpdateManyWithoutServiceOrderNestedInput
    parts?: OrderPartUncheckedUpdateManyWithoutServiceOrderNestedInput
  }

  export type ServiceOrderCreateManyInput = {
    id?: string
    customerId: string
    vehicleId: string
    description: string
    status?: $Enums.OrderStatus
    totalPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceOrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceOrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderServiceCreateInput = {
    id?: string
    serviceOrder: ServiceOrderCreateNestedOneWithoutServicesInput
    service: ServiceCreateNestedOneWithoutOrderServicesInput
  }

  export type OrderServiceUncheckedCreateInput = {
    id?: string
    serviceOrderId: string
    serviceId: string
  }

  export type OrderServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceOrder?: ServiceOrderUpdateOneRequiredWithoutServicesNestedInput
    service?: ServiceUpdateOneRequiredWithoutOrderServicesNestedInput
  }

  export type OrderServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceOrderId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderServiceCreateManyInput = {
    id?: string
    serviceOrderId: string
    serviceId: string
  }

  export type OrderServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
  }

  export type OrderServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceOrderId?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderPartCreateInput = {
    id?: string
    quantity: number
    serviceOrder: ServiceOrderCreateNestedOneWithoutPartsInput
    part: PartCreateNestedOneWithoutOrderPartsInput
  }

  export type OrderPartUncheckedCreateInput = {
    id?: string
    serviceOrderId: string
    partId: string
    quantity: number
  }

  export type OrderPartUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    serviceOrder?: ServiceOrderUpdateOneRequiredWithoutPartsNestedInput
    part?: PartUpdateOneRequiredWithoutOrderPartsNestedInput
  }

  export type OrderPartUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceOrderId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type OrderPartCreateManyInput = {
    id?: string
    serviceOrderId: string
    partId: string
    quantity: number
  }

  export type OrderPartUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type OrderPartUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceOrderId?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type VehicleListRelationFilter = {
    every?: VehicleWhereInput
    some?: VehicleWhereInput
    none?: VehicleWhereInput
  }

  export type ServiceOrderListRelationFilter = {
    every?: ServiceOrderWhereInput
    some?: ServiceOrderWhereInput
    none?: ServiceOrderWhereInput
  }

  export type VehicleOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceOrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    document?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    document?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    document?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    createdAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type CustomerScalarRelationFilter = {
    is?: CustomerWhereInput
    isNot?: CustomerWhereInput
  }

  export type VehicleCountOrderByAggregateInput = {
    id?: SortOrder
    plate?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    year?: SortOrder
    customerId?: SortOrder
  }

  export type VehicleAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type VehicleMaxOrderByAggregateInput = {
    id?: SortOrder
    plate?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    year?: SortOrder
    customerId?: SortOrder
  }

  export type VehicleMinOrderByAggregateInput = {
    id?: SortOrder
    plate?: SortOrder
    brand?: SortOrder
    model?: SortOrder
    year?: SortOrder
    customerId?: SortOrder
  }

  export type VehicleSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type OrderServiceListRelationFilter = {
    every?: OrderServiceWhereInput
    some?: OrderServiceWhereInput
    none?: OrderServiceWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OrderServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    estimatedTime?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    price?: SortOrder
    estimatedTime?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    estimatedTime?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    estimatedTime?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    price?: SortOrder
    estimatedTime?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type OrderPartListRelationFilter = {
    every?: OrderPartWhereInput
    some?: OrderPartWhereInput
    none?: OrderPartWhereInput
  }

  export type OrderPartOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PartCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    stockQty?: SortOrder
  }

  export type PartAvgOrderByAggregateInput = {
    price?: SortOrder
    stockQty?: SortOrder
  }

  export type PartMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    stockQty?: SortOrder
  }

  export type PartMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    price?: SortOrder
    stockQty?: SortOrder
  }

  export type PartSumOrderByAggregateInput = {
    price?: SortOrder
    stockQty?: SortOrder
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type VehicleScalarRelationFilter = {
    is?: VehicleWhereInput
    isNot?: VehicleWhereInput
  }

  export type ServiceOrderCountOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    vehicleId?: SortOrder
    description?: SortOrder
    status?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceOrderAvgOrderByAggregateInput = {
    totalPrice?: SortOrder
  }

  export type ServiceOrderMaxOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    vehicleId?: SortOrder
    description?: SortOrder
    status?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceOrderMinOrderByAggregateInput = {
    id?: SortOrder
    customerId?: SortOrder
    vehicleId?: SortOrder
    description?: SortOrder
    status?: SortOrder
    totalPrice?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceOrderSumOrderByAggregateInput = {
    totalPrice?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type ServiceOrderScalarRelationFilter = {
    is?: ServiceOrderWhereInput
    isNot?: ServiceOrderWhereInput
  }

  export type ServiceScalarRelationFilter = {
    is?: ServiceWhereInput
    isNot?: ServiceWhereInput
  }

  export type OrderServiceCountOrderByAggregateInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    serviceId?: SortOrder
  }

  export type OrderServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    serviceId?: SortOrder
  }

  export type OrderServiceMinOrderByAggregateInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    serviceId?: SortOrder
  }

  export type PartScalarRelationFilter = {
    is?: PartWhereInput
    isNot?: PartWhereInput
  }

  export type OrderPartCountOrderByAggregateInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
  }

  export type OrderPartAvgOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type OrderPartMaxOrderByAggregateInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
  }

  export type OrderPartMinOrderByAggregateInput = {
    id?: SortOrder
    serviceOrderId?: SortOrder
    partId?: SortOrder
    quantity?: SortOrder
  }

  export type OrderPartSumOrderByAggregateInput = {
    quantity?: SortOrder
  }

  export type VehicleCreateNestedManyWithoutCustomerInput = {
    create?: XOR<VehicleCreateWithoutCustomerInput, VehicleUncheckedCreateWithoutCustomerInput> | VehicleCreateWithoutCustomerInput[] | VehicleUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutCustomerInput | VehicleCreateOrConnectWithoutCustomerInput[]
    createMany?: VehicleCreateManyCustomerInputEnvelope
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
  }

  export type ServiceOrderCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ServiceOrderCreateWithoutCustomerInput, ServiceOrderUncheckedCreateWithoutCustomerInput> | ServiceOrderCreateWithoutCustomerInput[] | ServiceOrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ServiceOrderCreateOrConnectWithoutCustomerInput | ServiceOrderCreateOrConnectWithoutCustomerInput[]
    createMany?: ServiceOrderCreateManyCustomerInputEnvelope
    connect?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
  }

  export type VehicleUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<VehicleCreateWithoutCustomerInput, VehicleUncheckedCreateWithoutCustomerInput> | VehicleCreateWithoutCustomerInput[] | VehicleUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutCustomerInput | VehicleCreateOrConnectWithoutCustomerInput[]
    createMany?: VehicleCreateManyCustomerInputEnvelope
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
  }

  export type ServiceOrderUncheckedCreateNestedManyWithoutCustomerInput = {
    create?: XOR<ServiceOrderCreateWithoutCustomerInput, ServiceOrderUncheckedCreateWithoutCustomerInput> | ServiceOrderCreateWithoutCustomerInput[] | ServiceOrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ServiceOrderCreateOrConnectWithoutCustomerInput | ServiceOrderCreateOrConnectWithoutCustomerInput[]
    createMany?: ServiceOrderCreateManyCustomerInputEnvelope
    connect?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type VehicleUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<VehicleCreateWithoutCustomerInput, VehicleUncheckedCreateWithoutCustomerInput> | VehicleCreateWithoutCustomerInput[] | VehicleUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutCustomerInput | VehicleCreateOrConnectWithoutCustomerInput[]
    upsert?: VehicleUpsertWithWhereUniqueWithoutCustomerInput | VehicleUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: VehicleCreateManyCustomerInputEnvelope
    set?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    disconnect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    delete?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    update?: VehicleUpdateWithWhereUniqueWithoutCustomerInput | VehicleUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: VehicleUpdateManyWithWhereWithoutCustomerInput | VehicleUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
  }

  export type ServiceOrderUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ServiceOrderCreateWithoutCustomerInput, ServiceOrderUncheckedCreateWithoutCustomerInput> | ServiceOrderCreateWithoutCustomerInput[] | ServiceOrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ServiceOrderCreateOrConnectWithoutCustomerInput | ServiceOrderCreateOrConnectWithoutCustomerInput[]
    upsert?: ServiceOrderUpsertWithWhereUniqueWithoutCustomerInput | ServiceOrderUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ServiceOrderCreateManyCustomerInputEnvelope
    set?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    disconnect?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    delete?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    connect?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    update?: ServiceOrderUpdateWithWhereUniqueWithoutCustomerInput | ServiceOrderUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ServiceOrderUpdateManyWithWhereWithoutCustomerInput | ServiceOrderUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ServiceOrderScalarWhereInput | ServiceOrderScalarWhereInput[]
  }

  export type VehicleUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<VehicleCreateWithoutCustomerInput, VehicleUncheckedCreateWithoutCustomerInput> | VehicleCreateWithoutCustomerInput[] | VehicleUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: VehicleCreateOrConnectWithoutCustomerInput | VehicleCreateOrConnectWithoutCustomerInput[]
    upsert?: VehicleUpsertWithWhereUniqueWithoutCustomerInput | VehicleUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: VehicleCreateManyCustomerInputEnvelope
    set?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    disconnect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    delete?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    connect?: VehicleWhereUniqueInput | VehicleWhereUniqueInput[]
    update?: VehicleUpdateWithWhereUniqueWithoutCustomerInput | VehicleUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: VehicleUpdateManyWithWhereWithoutCustomerInput | VehicleUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
  }

  export type ServiceOrderUncheckedUpdateManyWithoutCustomerNestedInput = {
    create?: XOR<ServiceOrderCreateWithoutCustomerInput, ServiceOrderUncheckedCreateWithoutCustomerInput> | ServiceOrderCreateWithoutCustomerInput[] | ServiceOrderUncheckedCreateWithoutCustomerInput[]
    connectOrCreate?: ServiceOrderCreateOrConnectWithoutCustomerInput | ServiceOrderCreateOrConnectWithoutCustomerInput[]
    upsert?: ServiceOrderUpsertWithWhereUniqueWithoutCustomerInput | ServiceOrderUpsertWithWhereUniqueWithoutCustomerInput[]
    createMany?: ServiceOrderCreateManyCustomerInputEnvelope
    set?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    disconnect?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    delete?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    connect?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    update?: ServiceOrderUpdateWithWhereUniqueWithoutCustomerInput | ServiceOrderUpdateWithWhereUniqueWithoutCustomerInput[]
    updateMany?: ServiceOrderUpdateManyWithWhereWithoutCustomerInput | ServiceOrderUpdateManyWithWhereWithoutCustomerInput[]
    deleteMany?: ServiceOrderScalarWhereInput | ServiceOrderScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutVehiclesInput = {
    create?: XOR<CustomerCreateWithoutVehiclesInput, CustomerUncheckedCreateWithoutVehiclesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutVehiclesInput
    connect?: CustomerWhereUniqueInput
  }

  export type ServiceOrderCreateNestedManyWithoutVehicleInput = {
    create?: XOR<ServiceOrderCreateWithoutVehicleInput, ServiceOrderUncheckedCreateWithoutVehicleInput> | ServiceOrderCreateWithoutVehicleInput[] | ServiceOrderUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ServiceOrderCreateOrConnectWithoutVehicleInput | ServiceOrderCreateOrConnectWithoutVehicleInput[]
    createMany?: ServiceOrderCreateManyVehicleInputEnvelope
    connect?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
  }

  export type ServiceOrderUncheckedCreateNestedManyWithoutVehicleInput = {
    create?: XOR<ServiceOrderCreateWithoutVehicleInput, ServiceOrderUncheckedCreateWithoutVehicleInput> | ServiceOrderCreateWithoutVehicleInput[] | ServiceOrderUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ServiceOrderCreateOrConnectWithoutVehicleInput | ServiceOrderCreateOrConnectWithoutVehicleInput[]
    createMany?: ServiceOrderCreateManyVehicleInputEnvelope
    connect?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type CustomerUpdateOneRequiredWithoutVehiclesNestedInput = {
    create?: XOR<CustomerCreateWithoutVehiclesInput, CustomerUncheckedCreateWithoutVehiclesInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutVehiclesInput
    upsert?: CustomerUpsertWithoutVehiclesInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutVehiclesInput, CustomerUpdateWithoutVehiclesInput>, CustomerUncheckedUpdateWithoutVehiclesInput>
  }

  export type ServiceOrderUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<ServiceOrderCreateWithoutVehicleInput, ServiceOrderUncheckedCreateWithoutVehicleInput> | ServiceOrderCreateWithoutVehicleInput[] | ServiceOrderUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ServiceOrderCreateOrConnectWithoutVehicleInput | ServiceOrderCreateOrConnectWithoutVehicleInput[]
    upsert?: ServiceOrderUpsertWithWhereUniqueWithoutVehicleInput | ServiceOrderUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: ServiceOrderCreateManyVehicleInputEnvelope
    set?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    disconnect?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    delete?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    connect?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    update?: ServiceOrderUpdateWithWhereUniqueWithoutVehicleInput | ServiceOrderUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: ServiceOrderUpdateManyWithWhereWithoutVehicleInput | ServiceOrderUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: ServiceOrderScalarWhereInput | ServiceOrderScalarWhereInput[]
  }

  export type ServiceOrderUncheckedUpdateManyWithoutVehicleNestedInput = {
    create?: XOR<ServiceOrderCreateWithoutVehicleInput, ServiceOrderUncheckedCreateWithoutVehicleInput> | ServiceOrderCreateWithoutVehicleInput[] | ServiceOrderUncheckedCreateWithoutVehicleInput[]
    connectOrCreate?: ServiceOrderCreateOrConnectWithoutVehicleInput | ServiceOrderCreateOrConnectWithoutVehicleInput[]
    upsert?: ServiceOrderUpsertWithWhereUniqueWithoutVehicleInput | ServiceOrderUpsertWithWhereUniqueWithoutVehicleInput[]
    createMany?: ServiceOrderCreateManyVehicleInputEnvelope
    set?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    disconnect?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    delete?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    connect?: ServiceOrderWhereUniqueInput | ServiceOrderWhereUniqueInput[]
    update?: ServiceOrderUpdateWithWhereUniqueWithoutVehicleInput | ServiceOrderUpdateWithWhereUniqueWithoutVehicleInput[]
    updateMany?: ServiceOrderUpdateManyWithWhereWithoutVehicleInput | ServiceOrderUpdateManyWithWhereWithoutVehicleInput[]
    deleteMany?: ServiceOrderScalarWhereInput | ServiceOrderScalarWhereInput[]
  }

  export type OrderServiceCreateNestedManyWithoutServiceInput = {
    create?: XOR<OrderServiceCreateWithoutServiceInput, OrderServiceUncheckedCreateWithoutServiceInput> | OrderServiceCreateWithoutServiceInput[] | OrderServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: OrderServiceCreateOrConnectWithoutServiceInput | OrderServiceCreateOrConnectWithoutServiceInput[]
    createMany?: OrderServiceCreateManyServiceInputEnvelope
    connect?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
  }

  export type OrderServiceUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<OrderServiceCreateWithoutServiceInput, OrderServiceUncheckedCreateWithoutServiceInput> | OrderServiceCreateWithoutServiceInput[] | OrderServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: OrderServiceCreateOrConnectWithoutServiceInput | OrderServiceCreateOrConnectWithoutServiceInput[]
    createMany?: OrderServiceCreateManyServiceInputEnvelope
    connect?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type OrderServiceUpdateManyWithoutServiceNestedInput = {
    create?: XOR<OrderServiceCreateWithoutServiceInput, OrderServiceUncheckedCreateWithoutServiceInput> | OrderServiceCreateWithoutServiceInput[] | OrderServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: OrderServiceCreateOrConnectWithoutServiceInput | OrderServiceCreateOrConnectWithoutServiceInput[]
    upsert?: OrderServiceUpsertWithWhereUniqueWithoutServiceInput | OrderServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: OrderServiceCreateManyServiceInputEnvelope
    set?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    disconnect?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    delete?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    connect?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    update?: OrderServiceUpdateWithWhereUniqueWithoutServiceInput | OrderServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: OrderServiceUpdateManyWithWhereWithoutServiceInput | OrderServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: OrderServiceScalarWhereInput | OrderServiceScalarWhereInput[]
  }

  export type OrderServiceUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<OrderServiceCreateWithoutServiceInput, OrderServiceUncheckedCreateWithoutServiceInput> | OrderServiceCreateWithoutServiceInput[] | OrderServiceUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: OrderServiceCreateOrConnectWithoutServiceInput | OrderServiceCreateOrConnectWithoutServiceInput[]
    upsert?: OrderServiceUpsertWithWhereUniqueWithoutServiceInput | OrderServiceUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: OrderServiceCreateManyServiceInputEnvelope
    set?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    disconnect?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    delete?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    connect?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    update?: OrderServiceUpdateWithWhereUniqueWithoutServiceInput | OrderServiceUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: OrderServiceUpdateManyWithWhereWithoutServiceInput | OrderServiceUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: OrderServiceScalarWhereInput | OrderServiceScalarWhereInput[]
  }

  export type OrderPartCreateNestedManyWithoutPartInput = {
    create?: XOR<OrderPartCreateWithoutPartInput, OrderPartUncheckedCreateWithoutPartInput> | OrderPartCreateWithoutPartInput[] | OrderPartUncheckedCreateWithoutPartInput[]
    connectOrCreate?: OrderPartCreateOrConnectWithoutPartInput | OrderPartCreateOrConnectWithoutPartInput[]
    createMany?: OrderPartCreateManyPartInputEnvelope
    connect?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
  }

  export type OrderPartUncheckedCreateNestedManyWithoutPartInput = {
    create?: XOR<OrderPartCreateWithoutPartInput, OrderPartUncheckedCreateWithoutPartInput> | OrderPartCreateWithoutPartInput[] | OrderPartUncheckedCreateWithoutPartInput[]
    connectOrCreate?: OrderPartCreateOrConnectWithoutPartInput | OrderPartCreateOrConnectWithoutPartInput[]
    createMany?: OrderPartCreateManyPartInputEnvelope
    connect?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
  }

  export type OrderPartUpdateManyWithoutPartNestedInput = {
    create?: XOR<OrderPartCreateWithoutPartInput, OrderPartUncheckedCreateWithoutPartInput> | OrderPartCreateWithoutPartInput[] | OrderPartUncheckedCreateWithoutPartInput[]
    connectOrCreate?: OrderPartCreateOrConnectWithoutPartInput | OrderPartCreateOrConnectWithoutPartInput[]
    upsert?: OrderPartUpsertWithWhereUniqueWithoutPartInput | OrderPartUpsertWithWhereUniqueWithoutPartInput[]
    createMany?: OrderPartCreateManyPartInputEnvelope
    set?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    disconnect?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    delete?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    connect?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    update?: OrderPartUpdateWithWhereUniqueWithoutPartInput | OrderPartUpdateWithWhereUniqueWithoutPartInput[]
    updateMany?: OrderPartUpdateManyWithWhereWithoutPartInput | OrderPartUpdateManyWithWhereWithoutPartInput[]
    deleteMany?: OrderPartScalarWhereInput | OrderPartScalarWhereInput[]
  }

  export type OrderPartUncheckedUpdateManyWithoutPartNestedInput = {
    create?: XOR<OrderPartCreateWithoutPartInput, OrderPartUncheckedCreateWithoutPartInput> | OrderPartCreateWithoutPartInput[] | OrderPartUncheckedCreateWithoutPartInput[]
    connectOrCreate?: OrderPartCreateOrConnectWithoutPartInput | OrderPartCreateOrConnectWithoutPartInput[]
    upsert?: OrderPartUpsertWithWhereUniqueWithoutPartInput | OrderPartUpsertWithWhereUniqueWithoutPartInput[]
    createMany?: OrderPartCreateManyPartInputEnvelope
    set?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    disconnect?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    delete?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    connect?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    update?: OrderPartUpdateWithWhereUniqueWithoutPartInput | OrderPartUpdateWithWhereUniqueWithoutPartInput[]
    updateMany?: OrderPartUpdateManyWithWhereWithoutPartInput | OrderPartUpdateManyWithWhereWithoutPartInput[]
    deleteMany?: OrderPartScalarWhereInput | OrderPartScalarWhereInput[]
  }

  export type CustomerCreateNestedOneWithoutOrdersInput = {
    create?: XOR<CustomerCreateWithoutOrdersInput, CustomerUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutOrdersInput
    connect?: CustomerWhereUniqueInput
  }

  export type VehicleCreateNestedOneWithoutOrdersInput = {
    create?: XOR<VehicleCreateWithoutOrdersInput, VehicleUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutOrdersInput
    connect?: VehicleWhereUniqueInput
  }

  export type OrderServiceCreateNestedManyWithoutServiceOrderInput = {
    create?: XOR<OrderServiceCreateWithoutServiceOrderInput, OrderServiceUncheckedCreateWithoutServiceOrderInput> | OrderServiceCreateWithoutServiceOrderInput[] | OrderServiceUncheckedCreateWithoutServiceOrderInput[]
    connectOrCreate?: OrderServiceCreateOrConnectWithoutServiceOrderInput | OrderServiceCreateOrConnectWithoutServiceOrderInput[]
    createMany?: OrderServiceCreateManyServiceOrderInputEnvelope
    connect?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
  }

  export type OrderPartCreateNestedManyWithoutServiceOrderInput = {
    create?: XOR<OrderPartCreateWithoutServiceOrderInput, OrderPartUncheckedCreateWithoutServiceOrderInput> | OrderPartCreateWithoutServiceOrderInput[] | OrderPartUncheckedCreateWithoutServiceOrderInput[]
    connectOrCreate?: OrderPartCreateOrConnectWithoutServiceOrderInput | OrderPartCreateOrConnectWithoutServiceOrderInput[]
    createMany?: OrderPartCreateManyServiceOrderInputEnvelope
    connect?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
  }

  export type OrderServiceUncheckedCreateNestedManyWithoutServiceOrderInput = {
    create?: XOR<OrderServiceCreateWithoutServiceOrderInput, OrderServiceUncheckedCreateWithoutServiceOrderInput> | OrderServiceCreateWithoutServiceOrderInput[] | OrderServiceUncheckedCreateWithoutServiceOrderInput[]
    connectOrCreate?: OrderServiceCreateOrConnectWithoutServiceOrderInput | OrderServiceCreateOrConnectWithoutServiceOrderInput[]
    createMany?: OrderServiceCreateManyServiceOrderInputEnvelope
    connect?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
  }

  export type OrderPartUncheckedCreateNestedManyWithoutServiceOrderInput = {
    create?: XOR<OrderPartCreateWithoutServiceOrderInput, OrderPartUncheckedCreateWithoutServiceOrderInput> | OrderPartCreateWithoutServiceOrderInput[] | OrderPartUncheckedCreateWithoutServiceOrderInput[]
    connectOrCreate?: OrderPartCreateOrConnectWithoutServiceOrderInput | OrderPartCreateOrConnectWithoutServiceOrderInput[]
    createMany?: OrderPartCreateManyServiceOrderInputEnvelope
    connect?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type CustomerUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<CustomerCreateWithoutOrdersInput, CustomerUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutOrdersInput
    upsert?: CustomerUpsertWithoutOrdersInput
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutOrdersInput, CustomerUpdateWithoutOrdersInput>, CustomerUncheckedUpdateWithoutOrdersInput>
  }

  export type VehicleUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<VehicleCreateWithoutOrdersInput, VehicleUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: VehicleCreateOrConnectWithoutOrdersInput
    upsert?: VehicleUpsertWithoutOrdersInput
    connect?: VehicleWhereUniqueInput
    update?: XOR<XOR<VehicleUpdateToOneWithWhereWithoutOrdersInput, VehicleUpdateWithoutOrdersInput>, VehicleUncheckedUpdateWithoutOrdersInput>
  }

  export type OrderServiceUpdateManyWithoutServiceOrderNestedInput = {
    create?: XOR<OrderServiceCreateWithoutServiceOrderInput, OrderServiceUncheckedCreateWithoutServiceOrderInput> | OrderServiceCreateWithoutServiceOrderInput[] | OrderServiceUncheckedCreateWithoutServiceOrderInput[]
    connectOrCreate?: OrderServiceCreateOrConnectWithoutServiceOrderInput | OrderServiceCreateOrConnectWithoutServiceOrderInput[]
    upsert?: OrderServiceUpsertWithWhereUniqueWithoutServiceOrderInput | OrderServiceUpsertWithWhereUniqueWithoutServiceOrderInput[]
    createMany?: OrderServiceCreateManyServiceOrderInputEnvelope
    set?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    disconnect?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    delete?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    connect?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    update?: OrderServiceUpdateWithWhereUniqueWithoutServiceOrderInput | OrderServiceUpdateWithWhereUniqueWithoutServiceOrderInput[]
    updateMany?: OrderServiceUpdateManyWithWhereWithoutServiceOrderInput | OrderServiceUpdateManyWithWhereWithoutServiceOrderInput[]
    deleteMany?: OrderServiceScalarWhereInput | OrderServiceScalarWhereInput[]
  }

  export type OrderPartUpdateManyWithoutServiceOrderNestedInput = {
    create?: XOR<OrderPartCreateWithoutServiceOrderInput, OrderPartUncheckedCreateWithoutServiceOrderInput> | OrderPartCreateWithoutServiceOrderInput[] | OrderPartUncheckedCreateWithoutServiceOrderInput[]
    connectOrCreate?: OrderPartCreateOrConnectWithoutServiceOrderInput | OrderPartCreateOrConnectWithoutServiceOrderInput[]
    upsert?: OrderPartUpsertWithWhereUniqueWithoutServiceOrderInput | OrderPartUpsertWithWhereUniqueWithoutServiceOrderInput[]
    createMany?: OrderPartCreateManyServiceOrderInputEnvelope
    set?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    disconnect?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    delete?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    connect?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    update?: OrderPartUpdateWithWhereUniqueWithoutServiceOrderInput | OrderPartUpdateWithWhereUniqueWithoutServiceOrderInput[]
    updateMany?: OrderPartUpdateManyWithWhereWithoutServiceOrderInput | OrderPartUpdateManyWithWhereWithoutServiceOrderInput[]
    deleteMany?: OrderPartScalarWhereInput | OrderPartScalarWhereInput[]
  }

  export type OrderServiceUncheckedUpdateManyWithoutServiceOrderNestedInput = {
    create?: XOR<OrderServiceCreateWithoutServiceOrderInput, OrderServiceUncheckedCreateWithoutServiceOrderInput> | OrderServiceCreateWithoutServiceOrderInput[] | OrderServiceUncheckedCreateWithoutServiceOrderInput[]
    connectOrCreate?: OrderServiceCreateOrConnectWithoutServiceOrderInput | OrderServiceCreateOrConnectWithoutServiceOrderInput[]
    upsert?: OrderServiceUpsertWithWhereUniqueWithoutServiceOrderInput | OrderServiceUpsertWithWhereUniqueWithoutServiceOrderInput[]
    createMany?: OrderServiceCreateManyServiceOrderInputEnvelope
    set?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    disconnect?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    delete?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    connect?: OrderServiceWhereUniqueInput | OrderServiceWhereUniqueInput[]
    update?: OrderServiceUpdateWithWhereUniqueWithoutServiceOrderInput | OrderServiceUpdateWithWhereUniqueWithoutServiceOrderInput[]
    updateMany?: OrderServiceUpdateManyWithWhereWithoutServiceOrderInput | OrderServiceUpdateManyWithWhereWithoutServiceOrderInput[]
    deleteMany?: OrderServiceScalarWhereInput | OrderServiceScalarWhereInput[]
  }

  export type OrderPartUncheckedUpdateManyWithoutServiceOrderNestedInput = {
    create?: XOR<OrderPartCreateWithoutServiceOrderInput, OrderPartUncheckedCreateWithoutServiceOrderInput> | OrderPartCreateWithoutServiceOrderInput[] | OrderPartUncheckedCreateWithoutServiceOrderInput[]
    connectOrCreate?: OrderPartCreateOrConnectWithoutServiceOrderInput | OrderPartCreateOrConnectWithoutServiceOrderInput[]
    upsert?: OrderPartUpsertWithWhereUniqueWithoutServiceOrderInput | OrderPartUpsertWithWhereUniqueWithoutServiceOrderInput[]
    createMany?: OrderPartCreateManyServiceOrderInputEnvelope
    set?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    disconnect?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    delete?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    connect?: OrderPartWhereUniqueInput | OrderPartWhereUniqueInput[]
    update?: OrderPartUpdateWithWhereUniqueWithoutServiceOrderInput | OrderPartUpdateWithWhereUniqueWithoutServiceOrderInput[]
    updateMany?: OrderPartUpdateManyWithWhereWithoutServiceOrderInput | OrderPartUpdateManyWithWhereWithoutServiceOrderInput[]
    deleteMany?: OrderPartScalarWhereInput | OrderPartScalarWhereInput[]
  }

  export type ServiceOrderCreateNestedOneWithoutServicesInput = {
    create?: XOR<ServiceOrderCreateWithoutServicesInput, ServiceOrderUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ServiceOrderCreateOrConnectWithoutServicesInput
    connect?: ServiceOrderWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutOrderServicesInput = {
    create?: XOR<ServiceCreateWithoutOrderServicesInput, ServiceUncheckedCreateWithoutOrderServicesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutOrderServicesInput
    connect?: ServiceWhereUniqueInput
  }

  export type ServiceOrderUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<ServiceOrderCreateWithoutServicesInput, ServiceOrderUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ServiceOrderCreateOrConnectWithoutServicesInput
    upsert?: ServiceOrderUpsertWithoutServicesInput
    connect?: ServiceOrderWhereUniqueInput
    update?: XOR<XOR<ServiceOrderUpdateToOneWithWhereWithoutServicesInput, ServiceOrderUpdateWithoutServicesInput>, ServiceOrderUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceUpdateOneRequiredWithoutOrderServicesNestedInput = {
    create?: XOR<ServiceCreateWithoutOrderServicesInput, ServiceUncheckedCreateWithoutOrderServicesInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutOrderServicesInput
    upsert?: ServiceUpsertWithoutOrderServicesInput
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutOrderServicesInput, ServiceUpdateWithoutOrderServicesInput>, ServiceUncheckedUpdateWithoutOrderServicesInput>
  }

  export type ServiceOrderCreateNestedOneWithoutPartsInput = {
    create?: XOR<ServiceOrderCreateWithoutPartsInput, ServiceOrderUncheckedCreateWithoutPartsInput>
    connectOrCreate?: ServiceOrderCreateOrConnectWithoutPartsInput
    connect?: ServiceOrderWhereUniqueInput
  }

  export type PartCreateNestedOneWithoutOrderPartsInput = {
    create?: XOR<PartCreateWithoutOrderPartsInput, PartUncheckedCreateWithoutOrderPartsInput>
    connectOrCreate?: PartCreateOrConnectWithoutOrderPartsInput
    connect?: PartWhereUniqueInput
  }

  export type ServiceOrderUpdateOneRequiredWithoutPartsNestedInput = {
    create?: XOR<ServiceOrderCreateWithoutPartsInput, ServiceOrderUncheckedCreateWithoutPartsInput>
    connectOrCreate?: ServiceOrderCreateOrConnectWithoutPartsInput
    upsert?: ServiceOrderUpsertWithoutPartsInput
    connect?: ServiceOrderWhereUniqueInput
    update?: XOR<XOR<ServiceOrderUpdateToOneWithWhereWithoutPartsInput, ServiceOrderUpdateWithoutPartsInput>, ServiceOrderUncheckedUpdateWithoutPartsInput>
  }

  export type PartUpdateOneRequiredWithoutOrderPartsNestedInput = {
    create?: XOR<PartCreateWithoutOrderPartsInput, PartUncheckedCreateWithoutOrderPartsInput>
    connectOrCreate?: PartCreateOrConnectWithoutOrderPartsInput
    upsert?: PartUpsertWithoutOrderPartsInput
    connect?: PartWhereUniqueInput
    update?: XOR<XOR<PartUpdateToOneWithWhereWithoutOrderPartsInput, PartUpdateWithoutOrderPartsInput>, PartUncheckedUpdateWithoutOrderPartsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.OrderStatus[] | ListEnumOrderStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }

  export type VehicleCreateWithoutCustomerInput = {
    id?: string
    plate: string
    brand: string
    model: string
    year: number
    orders?: ServiceOrderCreateNestedManyWithoutVehicleInput
  }

  export type VehicleUncheckedCreateWithoutCustomerInput = {
    id?: string
    plate: string
    brand: string
    model: string
    year: number
    orders?: ServiceOrderUncheckedCreateNestedManyWithoutVehicleInput
  }

  export type VehicleCreateOrConnectWithoutCustomerInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutCustomerInput, VehicleUncheckedCreateWithoutCustomerInput>
  }

  export type VehicleCreateManyCustomerInputEnvelope = {
    data: VehicleCreateManyCustomerInput | VehicleCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type ServiceOrderCreateWithoutCustomerInput = {
    id?: string
    description: string
    status?: $Enums.OrderStatus
    totalPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    vehicle: VehicleCreateNestedOneWithoutOrdersInput
    services?: OrderServiceCreateNestedManyWithoutServiceOrderInput
    parts?: OrderPartCreateNestedManyWithoutServiceOrderInput
  }

  export type ServiceOrderUncheckedCreateWithoutCustomerInput = {
    id?: string
    vehicleId: string
    description: string
    status?: $Enums.OrderStatus
    totalPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: OrderServiceUncheckedCreateNestedManyWithoutServiceOrderInput
    parts?: OrderPartUncheckedCreateNestedManyWithoutServiceOrderInput
  }

  export type ServiceOrderCreateOrConnectWithoutCustomerInput = {
    where: ServiceOrderWhereUniqueInput
    create: XOR<ServiceOrderCreateWithoutCustomerInput, ServiceOrderUncheckedCreateWithoutCustomerInput>
  }

  export type ServiceOrderCreateManyCustomerInputEnvelope = {
    data: ServiceOrderCreateManyCustomerInput | ServiceOrderCreateManyCustomerInput[]
    skipDuplicates?: boolean
  }

  export type VehicleUpsertWithWhereUniqueWithoutCustomerInput = {
    where: VehicleWhereUniqueInput
    update: XOR<VehicleUpdateWithoutCustomerInput, VehicleUncheckedUpdateWithoutCustomerInput>
    create: XOR<VehicleCreateWithoutCustomerInput, VehicleUncheckedCreateWithoutCustomerInput>
  }

  export type VehicleUpdateWithWhereUniqueWithoutCustomerInput = {
    where: VehicleWhereUniqueInput
    data: XOR<VehicleUpdateWithoutCustomerInput, VehicleUncheckedUpdateWithoutCustomerInput>
  }

  export type VehicleUpdateManyWithWhereWithoutCustomerInput = {
    where: VehicleScalarWhereInput
    data: XOR<VehicleUpdateManyMutationInput, VehicleUncheckedUpdateManyWithoutCustomerInput>
  }

  export type VehicleScalarWhereInput = {
    AND?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
    OR?: VehicleScalarWhereInput[]
    NOT?: VehicleScalarWhereInput | VehicleScalarWhereInput[]
    id?: StringFilter<"Vehicle"> | string
    plate?: StringFilter<"Vehicle"> | string
    brand?: StringFilter<"Vehicle"> | string
    model?: StringFilter<"Vehicle"> | string
    year?: IntFilter<"Vehicle"> | number
    customerId?: StringFilter<"Vehicle"> | string
  }

  export type ServiceOrderUpsertWithWhereUniqueWithoutCustomerInput = {
    where: ServiceOrderWhereUniqueInput
    update: XOR<ServiceOrderUpdateWithoutCustomerInput, ServiceOrderUncheckedUpdateWithoutCustomerInput>
    create: XOR<ServiceOrderCreateWithoutCustomerInput, ServiceOrderUncheckedCreateWithoutCustomerInput>
  }

  export type ServiceOrderUpdateWithWhereUniqueWithoutCustomerInput = {
    where: ServiceOrderWhereUniqueInput
    data: XOR<ServiceOrderUpdateWithoutCustomerInput, ServiceOrderUncheckedUpdateWithoutCustomerInput>
  }

  export type ServiceOrderUpdateManyWithWhereWithoutCustomerInput = {
    where: ServiceOrderScalarWhereInput
    data: XOR<ServiceOrderUpdateManyMutationInput, ServiceOrderUncheckedUpdateManyWithoutCustomerInput>
  }

  export type ServiceOrderScalarWhereInput = {
    AND?: ServiceOrderScalarWhereInput | ServiceOrderScalarWhereInput[]
    OR?: ServiceOrderScalarWhereInput[]
    NOT?: ServiceOrderScalarWhereInput | ServiceOrderScalarWhereInput[]
    id?: StringFilter<"ServiceOrder"> | string
    customerId?: StringFilter<"ServiceOrder"> | string
    vehicleId?: StringFilter<"ServiceOrder"> | string
    description?: StringFilter<"ServiceOrder"> | string
    status?: EnumOrderStatusFilter<"ServiceOrder"> | $Enums.OrderStatus
    totalPrice?: DecimalFilter<"ServiceOrder"> | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFilter<"ServiceOrder"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceOrder"> | Date | string
  }

  export type CustomerCreateWithoutVehiclesInput = {
    id?: string
    name: string
    document: string
    email: string
    phone: string
    createdAt?: Date | string
    orders?: ServiceOrderCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutVehiclesInput = {
    id?: string
    name: string
    document: string
    email: string
    phone: string
    createdAt?: Date | string
    orders?: ServiceOrderUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutVehiclesInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutVehiclesInput, CustomerUncheckedCreateWithoutVehiclesInput>
  }

  export type ServiceOrderCreateWithoutVehicleInput = {
    id?: string
    description: string
    status?: $Enums.OrderStatus
    totalPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    services?: OrderServiceCreateNestedManyWithoutServiceOrderInput
    parts?: OrderPartCreateNestedManyWithoutServiceOrderInput
  }

  export type ServiceOrderUncheckedCreateWithoutVehicleInput = {
    id?: string
    customerId: string
    description: string
    status?: $Enums.OrderStatus
    totalPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: OrderServiceUncheckedCreateNestedManyWithoutServiceOrderInput
    parts?: OrderPartUncheckedCreateNestedManyWithoutServiceOrderInput
  }

  export type ServiceOrderCreateOrConnectWithoutVehicleInput = {
    where: ServiceOrderWhereUniqueInput
    create: XOR<ServiceOrderCreateWithoutVehicleInput, ServiceOrderUncheckedCreateWithoutVehicleInput>
  }

  export type ServiceOrderCreateManyVehicleInputEnvelope = {
    data: ServiceOrderCreateManyVehicleInput | ServiceOrderCreateManyVehicleInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithoutVehiclesInput = {
    update: XOR<CustomerUpdateWithoutVehiclesInput, CustomerUncheckedUpdateWithoutVehiclesInput>
    create: XOR<CustomerCreateWithoutVehiclesInput, CustomerUncheckedCreateWithoutVehiclesInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutVehiclesInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutVehiclesInput, CustomerUncheckedUpdateWithoutVehiclesInput>
  }

  export type CustomerUpdateWithoutVehiclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: ServiceOrderUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutVehiclesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: ServiceOrderUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type ServiceOrderUpsertWithWhereUniqueWithoutVehicleInput = {
    where: ServiceOrderWhereUniqueInput
    update: XOR<ServiceOrderUpdateWithoutVehicleInput, ServiceOrderUncheckedUpdateWithoutVehicleInput>
    create: XOR<ServiceOrderCreateWithoutVehicleInput, ServiceOrderUncheckedCreateWithoutVehicleInput>
  }

  export type ServiceOrderUpdateWithWhereUniqueWithoutVehicleInput = {
    where: ServiceOrderWhereUniqueInput
    data: XOR<ServiceOrderUpdateWithoutVehicleInput, ServiceOrderUncheckedUpdateWithoutVehicleInput>
  }

  export type ServiceOrderUpdateManyWithWhereWithoutVehicleInput = {
    where: ServiceOrderScalarWhereInput
    data: XOR<ServiceOrderUpdateManyMutationInput, ServiceOrderUncheckedUpdateManyWithoutVehicleInput>
  }

  export type OrderServiceCreateWithoutServiceInput = {
    id?: string
    serviceOrder: ServiceOrderCreateNestedOneWithoutServicesInput
  }

  export type OrderServiceUncheckedCreateWithoutServiceInput = {
    id?: string
    serviceOrderId: string
  }

  export type OrderServiceCreateOrConnectWithoutServiceInput = {
    where: OrderServiceWhereUniqueInput
    create: XOR<OrderServiceCreateWithoutServiceInput, OrderServiceUncheckedCreateWithoutServiceInput>
  }

  export type OrderServiceCreateManyServiceInputEnvelope = {
    data: OrderServiceCreateManyServiceInput | OrderServiceCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type OrderServiceUpsertWithWhereUniqueWithoutServiceInput = {
    where: OrderServiceWhereUniqueInput
    update: XOR<OrderServiceUpdateWithoutServiceInput, OrderServiceUncheckedUpdateWithoutServiceInput>
    create: XOR<OrderServiceCreateWithoutServiceInput, OrderServiceUncheckedCreateWithoutServiceInput>
  }

  export type OrderServiceUpdateWithWhereUniqueWithoutServiceInput = {
    where: OrderServiceWhereUniqueInput
    data: XOR<OrderServiceUpdateWithoutServiceInput, OrderServiceUncheckedUpdateWithoutServiceInput>
  }

  export type OrderServiceUpdateManyWithWhereWithoutServiceInput = {
    where: OrderServiceScalarWhereInput
    data: XOR<OrderServiceUpdateManyMutationInput, OrderServiceUncheckedUpdateManyWithoutServiceInput>
  }

  export type OrderServiceScalarWhereInput = {
    AND?: OrderServiceScalarWhereInput | OrderServiceScalarWhereInput[]
    OR?: OrderServiceScalarWhereInput[]
    NOT?: OrderServiceScalarWhereInput | OrderServiceScalarWhereInput[]
    id?: StringFilter<"OrderService"> | string
    serviceOrderId?: StringFilter<"OrderService"> | string
    serviceId?: StringFilter<"OrderService"> | string
  }

  export type OrderPartCreateWithoutPartInput = {
    id?: string
    quantity: number
    serviceOrder: ServiceOrderCreateNestedOneWithoutPartsInput
  }

  export type OrderPartUncheckedCreateWithoutPartInput = {
    id?: string
    serviceOrderId: string
    quantity: number
  }

  export type OrderPartCreateOrConnectWithoutPartInput = {
    where: OrderPartWhereUniqueInput
    create: XOR<OrderPartCreateWithoutPartInput, OrderPartUncheckedCreateWithoutPartInput>
  }

  export type OrderPartCreateManyPartInputEnvelope = {
    data: OrderPartCreateManyPartInput | OrderPartCreateManyPartInput[]
    skipDuplicates?: boolean
  }

  export type OrderPartUpsertWithWhereUniqueWithoutPartInput = {
    where: OrderPartWhereUniqueInput
    update: XOR<OrderPartUpdateWithoutPartInput, OrderPartUncheckedUpdateWithoutPartInput>
    create: XOR<OrderPartCreateWithoutPartInput, OrderPartUncheckedCreateWithoutPartInput>
  }

  export type OrderPartUpdateWithWhereUniqueWithoutPartInput = {
    where: OrderPartWhereUniqueInput
    data: XOR<OrderPartUpdateWithoutPartInput, OrderPartUncheckedUpdateWithoutPartInput>
  }

  export type OrderPartUpdateManyWithWhereWithoutPartInput = {
    where: OrderPartScalarWhereInput
    data: XOR<OrderPartUpdateManyMutationInput, OrderPartUncheckedUpdateManyWithoutPartInput>
  }

  export type OrderPartScalarWhereInput = {
    AND?: OrderPartScalarWhereInput | OrderPartScalarWhereInput[]
    OR?: OrderPartScalarWhereInput[]
    NOT?: OrderPartScalarWhereInput | OrderPartScalarWhereInput[]
    id?: StringFilter<"OrderPart"> | string
    serviceOrderId?: StringFilter<"OrderPart"> | string
    partId?: StringFilter<"OrderPart"> | string
    quantity?: IntFilter<"OrderPart"> | number
  }

  export type CustomerCreateWithoutOrdersInput = {
    id?: string
    name: string
    document: string
    email: string
    phone: string
    createdAt?: Date | string
    vehicles?: VehicleCreateNestedManyWithoutCustomerInput
  }

  export type CustomerUncheckedCreateWithoutOrdersInput = {
    id?: string
    name: string
    document: string
    email: string
    phone: string
    createdAt?: Date | string
    vehicles?: VehicleUncheckedCreateNestedManyWithoutCustomerInput
  }

  export type CustomerCreateOrConnectWithoutOrdersInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutOrdersInput, CustomerUncheckedCreateWithoutOrdersInput>
  }

  export type VehicleCreateWithoutOrdersInput = {
    id?: string
    plate: string
    brand: string
    model: string
    year: number
    customer: CustomerCreateNestedOneWithoutVehiclesInput
  }

  export type VehicleUncheckedCreateWithoutOrdersInput = {
    id?: string
    plate: string
    brand: string
    model: string
    year: number
    customerId: string
  }

  export type VehicleCreateOrConnectWithoutOrdersInput = {
    where: VehicleWhereUniqueInput
    create: XOR<VehicleCreateWithoutOrdersInput, VehicleUncheckedCreateWithoutOrdersInput>
  }

  export type OrderServiceCreateWithoutServiceOrderInput = {
    id?: string
    service: ServiceCreateNestedOneWithoutOrderServicesInput
  }

  export type OrderServiceUncheckedCreateWithoutServiceOrderInput = {
    id?: string
    serviceId: string
  }

  export type OrderServiceCreateOrConnectWithoutServiceOrderInput = {
    where: OrderServiceWhereUniqueInput
    create: XOR<OrderServiceCreateWithoutServiceOrderInput, OrderServiceUncheckedCreateWithoutServiceOrderInput>
  }

  export type OrderServiceCreateManyServiceOrderInputEnvelope = {
    data: OrderServiceCreateManyServiceOrderInput | OrderServiceCreateManyServiceOrderInput[]
    skipDuplicates?: boolean
  }

  export type OrderPartCreateWithoutServiceOrderInput = {
    id?: string
    quantity: number
    part: PartCreateNestedOneWithoutOrderPartsInput
  }

  export type OrderPartUncheckedCreateWithoutServiceOrderInput = {
    id?: string
    partId: string
    quantity: number
  }

  export type OrderPartCreateOrConnectWithoutServiceOrderInput = {
    where: OrderPartWhereUniqueInput
    create: XOR<OrderPartCreateWithoutServiceOrderInput, OrderPartUncheckedCreateWithoutServiceOrderInput>
  }

  export type OrderPartCreateManyServiceOrderInputEnvelope = {
    data: OrderPartCreateManyServiceOrderInput | OrderPartCreateManyServiceOrderInput[]
    skipDuplicates?: boolean
  }

  export type CustomerUpsertWithoutOrdersInput = {
    update: XOR<CustomerUpdateWithoutOrdersInput, CustomerUncheckedUpdateWithoutOrdersInput>
    create: XOR<CustomerCreateWithoutOrdersInput, CustomerUncheckedCreateWithoutOrdersInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutOrdersInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutOrdersInput, CustomerUncheckedUpdateWithoutOrdersInput>
  }

  export type CustomerUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUpdateManyWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    document?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicles?: VehicleUncheckedUpdateManyWithoutCustomerNestedInput
  }

  export type VehicleUpsertWithoutOrdersInput = {
    update: XOR<VehicleUpdateWithoutOrdersInput, VehicleUncheckedUpdateWithoutOrdersInput>
    create: XOR<VehicleCreateWithoutOrdersInput, VehicleUncheckedCreateWithoutOrdersInput>
    where?: VehicleWhereInput
  }

  export type VehicleUpdateToOneWithWhereWithoutOrdersInput = {
    where?: VehicleWhereInput
    data: XOR<VehicleUpdateWithoutOrdersInput, VehicleUncheckedUpdateWithoutOrdersInput>
  }

  export type VehicleUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    customer?: CustomerUpdateOneRequiredWithoutVehiclesNestedInput
  }

  export type VehicleUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    customerId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderServiceUpsertWithWhereUniqueWithoutServiceOrderInput = {
    where: OrderServiceWhereUniqueInput
    update: XOR<OrderServiceUpdateWithoutServiceOrderInput, OrderServiceUncheckedUpdateWithoutServiceOrderInput>
    create: XOR<OrderServiceCreateWithoutServiceOrderInput, OrderServiceUncheckedCreateWithoutServiceOrderInput>
  }

  export type OrderServiceUpdateWithWhereUniqueWithoutServiceOrderInput = {
    where: OrderServiceWhereUniqueInput
    data: XOR<OrderServiceUpdateWithoutServiceOrderInput, OrderServiceUncheckedUpdateWithoutServiceOrderInput>
  }

  export type OrderServiceUpdateManyWithWhereWithoutServiceOrderInput = {
    where: OrderServiceScalarWhereInput
    data: XOR<OrderServiceUpdateManyMutationInput, OrderServiceUncheckedUpdateManyWithoutServiceOrderInput>
  }

  export type OrderPartUpsertWithWhereUniqueWithoutServiceOrderInput = {
    where: OrderPartWhereUniqueInput
    update: XOR<OrderPartUpdateWithoutServiceOrderInput, OrderPartUncheckedUpdateWithoutServiceOrderInput>
    create: XOR<OrderPartCreateWithoutServiceOrderInput, OrderPartUncheckedCreateWithoutServiceOrderInput>
  }

  export type OrderPartUpdateWithWhereUniqueWithoutServiceOrderInput = {
    where: OrderPartWhereUniqueInput
    data: XOR<OrderPartUpdateWithoutServiceOrderInput, OrderPartUncheckedUpdateWithoutServiceOrderInput>
  }

  export type OrderPartUpdateManyWithWhereWithoutServiceOrderInput = {
    where: OrderPartScalarWhereInput
    data: XOR<OrderPartUpdateManyMutationInput, OrderPartUncheckedUpdateManyWithoutServiceOrderInput>
  }

  export type ServiceOrderCreateWithoutServicesInput = {
    id?: string
    description: string
    status?: $Enums.OrderStatus
    totalPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    vehicle: VehicleCreateNestedOneWithoutOrdersInput
    parts?: OrderPartCreateNestedManyWithoutServiceOrderInput
  }

  export type ServiceOrderUncheckedCreateWithoutServicesInput = {
    id?: string
    customerId: string
    vehicleId: string
    description: string
    status?: $Enums.OrderStatus
    totalPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    parts?: OrderPartUncheckedCreateNestedManyWithoutServiceOrderInput
  }

  export type ServiceOrderCreateOrConnectWithoutServicesInput = {
    where: ServiceOrderWhereUniqueInput
    create: XOR<ServiceOrderCreateWithoutServicesInput, ServiceOrderUncheckedCreateWithoutServicesInput>
  }

  export type ServiceCreateWithoutOrderServicesInput = {
    id?: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    estimatedTime: number
  }

  export type ServiceUncheckedCreateWithoutOrderServicesInput = {
    id?: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    estimatedTime: number
  }

  export type ServiceCreateOrConnectWithoutOrderServicesInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutOrderServicesInput, ServiceUncheckedCreateWithoutOrderServicesInput>
  }

  export type ServiceOrderUpsertWithoutServicesInput = {
    update: XOR<ServiceOrderUpdateWithoutServicesInput, ServiceOrderUncheckedUpdateWithoutServicesInput>
    create: XOR<ServiceOrderCreateWithoutServicesInput, ServiceOrderUncheckedCreateWithoutServicesInput>
    where?: ServiceOrderWhereInput
  }

  export type ServiceOrderUpdateToOneWithWhereWithoutServicesInput = {
    where?: ServiceOrderWhereInput
    data: XOR<ServiceOrderUpdateWithoutServicesInput, ServiceOrderUncheckedUpdateWithoutServicesInput>
  }

  export type ServiceOrderUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutOrdersNestedInput
    parts?: OrderPartUpdateManyWithoutServiceOrderNestedInput
  }

  export type ServiceOrderUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parts?: OrderPartUncheckedUpdateManyWithoutServiceOrderNestedInput
  }

  export type ServiceUpsertWithoutOrderServicesInput = {
    update: XOR<ServiceUpdateWithoutOrderServicesInput, ServiceUncheckedUpdateWithoutOrderServicesInput>
    create: XOR<ServiceCreateWithoutOrderServicesInput, ServiceUncheckedCreateWithoutOrderServicesInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutOrderServicesInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutOrderServicesInput, ServiceUncheckedUpdateWithoutOrderServicesInput>
  }

  export type ServiceUpdateWithoutOrderServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estimatedTime?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceUncheckedUpdateWithoutOrderServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    estimatedTime?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceOrderCreateWithoutPartsInput = {
    id?: string
    description: string
    status?: $Enums.OrderStatus
    totalPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    customer: CustomerCreateNestedOneWithoutOrdersInput
    vehicle: VehicleCreateNestedOneWithoutOrdersInput
    services?: OrderServiceCreateNestedManyWithoutServiceOrderInput
  }

  export type ServiceOrderUncheckedCreateWithoutPartsInput = {
    id?: string
    customerId: string
    vehicleId: string
    description: string
    status?: $Enums.OrderStatus
    totalPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: OrderServiceUncheckedCreateNestedManyWithoutServiceOrderInput
  }

  export type ServiceOrderCreateOrConnectWithoutPartsInput = {
    where: ServiceOrderWhereUniqueInput
    create: XOR<ServiceOrderCreateWithoutPartsInput, ServiceOrderUncheckedCreateWithoutPartsInput>
  }

  export type PartCreateWithoutOrderPartsInput = {
    id?: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    stockQty?: number
  }

  export type PartUncheckedCreateWithoutOrderPartsInput = {
    id?: string
    name: string
    description?: string | null
    price: Decimal | DecimalJsLike | number | string
    stockQty?: number
  }

  export type PartCreateOrConnectWithoutOrderPartsInput = {
    where: PartWhereUniqueInput
    create: XOR<PartCreateWithoutOrderPartsInput, PartUncheckedCreateWithoutOrderPartsInput>
  }

  export type ServiceOrderUpsertWithoutPartsInput = {
    update: XOR<ServiceOrderUpdateWithoutPartsInput, ServiceOrderUncheckedUpdateWithoutPartsInput>
    create: XOR<ServiceOrderCreateWithoutPartsInput, ServiceOrderUncheckedCreateWithoutPartsInput>
    where?: ServiceOrderWhereInput
  }

  export type ServiceOrderUpdateToOneWithWhereWithoutPartsInput = {
    where?: ServiceOrderWhereInput
    data: XOR<ServiceOrderUpdateWithoutPartsInput, ServiceOrderUncheckedUpdateWithoutPartsInput>
  }

  export type ServiceOrderUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    vehicle?: VehicleUpdateOneRequiredWithoutOrdersNestedInput
    services?: OrderServiceUpdateManyWithoutServiceOrderNestedInput
  }

  export type ServiceOrderUncheckedUpdateWithoutPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: OrderServiceUncheckedUpdateManyWithoutServiceOrderNestedInput
  }

  export type PartUpsertWithoutOrderPartsInput = {
    update: XOR<PartUpdateWithoutOrderPartsInput, PartUncheckedUpdateWithoutOrderPartsInput>
    create: XOR<PartCreateWithoutOrderPartsInput, PartUncheckedCreateWithoutOrderPartsInput>
    where?: PartWhereInput
  }

  export type PartUpdateToOneWithWhereWithoutOrderPartsInput = {
    where?: PartWhereInput
    data: XOR<PartUpdateWithoutOrderPartsInput, PartUncheckedUpdateWithoutOrderPartsInput>
  }

  export type PartUpdateWithoutOrderPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stockQty?: IntFieldUpdateOperationsInput | number
  }

  export type PartUncheckedUpdateWithoutOrderPartsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    stockQty?: IntFieldUpdateOperationsInput | number
  }

  export type VehicleCreateManyCustomerInput = {
    id?: string
    plate: string
    brand: string
    model: string
    year: number
  }

  export type ServiceOrderCreateManyCustomerInput = {
    id?: string
    vehicleId: string
    description: string
    status?: $Enums.OrderStatus
    totalPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VehicleUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    orders?: ServiceOrderUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
    orders?: ServiceOrderUncheckedUpdateManyWithoutVehicleNestedInput
  }

  export type VehicleUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    plate?: StringFieldUpdateOperationsInput | string
    brand?: StringFieldUpdateOperationsInput | string
    model?: StringFieldUpdateOperationsInput | string
    year?: IntFieldUpdateOperationsInput | number
  }

  export type ServiceOrderUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vehicle?: VehicleUpdateOneRequiredWithoutOrdersNestedInput
    services?: OrderServiceUpdateManyWithoutServiceOrderNestedInput
    parts?: OrderPartUpdateManyWithoutServiceOrderNestedInput
  }

  export type ServiceOrderUncheckedUpdateWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: OrderServiceUncheckedUpdateManyWithoutServiceOrderNestedInput
    parts?: OrderPartUncheckedUpdateManyWithoutServiceOrderNestedInput
  }

  export type ServiceOrderUncheckedUpdateManyWithoutCustomerInput = {
    id?: StringFieldUpdateOperationsInput | string
    vehicleId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceOrderCreateManyVehicleInput = {
    id?: string
    customerId: string
    description: string
    status?: $Enums.OrderStatus
    totalPrice?: Decimal | DecimalJsLike | number | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceOrderUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    customer?: CustomerUpdateOneRequiredWithoutOrdersNestedInput
    services?: OrderServiceUpdateManyWithoutServiceOrderNestedInput
    parts?: OrderPartUpdateManyWithoutServiceOrderNestedInput
  }

  export type ServiceOrderUncheckedUpdateWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: OrderServiceUncheckedUpdateManyWithoutServiceOrderNestedInput
    parts?: OrderPartUncheckedUpdateManyWithoutServiceOrderNestedInput
  }

  export type ServiceOrderUncheckedUpdateManyWithoutVehicleInput = {
    id?: StringFieldUpdateOperationsInput | string
    customerId?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    totalPrice?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderServiceCreateManyServiceInput = {
    id?: string
    serviceOrderId: string
  }

  export type OrderServiceUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceOrder?: ServiceOrderUpdateOneRequiredWithoutServicesNestedInput
  }

  export type OrderServiceUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceOrderId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderServiceUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceOrderId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderPartCreateManyPartInput = {
    id?: string
    serviceOrderId: string
    quantity: number
  }

  export type OrderPartUpdateWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    serviceOrder?: ServiceOrderUpdateOneRequiredWithoutPartsNestedInput
  }

  export type OrderPartUncheckedUpdateWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceOrderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type OrderPartUncheckedUpdateManyWithoutPartInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceOrderId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type OrderServiceCreateManyServiceOrderInput = {
    id?: string
    serviceId: string
  }

  export type OrderPartCreateManyServiceOrderInput = {
    id?: string
    partId: string
    quantity: number
  }

  export type OrderServiceUpdateWithoutServiceOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    service?: ServiceUpdateOneRequiredWithoutOrderServicesNestedInput
  }

  export type OrderServiceUncheckedUpdateWithoutServiceOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderServiceUncheckedUpdateManyWithoutServiceOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    serviceId?: StringFieldUpdateOperationsInput | string
  }

  export type OrderPartUpdateWithoutServiceOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    part?: PartUpdateOneRequiredWithoutOrderPartsNestedInput
  }

  export type OrderPartUncheckedUpdateWithoutServiceOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }

  export type OrderPartUncheckedUpdateManyWithoutServiceOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    partId?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}