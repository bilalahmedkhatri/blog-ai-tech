
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model UserProfile
 * 
 */
export type UserProfile = $Result.DefaultSelection<Prisma.$UserProfilePayload>
/**
 * Model BlogCategory
 * 
 */
export type BlogCategory = $Result.DefaultSelection<Prisma.$BlogCategoryPayload>
/**
 * Model BlogTag
 * 
 */
export type BlogTag = $Result.DefaultSelection<Prisma.$BlogTagPayload>
/**
 * Model BlogMainPageSections
 * 
 */
export type BlogMainPageSections = $Result.DefaultSelection<Prisma.$BlogMainPageSectionsPayload>
/**
 * Model UploadedImage
 * 
 */
export type UploadedImage = $Result.DefaultSelection<Prisma.$UploadedImagePayload>
/**
 * Model BlogPost
 * 
 */
export type BlogPost = $Result.DefaultSelection<Prisma.$BlogPostPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  MASTER_ADMIN: 'MASTER_ADMIN',
  BLOG_ADMIN: 'BLOG_ADMIN',
  AI_VIDEO_EDITOR_USER: 'AI_VIDEO_EDITOR_USER',
  USER: 'USER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const SecurityQuestion: {
  FIRST_PET: 'FIRST_PET',
  MOTHER_MAIDEN: 'MOTHER_MAIDEN',
  BIRTH_CITY: 'BIRTH_CITY',
  FIRST_SCHOOL: 'FIRST_SCHOOL',
  FAVORITE_TEACHER: 'FAVORITE_TEACHER',
  CHILDHOOD_FRIEND: 'CHILDHOOD_FRIEND',
  FIRST_CAR: 'FIRST_CAR',
  FAVORITE_PLACE: 'FAVORITE_PLACE',
  PARENTS_MET: 'PARENTS_MET',
  CHILDHOOD_HERO: 'CHILDHOOD_HERO'
};

export type SecurityQuestion = (typeof SecurityQuestion)[keyof typeof SecurityQuestion]


export const UploadedImageStatus: {
  PENDING: 'PENDING',
  USING: 'USING'
};

export type UploadedImageStatus = (typeof UploadedImageStatus)[keyof typeof UploadedImageStatus]


export const BlogPostStatus: {
  draft: 'draft',
  pending: 'pending',
  published: 'published'
};

export type BlogPostStatus = (typeof BlogPostStatus)[keyof typeof BlogPostStatus]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type SecurityQuestion = $Enums.SecurityQuestion

export const SecurityQuestion: typeof $Enums.SecurityQuestion

export type UploadedImageStatus = $Enums.UploadedImageStatus

export const UploadedImageStatus: typeof $Enums.UploadedImageStatus

export type BlogPostStatus = $Enums.BlogPostStatus

export const BlogPostStatus: typeof $Enums.BlogPostStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more UserProfiles
 * const userProfiles = await prisma.userProfile.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more UserProfiles
   * const userProfiles = await prisma.userProfile.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
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
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.userProfile`: Exposes CRUD operations for the **UserProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProfiles
    * const userProfiles = await prisma.userProfile.findMany()
    * ```
    */
  get userProfile(): Prisma.UserProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.blogCategory`: Exposes CRUD operations for the **BlogCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlogCategories
    * const blogCategories = await prisma.blogCategory.findMany()
    * ```
    */
  get blogCategory(): Prisma.BlogCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.blogTag`: Exposes CRUD operations for the **BlogTag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlogTags
    * const blogTags = await prisma.blogTag.findMany()
    * ```
    */
  get blogTag(): Prisma.BlogTagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.blogMainPageSections`: Exposes CRUD operations for the **BlogMainPageSections** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlogMainPageSections
    * const blogMainPageSections = await prisma.blogMainPageSections.findMany()
    * ```
    */
  get blogMainPageSections(): Prisma.BlogMainPageSectionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.uploadedImage`: Exposes CRUD operations for the **UploadedImage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UploadedImages
    * const uploadedImages = await prisma.uploadedImage.findMany()
    * ```
    */
  get uploadedImage(): Prisma.UploadedImageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.blogPost`: Exposes CRUD operations for the **BlogPost** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlogPosts
    * const blogPosts = await prisma.blogPost.findMany()
    * ```
    */
  get blogPost(): Prisma.BlogPostDelegate<ExtArgs, ClientOptions>;
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
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

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
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


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
    UserProfile: 'UserProfile',
    BlogCategory: 'BlogCategory',
    BlogTag: 'BlogTag',
    BlogMainPageSections: 'BlogMainPageSections',
    UploadedImage: 'UploadedImage',
    BlogPost: 'BlogPost'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "userProfile" | "blogCategory" | "blogTag" | "blogMainPageSections" | "uploadedImage" | "blogPost"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      UserProfile: {
        payload: Prisma.$UserProfilePayload<ExtArgs>
        fields: Prisma.UserProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findFirst: {
            args: Prisma.UserProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findMany: {
            args: Prisma.UserProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          create: {
            args: Prisma.UserProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          createMany: {
            args: Prisma.UserProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          update: {
            args: Prisma.UserProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          deleteMany: {
            args: Prisma.UserProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          aggregate: {
            args: Prisma.UserProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProfile>
          }
          groupBy: {
            args: Prisma.UserProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProfileCountArgs<ExtArgs>
            result: $Utils.Optional<UserProfileCountAggregateOutputType> | number
          }
        }
      }
      BlogCategory: {
        payload: Prisma.$BlogCategoryPayload<ExtArgs>
        fields: Prisma.BlogCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogCategoryPayload>
          }
          findFirst: {
            args: Prisma.BlogCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogCategoryPayload>
          }
          findMany: {
            args: Prisma.BlogCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogCategoryPayload>[]
          }
          create: {
            args: Prisma.BlogCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogCategoryPayload>
          }
          createMany: {
            args: Prisma.BlogCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BlogCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogCategoryPayload>
          }
          update: {
            args: Prisma.BlogCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogCategoryPayload>
          }
          deleteMany: {
            args: Prisma.BlogCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BlogCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogCategoryPayload>
          }
          aggregate: {
            args: Prisma.BlogCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlogCategory>
          }
          groupBy: {
            args: Prisma.BlogCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlogCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<BlogCategoryCountAggregateOutputType> | number
          }
        }
      }
      BlogTag: {
        payload: Prisma.$BlogTagPayload<ExtArgs>
        fields: Prisma.BlogTagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogTagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogTagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>
          }
          findFirst: {
            args: Prisma.BlogTagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogTagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>
          }
          findMany: {
            args: Prisma.BlogTagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>[]
          }
          create: {
            args: Prisma.BlogTagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>
          }
          createMany: {
            args: Prisma.BlogTagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BlogTagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>
          }
          update: {
            args: Prisma.BlogTagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>
          }
          deleteMany: {
            args: Prisma.BlogTagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogTagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BlogTagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogTagPayload>
          }
          aggregate: {
            args: Prisma.BlogTagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlogTag>
          }
          groupBy: {
            args: Prisma.BlogTagGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogTagGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlogTagCountArgs<ExtArgs>
            result: $Utils.Optional<BlogTagCountAggregateOutputType> | number
          }
        }
      }
      BlogMainPageSections: {
        payload: Prisma.$BlogMainPageSectionsPayload<ExtArgs>
        fields: Prisma.BlogMainPageSectionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogMainPageSectionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogMainPageSectionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogMainPageSectionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogMainPageSectionsPayload>
          }
          findFirst: {
            args: Prisma.BlogMainPageSectionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogMainPageSectionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogMainPageSectionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogMainPageSectionsPayload>
          }
          findMany: {
            args: Prisma.BlogMainPageSectionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogMainPageSectionsPayload>[]
          }
          create: {
            args: Prisma.BlogMainPageSectionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogMainPageSectionsPayload>
          }
          createMany: {
            args: Prisma.BlogMainPageSectionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BlogMainPageSectionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogMainPageSectionsPayload>
          }
          update: {
            args: Prisma.BlogMainPageSectionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogMainPageSectionsPayload>
          }
          deleteMany: {
            args: Prisma.BlogMainPageSectionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogMainPageSectionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BlogMainPageSectionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogMainPageSectionsPayload>
          }
          aggregate: {
            args: Prisma.BlogMainPageSectionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlogMainPageSections>
          }
          groupBy: {
            args: Prisma.BlogMainPageSectionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogMainPageSectionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlogMainPageSectionsCountArgs<ExtArgs>
            result: $Utils.Optional<BlogMainPageSectionsCountAggregateOutputType> | number
          }
        }
      }
      UploadedImage: {
        payload: Prisma.$UploadedImagePayload<ExtArgs>
        fields: Prisma.UploadedImageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UploadedImageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedImagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UploadedImageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedImagePayload>
          }
          findFirst: {
            args: Prisma.UploadedImageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedImagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UploadedImageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedImagePayload>
          }
          findMany: {
            args: Prisma.UploadedImageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedImagePayload>[]
          }
          create: {
            args: Prisma.UploadedImageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedImagePayload>
          }
          createMany: {
            args: Prisma.UploadedImageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UploadedImageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedImagePayload>
          }
          update: {
            args: Prisma.UploadedImageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedImagePayload>
          }
          deleteMany: {
            args: Prisma.UploadedImageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UploadedImageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UploadedImageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UploadedImagePayload>
          }
          aggregate: {
            args: Prisma.UploadedImageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUploadedImage>
          }
          groupBy: {
            args: Prisma.UploadedImageGroupByArgs<ExtArgs>
            result: $Utils.Optional<UploadedImageGroupByOutputType>[]
          }
          count: {
            args: Prisma.UploadedImageCountArgs<ExtArgs>
            result: $Utils.Optional<UploadedImageCountAggregateOutputType> | number
          }
        }
      }
      BlogPost: {
        payload: Prisma.$BlogPostPayload<ExtArgs>
        fields: Prisma.BlogPostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlogPostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlogPostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          findFirst: {
            args: Prisma.BlogPostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlogPostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          findMany: {
            args: Prisma.BlogPostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>[]
          }
          create: {
            args: Prisma.BlogPostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          createMany: {
            args: Prisma.BlogPostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.BlogPostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          update: {
            args: Prisma.BlogPostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          deleteMany: {
            args: Prisma.BlogPostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlogPostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BlogPostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlogPostPayload>
          }
          aggregate: {
            args: Prisma.BlogPostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlogPost>
          }
          groupBy: {
            args: Prisma.BlogPostGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlogPostGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlogPostCountArgs<ExtArgs>
            result: $Utils.Optional<BlogPostCountAggregateOutputType> | number
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
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
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
  }
  export type GlobalOmitConfig = {
    userProfile?: UserProfileOmit
    blogCategory?: BlogCategoryOmit
    blogTag?: BlogTagOmit
    blogMainPageSections?: BlogMainPageSectionsOmit
    uploadedImage?: UploadedImageOmit
    blogPost?: BlogPostOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

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

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

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
   * Count Type UserProfileCountOutputType
   */

  export type UserProfileCountOutputType = {
    blogCategories: number
    blogTags: number
    uploadedImages: number
    blogPosts: number
  }

  export type UserProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blogCategories?: boolean | UserProfileCountOutputTypeCountBlogCategoriesArgs
    blogTags?: boolean | UserProfileCountOutputTypeCountBlogTagsArgs
    uploadedImages?: boolean | UserProfileCountOutputTypeCountUploadedImagesArgs
    blogPosts?: boolean | UserProfileCountOutputTypeCountBlogPostsArgs
  }

  // Custom InputTypes
  /**
   * UserProfileCountOutputType without action
   */
  export type UserProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileCountOutputType
     */
    select?: UserProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserProfileCountOutputType without action
   */
  export type UserProfileCountOutputTypeCountBlogCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogCategoryWhereInput
  }

  /**
   * UserProfileCountOutputType without action
   */
  export type UserProfileCountOutputTypeCountBlogTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogTagWhereInput
  }

  /**
   * UserProfileCountOutputType without action
   */
  export type UserProfileCountOutputTypeCountUploadedImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadedImageWhereInput
  }

  /**
   * UserProfileCountOutputType without action
   */
  export type UserProfileCountOutputTypeCountBlogPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogPostWhereInput
  }


  /**
   * Count Type BlogCategoryCountOutputType
   */

  export type BlogCategoryCountOutputType = {
    posts: number
  }

  export type BlogCategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | BlogCategoryCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * BlogCategoryCountOutputType without action
   */
  export type BlogCategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCategoryCountOutputType
     */
    select?: BlogCategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BlogCategoryCountOutputType without action
   */
  export type BlogCategoryCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogPostWhereInput
  }


  /**
   * Count Type BlogTagCountOutputType
   */

  export type BlogTagCountOutputType = {
    posts: number
  }

  export type BlogTagCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | BlogTagCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * BlogTagCountOutputType without action
   */
  export type BlogTagCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTagCountOutputType
     */
    select?: BlogTagCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BlogTagCountOutputType without action
   */
  export type BlogTagCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogPostWhereInput
  }


  /**
   * Count Type BlogMainPageSectionsCountOutputType
   */

  export type BlogMainPageSectionsCountOutputType = {
    posts: number
  }

  export type BlogMainPageSectionsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | BlogMainPageSectionsCountOutputTypeCountPostsArgs
  }

  // Custom InputTypes
  /**
   * BlogMainPageSectionsCountOutputType without action
   */
  export type BlogMainPageSectionsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogMainPageSectionsCountOutputType
     */
    select?: BlogMainPageSectionsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BlogMainPageSectionsCountOutputType without action
   */
  export type BlogMainPageSectionsCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogPostWhereInput
  }


  /**
   * Count Type BlogPostCountOutputType
   */

  export type BlogPostCountOutputType = {
    tags: number
  }

  export type BlogPostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tags?: boolean | BlogPostCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * BlogPostCountOutputType without action
   */
  export type BlogPostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPostCountOutputType
     */
    select?: BlogPostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BlogPostCountOutputType without action
   */
  export type BlogPostCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogTagWhereInput
  }


  /**
   * Models
   */

  /**
   * Model UserProfile
   */

  export type AggregateUserProfile = {
    _count: UserProfileCountAggregateOutputType | null
    _avg: UserProfileAvgAggregateOutputType | null
    _sum: UserProfileSumAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  export type UserProfileAvgAggregateOutputType = {
    id: number | null
    zipCode: number | null
  }

  export type UserProfileSumAggregateOutputType = {
    id: number | null
    zipCode: number | null
  }

  export type UserProfileMinAggregateOutputType = {
    id: number | null
    email: string | null
    firstName: string | null
    lastName: string | null
    role: $Enums.Role | null
    isStaff: boolean | null
    isActive: boolean | null
    dateJoined: Date | null
    updatedAt: Date | null
    isVerified: boolean | null
    city: string | null
    state: string | null
    zipCode: number | null
    country: string | null
    address1: string | null
    address2: string | null
    securityQuestion: $Enums.SecurityQuestion | null
    securityAnswer: string | null
    profileImage: string | null
    phoneNumber: string | null
    summery: string | null
  }

  export type UserProfileMaxAggregateOutputType = {
    id: number | null
    email: string | null
    firstName: string | null
    lastName: string | null
    role: $Enums.Role | null
    isStaff: boolean | null
    isActive: boolean | null
    dateJoined: Date | null
    updatedAt: Date | null
    isVerified: boolean | null
    city: string | null
    state: string | null
    zipCode: number | null
    country: string | null
    address1: string | null
    address2: string | null
    securityQuestion: $Enums.SecurityQuestion | null
    securityAnswer: string | null
    profileImage: string | null
    phoneNumber: string | null
    summery: string | null
  }

  export type UserProfileCountAggregateOutputType = {
    id: number
    email: number
    firstName: number
    lastName: number
    role: number
    isStaff: number
    isActive: number
    dateJoined: number
    updatedAt: number
    isVerified: number
    city: number
    state: number
    zipCode: number
    country: number
    address1: number
    address2: number
    securityQuestion: number
    securityAnswer: number
    profileImage: number
    phoneNumber: number
    summery: number
    _all: number
  }


  export type UserProfileAvgAggregateInputType = {
    id?: true
    zipCode?: true
  }

  export type UserProfileSumAggregateInputType = {
    id?: true
    zipCode?: true
  }

  export type UserProfileMinAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    role?: true
    isStaff?: true
    isActive?: true
    dateJoined?: true
    updatedAt?: true
    isVerified?: true
    city?: true
    state?: true
    zipCode?: true
    country?: true
    address1?: true
    address2?: true
    securityQuestion?: true
    securityAnswer?: true
    profileImage?: true
    phoneNumber?: true
    summery?: true
  }

  export type UserProfileMaxAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    role?: true
    isStaff?: true
    isActive?: true
    dateJoined?: true
    updatedAt?: true
    isVerified?: true
    city?: true
    state?: true
    zipCode?: true
    country?: true
    address1?: true
    address2?: true
    securityQuestion?: true
    securityAnswer?: true
    profileImage?: true
    phoneNumber?: true
    summery?: true
  }

  export type UserProfileCountAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastName?: true
    role?: true
    isStaff?: true
    isActive?: true
    dateJoined?: true
    updatedAt?: true
    isVerified?: true
    city?: true
    state?: true
    zipCode?: true
    country?: true
    address1?: true
    address2?: true
    securityQuestion?: true
    securityAnswer?: true
    profileImage?: true
    phoneNumber?: true
    summery?: true
    _all?: true
  }

  export type UserProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfile to aggregate.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProfiles
    **/
    _count?: true | UserProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProfileMaxAggregateInputType
  }

  export type GetUserProfileAggregateType<T extends UserProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProfile[P]>
      : GetScalarType<T[P], AggregateUserProfile[P]>
  }




  export type UserProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProfileWhereInput
    orderBy?: UserProfileOrderByWithAggregationInput | UserProfileOrderByWithAggregationInput[]
    by: UserProfileScalarFieldEnum[] | UserProfileScalarFieldEnum
    having?: UserProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProfileCountAggregateInputType | true
    _avg?: UserProfileAvgAggregateInputType
    _sum?: UserProfileSumAggregateInputType
    _min?: UserProfileMinAggregateInputType
    _max?: UserProfileMaxAggregateInputType
  }

  export type UserProfileGroupByOutputType = {
    id: number
    email: string
    firstName: string | null
    lastName: string | null
    role: $Enums.Role
    isStaff: boolean
    isActive: boolean
    dateJoined: Date
    updatedAt: Date
    isVerified: boolean
    city: string | null
    state: string | null
    zipCode: number | null
    country: string | null
    address1: string | null
    address2: string | null
    securityQuestion: $Enums.SecurityQuestion | null
    securityAnswer: string | null
    profileImage: string | null
    phoneNumber: string | null
    summery: string | null
    _count: UserProfileCountAggregateOutputType | null
    _avg: UserProfileAvgAggregateOutputType | null
    _sum: UserProfileSumAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  type GetUserProfileGroupByPayload<T extends UserProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
            : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
        }
      >
    >


  export type UserProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    isStaff?: boolean
    isActive?: boolean
    dateJoined?: boolean
    updatedAt?: boolean
    isVerified?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    country?: boolean
    address1?: boolean
    address2?: boolean
    securityQuestion?: boolean
    securityAnswer?: boolean
    profileImage?: boolean
    phoneNumber?: boolean
    summery?: boolean
    blogCategories?: boolean | UserProfile$blogCategoriesArgs<ExtArgs>
    blogTags?: boolean | UserProfile$blogTagsArgs<ExtArgs>
    uploadedImages?: boolean | UserProfile$uploadedImagesArgs<ExtArgs>
    blogPosts?: boolean | UserProfile$blogPostsArgs<ExtArgs>
    _count?: boolean | UserProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>



  export type UserProfileSelectScalar = {
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastName?: boolean
    role?: boolean
    isStaff?: boolean
    isActive?: boolean
    dateJoined?: boolean
    updatedAt?: boolean
    isVerified?: boolean
    city?: boolean
    state?: boolean
    zipCode?: boolean
    country?: boolean
    address1?: boolean
    address2?: boolean
    securityQuestion?: boolean
    securityAnswer?: boolean
    profileImage?: boolean
    phoneNumber?: boolean
    summery?: boolean
  }

  export type UserProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "firstName" | "lastName" | "role" | "isStaff" | "isActive" | "dateJoined" | "updatedAt" | "isVerified" | "city" | "state" | "zipCode" | "country" | "address1" | "address2" | "securityQuestion" | "securityAnswer" | "profileImage" | "phoneNumber" | "summery", ExtArgs["result"]["userProfile"]>
  export type UserProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    blogCategories?: boolean | UserProfile$blogCategoriesArgs<ExtArgs>
    blogTags?: boolean | UserProfile$blogTagsArgs<ExtArgs>
    uploadedImages?: boolean | UserProfile$uploadedImagesArgs<ExtArgs>
    blogPosts?: boolean | UserProfile$blogPostsArgs<ExtArgs>
    _count?: boolean | UserProfileCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProfile"
    objects: {
      blogCategories: Prisma.$BlogCategoryPayload<ExtArgs>[]
      blogTags: Prisma.$BlogTagPayload<ExtArgs>[]
      uploadedImages: Prisma.$UploadedImagePayload<ExtArgs>[]
      blogPosts: Prisma.$BlogPostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      firstName: string | null
      lastName: string | null
      role: $Enums.Role
      isStaff: boolean
      isActive: boolean
      dateJoined: Date
      updatedAt: Date
      isVerified: boolean
      city: string | null
      state: string | null
      zipCode: number | null
      country: string | null
      address1: string | null
      address2: string | null
      securityQuestion: $Enums.SecurityQuestion | null
      securityAnswer: string | null
      profileImage: string | null
      phoneNumber: string | null
      summery: string | null
    }, ExtArgs["result"]["userProfile"]>
    composites: {}
  }

  type UserProfileGetPayload<S extends boolean | null | undefined | UserProfileDefaultArgs> = $Result.GetResult<Prisma.$UserProfilePayload, S>

  type UserProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProfileCountAggregateInputType | true
    }

  export interface UserProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProfile'], meta: { name: 'UserProfile' } }
    /**
     * Find zero or one UserProfile that matches the filter.
     * @param {UserProfileFindUniqueArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProfileFindUniqueArgs>(args: SelectSubset<T, UserProfileFindUniqueArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProfileFindUniqueOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProfileFindFirstArgs>(args?: SelectSubset<T, UserProfileFindFirstArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProfiles
     * const userProfiles = await prisma.userProfile.findMany()
     * 
     * // Get first 10 UserProfiles
     * const userProfiles = await prisma.userProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserProfileFindManyArgs>(args?: SelectSubset<T, UserProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProfile.
     * @param {UserProfileCreateArgs} args - Arguments to create a UserProfile.
     * @example
     * // Create one UserProfile
     * const UserProfile = await prisma.userProfile.create({
     *   data: {
     *     // ... data to create a UserProfile
     *   }
     * })
     * 
     */
    create<T extends UserProfileCreateArgs>(args: SelectSubset<T, UserProfileCreateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProfiles.
     * @param {UserProfileCreateManyArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProfileCreateManyArgs>(args?: SelectSubset<T, UserProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UserProfile.
     * @param {UserProfileDeleteArgs} args - Arguments to delete one UserProfile.
     * @example
     * // Delete one UserProfile
     * const UserProfile = await prisma.userProfile.delete({
     *   where: {
     *     // ... filter to delete one UserProfile
     *   }
     * })
     * 
     */
    delete<T extends UserProfileDeleteArgs>(args: SelectSubset<T, UserProfileDeleteArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProfile.
     * @param {UserProfileUpdateArgs} args - Arguments to update one UserProfile.
     * @example
     * // Update one UserProfile
     * const userProfile = await prisma.userProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProfileUpdateArgs>(args: SelectSubset<T, UserProfileUpdateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProfiles.
     * @param {UserProfileDeleteManyArgs} args - Arguments to filter UserProfiles to delete.
     * @example
     * // Delete a few UserProfiles
     * const { count } = await prisma.userProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProfileDeleteManyArgs>(args?: SelectSubset<T, UserProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProfileUpdateManyArgs>(args: SelectSubset<T, UserProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UserProfile.
     * @param {UserProfileUpsertArgs} args - Arguments to update or create a UserProfile.
     * @example
     * // Update or create a UserProfile
     * const userProfile = await prisma.userProfile.upsert({
     *   create: {
     *     // ... data to create a UserProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProfile we want to update
     *   }
     * })
     */
    upsert<T extends UserProfileUpsertArgs>(args: SelectSubset<T, UserProfileUpsertArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileCountArgs} args - Arguments to filter UserProfiles to count.
     * @example
     * // Count the number of UserProfiles
     * const count = await prisma.userProfile.count({
     *   where: {
     *     // ... the filter for the UserProfiles we want to count
     *   }
     * })
    **/
    count<T extends UserProfileCountArgs>(
      args?: Subset<T, UserProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserProfileAggregateArgs>(args: Subset<T, UserProfileAggregateArgs>): Prisma.PrismaPromise<GetUserProfileAggregateType<T>>

    /**
     * Group by UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileGroupByArgs} args - Group by arguments.
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
      T extends UserProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProfileGroupByArgs['orderBy'] }
        : { orderBy?: UserProfileGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UserProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProfile model
   */
  readonly fields: UserProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    blogCategories<T extends UserProfile$blogCategoriesArgs<ExtArgs> = {}>(args?: Subset<T, UserProfile$blogCategoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    blogTags<T extends UserProfile$blogTagsArgs<ExtArgs> = {}>(args?: Subset<T, UserProfile$blogTagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    uploadedImages<T extends UserProfile$uploadedImagesArgs<ExtArgs> = {}>(args?: Subset<T, UserProfile$uploadedImagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    blogPosts<T extends UserProfile$blogPostsArgs<ExtArgs> = {}>(args?: Subset<T, UserProfile$blogPostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the UserProfile model
   */
  interface UserProfileFieldRefs {
    readonly id: FieldRef<"UserProfile", 'Int'>
    readonly email: FieldRef<"UserProfile", 'String'>
    readonly firstName: FieldRef<"UserProfile", 'String'>
    readonly lastName: FieldRef<"UserProfile", 'String'>
    readonly role: FieldRef<"UserProfile", 'Role'>
    readonly isStaff: FieldRef<"UserProfile", 'Boolean'>
    readonly isActive: FieldRef<"UserProfile", 'Boolean'>
    readonly dateJoined: FieldRef<"UserProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"UserProfile", 'DateTime'>
    readonly isVerified: FieldRef<"UserProfile", 'Boolean'>
    readonly city: FieldRef<"UserProfile", 'String'>
    readonly state: FieldRef<"UserProfile", 'String'>
    readonly zipCode: FieldRef<"UserProfile", 'Int'>
    readonly country: FieldRef<"UserProfile", 'String'>
    readonly address1: FieldRef<"UserProfile", 'String'>
    readonly address2: FieldRef<"UserProfile", 'String'>
    readonly securityQuestion: FieldRef<"UserProfile", 'SecurityQuestion'>
    readonly securityAnswer: FieldRef<"UserProfile", 'String'>
    readonly profileImage: FieldRef<"UserProfile", 'String'>
    readonly phoneNumber: FieldRef<"UserProfile", 'String'>
    readonly summery: FieldRef<"UserProfile", 'String'>
  }
    

  // Custom InputTypes
  /**
   * UserProfile findUnique
   */
  export type UserProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findUniqueOrThrow
   */
  export type UserProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findFirst
   */
  export type UserProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findFirstOrThrow
   */
  export type UserProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findMany
   */
  export type UserProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfiles to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile create
   */
  export type UserProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a UserProfile.
     */
    data: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
  }

  /**
   * UserProfile createMany
   */
  export type UserProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile update
   */
  export type UserProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a UserProfile.
     */
    data: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
    /**
     * Choose, which UserProfile to update.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile updateMany
   */
  export type UserProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile upsert
   */
  export type UserProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the UserProfile to update in case it exists.
     */
    where: UserProfileWhereUniqueInput
    /**
     * In case the UserProfile found by the `where` argument doesn't exist, create a new UserProfile with this data.
     */
    create: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
    /**
     * In case the UserProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
  }

  /**
   * UserProfile delete
   */
  export type UserProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter which UserProfile to delete.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile deleteMany
   */
  export type UserProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfiles to delete
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to delete.
     */
    limit?: number
  }

  /**
   * UserProfile.blogCategories
   */
  export type UserProfile$blogCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCategory
     */
    select?: BlogCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogCategory
     */
    omit?: BlogCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogCategoryInclude<ExtArgs> | null
    where?: BlogCategoryWhereInput
    orderBy?: BlogCategoryOrderByWithRelationInput | BlogCategoryOrderByWithRelationInput[]
    cursor?: BlogCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlogCategoryScalarFieldEnum | BlogCategoryScalarFieldEnum[]
  }

  /**
   * UserProfile.blogTags
   */
  export type UserProfile$blogTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    where?: BlogTagWhereInput
    orderBy?: BlogTagOrderByWithRelationInput | BlogTagOrderByWithRelationInput[]
    cursor?: BlogTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlogTagScalarFieldEnum | BlogTagScalarFieldEnum[]
  }

  /**
   * UserProfile.uploadedImages
   */
  export type UserProfile$uploadedImagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedImage
     */
    select?: UploadedImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedImage
     */
    omit?: UploadedImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedImageInclude<ExtArgs> | null
    where?: UploadedImageWhereInput
    orderBy?: UploadedImageOrderByWithRelationInput | UploadedImageOrderByWithRelationInput[]
    cursor?: UploadedImageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UploadedImageScalarFieldEnum | UploadedImageScalarFieldEnum[]
  }

  /**
   * UserProfile.blogPosts
   */
  export type UserProfile$blogPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    where?: BlogPostWhereInput
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    cursor?: BlogPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * UserProfile without action
   */
  export type UserProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
  }


  /**
   * Model BlogCategory
   */

  export type AggregateBlogCategory = {
    _count: BlogCategoryCountAggregateOutputType | null
    _avg: BlogCategoryAvgAggregateOutputType | null
    _sum: BlogCategorySumAggregateOutputType | null
    _min: BlogCategoryMinAggregateOutputType | null
    _max: BlogCategoryMaxAggregateOutputType | null
  }

  export type BlogCategoryAvgAggregateOutputType = {
    id: number | null
    count: number | null
    createdById: number | null
  }

  export type BlogCategorySumAggregateOutputType = {
    id: number | null
    count: number | null
    createdById: number | null
  }

  export type BlogCategoryMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    count: number | null
    description: string | null
    createdById: number | null
  }

  export type BlogCategoryMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    count: number | null
    description: string | null
    createdById: number | null
  }

  export type BlogCategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    count: number
    description: number
    createdById: number
    _all: number
  }


  export type BlogCategoryAvgAggregateInputType = {
    id?: true
    count?: true
    createdById?: true
  }

  export type BlogCategorySumAggregateInputType = {
    id?: true
    count?: true
    createdById?: true
  }

  export type BlogCategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    count?: true
    description?: true
    createdById?: true
  }

  export type BlogCategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    count?: true
    description?: true
    createdById?: true
  }

  export type BlogCategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    count?: true
    description?: true
    createdById?: true
    _all?: true
  }

  export type BlogCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogCategory to aggregate.
     */
    where?: BlogCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogCategories to fetch.
     */
    orderBy?: BlogCategoryOrderByWithRelationInput | BlogCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlogCategories
    **/
    _count?: true | BlogCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlogCategoryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlogCategorySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogCategoryMaxAggregateInputType
  }

  export type GetBlogCategoryAggregateType<T extends BlogCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateBlogCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlogCategory[P]>
      : GetScalarType<T[P], AggregateBlogCategory[P]>
  }




  export type BlogCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogCategoryWhereInput
    orderBy?: BlogCategoryOrderByWithAggregationInput | BlogCategoryOrderByWithAggregationInput[]
    by: BlogCategoryScalarFieldEnum[] | BlogCategoryScalarFieldEnum
    having?: BlogCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogCategoryCountAggregateInputType | true
    _avg?: BlogCategoryAvgAggregateInputType
    _sum?: BlogCategorySumAggregateInputType
    _min?: BlogCategoryMinAggregateInputType
    _max?: BlogCategoryMaxAggregateInputType
  }

  export type BlogCategoryGroupByOutputType = {
    id: number
    name: string
    slug: string
    count: number
    description: string | null
    createdById: number
    _count: BlogCategoryCountAggregateOutputType | null
    _avg: BlogCategoryAvgAggregateOutputType | null
    _sum: BlogCategorySumAggregateOutputType | null
    _min: BlogCategoryMinAggregateOutputType | null
    _max: BlogCategoryMaxAggregateOutputType | null
  }

  type GetBlogCategoryGroupByPayload<T extends BlogCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], BlogCategoryGroupByOutputType[P]>
        }
      >
    >


  export type BlogCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    count?: boolean
    description?: boolean
    createdById?: boolean
    createdBy?: boolean | UserProfileDefaultArgs<ExtArgs>
    posts?: boolean | BlogCategory$postsArgs<ExtArgs>
    _count?: boolean | BlogCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blogCategory"]>



  export type BlogCategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    count?: boolean
    description?: boolean
    createdById?: boolean
  }

  export type BlogCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "count" | "description" | "createdById", ExtArgs["result"]["blogCategory"]>
  export type BlogCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserProfileDefaultArgs<ExtArgs>
    posts?: boolean | BlogCategory$postsArgs<ExtArgs>
    _count?: boolean | BlogCategoryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BlogCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlogCategory"
    objects: {
      createdBy: Prisma.$UserProfilePayload<ExtArgs>
      posts: Prisma.$BlogPostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
      count: number
      description: string | null
      createdById: number
    }, ExtArgs["result"]["blogCategory"]>
    composites: {}
  }

  type BlogCategoryGetPayload<S extends boolean | null | undefined | BlogCategoryDefaultArgs> = $Result.GetResult<Prisma.$BlogCategoryPayload, S>

  type BlogCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlogCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlogCategoryCountAggregateInputType | true
    }

  export interface BlogCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlogCategory'], meta: { name: 'BlogCategory' } }
    /**
     * Find zero or one BlogCategory that matches the filter.
     * @param {BlogCategoryFindUniqueArgs} args - Arguments to find a BlogCategory
     * @example
     * // Get one BlogCategory
     * const blogCategory = await prisma.blogCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogCategoryFindUniqueArgs>(args: SelectSubset<T, BlogCategoryFindUniqueArgs<ExtArgs>>): Prisma__BlogCategoryClient<$Result.GetResult<Prisma.$BlogCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BlogCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlogCategoryFindUniqueOrThrowArgs} args - Arguments to find a BlogCategory
     * @example
     * // Get one BlogCategory
     * const blogCategory = await prisma.blogCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogCategoryClient<$Result.GetResult<Prisma.$BlogCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogCategoryFindFirstArgs} args - Arguments to find a BlogCategory
     * @example
     * // Get one BlogCategory
     * const blogCategory = await prisma.blogCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogCategoryFindFirstArgs>(args?: SelectSubset<T, BlogCategoryFindFirstArgs<ExtArgs>>): Prisma__BlogCategoryClient<$Result.GetResult<Prisma.$BlogCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogCategoryFindFirstOrThrowArgs} args - Arguments to find a BlogCategory
     * @example
     * // Get one BlogCategory
     * const blogCategory = await prisma.blogCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogCategoryClient<$Result.GetResult<Prisma.$BlogCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlogCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlogCategories
     * const blogCategories = await prisma.blogCategory.findMany()
     * 
     * // Get first 10 BlogCategories
     * const blogCategories = await prisma.blogCategory.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogCategoryWithIdOnly = await prisma.blogCategory.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogCategoryFindManyArgs>(args?: SelectSubset<T, BlogCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BlogCategory.
     * @param {BlogCategoryCreateArgs} args - Arguments to create a BlogCategory.
     * @example
     * // Create one BlogCategory
     * const BlogCategory = await prisma.blogCategory.create({
     *   data: {
     *     // ... data to create a BlogCategory
     *   }
     * })
     * 
     */
    create<T extends BlogCategoryCreateArgs>(args: SelectSubset<T, BlogCategoryCreateArgs<ExtArgs>>): Prisma__BlogCategoryClient<$Result.GetResult<Prisma.$BlogCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BlogCategories.
     * @param {BlogCategoryCreateManyArgs} args - Arguments to create many BlogCategories.
     * @example
     * // Create many BlogCategories
     * const blogCategory = await prisma.blogCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogCategoryCreateManyArgs>(args?: SelectSubset<T, BlogCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BlogCategory.
     * @param {BlogCategoryDeleteArgs} args - Arguments to delete one BlogCategory.
     * @example
     * // Delete one BlogCategory
     * const BlogCategory = await prisma.blogCategory.delete({
     *   where: {
     *     // ... filter to delete one BlogCategory
     *   }
     * })
     * 
     */
    delete<T extends BlogCategoryDeleteArgs>(args: SelectSubset<T, BlogCategoryDeleteArgs<ExtArgs>>): Prisma__BlogCategoryClient<$Result.GetResult<Prisma.$BlogCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BlogCategory.
     * @param {BlogCategoryUpdateArgs} args - Arguments to update one BlogCategory.
     * @example
     * // Update one BlogCategory
     * const blogCategory = await prisma.blogCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogCategoryUpdateArgs>(args: SelectSubset<T, BlogCategoryUpdateArgs<ExtArgs>>): Prisma__BlogCategoryClient<$Result.GetResult<Prisma.$BlogCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BlogCategories.
     * @param {BlogCategoryDeleteManyArgs} args - Arguments to filter BlogCategories to delete.
     * @example
     * // Delete a few BlogCategories
     * const { count } = await prisma.blogCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogCategoryDeleteManyArgs>(args?: SelectSubset<T, BlogCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlogCategories
     * const blogCategory = await prisma.blogCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogCategoryUpdateManyArgs>(args: SelectSubset<T, BlogCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BlogCategory.
     * @param {BlogCategoryUpsertArgs} args - Arguments to update or create a BlogCategory.
     * @example
     * // Update or create a BlogCategory
     * const blogCategory = await prisma.blogCategory.upsert({
     *   create: {
     *     // ... data to create a BlogCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlogCategory we want to update
     *   }
     * })
     */
    upsert<T extends BlogCategoryUpsertArgs>(args: SelectSubset<T, BlogCategoryUpsertArgs<ExtArgs>>): Prisma__BlogCategoryClient<$Result.GetResult<Prisma.$BlogCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BlogCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogCategoryCountArgs} args - Arguments to filter BlogCategories to count.
     * @example
     * // Count the number of BlogCategories
     * const count = await prisma.blogCategory.count({
     *   where: {
     *     // ... the filter for the BlogCategories we want to count
     *   }
     * })
    **/
    count<T extends BlogCategoryCountArgs>(
      args?: Subset<T, BlogCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlogCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlogCategoryAggregateArgs>(args: Subset<T, BlogCategoryAggregateArgs>): Prisma.PrismaPromise<GetBlogCategoryAggregateType<T>>

    /**
     * Group by BlogCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogCategoryGroupByArgs} args - Group by arguments.
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
      T extends BlogCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogCategoryGroupByArgs['orderBy'] }
        : { orderBy?: BlogCategoryGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BlogCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlogCategory model
   */
  readonly fields: BlogCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlogCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserProfileDefaultArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    posts<T extends BlogCategory$postsArgs<ExtArgs> = {}>(args?: Subset<T, BlogCategory$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the BlogCategory model
   */
  interface BlogCategoryFieldRefs {
    readonly id: FieldRef<"BlogCategory", 'Int'>
    readonly name: FieldRef<"BlogCategory", 'String'>
    readonly slug: FieldRef<"BlogCategory", 'String'>
    readonly count: FieldRef<"BlogCategory", 'Int'>
    readonly description: FieldRef<"BlogCategory", 'String'>
    readonly createdById: FieldRef<"BlogCategory", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * BlogCategory findUnique
   */
  export type BlogCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCategory
     */
    select?: BlogCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogCategory
     */
    omit?: BlogCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogCategoryInclude<ExtArgs> | null
    /**
     * Filter, which BlogCategory to fetch.
     */
    where: BlogCategoryWhereUniqueInput
  }

  /**
   * BlogCategory findUniqueOrThrow
   */
  export type BlogCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCategory
     */
    select?: BlogCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogCategory
     */
    omit?: BlogCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogCategoryInclude<ExtArgs> | null
    /**
     * Filter, which BlogCategory to fetch.
     */
    where: BlogCategoryWhereUniqueInput
  }

  /**
   * BlogCategory findFirst
   */
  export type BlogCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCategory
     */
    select?: BlogCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogCategory
     */
    omit?: BlogCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogCategoryInclude<ExtArgs> | null
    /**
     * Filter, which BlogCategory to fetch.
     */
    where?: BlogCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogCategories to fetch.
     */
    orderBy?: BlogCategoryOrderByWithRelationInput | BlogCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogCategories.
     */
    cursor?: BlogCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogCategories.
     */
    distinct?: BlogCategoryScalarFieldEnum | BlogCategoryScalarFieldEnum[]
  }

  /**
   * BlogCategory findFirstOrThrow
   */
  export type BlogCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCategory
     */
    select?: BlogCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogCategory
     */
    omit?: BlogCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogCategoryInclude<ExtArgs> | null
    /**
     * Filter, which BlogCategory to fetch.
     */
    where?: BlogCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogCategories to fetch.
     */
    orderBy?: BlogCategoryOrderByWithRelationInput | BlogCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogCategories.
     */
    cursor?: BlogCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogCategories.
     */
    distinct?: BlogCategoryScalarFieldEnum | BlogCategoryScalarFieldEnum[]
  }

  /**
   * BlogCategory findMany
   */
  export type BlogCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCategory
     */
    select?: BlogCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogCategory
     */
    omit?: BlogCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogCategoryInclude<ExtArgs> | null
    /**
     * Filter, which BlogCategories to fetch.
     */
    where?: BlogCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogCategories to fetch.
     */
    orderBy?: BlogCategoryOrderByWithRelationInput | BlogCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlogCategories.
     */
    cursor?: BlogCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogCategories.
     */
    skip?: number
    distinct?: BlogCategoryScalarFieldEnum | BlogCategoryScalarFieldEnum[]
  }

  /**
   * BlogCategory create
   */
  export type BlogCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCategory
     */
    select?: BlogCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogCategory
     */
    omit?: BlogCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a BlogCategory.
     */
    data: XOR<BlogCategoryCreateInput, BlogCategoryUncheckedCreateInput>
  }

  /**
   * BlogCategory createMany
   */
  export type BlogCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlogCategories.
     */
    data: BlogCategoryCreateManyInput | BlogCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogCategory update
   */
  export type BlogCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCategory
     */
    select?: BlogCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogCategory
     */
    omit?: BlogCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a BlogCategory.
     */
    data: XOR<BlogCategoryUpdateInput, BlogCategoryUncheckedUpdateInput>
    /**
     * Choose, which BlogCategory to update.
     */
    where: BlogCategoryWhereUniqueInput
  }

  /**
   * BlogCategory updateMany
   */
  export type BlogCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlogCategories.
     */
    data: XOR<BlogCategoryUpdateManyMutationInput, BlogCategoryUncheckedUpdateManyInput>
    /**
     * Filter which BlogCategories to update
     */
    where?: BlogCategoryWhereInput
    /**
     * Limit how many BlogCategories to update.
     */
    limit?: number
  }

  /**
   * BlogCategory upsert
   */
  export type BlogCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCategory
     */
    select?: BlogCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogCategory
     */
    omit?: BlogCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the BlogCategory to update in case it exists.
     */
    where: BlogCategoryWhereUniqueInput
    /**
     * In case the BlogCategory found by the `where` argument doesn't exist, create a new BlogCategory with this data.
     */
    create: XOR<BlogCategoryCreateInput, BlogCategoryUncheckedCreateInput>
    /**
     * In case the BlogCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogCategoryUpdateInput, BlogCategoryUncheckedUpdateInput>
  }

  /**
   * BlogCategory delete
   */
  export type BlogCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCategory
     */
    select?: BlogCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogCategory
     */
    omit?: BlogCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogCategoryInclude<ExtArgs> | null
    /**
     * Filter which BlogCategory to delete.
     */
    where: BlogCategoryWhereUniqueInput
  }

  /**
   * BlogCategory deleteMany
   */
  export type BlogCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogCategories to delete
     */
    where?: BlogCategoryWhereInput
    /**
     * Limit how many BlogCategories to delete.
     */
    limit?: number
  }

  /**
   * BlogCategory.posts
   */
  export type BlogCategory$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    where?: BlogPostWhereInput
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    cursor?: BlogPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogCategory without action
   */
  export type BlogCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCategory
     */
    select?: BlogCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogCategory
     */
    omit?: BlogCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogCategoryInclude<ExtArgs> | null
  }


  /**
   * Model BlogTag
   */

  export type AggregateBlogTag = {
    _count: BlogTagCountAggregateOutputType | null
    _avg: BlogTagAvgAggregateOutputType | null
    _sum: BlogTagSumAggregateOutputType | null
    _min: BlogTagMinAggregateOutputType | null
    _max: BlogTagMaxAggregateOutputType | null
  }

  export type BlogTagAvgAggregateOutputType = {
    id: number | null
    count: number | null
    createdById: number | null
  }

  export type BlogTagSumAggregateOutputType = {
    id: number | null
    count: number | null
    createdById: number | null
  }

  export type BlogTagMinAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    count: number | null
    createdById: number | null
  }

  export type BlogTagMaxAggregateOutputType = {
    id: number | null
    name: string | null
    slug: string | null
    count: number | null
    createdById: number | null
  }

  export type BlogTagCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    count: number
    createdById: number
    _all: number
  }


  export type BlogTagAvgAggregateInputType = {
    id?: true
    count?: true
    createdById?: true
  }

  export type BlogTagSumAggregateInputType = {
    id?: true
    count?: true
    createdById?: true
  }

  export type BlogTagMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    count?: true
    createdById?: true
  }

  export type BlogTagMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    count?: true
    createdById?: true
  }

  export type BlogTagCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    count?: true
    createdById?: true
    _all?: true
  }

  export type BlogTagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogTag to aggregate.
     */
    where?: BlogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogTags to fetch.
     */
    orderBy?: BlogTagOrderByWithRelationInput | BlogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlogTags
    **/
    _count?: true | BlogTagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlogTagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlogTagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogTagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogTagMaxAggregateInputType
  }

  export type GetBlogTagAggregateType<T extends BlogTagAggregateArgs> = {
        [P in keyof T & keyof AggregateBlogTag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlogTag[P]>
      : GetScalarType<T[P], AggregateBlogTag[P]>
  }




  export type BlogTagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogTagWhereInput
    orderBy?: BlogTagOrderByWithAggregationInput | BlogTagOrderByWithAggregationInput[]
    by: BlogTagScalarFieldEnum[] | BlogTagScalarFieldEnum
    having?: BlogTagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogTagCountAggregateInputType | true
    _avg?: BlogTagAvgAggregateInputType
    _sum?: BlogTagSumAggregateInputType
    _min?: BlogTagMinAggregateInputType
    _max?: BlogTagMaxAggregateInputType
  }

  export type BlogTagGroupByOutputType = {
    id: number
    name: string
    slug: string
    count: number
    createdById: number
    _count: BlogTagCountAggregateOutputType | null
    _avg: BlogTagAvgAggregateOutputType | null
    _sum: BlogTagSumAggregateOutputType | null
    _min: BlogTagMinAggregateOutputType | null
    _max: BlogTagMaxAggregateOutputType | null
  }

  type GetBlogTagGroupByPayload<T extends BlogTagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogTagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogTagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogTagGroupByOutputType[P]>
            : GetScalarType<T[P], BlogTagGroupByOutputType[P]>
        }
      >
    >


  export type BlogTagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    count?: boolean
    createdById?: boolean
    createdBy?: boolean | UserProfileDefaultArgs<ExtArgs>
    posts?: boolean | BlogTag$postsArgs<ExtArgs>
    _count?: boolean | BlogTagCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blogTag"]>



  export type BlogTagSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    count?: boolean
    createdById?: boolean
  }

  export type BlogTagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "count" | "createdById", ExtArgs["result"]["blogTag"]>
  export type BlogTagInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    createdBy?: boolean | UserProfileDefaultArgs<ExtArgs>
    posts?: boolean | BlogTag$postsArgs<ExtArgs>
    _count?: boolean | BlogTagCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BlogTagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlogTag"
    objects: {
      createdBy: Prisma.$UserProfilePayload<ExtArgs>
      posts: Prisma.$BlogPostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      slug: string
      count: number
      createdById: number
    }, ExtArgs["result"]["blogTag"]>
    composites: {}
  }

  type BlogTagGetPayload<S extends boolean | null | undefined | BlogTagDefaultArgs> = $Result.GetResult<Prisma.$BlogTagPayload, S>

  type BlogTagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlogTagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlogTagCountAggregateInputType | true
    }

  export interface BlogTagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlogTag'], meta: { name: 'BlogTag' } }
    /**
     * Find zero or one BlogTag that matches the filter.
     * @param {BlogTagFindUniqueArgs} args - Arguments to find a BlogTag
     * @example
     * // Get one BlogTag
     * const blogTag = await prisma.blogTag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogTagFindUniqueArgs>(args: SelectSubset<T, BlogTagFindUniqueArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BlogTag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlogTagFindUniqueOrThrowArgs} args - Arguments to find a BlogTag
     * @example
     * // Get one BlogTag
     * const blogTag = await prisma.blogTag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogTagFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogTagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogTag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogTagFindFirstArgs} args - Arguments to find a BlogTag
     * @example
     * // Get one BlogTag
     * const blogTag = await prisma.blogTag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogTagFindFirstArgs>(args?: SelectSubset<T, BlogTagFindFirstArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogTag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogTagFindFirstOrThrowArgs} args - Arguments to find a BlogTag
     * @example
     * // Get one BlogTag
     * const blogTag = await prisma.blogTag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogTagFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogTagFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlogTags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogTagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlogTags
     * const blogTags = await prisma.blogTag.findMany()
     * 
     * // Get first 10 BlogTags
     * const blogTags = await prisma.blogTag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogTagWithIdOnly = await prisma.blogTag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogTagFindManyArgs>(args?: SelectSubset<T, BlogTagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BlogTag.
     * @param {BlogTagCreateArgs} args - Arguments to create a BlogTag.
     * @example
     * // Create one BlogTag
     * const BlogTag = await prisma.blogTag.create({
     *   data: {
     *     // ... data to create a BlogTag
     *   }
     * })
     * 
     */
    create<T extends BlogTagCreateArgs>(args: SelectSubset<T, BlogTagCreateArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BlogTags.
     * @param {BlogTagCreateManyArgs} args - Arguments to create many BlogTags.
     * @example
     * // Create many BlogTags
     * const blogTag = await prisma.blogTag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogTagCreateManyArgs>(args?: SelectSubset<T, BlogTagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BlogTag.
     * @param {BlogTagDeleteArgs} args - Arguments to delete one BlogTag.
     * @example
     * // Delete one BlogTag
     * const BlogTag = await prisma.blogTag.delete({
     *   where: {
     *     // ... filter to delete one BlogTag
     *   }
     * })
     * 
     */
    delete<T extends BlogTagDeleteArgs>(args: SelectSubset<T, BlogTagDeleteArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BlogTag.
     * @param {BlogTagUpdateArgs} args - Arguments to update one BlogTag.
     * @example
     * // Update one BlogTag
     * const blogTag = await prisma.blogTag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogTagUpdateArgs>(args: SelectSubset<T, BlogTagUpdateArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BlogTags.
     * @param {BlogTagDeleteManyArgs} args - Arguments to filter BlogTags to delete.
     * @example
     * // Delete a few BlogTags
     * const { count } = await prisma.blogTag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogTagDeleteManyArgs>(args?: SelectSubset<T, BlogTagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogTagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlogTags
     * const blogTag = await prisma.blogTag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogTagUpdateManyArgs>(args: SelectSubset<T, BlogTagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BlogTag.
     * @param {BlogTagUpsertArgs} args - Arguments to update or create a BlogTag.
     * @example
     * // Update or create a BlogTag
     * const blogTag = await prisma.blogTag.upsert({
     *   create: {
     *     // ... data to create a BlogTag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlogTag we want to update
     *   }
     * })
     */
    upsert<T extends BlogTagUpsertArgs>(args: SelectSubset<T, BlogTagUpsertArgs<ExtArgs>>): Prisma__BlogTagClient<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BlogTags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogTagCountArgs} args - Arguments to filter BlogTags to count.
     * @example
     * // Count the number of BlogTags
     * const count = await prisma.blogTag.count({
     *   where: {
     *     // ... the filter for the BlogTags we want to count
     *   }
     * })
    **/
    count<T extends BlogTagCountArgs>(
      args?: Subset<T, BlogTagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogTagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlogTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogTagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlogTagAggregateArgs>(args: Subset<T, BlogTagAggregateArgs>): Prisma.PrismaPromise<GetBlogTagAggregateType<T>>

    /**
     * Group by BlogTag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogTagGroupByArgs} args - Group by arguments.
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
      T extends BlogTagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogTagGroupByArgs['orderBy'] }
        : { orderBy?: BlogTagGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BlogTagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogTagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlogTag model
   */
  readonly fields: BlogTagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlogTag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogTagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    createdBy<T extends UserProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserProfileDefaultArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    posts<T extends BlogTag$postsArgs<ExtArgs> = {}>(args?: Subset<T, BlogTag$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the BlogTag model
   */
  interface BlogTagFieldRefs {
    readonly id: FieldRef<"BlogTag", 'Int'>
    readonly name: FieldRef<"BlogTag", 'String'>
    readonly slug: FieldRef<"BlogTag", 'String'>
    readonly count: FieldRef<"BlogTag", 'Int'>
    readonly createdById: FieldRef<"BlogTag", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * BlogTag findUnique
   */
  export type BlogTagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * Filter, which BlogTag to fetch.
     */
    where: BlogTagWhereUniqueInput
  }

  /**
   * BlogTag findUniqueOrThrow
   */
  export type BlogTagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * Filter, which BlogTag to fetch.
     */
    where: BlogTagWhereUniqueInput
  }

  /**
   * BlogTag findFirst
   */
  export type BlogTagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * Filter, which BlogTag to fetch.
     */
    where?: BlogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogTags to fetch.
     */
    orderBy?: BlogTagOrderByWithRelationInput | BlogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogTags.
     */
    cursor?: BlogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogTags.
     */
    distinct?: BlogTagScalarFieldEnum | BlogTagScalarFieldEnum[]
  }

  /**
   * BlogTag findFirstOrThrow
   */
  export type BlogTagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * Filter, which BlogTag to fetch.
     */
    where?: BlogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogTags to fetch.
     */
    orderBy?: BlogTagOrderByWithRelationInput | BlogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogTags.
     */
    cursor?: BlogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogTags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogTags.
     */
    distinct?: BlogTagScalarFieldEnum | BlogTagScalarFieldEnum[]
  }

  /**
   * BlogTag findMany
   */
  export type BlogTagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * Filter, which BlogTags to fetch.
     */
    where?: BlogTagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogTags to fetch.
     */
    orderBy?: BlogTagOrderByWithRelationInput | BlogTagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlogTags.
     */
    cursor?: BlogTagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogTags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogTags.
     */
    skip?: number
    distinct?: BlogTagScalarFieldEnum | BlogTagScalarFieldEnum[]
  }

  /**
   * BlogTag create
   */
  export type BlogTagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * The data needed to create a BlogTag.
     */
    data: XOR<BlogTagCreateInput, BlogTagUncheckedCreateInput>
  }

  /**
   * BlogTag createMany
   */
  export type BlogTagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlogTags.
     */
    data: BlogTagCreateManyInput | BlogTagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogTag update
   */
  export type BlogTagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * The data needed to update a BlogTag.
     */
    data: XOR<BlogTagUpdateInput, BlogTagUncheckedUpdateInput>
    /**
     * Choose, which BlogTag to update.
     */
    where: BlogTagWhereUniqueInput
  }

  /**
   * BlogTag updateMany
   */
  export type BlogTagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlogTags.
     */
    data: XOR<BlogTagUpdateManyMutationInput, BlogTagUncheckedUpdateManyInput>
    /**
     * Filter which BlogTags to update
     */
    where?: BlogTagWhereInput
    /**
     * Limit how many BlogTags to update.
     */
    limit?: number
  }

  /**
   * BlogTag upsert
   */
  export type BlogTagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * The filter to search for the BlogTag to update in case it exists.
     */
    where: BlogTagWhereUniqueInput
    /**
     * In case the BlogTag found by the `where` argument doesn't exist, create a new BlogTag with this data.
     */
    create: XOR<BlogTagCreateInput, BlogTagUncheckedCreateInput>
    /**
     * In case the BlogTag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogTagUpdateInput, BlogTagUncheckedUpdateInput>
  }

  /**
   * BlogTag delete
   */
  export type BlogTagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    /**
     * Filter which BlogTag to delete.
     */
    where: BlogTagWhereUniqueInput
  }

  /**
   * BlogTag deleteMany
   */
  export type BlogTagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogTags to delete
     */
    where?: BlogTagWhereInput
    /**
     * Limit how many BlogTags to delete.
     */
    limit?: number
  }

  /**
   * BlogTag.posts
   */
  export type BlogTag$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    where?: BlogPostWhereInput
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    cursor?: BlogPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogTag without action
   */
  export type BlogTagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
  }


  /**
   * Model BlogMainPageSections
   */

  export type AggregateBlogMainPageSections = {
    _count: BlogMainPageSectionsCountAggregateOutputType | null
    _avg: BlogMainPageSectionsAvgAggregateOutputType | null
    _sum: BlogMainPageSectionsSumAggregateOutputType | null
    _min: BlogMainPageSectionsMinAggregateOutputType | null
    _max: BlogMainPageSectionsMaxAggregateOutputType | null
  }

  export type BlogMainPageSectionsAvgAggregateOutputType = {
    id: number | null
  }

  export type BlogMainPageSectionsSumAggregateOutputType = {
    id: number | null
  }

  export type BlogMainPageSectionsMinAggregateOutputType = {
    id: number | null
    section: string | null
    createdAt: Date | null
  }

  export type BlogMainPageSectionsMaxAggregateOutputType = {
    id: number | null
    section: string | null
    createdAt: Date | null
  }

  export type BlogMainPageSectionsCountAggregateOutputType = {
    id: number
    section: number
    createdAt: number
    _all: number
  }


  export type BlogMainPageSectionsAvgAggregateInputType = {
    id?: true
  }

  export type BlogMainPageSectionsSumAggregateInputType = {
    id?: true
  }

  export type BlogMainPageSectionsMinAggregateInputType = {
    id?: true
    section?: true
    createdAt?: true
  }

  export type BlogMainPageSectionsMaxAggregateInputType = {
    id?: true
    section?: true
    createdAt?: true
  }

  export type BlogMainPageSectionsCountAggregateInputType = {
    id?: true
    section?: true
    createdAt?: true
    _all?: true
  }

  export type BlogMainPageSectionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogMainPageSections to aggregate.
     */
    where?: BlogMainPageSectionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogMainPageSections to fetch.
     */
    orderBy?: BlogMainPageSectionsOrderByWithRelationInput | BlogMainPageSectionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogMainPageSectionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogMainPageSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogMainPageSections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlogMainPageSections
    **/
    _count?: true | BlogMainPageSectionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlogMainPageSectionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlogMainPageSectionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogMainPageSectionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogMainPageSectionsMaxAggregateInputType
  }

  export type GetBlogMainPageSectionsAggregateType<T extends BlogMainPageSectionsAggregateArgs> = {
        [P in keyof T & keyof AggregateBlogMainPageSections]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlogMainPageSections[P]>
      : GetScalarType<T[P], AggregateBlogMainPageSections[P]>
  }




  export type BlogMainPageSectionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogMainPageSectionsWhereInput
    orderBy?: BlogMainPageSectionsOrderByWithAggregationInput | BlogMainPageSectionsOrderByWithAggregationInput[]
    by: BlogMainPageSectionsScalarFieldEnum[] | BlogMainPageSectionsScalarFieldEnum
    having?: BlogMainPageSectionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogMainPageSectionsCountAggregateInputType | true
    _avg?: BlogMainPageSectionsAvgAggregateInputType
    _sum?: BlogMainPageSectionsSumAggregateInputType
    _min?: BlogMainPageSectionsMinAggregateInputType
    _max?: BlogMainPageSectionsMaxAggregateInputType
  }

  export type BlogMainPageSectionsGroupByOutputType = {
    id: number
    section: string
    createdAt: Date
    _count: BlogMainPageSectionsCountAggregateOutputType | null
    _avg: BlogMainPageSectionsAvgAggregateOutputType | null
    _sum: BlogMainPageSectionsSumAggregateOutputType | null
    _min: BlogMainPageSectionsMinAggregateOutputType | null
    _max: BlogMainPageSectionsMaxAggregateOutputType | null
  }

  type GetBlogMainPageSectionsGroupByPayload<T extends BlogMainPageSectionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogMainPageSectionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogMainPageSectionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogMainPageSectionsGroupByOutputType[P]>
            : GetScalarType<T[P], BlogMainPageSectionsGroupByOutputType[P]>
        }
      >
    >


  export type BlogMainPageSectionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    section?: boolean
    createdAt?: boolean
    posts?: boolean | BlogMainPageSections$postsArgs<ExtArgs>
    _count?: boolean | BlogMainPageSectionsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blogMainPageSections"]>



  export type BlogMainPageSectionsSelectScalar = {
    id?: boolean
    section?: boolean
    createdAt?: boolean
  }

  export type BlogMainPageSectionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "section" | "createdAt", ExtArgs["result"]["blogMainPageSections"]>
  export type BlogMainPageSectionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    posts?: boolean | BlogMainPageSections$postsArgs<ExtArgs>
    _count?: boolean | BlogMainPageSectionsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BlogMainPageSectionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlogMainPageSections"
    objects: {
      posts: Prisma.$BlogPostPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      section: string
      createdAt: Date
    }, ExtArgs["result"]["blogMainPageSections"]>
    composites: {}
  }

  type BlogMainPageSectionsGetPayload<S extends boolean | null | undefined | BlogMainPageSectionsDefaultArgs> = $Result.GetResult<Prisma.$BlogMainPageSectionsPayload, S>

  type BlogMainPageSectionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlogMainPageSectionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlogMainPageSectionsCountAggregateInputType | true
    }

  export interface BlogMainPageSectionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlogMainPageSections'], meta: { name: 'BlogMainPageSections' } }
    /**
     * Find zero or one BlogMainPageSections that matches the filter.
     * @param {BlogMainPageSectionsFindUniqueArgs} args - Arguments to find a BlogMainPageSections
     * @example
     * // Get one BlogMainPageSections
     * const blogMainPageSections = await prisma.blogMainPageSections.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogMainPageSectionsFindUniqueArgs>(args: SelectSubset<T, BlogMainPageSectionsFindUniqueArgs<ExtArgs>>): Prisma__BlogMainPageSectionsClient<$Result.GetResult<Prisma.$BlogMainPageSectionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BlogMainPageSections that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlogMainPageSectionsFindUniqueOrThrowArgs} args - Arguments to find a BlogMainPageSections
     * @example
     * // Get one BlogMainPageSections
     * const blogMainPageSections = await prisma.blogMainPageSections.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogMainPageSectionsFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogMainPageSectionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogMainPageSectionsClient<$Result.GetResult<Prisma.$BlogMainPageSectionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogMainPageSections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogMainPageSectionsFindFirstArgs} args - Arguments to find a BlogMainPageSections
     * @example
     * // Get one BlogMainPageSections
     * const blogMainPageSections = await prisma.blogMainPageSections.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogMainPageSectionsFindFirstArgs>(args?: SelectSubset<T, BlogMainPageSectionsFindFirstArgs<ExtArgs>>): Prisma__BlogMainPageSectionsClient<$Result.GetResult<Prisma.$BlogMainPageSectionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogMainPageSections that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogMainPageSectionsFindFirstOrThrowArgs} args - Arguments to find a BlogMainPageSections
     * @example
     * // Get one BlogMainPageSections
     * const blogMainPageSections = await prisma.blogMainPageSections.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogMainPageSectionsFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogMainPageSectionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogMainPageSectionsClient<$Result.GetResult<Prisma.$BlogMainPageSectionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlogMainPageSections that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogMainPageSectionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlogMainPageSections
     * const blogMainPageSections = await prisma.blogMainPageSections.findMany()
     * 
     * // Get first 10 BlogMainPageSections
     * const blogMainPageSections = await prisma.blogMainPageSections.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogMainPageSectionsWithIdOnly = await prisma.blogMainPageSections.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogMainPageSectionsFindManyArgs>(args?: SelectSubset<T, BlogMainPageSectionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogMainPageSectionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BlogMainPageSections.
     * @param {BlogMainPageSectionsCreateArgs} args - Arguments to create a BlogMainPageSections.
     * @example
     * // Create one BlogMainPageSections
     * const BlogMainPageSections = await prisma.blogMainPageSections.create({
     *   data: {
     *     // ... data to create a BlogMainPageSections
     *   }
     * })
     * 
     */
    create<T extends BlogMainPageSectionsCreateArgs>(args: SelectSubset<T, BlogMainPageSectionsCreateArgs<ExtArgs>>): Prisma__BlogMainPageSectionsClient<$Result.GetResult<Prisma.$BlogMainPageSectionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BlogMainPageSections.
     * @param {BlogMainPageSectionsCreateManyArgs} args - Arguments to create many BlogMainPageSections.
     * @example
     * // Create many BlogMainPageSections
     * const blogMainPageSections = await prisma.blogMainPageSections.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogMainPageSectionsCreateManyArgs>(args?: SelectSubset<T, BlogMainPageSectionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BlogMainPageSections.
     * @param {BlogMainPageSectionsDeleteArgs} args - Arguments to delete one BlogMainPageSections.
     * @example
     * // Delete one BlogMainPageSections
     * const BlogMainPageSections = await prisma.blogMainPageSections.delete({
     *   where: {
     *     // ... filter to delete one BlogMainPageSections
     *   }
     * })
     * 
     */
    delete<T extends BlogMainPageSectionsDeleteArgs>(args: SelectSubset<T, BlogMainPageSectionsDeleteArgs<ExtArgs>>): Prisma__BlogMainPageSectionsClient<$Result.GetResult<Prisma.$BlogMainPageSectionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BlogMainPageSections.
     * @param {BlogMainPageSectionsUpdateArgs} args - Arguments to update one BlogMainPageSections.
     * @example
     * // Update one BlogMainPageSections
     * const blogMainPageSections = await prisma.blogMainPageSections.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogMainPageSectionsUpdateArgs>(args: SelectSubset<T, BlogMainPageSectionsUpdateArgs<ExtArgs>>): Prisma__BlogMainPageSectionsClient<$Result.GetResult<Prisma.$BlogMainPageSectionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BlogMainPageSections.
     * @param {BlogMainPageSectionsDeleteManyArgs} args - Arguments to filter BlogMainPageSections to delete.
     * @example
     * // Delete a few BlogMainPageSections
     * const { count } = await prisma.blogMainPageSections.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogMainPageSectionsDeleteManyArgs>(args?: SelectSubset<T, BlogMainPageSectionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogMainPageSections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogMainPageSectionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlogMainPageSections
     * const blogMainPageSections = await prisma.blogMainPageSections.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogMainPageSectionsUpdateManyArgs>(args: SelectSubset<T, BlogMainPageSectionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BlogMainPageSections.
     * @param {BlogMainPageSectionsUpsertArgs} args - Arguments to update or create a BlogMainPageSections.
     * @example
     * // Update or create a BlogMainPageSections
     * const blogMainPageSections = await prisma.blogMainPageSections.upsert({
     *   create: {
     *     // ... data to create a BlogMainPageSections
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlogMainPageSections we want to update
     *   }
     * })
     */
    upsert<T extends BlogMainPageSectionsUpsertArgs>(args: SelectSubset<T, BlogMainPageSectionsUpsertArgs<ExtArgs>>): Prisma__BlogMainPageSectionsClient<$Result.GetResult<Prisma.$BlogMainPageSectionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BlogMainPageSections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogMainPageSectionsCountArgs} args - Arguments to filter BlogMainPageSections to count.
     * @example
     * // Count the number of BlogMainPageSections
     * const count = await prisma.blogMainPageSections.count({
     *   where: {
     *     // ... the filter for the BlogMainPageSections we want to count
     *   }
     * })
    **/
    count<T extends BlogMainPageSectionsCountArgs>(
      args?: Subset<T, BlogMainPageSectionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogMainPageSectionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlogMainPageSections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogMainPageSectionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlogMainPageSectionsAggregateArgs>(args: Subset<T, BlogMainPageSectionsAggregateArgs>): Prisma.PrismaPromise<GetBlogMainPageSectionsAggregateType<T>>

    /**
     * Group by BlogMainPageSections.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogMainPageSectionsGroupByArgs} args - Group by arguments.
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
      T extends BlogMainPageSectionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogMainPageSectionsGroupByArgs['orderBy'] }
        : { orderBy?: BlogMainPageSectionsGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BlogMainPageSectionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogMainPageSectionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlogMainPageSections model
   */
  readonly fields: BlogMainPageSectionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlogMainPageSections.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogMainPageSectionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    posts<T extends BlogMainPageSections$postsArgs<ExtArgs> = {}>(args?: Subset<T, BlogMainPageSections$postsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the BlogMainPageSections model
   */
  interface BlogMainPageSectionsFieldRefs {
    readonly id: FieldRef<"BlogMainPageSections", 'Int'>
    readonly section: FieldRef<"BlogMainPageSections", 'String'>
    readonly createdAt: FieldRef<"BlogMainPageSections", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * BlogMainPageSections findUnique
   */
  export type BlogMainPageSectionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogMainPageSections
     */
    select?: BlogMainPageSectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogMainPageSections
     */
    omit?: BlogMainPageSectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogMainPageSectionsInclude<ExtArgs> | null
    /**
     * Filter, which BlogMainPageSections to fetch.
     */
    where: BlogMainPageSectionsWhereUniqueInput
  }

  /**
   * BlogMainPageSections findUniqueOrThrow
   */
  export type BlogMainPageSectionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogMainPageSections
     */
    select?: BlogMainPageSectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogMainPageSections
     */
    omit?: BlogMainPageSectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogMainPageSectionsInclude<ExtArgs> | null
    /**
     * Filter, which BlogMainPageSections to fetch.
     */
    where: BlogMainPageSectionsWhereUniqueInput
  }

  /**
   * BlogMainPageSections findFirst
   */
  export type BlogMainPageSectionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogMainPageSections
     */
    select?: BlogMainPageSectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogMainPageSections
     */
    omit?: BlogMainPageSectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogMainPageSectionsInclude<ExtArgs> | null
    /**
     * Filter, which BlogMainPageSections to fetch.
     */
    where?: BlogMainPageSectionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogMainPageSections to fetch.
     */
    orderBy?: BlogMainPageSectionsOrderByWithRelationInput | BlogMainPageSectionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogMainPageSections.
     */
    cursor?: BlogMainPageSectionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogMainPageSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogMainPageSections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogMainPageSections.
     */
    distinct?: BlogMainPageSectionsScalarFieldEnum | BlogMainPageSectionsScalarFieldEnum[]
  }

  /**
   * BlogMainPageSections findFirstOrThrow
   */
  export type BlogMainPageSectionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogMainPageSections
     */
    select?: BlogMainPageSectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogMainPageSections
     */
    omit?: BlogMainPageSectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogMainPageSectionsInclude<ExtArgs> | null
    /**
     * Filter, which BlogMainPageSections to fetch.
     */
    where?: BlogMainPageSectionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogMainPageSections to fetch.
     */
    orderBy?: BlogMainPageSectionsOrderByWithRelationInput | BlogMainPageSectionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogMainPageSections.
     */
    cursor?: BlogMainPageSectionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogMainPageSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogMainPageSections.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogMainPageSections.
     */
    distinct?: BlogMainPageSectionsScalarFieldEnum | BlogMainPageSectionsScalarFieldEnum[]
  }

  /**
   * BlogMainPageSections findMany
   */
  export type BlogMainPageSectionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogMainPageSections
     */
    select?: BlogMainPageSectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogMainPageSections
     */
    omit?: BlogMainPageSectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogMainPageSectionsInclude<ExtArgs> | null
    /**
     * Filter, which BlogMainPageSections to fetch.
     */
    where?: BlogMainPageSectionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogMainPageSections to fetch.
     */
    orderBy?: BlogMainPageSectionsOrderByWithRelationInput | BlogMainPageSectionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlogMainPageSections.
     */
    cursor?: BlogMainPageSectionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogMainPageSections from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogMainPageSections.
     */
    skip?: number
    distinct?: BlogMainPageSectionsScalarFieldEnum | BlogMainPageSectionsScalarFieldEnum[]
  }

  /**
   * BlogMainPageSections create
   */
  export type BlogMainPageSectionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogMainPageSections
     */
    select?: BlogMainPageSectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogMainPageSections
     */
    omit?: BlogMainPageSectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogMainPageSectionsInclude<ExtArgs> | null
    /**
     * The data needed to create a BlogMainPageSections.
     */
    data: XOR<BlogMainPageSectionsCreateInput, BlogMainPageSectionsUncheckedCreateInput>
  }

  /**
   * BlogMainPageSections createMany
   */
  export type BlogMainPageSectionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlogMainPageSections.
     */
    data: BlogMainPageSectionsCreateManyInput | BlogMainPageSectionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogMainPageSections update
   */
  export type BlogMainPageSectionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogMainPageSections
     */
    select?: BlogMainPageSectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogMainPageSections
     */
    omit?: BlogMainPageSectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogMainPageSectionsInclude<ExtArgs> | null
    /**
     * The data needed to update a BlogMainPageSections.
     */
    data: XOR<BlogMainPageSectionsUpdateInput, BlogMainPageSectionsUncheckedUpdateInput>
    /**
     * Choose, which BlogMainPageSections to update.
     */
    where: BlogMainPageSectionsWhereUniqueInput
  }

  /**
   * BlogMainPageSections updateMany
   */
  export type BlogMainPageSectionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlogMainPageSections.
     */
    data: XOR<BlogMainPageSectionsUpdateManyMutationInput, BlogMainPageSectionsUncheckedUpdateManyInput>
    /**
     * Filter which BlogMainPageSections to update
     */
    where?: BlogMainPageSectionsWhereInput
    /**
     * Limit how many BlogMainPageSections to update.
     */
    limit?: number
  }

  /**
   * BlogMainPageSections upsert
   */
  export type BlogMainPageSectionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogMainPageSections
     */
    select?: BlogMainPageSectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogMainPageSections
     */
    omit?: BlogMainPageSectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogMainPageSectionsInclude<ExtArgs> | null
    /**
     * The filter to search for the BlogMainPageSections to update in case it exists.
     */
    where: BlogMainPageSectionsWhereUniqueInput
    /**
     * In case the BlogMainPageSections found by the `where` argument doesn't exist, create a new BlogMainPageSections with this data.
     */
    create: XOR<BlogMainPageSectionsCreateInput, BlogMainPageSectionsUncheckedCreateInput>
    /**
     * In case the BlogMainPageSections was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogMainPageSectionsUpdateInput, BlogMainPageSectionsUncheckedUpdateInput>
  }

  /**
   * BlogMainPageSections delete
   */
  export type BlogMainPageSectionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogMainPageSections
     */
    select?: BlogMainPageSectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogMainPageSections
     */
    omit?: BlogMainPageSectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogMainPageSectionsInclude<ExtArgs> | null
    /**
     * Filter which BlogMainPageSections to delete.
     */
    where: BlogMainPageSectionsWhereUniqueInput
  }

  /**
   * BlogMainPageSections deleteMany
   */
  export type BlogMainPageSectionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogMainPageSections to delete
     */
    where?: BlogMainPageSectionsWhereInput
    /**
     * Limit how many BlogMainPageSections to delete.
     */
    limit?: number
  }

  /**
   * BlogMainPageSections.posts
   */
  export type BlogMainPageSections$postsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    where?: BlogPostWhereInput
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    cursor?: BlogPostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogMainPageSections without action
   */
  export type BlogMainPageSectionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogMainPageSections
     */
    select?: BlogMainPageSectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogMainPageSections
     */
    omit?: BlogMainPageSectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogMainPageSectionsInclude<ExtArgs> | null
  }


  /**
   * Model UploadedImage
   */

  export type AggregateUploadedImage = {
    _count: UploadedImageCountAggregateOutputType | null
    _avg: UploadedImageAvgAggregateOutputType | null
    _sum: UploadedImageSumAggregateOutputType | null
    _min: UploadedImageMinAggregateOutputType | null
    _max: UploadedImageMaxAggregateOutputType | null
  }

  export type UploadedImageAvgAggregateOutputType = {
    id: number | null
    size: number | null
    width: number | null
    height: number | null
    uploadedById: number | null
  }

  export type UploadedImageSumAggregateOutputType = {
    id: number | null
    size: number | null
    width: number | null
    height: number | null
    uploadedById: number | null
  }

  export type UploadedImageMinAggregateOutputType = {
    id: number | null
    name: string | null
    image: string | null
    size: number | null
    contentType: string | null
    width: number | null
    height: number | null
    thumbnail: string | null
    uploadedAt: Date | null
    status: $Enums.UploadedImageStatus | null
    notificationSent: boolean | null
    uploadedById: number | null
  }

  export type UploadedImageMaxAggregateOutputType = {
    id: number | null
    name: string | null
    image: string | null
    size: number | null
    contentType: string | null
    width: number | null
    height: number | null
    thumbnail: string | null
    uploadedAt: Date | null
    status: $Enums.UploadedImageStatus | null
    notificationSent: boolean | null
    uploadedById: number | null
  }

  export type UploadedImageCountAggregateOutputType = {
    id: number
    name: number
    image: number
    size: number
    contentType: number
    width: number
    height: number
    thumbnail: number
    uploadedAt: number
    status: number
    notificationSent: number
    uploadedById: number
    _all: number
  }


  export type UploadedImageAvgAggregateInputType = {
    id?: true
    size?: true
    width?: true
    height?: true
    uploadedById?: true
  }

  export type UploadedImageSumAggregateInputType = {
    id?: true
    size?: true
    width?: true
    height?: true
    uploadedById?: true
  }

  export type UploadedImageMinAggregateInputType = {
    id?: true
    name?: true
    image?: true
    size?: true
    contentType?: true
    width?: true
    height?: true
    thumbnail?: true
    uploadedAt?: true
    status?: true
    notificationSent?: true
    uploadedById?: true
  }

  export type UploadedImageMaxAggregateInputType = {
    id?: true
    name?: true
    image?: true
    size?: true
    contentType?: true
    width?: true
    height?: true
    thumbnail?: true
    uploadedAt?: true
    status?: true
    notificationSent?: true
    uploadedById?: true
  }

  export type UploadedImageCountAggregateInputType = {
    id?: true
    name?: true
    image?: true
    size?: true
    contentType?: true
    width?: true
    height?: true
    thumbnail?: true
    uploadedAt?: true
    status?: true
    notificationSent?: true
    uploadedById?: true
    _all?: true
  }

  export type UploadedImageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadedImage to aggregate.
     */
    where?: UploadedImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedImages to fetch.
     */
    orderBy?: UploadedImageOrderByWithRelationInput | UploadedImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UploadedImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UploadedImages
    **/
    _count?: true | UploadedImageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UploadedImageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UploadedImageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UploadedImageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UploadedImageMaxAggregateInputType
  }

  export type GetUploadedImageAggregateType<T extends UploadedImageAggregateArgs> = {
        [P in keyof T & keyof AggregateUploadedImage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUploadedImage[P]>
      : GetScalarType<T[P], AggregateUploadedImage[P]>
  }




  export type UploadedImageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UploadedImageWhereInput
    orderBy?: UploadedImageOrderByWithAggregationInput | UploadedImageOrderByWithAggregationInput[]
    by: UploadedImageScalarFieldEnum[] | UploadedImageScalarFieldEnum
    having?: UploadedImageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UploadedImageCountAggregateInputType | true
    _avg?: UploadedImageAvgAggregateInputType
    _sum?: UploadedImageSumAggregateInputType
    _min?: UploadedImageMinAggregateInputType
    _max?: UploadedImageMaxAggregateInputType
  }

  export type UploadedImageGroupByOutputType = {
    id: number
    name: string | null
    image: string
    size: number
    contentType: string | null
    width: number
    height: number
    thumbnail: string | null
    uploadedAt: Date
    status: $Enums.UploadedImageStatus
    notificationSent: boolean
    uploadedById: number
    _count: UploadedImageCountAggregateOutputType | null
    _avg: UploadedImageAvgAggregateOutputType | null
    _sum: UploadedImageSumAggregateOutputType | null
    _min: UploadedImageMinAggregateOutputType | null
    _max: UploadedImageMaxAggregateOutputType | null
  }

  type GetUploadedImageGroupByPayload<T extends UploadedImageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UploadedImageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UploadedImageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UploadedImageGroupByOutputType[P]>
            : GetScalarType<T[P], UploadedImageGroupByOutputType[P]>
        }
      >
    >


  export type UploadedImageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    image?: boolean
    size?: boolean
    contentType?: boolean
    width?: boolean
    height?: boolean
    thumbnail?: boolean
    uploadedAt?: boolean
    status?: boolean
    notificationSent?: boolean
    uploadedById?: boolean
    uploadedBy?: boolean | UserProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["uploadedImage"]>



  export type UploadedImageSelectScalar = {
    id?: boolean
    name?: boolean
    image?: boolean
    size?: boolean
    contentType?: boolean
    width?: boolean
    height?: boolean
    thumbnail?: boolean
    uploadedAt?: boolean
    status?: boolean
    notificationSent?: boolean
    uploadedById?: boolean
  }

  export type UploadedImageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "image" | "size" | "contentType" | "width" | "height" | "thumbnail" | "uploadedAt" | "status" | "notificationSent" | "uploadedById", ExtArgs["result"]["uploadedImage"]>
  export type UploadedImageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    uploadedBy?: boolean | UserProfileDefaultArgs<ExtArgs>
  }

  export type $UploadedImagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UploadedImage"
    objects: {
      uploadedBy: Prisma.$UserProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      image: string
      size: number
      contentType: string | null
      width: number
      height: number
      thumbnail: string | null
      uploadedAt: Date
      status: $Enums.UploadedImageStatus
      notificationSent: boolean
      uploadedById: number
    }, ExtArgs["result"]["uploadedImage"]>
    composites: {}
  }

  type UploadedImageGetPayload<S extends boolean | null | undefined | UploadedImageDefaultArgs> = $Result.GetResult<Prisma.$UploadedImagePayload, S>

  type UploadedImageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UploadedImageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UploadedImageCountAggregateInputType | true
    }

  export interface UploadedImageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UploadedImage'], meta: { name: 'UploadedImage' } }
    /**
     * Find zero or one UploadedImage that matches the filter.
     * @param {UploadedImageFindUniqueArgs} args - Arguments to find a UploadedImage
     * @example
     * // Get one UploadedImage
     * const uploadedImage = await prisma.uploadedImage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UploadedImageFindUniqueArgs>(args: SelectSubset<T, UploadedImageFindUniqueArgs<ExtArgs>>): Prisma__UploadedImageClient<$Result.GetResult<Prisma.$UploadedImagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UploadedImage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UploadedImageFindUniqueOrThrowArgs} args - Arguments to find a UploadedImage
     * @example
     * // Get one UploadedImage
     * const uploadedImage = await prisma.uploadedImage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UploadedImageFindUniqueOrThrowArgs>(args: SelectSubset<T, UploadedImageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UploadedImageClient<$Result.GetResult<Prisma.$UploadedImagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadedImage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedImageFindFirstArgs} args - Arguments to find a UploadedImage
     * @example
     * // Get one UploadedImage
     * const uploadedImage = await prisma.uploadedImage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UploadedImageFindFirstArgs>(args?: SelectSubset<T, UploadedImageFindFirstArgs<ExtArgs>>): Prisma__UploadedImageClient<$Result.GetResult<Prisma.$UploadedImagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UploadedImage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedImageFindFirstOrThrowArgs} args - Arguments to find a UploadedImage
     * @example
     * // Get one UploadedImage
     * const uploadedImage = await prisma.uploadedImage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UploadedImageFindFirstOrThrowArgs>(args?: SelectSubset<T, UploadedImageFindFirstOrThrowArgs<ExtArgs>>): Prisma__UploadedImageClient<$Result.GetResult<Prisma.$UploadedImagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UploadedImages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedImageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UploadedImages
     * const uploadedImages = await prisma.uploadedImage.findMany()
     * 
     * // Get first 10 UploadedImages
     * const uploadedImages = await prisma.uploadedImage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const uploadedImageWithIdOnly = await prisma.uploadedImage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UploadedImageFindManyArgs>(args?: SelectSubset<T, UploadedImageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UploadedImagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UploadedImage.
     * @param {UploadedImageCreateArgs} args - Arguments to create a UploadedImage.
     * @example
     * // Create one UploadedImage
     * const UploadedImage = await prisma.uploadedImage.create({
     *   data: {
     *     // ... data to create a UploadedImage
     *   }
     * })
     * 
     */
    create<T extends UploadedImageCreateArgs>(args: SelectSubset<T, UploadedImageCreateArgs<ExtArgs>>): Prisma__UploadedImageClient<$Result.GetResult<Prisma.$UploadedImagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UploadedImages.
     * @param {UploadedImageCreateManyArgs} args - Arguments to create many UploadedImages.
     * @example
     * // Create many UploadedImages
     * const uploadedImage = await prisma.uploadedImage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UploadedImageCreateManyArgs>(args?: SelectSubset<T, UploadedImageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a UploadedImage.
     * @param {UploadedImageDeleteArgs} args - Arguments to delete one UploadedImage.
     * @example
     * // Delete one UploadedImage
     * const UploadedImage = await prisma.uploadedImage.delete({
     *   where: {
     *     // ... filter to delete one UploadedImage
     *   }
     * })
     * 
     */
    delete<T extends UploadedImageDeleteArgs>(args: SelectSubset<T, UploadedImageDeleteArgs<ExtArgs>>): Prisma__UploadedImageClient<$Result.GetResult<Prisma.$UploadedImagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UploadedImage.
     * @param {UploadedImageUpdateArgs} args - Arguments to update one UploadedImage.
     * @example
     * // Update one UploadedImage
     * const uploadedImage = await prisma.uploadedImage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UploadedImageUpdateArgs>(args: SelectSubset<T, UploadedImageUpdateArgs<ExtArgs>>): Prisma__UploadedImageClient<$Result.GetResult<Prisma.$UploadedImagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UploadedImages.
     * @param {UploadedImageDeleteManyArgs} args - Arguments to filter UploadedImages to delete.
     * @example
     * // Delete a few UploadedImages
     * const { count } = await prisma.uploadedImage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UploadedImageDeleteManyArgs>(args?: SelectSubset<T, UploadedImageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UploadedImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedImageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UploadedImages
     * const uploadedImage = await prisma.uploadedImage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UploadedImageUpdateManyArgs>(args: SelectSubset<T, UploadedImageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one UploadedImage.
     * @param {UploadedImageUpsertArgs} args - Arguments to update or create a UploadedImage.
     * @example
     * // Update or create a UploadedImage
     * const uploadedImage = await prisma.uploadedImage.upsert({
     *   create: {
     *     // ... data to create a UploadedImage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UploadedImage we want to update
     *   }
     * })
     */
    upsert<T extends UploadedImageUpsertArgs>(args: SelectSubset<T, UploadedImageUpsertArgs<ExtArgs>>): Prisma__UploadedImageClient<$Result.GetResult<Prisma.$UploadedImagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UploadedImages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedImageCountArgs} args - Arguments to filter UploadedImages to count.
     * @example
     * // Count the number of UploadedImages
     * const count = await prisma.uploadedImage.count({
     *   where: {
     *     // ... the filter for the UploadedImages we want to count
     *   }
     * })
    **/
    count<T extends UploadedImageCountArgs>(
      args?: Subset<T, UploadedImageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UploadedImageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UploadedImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedImageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UploadedImageAggregateArgs>(args: Subset<T, UploadedImageAggregateArgs>): Prisma.PrismaPromise<GetUploadedImageAggregateType<T>>

    /**
     * Group by UploadedImage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UploadedImageGroupByArgs} args - Group by arguments.
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
      T extends UploadedImageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UploadedImageGroupByArgs['orderBy'] }
        : { orderBy?: UploadedImageGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, UploadedImageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUploadedImageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UploadedImage model
   */
  readonly fields: UploadedImageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UploadedImage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UploadedImageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    uploadedBy<T extends UserProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserProfileDefaultArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the UploadedImage model
   */
  interface UploadedImageFieldRefs {
    readonly id: FieldRef<"UploadedImage", 'Int'>
    readonly name: FieldRef<"UploadedImage", 'String'>
    readonly image: FieldRef<"UploadedImage", 'String'>
    readonly size: FieldRef<"UploadedImage", 'Float'>
    readonly contentType: FieldRef<"UploadedImage", 'String'>
    readonly width: FieldRef<"UploadedImage", 'Int'>
    readonly height: FieldRef<"UploadedImage", 'Int'>
    readonly thumbnail: FieldRef<"UploadedImage", 'String'>
    readonly uploadedAt: FieldRef<"UploadedImage", 'DateTime'>
    readonly status: FieldRef<"UploadedImage", 'UploadedImageStatus'>
    readonly notificationSent: FieldRef<"UploadedImage", 'Boolean'>
    readonly uploadedById: FieldRef<"UploadedImage", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * UploadedImage findUnique
   */
  export type UploadedImageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedImage
     */
    select?: UploadedImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedImage
     */
    omit?: UploadedImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedImageInclude<ExtArgs> | null
    /**
     * Filter, which UploadedImage to fetch.
     */
    where: UploadedImageWhereUniqueInput
  }

  /**
   * UploadedImage findUniqueOrThrow
   */
  export type UploadedImageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedImage
     */
    select?: UploadedImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedImage
     */
    omit?: UploadedImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedImageInclude<ExtArgs> | null
    /**
     * Filter, which UploadedImage to fetch.
     */
    where: UploadedImageWhereUniqueInput
  }

  /**
   * UploadedImage findFirst
   */
  export type UploadedImageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedImage
     */
    select?: UploadedImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedImage
     */
    omit?: UploadedImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedImageInclude<ExtArgs> | null
    /**
     * Filter, which UploadedImage to fetch.
     */
    where?: UploadedImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedImages to fetch.
     */
    orderBy?: UploadedImageOrderByWithRelationInput | UploadedImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadedImages.
     */
    cursor?: UploadedImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadedImages.
     */
    distinct?: UploadedImageScalarFieldEnum | UploadedImageScalarFieldEnum[]
  }

  /**
   * UploadedImage findFirstOrThrow
   */
  export type UploadedImageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedImage
     */
    select?: UploadedImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedImage
     */
    omit?: UploadedImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedImageInclude<ExtArgs> | null
    /**
     * Filter, which UploadedImage to fetch.
     */
    where?: UploadedImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedImages to fetch.
     */
    orderBy?: UploadedImageOrderByWithRelationInput | UploadedImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UploadedImages.
     */
    cursor?: UploadedImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedImages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UploadedImages.
     */
    distinct?: UploadedImageScalarFieldEnum | UploadedImageScalarFieldEnum[]
  }

  /**
   * UploadedImage findMany
   */
  export type UploadedImageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedImage
     */
    select?: UploadedImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedImage
     */
    omit?: UploadedImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedImageInclude<ExtArgs> | null
    /**
     * Filter, which UploadedImages to fetch.
     */
    where?: UploadedImageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UploadedImages to fetch.
     */
    orderBy?: UploadedImageOrderByWithRelationInput | UploadedImageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UploadedImages.
     */
    cursor?: UploadedImageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UploadedImages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UploadedImages.
     */
    skip?: number
    distinct?: UploadedImageScalarFieldEnum | UploadedImageScalarFieldEnum[]
  }

  /**
   * UploadedImage create
   */
  export type UploadedImageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedImage
     */
    select?: UploadedImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedImage
     */
    omit?: UploadedImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedImageInclude<ExtArgs> | null
    /**
     * The data needed to create a UploadedImage.
     */
    data: XOR<UploadedImageCreateInput, UploadedImageUncheckedCreateInput>
  }

  /**
   * UploadedImage createMany
   */
  export type UploadedImageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UploadedImages.
     */
    data: UploadedImageCreateManyInput | UploadedImageCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UploadedImage update
   */
  export type UploadedImageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedImage
     */
    select?: UploadedImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedImage
     */
    omit?: UploadedImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedImageInclude<ExtArgs> | null
    /**
     * The data needed to update a UploadedImage.
     */
    data: XOR<UploadedImageUpdateInput, UploadedImageUncheckedUpdateInput>
    /**
     * Choose, which UploadedImage to update.
     */
    where: UploadedImageWhereUniqueInput
  }

  /**
   * UploadedImage updateMany
   */
  export type UploadedImageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UploadedImages.
     */
    data: XOR<UploadedImageUpdateManyMutationInput, UploadedImageUncheckedUpdateManyInput>
    /**
     * Filter which UploadedImages to update
     */
    where?: UploadedImageWhereInput
    /**
     * Limit how many UploadedImages to update.
     */
    limit?: number
  }

  /**
   * UploadedImage upsert
   */
  export type UploadedImageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedImage
     */
    select?: UploadedImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedImage
     */
    omit?: UploadedImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedImageInclude<ExtArgs> | null
    /**
     * The filter to search for the UploadedImage to update in case it exists.
     */
    where: UploadedImageWhereUniqueInput
    /**
     * In case the UploadedImage found by the `where` argument doesn't exist, create a new UploadedImage with this data.
     */
    create: XOR<UploadedImageCreateInput, UploadedImageUncheckedCreateInput>
    /**
     * In case the UploadedImage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UploadedImageUpdateInput, UploadedImageUncheckedUpdateInput>
  }

  /**
   * UploadedImage delete
   */
  export type UploadedImageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedImage
     */
    select?: UploadedImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedImage
     */
    omit?: UploadedImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedImageInclude<ExtArgs> | null
    /**
     * Filter which UploadedImage to delete.
     */
    where: UploadedImageWhereUniqueInput
  }

  /**
   * UploadedImage deleteMany
   */
  export type UploadedImageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UploadedImages to delete
     */
    where?: UploadedImageWhereInput
    /**
     * Limit how many UploadedImages to delete.
     */
    limit?: number
  }

  /**
   * UploadedImage without action
   */
  export type UploadedImageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UploadedImage
     */
    select?: UploadedImageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UploadedImage
     */
    omit?: UploadedImageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UploadedImageInclude<ExtArgs> | null
  }


  /**
   * Model BlogPost
   */

  export type AggregateBlogPost = {
    _count: BlogPostCountAggregateOutputType | null
    _avg: BlogPostAvgAggregateOutputType | null
    _sum: BlogPostSumAggregateOutputType | null
    _min: BlogPostMinAggregateOutputType | null
    _max: BlogPostMaxAggregateOutputType | null
  }

  export type BlogPostAvgAggregateOutputType = {
    id: number | null
    viewCount: number | null
    likeCount: number | null
    isApproved: number | null
    isFeatured: number | null
    author_id: number | null
    category_id: number | null
    blog_section_id: number | null
  }

  export type BlogPostSumAggregateOutputType = {
    id: number | null
    viewCount: number | null
    likeCount: number | null
    isApproved: number | null
    isFeatured: number | null
    author_id: number | null
    category_id: number | null
    blog_section_id: number | null
  }

  export type BlogPostMinAggregateOutputType = {
    id: number | null
    title: string | null
    slug: string | null
    content: string | null
    excerpt: string | null
    featuredImage: string | null
    blogFeaturedImage: string | null
    createdAt: Date | null
    updatedAt: Date | null
    publishedAt: Date | null
    status: $Enums.BlogPostStatus | null
    metaTitle: string | null
    metaDescription: string | null
    keywords: string | null
    viewCount: number | null
    likeCount: number | null
    isApproved: number | null
    isFeatured: number | null
    author_id: number | null
    category_id: number | null
    blog_section_id: number | null
  }

  export type BlogPostMaxAggregateOutputType = {
    id: number | null
    title: string | null
    slug: string | null
    content: string | null
    excerpt: string | null
    featuredImage: string | null
    blogFeaturedImage: string | null
    createdAt: Date | null
    updatedAt: Date | null
    publishedAt: Date | null
    status: $Enums.BlogPostStatus | null
    metaTitle: string | null
    metaDescription: string | null
    keywords: string | null
    viewCount: number | null
    likeCount: number | null
    isApproved: number | null
    isFeatured: number | null
    author_id: number | null
    category_id: number | null
    blog_section_id: number | null
  }

  export type BlogPostCountAggregateOutputType = {
    id: number
    title: number
    slug: number
    content: number
    excerpt: number
    featuredImage: number
    blogFeaturedImage: number
    createdAt: number
    updatedAt: number
    publishedAt: number
    status: number
    metaTitle: number
    metaDescription: number
    keywords: number
    viewCount: number
    likeCount: number
    isApproved: number
    isFeatured: number
    author_id: number
    category_id: number
    blog_section_id: number
    _all: number
  }


  export type BlogPostAvgAggregateInputType = {
    id?: true
    viewCount?: true
    likeCount?: true
    isApproved?: true
    isFeatured?: true
    author_id?: true
    category_id?: true
    blog_section_id?: true
  }

  export type BlogPostSumAggregateInputType = {
    id?: true
    viewCount?: true
    likeCount?: true
    isApproved?: true
    isFeatured?: true
    author_id?: true
    category_id?: true
    blog_section_id?: true
  }

  export type BlogPostMinAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    content?: true
    excerpt?: true
    featuredImage?: true
    blogFeaturedImage?: true
    createdAt?: true
    updatedAt?: true
    publishedAt?: true
    status?: true
    metaTitle?: true
    metaDescription?: true
    keywords?: true
    viewCount?: true
    likeCount?: true
    isApproved?: true
    isFeatured?: true
    author_id?: true
    category_id?: true
    blog_section_id?: true
  }

  export type BlogPostMaxAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    content?: true
    excerpt?: true
    featuredImage?: true
    blogFeaturedImage?: true
    createdAt?: true
    updatedAt?: true
    publishedAt?: true
    status?: true
    metaTitle?: true
    metaDescription?: true
    keywords?: true
    viewCount?: true
    likeCount?: true
    isApproved?: true
    isFeatured?: true
    author_id?: true
    category_id?: true
    blog_section_id?: true
  }

  export type BlogPostCountAggregateInputType = {
    id?: true
    title?: true
    slug?: true
    content?: true
    excerpt?: true
    featuredImage?: true
    blogFeaturedImage?: true
    createdAt?: true
    updatedAt?: true
    publishedAt?: true
    status?: true
    metaTitle?: true
    metaDescription?: true
    keywords?: true
    viewCount?: true
    likeCount?: true
    isApproved?: true
    isFeatured?: true
    author_id?: true
    category_id?: true
    blog_section_id?: true
    _all?: true
  }

  export type BlogPostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPost to aggregate.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlogPosts
    **/
    _count?: true | BlogPostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlogPostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlogPostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlogPostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlogPostMaxAggregateInputType
  }

  export type GetBlogPostAggregateType<T extends BlogPostAggregateArgs> = {
        [P in keyof T & keyof AggregateBlogPost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlogPost[P]>
      : GetScalarType<T[P], AggregateBlogPost[P]>
  }




  export type BlogPostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlogPostWhereInput
    orderBy?: BlogPostOrderByWithAggregationInput | BlogPostOrderByWithAggregationInput[]
    by: BlogPostScalarFieldEnum[] | BlogPostScalarFieldEnum
    having?: BlogPostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlogPostCountAggregateInputType | true
    _avg?: BlogPostAvgAggregateInputType
    _sum?: BlogPostSumAggregateInputType
    _min?: BlogPostMinAggregateInputType
    _max?: BlogPostMaxAggregateInputType
  }

  export type BlogPostGroupByOutputType = {
    id: number
    title: string
    slug: string
    content: string
    excerpt: string | null
    featuredImage: string | null
    blogFeaturedImage: string | null
    createdAt: Date
    updatedAt: Date
    publishedAt: Date | null
    status: $Enums.BlogPostStatus
    metaTitle: string | null
    metaDescription: string | null
    keywords: string | null
    viewCount: number
    likeCount: number
    isApproved: number
    isFeatured: number
    author_id: number
    category_id: number | null
    blog_section_id: number | null
    _count: BlogPostCountAggregateOutputType | null
    _avg: BlogPostAvgAggregateOutputType | null
    _sum: BlogPostSumAggregateOutputType | null
    _min: BlogPostMinAggregateOutputType | null
    _max: BlogPostMaxAggregateOutputType | null
  }

  type GetBlogPostGroupByPayload<T extends BlogPostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlogPostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlogPostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlogPostGroupByOutputType[P]>
            : GetScalarType<T[P], BlogPostGroupByOutputType[P]>
        }
      >
    >


  export type BlogPostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    excerpt?: boolean
    featuredImage?: boolean
    blogFeaturedImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedAt?: boolean
    status?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    keywords?: boolean
    viewCount?: boolean
    likeCount?: boolean
    isApproved?: boolean
    isFeatured?: boolean
    author_id?: boolean
    category_id?: boolean
    blog_section_id?: boolean
    author?: boolean | UserProfileDefaultArgs<ExtArgs>
    category?: boolean | BlogPost$categoryArgs<ExtArgs>
    section?: boolean | BlogPost$sectionArgs<ExtArgs>
    tags?: boolean | BlogPost$tagsArgs<ExtArgs>
    _count?: boolean | BlogPostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blogPost"]>



  export type BlogPostSelectScalar = {
    id?: boolean
    title?: boolean
    slug?: boolean
    content?: boolean
    excerpt?: boolean
    featuredImage?: boolean
    blogFeaturedImage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    publishedAt?: boolean
    status?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    keywords?: boolean
    viewCount?: boolean
    likeCount?: boolean
    isApproved?: boolean
    isFeatured?: boolean
    author_id?: boolean
    category_id?: boolean
    blog_section_id?: boolean
  }

  export type BlogPostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "slug" | "content" | "excerpt" | "featuredImage" | "blogFeaturedImage" | "createdAt" | "updatedAt" | "publishedAt" | "status" | "metaTitle" | "metaDescription" | "keywords" | "viewCount" | "likeCount" | "isApproved" | "isFeatured" | "author_id" | "category_id" | "blog_section_id", ExtArgs["result"]["blogPost"]>
  export type BlogPostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserProfileDefaultArgs<ExtArgs>
    category?: boolean | BlogPost$categoryArgs<ExtArgs>
    section?: boolean | BlogPost$sectionArgs<ExtArgs>
    tags?: boolean | BlogPost$tagsArgs<ExtArgs>
    _count?: boolean | BlogPostCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $BlogPostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlogPost"
    objects: {
      author: Prisma.$UserProfilePayload<ExtArgs>
      category: Prisma.$BlogCategoryPayload<ExtArgs> | null
      section: Prisma.$BlogMainPageSectionsPayload<ExtArgs> | null
      tags: Prisma.$BlogTagPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      slug: string
      content: string
      excerpt: string | null
      featuredImage: string | null
      blogFeaturedImage: string | null
      createdAt: Date
      updatedAt: Date
      publishedAt: Date | null
      status: $Enums.BlogPostStatus
      metaTitle: string | null
      metaDescription: string | null
      keywords: string | null
      viewCount: number
      likeCount: number
      isApproved: number
      isFeatured: number
      author_id: number
      category_id: number | null
      blog_section_id: number | null
    }, ExtArgs["result"]["blogPost"]>
    composites: {}
  }

  type BlogPostGetPayload<S extends boolean | null | undefined | BlogPostDefaultArgs> = $Result.GetResult<Prisma.$BlogPostPayload, S>

  type BlogPostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<BlogPostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: BlogPostCountAggregateInputType | true
    }

  export interface BlogPostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlogPost'], meta: { name: 'BlogPost' } }
    /**
     * Find zero or one BlogPost that matches the filter.
     * @param {BlogPostFindUniqueArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlogPostFindUniqueArgs>(args: SelectSubset<T, BlogPostFindUniqueArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one BlogPost that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BlogPostFindUniqueOrThrowArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlogPostFindUniqueOrThrowArgs>(args: SelectSubset<T, BlogPostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogPost that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindFirstArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlogPostFindFirstArgs>(args?: SelectSubset<T, BlogPostFindFirstArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first BlogPost that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindFirstOrThrowArgs} args - Arguments to find a BlogPost
     * @example
     * // Get one BlogPost
     * const blogPost = await prisma.blogPost.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlogPostFindFirstOrThrowArgs>(args?: SelectSubset<T, BlogPostFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more BlogPosts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlogPosts
     * const blogPosts = await prisma.blogPost.findMany()
     * 
     * // Get first 10 BlogPosts
     * const blogPosts = await prisma.blogPost.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blogPostWithIdOnly = await prisma.blogPost.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlogPostFindManyArgs>(args?: SelectSubset<T, BlogPostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a BlogPost.
     * @param {BlogPostCreateArgs} args - Arguments to create a BlogPost.
     * @example
     * // Create one BlogPost
     * const BlogPost = await prisma.blogPost.create({
     *   data: {
     *     // ... data to create a BlogPost
     *   }
     * })
     * 
     */
    create<T extends BlogPostCreateArgs>(args: SelectSubset<T, BlogPostCreateArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many BlogPosts.
     * @param {BlogPostCreateManyArgs} args - Arguments to create many BlogPosts.
     * @example
     * // Create many BlogPosts
     * const blogPost = await prisma.blogPost.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlogPostCreateManyArgs>(args?: SelectSubset<T, BlogPostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a BlogPost.
     * @param {BlogPostDeleteArgs} args - Arguments to delete one BlogPost.
     * @example
     * // Delete one BlogPost
     * const BlogPost = await prisma.blogPost.delete({
     *   where: {
     *     // ... filter to delete one BlogPost
     *   }
     * })
     * 
     */
    delete<T extends BlogPostDeleteArgs>(args: SelectSubset<T, BlogPostDeleteArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one BlogPost.
     * @param {BlogPostUpdateArgs} args - Arguments to update one BlogPost.
     * @example
     * // Update one BlogPost
     * const blogPost = await prisma.blogPost.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlogPostUpdateArgs>(args: SelectSubset<T, BlogPostUpdateArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more BlogPosts.
     * @param {BlogPostDeleteManyArgs} args - Arguments to filter BlogPosts to delete.
     * @example
     * // Delete a few BlogPosts
     * const { count } = await prisma.blogPost.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlogPostDeleteManyArgs>(args?: SelectSubset<T, BlogPostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlogPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlogPosts
     * const blogPost = await prisma.blogPost.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlogPostUpdateManyArgs>(args: SelectSubset<T, BlogPostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BlogPost.
     * @param {BlogPostUpsertArgs} args - Arguments to update or create a BlogPost.
     * @example
     * // Update or create a BlogPost
     * const blogPost = await prisma.blogPost.upsert({
     *   create: {
     *     // ... data to create a BlogPost
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlogPost we want to update
     *   }
     * })
     */
    upsert<T extends BlogPostUpsertArgs>(args: SelectSubset<T, BlogPostUpsertArgs<ExtArgs>>): Prisma__BlogPostClient<$Result.GetResult<Prisma.$BlogPostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of BlogPosts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostCountArgs} args - Arguments to filter BlogPosts to count.
     * @example
     * // Count the number of BlogPosts
     * const count = await prisma.blogPost.count({
     *   where: {
     *     // ... the filter for the BlogPosts we want to count
     *   }
     * })
    **/
    count<T extends BlogPostCountArgs>(
      args?: Subset<T, BlogPostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlogPostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlogPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlogPostAggregateArgs>(args: Subset<T, BlogPostAggregateArgs>): Prisma.PrismaPromise<GetBlogPostAggregateType<T>>

    /**
     * Group by BlogPost.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlogPostGroupByArgs} args - Group by arguments.
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
      T extends BlogPostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlogPostGroupByArgs['orderBy'] }
        : { orderBy?: BlogPostGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BlogPostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlogPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlogPost model
   */
  readonly fields: BlogPostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlogPost.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlogPostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserProfileDefaultArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends BlogPost$categoryArgs<ExtArgs> = {}>(args?: Subset<T, BlogPost$categoryArgs<ExtArgs>>): Prisma__BlogCategoryClient<$Result.GetResult<Prisma.$BlogCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    section<T extends BlogPost$sectionArgs<ExtArgs> = {}>(args?: Subset<T, BlogPost$sectionArgs<ExtArgs>>): Prisma__BlogMainPageSectionsClient<$Result.GetResult<Prisma.$BlogMainPageSectionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    tags<T extends BlogPost$tagsArgs<ExtArgs> = {}>(args?: Subset<T, BlogPost$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlogTagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the BlogPost model
   */
  interface BlogPostFieldRefs {
    readonly id: FieldRef<"BlogPost", 'Int'>
    readonly title: FieldRef<"BlogPost", 'String'>
    readonly slug: FieldRef<"BlogPost", 'String'>
    readonly content: FieldRef<"BlogPost", 'String'>
    readonly excerpt: FieldRef<"BlogPost", 'String'>
    readonly featuredImage: FieldRef<"BlogPost", 'String'>
    readonly blogFeaturedImage: FieldRef<"BlogPost", 'String'>
    readonly createdAt: FieldRef<"BlogPost", 'DateTime'>
    readonly updatedAt: FieldRef<"BlogPost", 'DateTime'>
    readonly publishedAt: FieldRef<"BlogPost", 'DateTime'>
    readonly status: FieldRef<"BlogPost", 'BlogPostStatus'>
    readonly metaTitle: FieldRef<"BlogPost", 'String'>
    readonly metaDescription: FieldRef<"BlogPost", 'String'>
    readonly keywords: FieldRef<"BlogPost", 'String'>
    readonly viewCount: FieldRef<"BlogPost", 'Int'>
    readonly likeCount: FieldRef<"BlogPost", 'Int'>
    readonly isApproved: FieldRef<"BlogPost", 'Int'>
    readonly isFeatured: FieldRef<"BlogPost", 'Int'>
    readonly author_id: FieldRef<"BlogPost", 'Int'>
    readonly category_id: FieldRef<"BlogPost", 'Int'>
    readonly blog_section_id: FieldRef<"BlogPost", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * BlogPost findUnique
   */
  export type BlogPostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost findUniqueOrThrow
   */
  export type BlogPostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost findFirst
   */
  export type BlogPostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost findFirstOrThrow
   */
  export type BlogPostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPost to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlogPosts.
     */
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost findMany
   */
  export type BlogPostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter, which BlogPosts to fetch.
     */
    where?: BlogPostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlogPosts to fetch.
     */
    orderBy?: BlogPostOrderByWithRelationInput | BlogPostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlogPosts.
     */
    cursor?: BlogPostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlogPosts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlogPosts.
     */
    skip?: number
    distinct?: BlogPostScalarFieldEnum | BlogPostScalarFieldEnum[]
  }

  /**
   * BlogPost create
   */
  export type BlogPostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * The data needed to create a BlogPost.
     */
    data: XOR<BlogPostCreateInput, BlogPostUncheckedCreateInput>
  }

  /**
   * BlogPost createMany
   */
  export type BlogPostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlogPosts.
     */
    data: BlogPostCreateManyInput | BlogPostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlogPost update
   */
  export type BlogPostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * The data needed to update a BlogPost.
     */
    data: XOR<BlogPostUpdateInput, BlogPostUncheckedUpdateInput>
    /**
     * Choose, which BlogPost to update.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost updateMany
   */
  export type BlogPostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlogPosts.
     */
    data: XOR<BlogPostUpdateManyMutationInput, BlogPostUncheckedUpdateManyInput>
    /**
     * Filter which BlogPosts to update
     */
    where?: BlogPostWhereInput
    /**
     * Limit how many BlogPosts to update.
     */
    limit?: number
  }

  /**
   * BlogPost upsert
   */
  export type BlogPostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * The filter to search for the BlogPost to update in case it exists.
     */
    where: BlogPostWhereUniqueInput
    /**
     * In case the BlogPost found by the `where` argument doesn't exist, create a new BlogPost with this data.
     */
    create: XOR<BlogPostCreateInput, BlogPostUncheckedCreateInput>
    /**
     * In case the BlogPost was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlogPostUpdateInput, BlogPostUncheckedUpdateInput>
  }

  /**
   * BlogPost delete
   */
  export type BlogPostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
    /**
     * Filter which BlogPost to delete.
     */
    where: BlogPostWhereUniqueInput
  }

  /**
   * BlogPost deleteMany
   */
  export type BlogPostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlogPosts to delete
     */
    where?: BlogPostWhereInput
    /**
     * Limit how many BlogPosts to delete.
     */
    limit?: number
  }

  /**
   * BlogPost.category
   */
  export type BlogPost$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogCategory
     */
    select?: BlogCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogCategory
     */
    omit?: BlogCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogCategoryInclude<ExtArgs> | null
    where?: BlogCategoryWhereInput
  }

  /**
   * BlogPost.section
   */
  export type BlogPost$sectionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogMainPageSections
     */
    select?: BlogMainPageSectionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogMainPageSections
     */
    omit?: BlogMainPageSectionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogMainPageSectionsInclude<ExtArgs> | null
    where?: BlogMainPageSectionsWhereInput
  }

  /**
   * BlogPost.tags
   */
  export type BlogPost$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogTag
     */
    select?: BlogTagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogTag
     */
    omit?: BlogTagOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogTagInclude<ExtArgs> | null
    where?: BlogTagWhereInput
    orderBy?: BlogTagOrderByWithRelationInput | BlogTagOrderByWithRelationInput[]
    cursor?: BlogTagWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlogTagScalarFieldEnum | BlogTagScalarFieldEnum[]
  }

  /**
   * BlogPost without action
   */
  export type BlogPostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlogPost
     */
    select?: BlogPostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the BlogPost
     */
    omit?: BlogPostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlogPostInclude<ExtArgs> | null
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


  export const UserProfileScalarFieldEnum: {
    id: 'id',
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    role: 'role',
    isStaff: 'isStaff',
    isActive: 'isActive',
    dateJoined: 'dateJoined',
    updatedAt: 'updatedAt',
    isVerified: 'isVerified',
    city: 'city',
    state: 'state',
    zipCode: 'zipCode',
    country: 'country',
    address1: 'address1',
    address2: 'address2',
    securityQuestion: 'securityQuestion',
    securityAnswer: 'securityAnswer',
    profileImage: 'profileImage',
    phoneNumber: 'phoneNumber',
    summery: 'summery'
  };

  export type UserProfileScalarFieldEnum = (typeof UserProfileScalarFieldEnum)[keyof typeof UserProfileScalarFieldEnum]


  export const BlogCategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    count: 'count',
    description: 'description',
    createdById: 'createdById'
  };

  export type BlogCategoryScalarFieldEnum = (typeof BlogCategoryScalarFieldEnum)[keyof typeof BlogCategoryScalarFieldEnum]


  export const BlogTagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    count: 'count',
    createdById: 'createdById'
  };

  export type BlogTagScalarFieldEnum = (typeof BlogTagScalarFieldEnum)[keyof typeof BlogTagScalarFieldEnum]


  export const BlogMainPageSectionsScalarFieldEnum: {
    id: 'id',
    section: 'section',
    createdAt: 'createdAt'
  };

  export type BlogMainPageSectionsScalarFieldEnum = (typeof BlogMainPageSectionsScalarFieldEnum)[keyof typeof BlogMainPageSectionsScalarFieldEnum]


  export const UploadedImageScalarFieldEnum: {
    id: 'id',
    name: 'name',
    image: 'image',
    size: 'size',
    contentType: 'contentType',
    width: 'width',
    height: 'height',
    thumbnail: 'thumbnail',
    uploadedAt: 'uploadedAt',
    status: 'status',
    notificationSent: 'notificationSent',
    uploadedById: 'uploadedById'
  };

  export type UploadedImageScalarFieldEnum = (typeof UploadedImageScalarFieldEnum)[keyof typeof UploadedImageScalarFieldEnum]


  export const BlogPostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    slug: 'slug',
    content: 'content',
    excerpt: 'excerpt',
    featuredImage: 'featuredImage',
    blogFeaturedImage: 'blogFeaturedImage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    publishedAt: 'publishedAt',
    status: 'status',
    metaTitle: 'metaTitle',
    metaDescription: 'metaDescription',
    keywords: 'keywords',
    viewCount: 'viewCount',
    likeCount: 'likeCount',
    isApproved: 'isApproved',
    isFeatured: 'isFeatured',
    author_id: 'author_id',
    category_id: 'category_id',
    blog_section_id: 'blog_section_id'
  };

  export type BlogPostScalarFieldEnum = (typeof BlogPostScalarFieldEnum)[keyof typeof BlogPostScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserProfileOrderByRelevanceFieldEnum: {
    email: 'email',
    firstName: 'firstName',
    lastName: 'lastName',
    city: 'city',
    state: 'state',
    country: 'country',
    address1: 'address1',
    address2: 'address2',
    securityAnswer: 'securityAnswer',
    profileImage: 'profileImage',
    phoneNumber: 'phoneNumber',
    summery: 'summery'
  };

  export type UserProfileOrderByRelevanceFieldEnum = (typeof UserProfileOrderByRelevanceFieldEnum)[keyof typeof UserProfileOrderByRelevanceFieldEnum]


  export const BlogCategoryOrderByRelevanceFieldEnum: {
    name: 'name',
    slug: 'slug',
    description: 'description'
  };

  export type BlogCategoryOrderByRelevanceFieldEnum = (typeof BlogCategoryOrderByRelevanceFieldEnum)[keyof typeof BlogCategoryOrderByRelevanceFieldEnum]


  export const BlogTagOrderByRelevanceFieldEnum: {
    name: 'name',
    slug: 'slug'
  };

  export type BlogTagOrderByRelevanceFieldEnum = (typeof BlogTagOrderByRelevanceFieldEnum)[keyof typeof BlogTagOrderByRelevanceFieldEnum]


  export const BlogMainPageSectionsOrderByRelevanceFieldEnum: {
    section: 'section'
  };

  export type BlogMainPageSectionsOrderByRelevanceFieldEnum = (typeof BlogMainPageSectionsOrderByRelevanceFieldEnum)[keyof typeof BlogMainPageSectionsOrderByRelevanceFieldEnum]


  export const UploadedImageOrderByRelevanceFieldEnum: {
    name: 'name',
    image: 'image',
    contentType: 'contentType',
    thumbnail: 'thumbnail'
  };

  export type UploadedImageOrderByRelevanceFieldEnum = (typeof UploadedImageOrderByRelevanceFieldEnum)[keyof typeof UploadedImageOrderByRelevanceFieldEnum]


  export const BlogPostOrderByRelevanceFieldEnum: {
    title: 'title',
    slug: 'slug',
    content: 'content',
    excerpt: 'excerpt',
    featuredImage: 'featuredImage',
    blogFeaturedImage: 'blogFeaturedImage',
    metaTitle: 'metaTitle',
    metaDescription: 'metaDescription',
    keywords: 'keywords'
  };

  export type BlogPostOrderByRelevanceFieldEnum = (typeof BlogPostOrderByRelevanceFieldEnum)[keyof typeof BlogPostOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'SecurityQuestion'
   */
  export type EnumSecurityQuestionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SecurityQuestion'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'UploadedImageStatus'
   */
  export type EnumUploadedImageStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'UploadedImageStatus'>
    


  /**
   * Reference to a field of type 'BlogPostStatus'
   */
  export type EnumBlogPostStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlogPostStatus'>
    
  /**
   * Deep Input Types
   */


  export type UserProfileWhereInput = {
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    id?: IntFilter<"UserProfile"> | number
    email?: StringFilter<"UserProfile"> | string
    firstName?: StringNullableFilter<"UserProfile"> | string | null
    lastName?: StringNullableFilter<"UserProfile"> | string | null
    role?: EnumRoleFilter<"UserProfile"> | $Enums.Role
    isStaff?: BoolFilter<"UserProfile"> | boolean
    isActive?: BoolFilter<"UserProfile"> | boolean
    dateJoined?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
    isVerified?: BoolFilter<"UserProfile"> | boolean
    city?: StringNullableFilter<"UserProfile"> | string | null
    state?: StringNullableFilter<"UserProfile"> | string | null
    zipCode?: IntNullableFilter<"UserProfile"> | number | null
    country?: StringNullableFilter<"UserProfile"> | string | null
    address1?: StringNullableFilter<"UserProfile"> | string | null
    address2?: StringNullableFilter<"UserProfile"> | string | null
    securityQuestion?: EnumSecurityQuestionNullableFilter<"UserProfile"> | $Enums.SecurityQuestion | null
    securityAnswer?: StringNullableFilter<"UserProfile"> | string | null
    profileImage?: StringNullableFilter<"UserProfile"> | string | null
    phoneNumber?: StringNullableFilter<"UserProfile"> | string | null
    summery?: StringNullableFilter<"UserProfile"> | string | null
    blogCategories?: BlogCategoryListRelationFilter
    blogTags?: BlogTagListRelationFilter
    uploadedImages?: UploadedImageListRelationFilter
    blogPosts?: BlogPostListRelationFilter
  }

  export type UserProfileOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    role?: SortOrder
    isStaff?: SortOrder
    isActive?: SortOrder
    dateJoined?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    address1?: SortOrderInput | SortOrder
    address2?: SortOrderInput | SortOrder
    securityQuestion?: SortOrderInput | SortOrder
    securityAnswer?: SortOrderInput | SortOrder
    profileImage?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    summery?: SortOrderInput | SortOrder
    blogCategories?: BlogCategoryOrderByRelationAggregateInput
    blogTags?: BlogTagOrderByRelationAggregateInput
    uploadedImages?: UploadedImageOrderByRelationAggregateInput
    blogPosts?: BlogPostOrderByRelationAggregateInput
    _relevance?: UserProfileOrderByRelevanceInput
  }

  export type UserProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    firstName?: StringNullableFilter<"UserProfile"> | string | null
    lastName?: StringNullableFilter<"UserProfile"> | string | null
    role?: EnumRoleFilter<"UserProfile"> | $Enums.Role
    isStaff?: BoolFilter<"UserProfile"> | boolean
    isActive?: BoolFilter<"UserProfile"> | boolean
    dateJoined?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
    isVerified?: BoolFilter<"UserProfile"> | boolean
    city?: StringNullableFilter<"UserProfile"> | string | null
    state?: StringNullableFilter<"UserProfile"> | string | null
    zipCode?: IntNullableFilter<"UserProfile"> | number | null
    country?: StringNullableFilter<"UserProfile"> | string | null
    address1?: StringNullableFilter<"UserProfile"> | string | null
    address2?: StringNullableFilter<"UserProfile"> | string | null
    securityQuestion?: EnumSecurityQuestionNullableFilter<"UserProfile"> | $Enums.SecurityQuestion | null
    securityAnswer?: StringNullableFilter<"UserProfile"> | string | null
    profileImage?: StringNullableFilter<"UserProfile"> | string | null
    phoneNumber?: StringNullableFilter<"UserProfile"> | string | null
    summery?: StringNullableFilter<"UserProfile"> | string | null
    blogCategories?: BlogCategoryListRelationFilter
    blogTags?: BlogTagListRelationFilter
    uploadedImages?: UploadedImageListRelationFilter
    blogPosts?: BlogPostListRelationFilter
  }, "id" | "email">

  export type UserProfileOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    role?: SortOrder
    isStaff?: SortOrder
    isActive?: SortOrder
    dateJoined?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
    city?: SortOrderInput | SortOrder
    state?: SortOrderInput | SortOrder
    zipCode?: SortOrderInput | SortOrder
    country?: SortOrderInput | SortOrder
    address1?: SortOrderInput | SortOrder
    address2?: SortOrderInput | SortOrder
    securityQuestion?: SortOrderInput | SortOrder
    securityAnswer?: SortOrderInput | SortOrder
    profileImage?: SortOrderInput | SortOrder
    phoneNumber?: SortOrderInput | SortOrder
    summery?: SortOrderInput | SortOrder
    _count?: UserProfileCountOrderByAggregateInput
    _avg?: UserProfileAvgOrderByAggregateInput
    _max?: UserProfileMaxOrderByAggregateInput
    _min?: UserProfileMinOrderByAggregateInput
    _sum?: UserProfileSumOrderByAggregateInput
  }

  export type UserProfileScalarWhereWithAggregatesInput = {
    AND?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    OR?: UserProfileScalarWhereWithAggregatesInput[]
    NOT?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UserProfile"> | number
    email?: StringWithAggregatesFilter<"UserProfile"> | string
    firstName?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    role?: EnumRoleWithAggregatesFilter<"UserProfile"> | $Enums.Role
    isStaff?: BoolWithAggregatesFilter<"UserProfile"> | boolean
    isActive?: BoolWithAggregatesFilter<"UserProfile"> | boolean
    dateJoined?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
    isVerified?: BoolWithAggregatesFilter<"UserProfile"> | boolean
    city?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    state?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    zipCode?: IntNullableWithAggregatesFilter<"UserProfile"> | number | null
    country?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    address1?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    address2?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    securityQuestion?: EnumSecurityQuestionNullableWithAggregatesFilter<"UserProfile"> | $Enums.SecurityQuestion | null
    securityAnswer?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    profileImage?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    phoneNumber?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    summery?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
  }

  export type BlogCategoryWhereInput = {
    AND?: BlogCategoryWhereInput | BlogCategoryWhereInput[]
    OR?: BlogCategoryWhereInput[]
    NOT?: BlogCategoryWhereInput | BlogCategoryWhereInput[]
    id?: IntFilter<"BlogCategory"> | number
    name?: StringFilter<"BlogCategory"> | string
    slug?: StringFilter<"BlogCategory"> | string
    count?: IntFilter<"BlogCategory"> | number
    description?: StringNullableFilter<"BlogCategory"> | string | null
    createdById?: IntFilter<"BlogCategory"> | number
    createdBy?: XOR<UserProfileScalarRelationFilter, UserProfileWhereInput>
    posts?: BlogPostListRelationFilter
  }

  export type BlogCategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    count?: SortOrder
    description?: SortOrderInput | SortOrder
    createdById?: SortOrder
    createdBy?: UserProfileOrderByWithRelationInput
    posts?: BlogPostOrderByRelationAggregateInput
    _relevance?: BlogCategoryOrderByRelevanceInput
  }

  export type BlogCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    slug?: string
    AND?: BlogCategoryWhereInput | BlogCategoryWhereInput[]
    OR?: BlogCategoryWhereInput[]
    NOT?: BlogCategoryWhereInput | BlogCategoryWhereInput[]
    count?: IntFilter<"BlogCategory"> | number
    description?: StringNullableFilter<"BlogCategory"> | string | null
    createdById?: IntFilter<"BlogCategory"> | number
    createdBy?: XOR<UserProfileScalarRelationFilter, UserProfileWhereInput>
    posts?: BlogPostListRelationFilter
  }, "id" | "name" | "slug">

  export type BlogCategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    count?: SortOrder
    description?: SortOrderInput | SortOrder
    createdById?: SortOrder
    _count?: BlogCategoryCountOrderByAggregateInput
    _avg?: BlogCategoryAvgOrderByAggregateInput
    _max?: BlogCategoryMaxOrderByAggregateInput
    _min?: BlogCategoryMinOrderByAggregateInput
    _sum?: BlogCategorySumOrderByAggregateInput
  }

  export type BlogCategoryScalarWhereWithAggregatesInput = {
    AND?: BlogCategoryScalarWhereWithAggregatesInput | BlogCategoryScalarWhereWithAggregatesInput[]
    OR?: BlogCategoryScalarWhereWithAggregatesInput[]
    NOT?: BlogCategoryScalarWhereWithAggregatesInput | BlogCategoryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BlogCategory"> | number
    name?: StringWithAggregatesFilter<"BlogCategory"> | string
    slug?: StringWithAggregatesFilter<"BlogCategory"> | string
    count?: IntWithAggregatesFilter<"BlogCategory"> | number
    description?: StringNullableWithAggregatesFilter<"BlogCategory"> | string | null
    createdById?: IntWithAggregatesFilter<"BlogCategory"> | number
  }

  export type BlogTagWhereInput = {
    AND?: BlogTagWhereInput | BlogTagWhereInput[]
    OR?: BlogTagWhereInput[]
    NOT?: BlogTagWhereInput | BlogTagWhereInput[]
    id?: IntFilter<"BlogTag"> | number
    name?: StringFilter<"BlogTag"> | string
    slug?: StringFilter<"BlogTag"> | string
    count?: IntFilter<"BlogTag"> | number
    createdById?: IntFilter<"BlogTag"> | number
    createdBy?: XOR<UserProfileScalarRelationFilter, UserProfileWhereInput>
    posts?: BlogPostListRelationFilter
  }

  export type BlogTagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    count?: SortOrder
    createdById?: SortOrder
    createdBy?: UserProfileOrderByWithRelationInput
    posts?: BlogPostOrderByRelationAggregateInput
    _relevance?: BlogTagOrderByRelevanceInput
  }

  export type BlogTagWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    slug?: string
    AND?: BlogTagWhereInput | BlogTagWhereInput[]
    OR?: BlogTagWhereInput[]
    NOT?: BlogTagWhereInput | BlogTagWhereInput[]
    count?: IntFilter<"BlogTag"> | number
    createdById?: IntFilter<"BlogTag"> | number
    createdBy?: XOR<UserProfileScalarRelationFilter, UserProfileWhereInput>
    posts?: BlogPostListRelationFilter
  }, "id" | "name" | "slug">

  export type BlogTagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    count?: SortOrder
    createdById?: SortOrder
    _count?: BlogTagCountOrderByAggregateInput
    _avg?: BlogTagAvgOrderByAggregateInput
    _max?: BlogTagMaxOrderByAggregateInput
    _min?: BlogTagMinOrderByAggregateInput
    _sum?: BlogTagSumOrderByAggregateInput
  }

  export type BlogTagScalarWhereWithAggregatesInput = {
    AND?: BlogTagScalarWhereWithAggregatesInput | BlogTagScalarWhereWithAggregatesInput[]
    OR?: BlogTagScalarWhereWithAggregatesInput[]
    NOT?: BlogTagScalarWhereWithAggregatesInput | BlogTagScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BlogTag"> | number
    name?: StringWithAggregatesFilter<"BlogTag"> | string
    slug?: StringWithAggregatesFilter<"BlogTag"> | string
    count?: IntWithAggregatesFilter<"BlogTag"> | number
    createdById?: IntWithAggregatesFilter<"BlogTag"> | number
  }

  export type BlogMainPageSectionsWhereInput = {
    AND?: BlogMainPageSectionsWhereInput | BlogMainPageSectionsWhereInput[]
    OR?: BlogMainPageSectionsWhereInput[]
    NOT?: BlogMainPageSectionsWhereInput | BlogMainPageSectionsWhereInput[]
    id?: IntFilter<"BlogMainPageSections"> | number
    section?: StringFilter<"BlogMainPageSections"> | string
    createdAt?: DateTimeFilter<"BlogMainPageSections"> | Date | string
    posts?: BlogPostListRelationFilter
  }

  export type BlogMainPageSectionsOrderByWithRelationInput = {
    id?: SortOrder
    section?: SortOrder
    createdAt?: SortOrder
    posts?: BlogPostOrderByRelationAggregateInput
    _relevance?: BlogMainPageSectionsOrderByRelevanceInput
  }

  export type BlogMainPageSectionsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    section?: string
    AND?: BlogMainPageSectionsWhereInput | BlogMainPageSectionsWhereInput[]
    OR?: BlogMainPageSectionsWhereInput[]
    NOT?: BlogMainPageSectionsWhereInput | BlogMainPageSectionsWhereInput[]
    createdAt?: DateTimeFilter<"BlogMainPageSections"> | Date | string
    posts?: BlogPostListRelationFilter
  }, "id" | "section">

  export type BlogMainPageSectionsOrderByWithAggregationInput = {
    id?: SortOrder
    section?: SortOrder
    createdAt?: SortOrder
    _count?: BlogMainPageSectionsCountOrderByAggregateInput
    _avg?: BlogMainPageSectionsAvgOrderByAggregateInput
    _max?: BlogMainPageSectionsMaxOrderByAggregateInput
    _min?: BlogMainPageSectionsMinOrderByAggregateInput
    _sum?: BlogMainPageSectionsSumOrderByAggregateInput
  }

  export type BlogMainPageSectionsScalarWhereWithAggregatesInput = {
    AND?: BlogMainPageSectionsScalarWhereWithAggregatesInput | BlogMainPageSectionsScalarWhereWithAggregatesInput[]
    OR?: BlogMainPageSectionsScalarWhereWithAggregatesInput[]
    NOT?: BlogMainPageSectionsScalarWhereWithAggregatesInput | BlogMainPageSectionsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BlogMainPageSections"> | number
    section?: StringWithAggregatesFilter<"BlogMainPageSections"> | string
    createdAt?: DateTimeWithAggregatesFilter<"BlogMainPageSections"> | Date | string
  }

  export type UploadedImageWhereInput = {
    AND?: UploadedImageWhereInput | UploadedImageWhereInput[]
    OR?: UploadedImageWhereInput[]
    NOT?: UploadedImageWhereInput | UploadedImageWhereInput[]
    id?: IntFilter<"UploadedImage"> | number
    name?: StringNullableFilter<"UploadedImage"> | string | null
    image?: StringFilter<"UploadedImage"> | string
    size?: FloatFilter<"UploadedImage"> | number
    contentType?: StringNullableFilter<"UploadedImage"> | string | null
    width?: IntFilter<"UploadedImage"> | number
    height?: IntFilter<"UploadedImage"> | number
    thumbnail?: StringNullableFilter<"UploadedImage"> | string | null
    uploadedAt?: DateTimeFilter<"UploadedImage"> | Date | string
    status?: EnumUploadedImageStatusFilter<"UploadedImage"> | $Enums.UploadedImageStatus
    notificationSent?: BoolFilter<"UploadedImage"> | boolean
    uploadedById?: IntFilter<"UploadedImage"> | number
    uploadedBy?: XOR<UserProfileScalarRelationFilter, UserProfileWhereInput>
  }

  export type UploadedImageOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrder
    size?: SortOrder
    contentType?: SortOrderInput | SortOrder
    width?: SortOrder
    height?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    notificationSent?: SortOrder
    uploadedById?: SortOrder
    uploadedBy?: UserProfileOrderByWithRelationInput
    _relevance?: UploadedImageOrderByRelevanceInput
  }

  export type UploadedImageWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: UploadedImageWhereInput | UploadedImageWhereInput[]
    OR?: UploadedImageWhereInput[]
    NOT?: UploadedImageWhereInput | UploadedImageWhereInput[]
    name?: StringNullableFilter<"UploadedImage"> | string | null
    image?: StringFilter<"UploadedImage"> | string
    size?: FloatFilter<"UploadedImage"> | number
    contentType?: StringNullableFilter<"UploadedImage"> | string | null
    width?: IntFilter<"UploadedImage"> | number
    height?: IntFilter<"UploadedImage"> | number
    thumbnail?: StringNullableFilter<"UploadedImage"> | string | null
    uploadedAt?: DateTimeFilter<"UploadedImage"> | Date | string
    status?: EnumUploadedImageStatusFilter<"UploadedImage"> | $Enums.UploadedImageStatus
    notificationSent?: BoolFilter<"UploadedImage"> | boolean
    uploadedById?: IntFilter<"UploadedImage"> | number
    uploadedBy?: XOR<UserProfileScalarRelationFilter, UserProfileWhereInput>
  }, "id">

  export type UploadedImageOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrder
    size?: SortOrder
    contentType?: SortOrderInput | SortOrder
    width?: SortOrder
    height?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    notificationSent?: SortOrder
    uploadedById?: SortOrder
    _count?: UploadedImageCountOrderByAggregateInput
    _avg?: UploadedImageAvgOrderByAggregateInput
    _max?: UploadedImageMaxOrderByAggregateInput
    _min?: UploadedImageMinOrderByAggregateInput
    _sum?: UploadedImageSumOrderByAggregateInput
  }

  export type UploadedImageScalarWhereWithAggregatesInput = {
    AND?: UploadedImageScalarWhereWithAggregatesInput | UploadedImageScalarWhereWithAggregatesInput[]
    OR?: UploadedImageScalarWhereWithAggregatesInput[]
    NOT?: UploadedImageScalarWhereWithAggregatesInput | UploadedImageScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"UploadedImage"> | number
    name?: StringNullableWithAggregatesFilter<"UploadedImage"> | string | null
    image?: StringWithAggregatesFilter<"UploadedImage"> | string
    size?: FloatWithAggregatesFilter<"UploadedImage"> | number
    contentType?: StringNullableWithAggregatesFilter<"UploadedImage"> | string | null
    width?: IntWithAggregatesFilter<"UploadedImage"> | number
    height?: IntWithAggregatesFilter<"UploadedImage"> | number
    thumbnail?: StringNullableWithAggregatesFilter<"UploadedImage"> | string | null
    uploadedAt?: DateTimeWithAggregatesFilter<"UploadedImage"> | Date | string
    status?: EnumUploadedImageStatusWithAggregatesFilter<"UploadedImage"> | $Enums.UploadedImageStatus
    notificationSent?: BoolWithAggregatesFilter<"UploadedImage"> | boolean
    uploadedById?: IntWithAggregatesFilter<"UploadedImage"> | number
  }

  export type BlogPostWhereInput = {
    AND?: BlogPostWhereInput | BlogPostWhereInput[]
    OR?: BlogPostWhereInput[]
    NOT?: BlogPostWhereInput | BlogPostWhereInput[]
    id?: IntFilter<"BlogPost"> | number
    title?: StringFilter<"BlogPost"> | string
    slug?: StringFilter<"BlogPost"> | string
    content?: StringFilter<"BlogPost"> | string
    excerpt?: StringNullableFilter<"BlogPost"> | string | null
    featuredImage?: StringNullableFilter<"BlogPost"> | string | null
    blogFeaturedImage?: StringNullableFilter<"BlogPost"> | string | null
    createdAt?: DateTimeFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPost"> | Date | string
    publishedAt?: DateTimeNullableFilter<"BlogPost"> | Date | string | null
    status?: EnumBlogPostStatusFilter<"BlogPost"> | $Enums.BlogPostStatus
    metaTitle?: StringNullableFilter<"BlogPost"> | string | null
    metaDescription?: StringNullableFilter<"BlogPost"> | string | null
    keywords?: StringNullableFilter<"BlogPost"> | string | null
    viewCount?: IntFilter<"BlogPost"> | number
    likeCount?: IntFilter<"BlogPost"> | number
    isApproved?: IntFilter<"BlogPost"> | number
    isFeatured?: IntFilter<"BlogPost"> | number
    author_id?: IntFilter<"BlogPost"> | number
    category_id?: IntNullableFilter<"BlogPost"> | number | null
    blog_section_id?: IntNullableFilter<"BlogPost"> | number | null
    author?: XOR<UserProfileScalarRelationFilter, UserProfileWhereInput>
    category?: XOR<BlogCategoryNullableScalarRelationFilter, BlogCategoryWhereInput> | null
    section?: XOR<BlogMainPageSectionsNullableScalarRelationFilter, BlogMainPageSectionsWhereInput> | null
    tags?: BlogTagListRelationFilter
  }

  export type BlogPostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    featuredImage?: SortOrderInput | SortOrder
    blogFeaturedImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    viewCount?: SortOrder
    likeCount?: SortOrder
    isApproved?: SortOrder
    isFeatured?: SortOrder
    author_id?: SortOrder
    category_id?: SortOrderInput | SortOrder
    blog_section_id?: SortOrderInput | SortOrder
    author?: UserProfileOrderByWithRelationInput
    category?: BlogCategoryOrderByWithRelationInput
    section?: BlogMainPageSectionsOrderByWithRelationInput
    tags?: BlogTagOrderByRelationAggregateInput
    _relevance?: BlogPostOrderByRelevanceInput
  }

  export type BlogPostWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    title?: string
    slug?: string
    AND?: BlogPostWhereInput | BlogPostWhereInput[]
    OR?: BlogPostWhereInput[]
    NOT?: BlogPostWhereInput | BlogPostWhereInput[]
    content?: StringFilter<"BlogPost"> | string
    excerpt?: StringNullableFilter<"BlogPost"> | string | null
    featuredImage?: StringNullableFilter<"BlogPost"> | string | null
    blogFeaturedImage?: StringNullableFilter<"BlogPost"> | string | null
    createdAt?: DateTimeFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPost"> | Date | string
    publishedAt?: DateTimeNullableFilter<"BlogPost"> | Date | string | null
    status?: EnumBlogPostStatusFilter<"BlogPost"> | $Enums.BlogPostStatus
    metaTitle?: StringNullableFilter<"BlogPost"> | string | null
    metaDescription?: StringNullableFilter<"BlogPost"> | string | null
    keywords?: StringNullableFilter<"BlogPost"> | string | null
    viewCount?: IntFilter<"BlogPost"> | number
    likeCount?: IntFilter<"BlogPost"> | number
    isApproved?: IntFilter<"BlogPost"> | number
    isFeatured?: IntFilter<"BlogPost"> | number
    author_id?: IntFilter<"BlogPost"> | number
    category_id?: IntNullableFilter<"BlogPost"> | number | null
    blog_section_id?: IntNullableFilter<"BlogPost"> | number | null
    author?: XOR<UserProfileScalarRelationFilter, UserProfileWhereInput>
    category?: XOR<BlogCategoryNullableScalarRelationFilter, BlogCategoryWhereInput> | null
    section?: XOR<BlogMainPageSectionsNullableScalarRelationFilter, BlogMainPageSectionsWhereInput> | null
    tags?: BlogTagListRelationFilter
  }, "id" | "title" | "slug">

  export type BlogPostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    excerpt?: SortOrderInput | SortOrder
    featuredImage?: SortOrderInput | SortOrder
    blogFeaturedImage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrderInput | SortOrder
    status?: SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    keywords?: SortOrderInput | SortOrder
    viewCount?: SortOrder
    likeCount?: SortOrder
    isApproved?: SortOrder
    isFeatured?: SortOrder
    author_id?: SortOrder
    category_id?: SortOrderInput | SortOrder
    blog_section_id?: SortOrderInput | SortOrder
    _count?: BlogPostCountOrderByAggregateInput
    _avg?: BlogPostAvgOrderByAggregateInput
    _max?: BlogPostMaxOrderByAggregateInput
    _min?: BlogPostMinOrderByAggregateInput
    _sum?: BlogPostSumOrderByAggregateInput
  }

  export type BlogPostScalarWhereWithAggregatesInput = {
    AND?: BlogPostScalarWhereWithAggregatesInput | BlogPostScalarWhereWithAggregatesInput[]
    OR?: BlogPostScalarWhereWithAggregatesInput[]
    NOT?: BlogPostScalarWhereWithAggregatesInput | BlogPostScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"BlogPost"> | number
    title?: StringWithAggregatesFilter<"BlogPost"> | string
    slug?: StringWithAggregatesFilter<"BlogPost"> | string
    content?: StringWithAggregatesFilter<"BlogPost"> | string
    excerpt?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    featuredImage?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    blogFeaturedImage?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"BlogPost"> | Date | string
    publishedAt?: DateTimeNullableWithAggregatesFilter<"BlogPost"> | Date | string | null
    status?: EnumBlogPostStatusWithAggregatesFilter<"BlogPost"> | $Enums.BlogPostStatus
    metaTitle?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    metaDescription?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    keywords?: StringNullableWithAggregatesFilter<"BlogPost"> | string | null
    viewCount?: IntWithAggregatesFilter<"BlogPost"> | number
    likeCount?: IntWithAggregatesFilter<"BlogPost"> | number
    isApproved?: IntWithAggregatesFilter<"BlogPost"> | number
    isFeatured?: IntWithAggregatesFilter<"BlogPost"> | number
    author_id?: IntWithAggregatesFilter<"BlogPost"> | number
    category_id?: IntNullableWithAggregatesFilter<"BlogPost"> | number | null
    blog_section_id?: IntNullableWithAggregatesFilter<"BlogPost"> | number | null
  }

  export type UserProfileCreateInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
    isStaff?: boolean
    isActive?: boolean
    dateJoined?: Date | string
    updatedAt?: Date | string
    isVerified?: boolean
    city?: string | null
    state?: string | null
    zipCode?: number | null
    country?: string | null
    address1?: string | null
    address2?: string | null
    securityQuestion?: $Enums.SecurityQuestion | null
    securityAnswer?: string | null
    profileImage?: string | null
    phoneNumber?: string | null
    summery?: string | null
    blogCategories?: BlogCategoryCreateNestedManyWithoutCreatedByInput
    blogTags?: BlogTagCreateNestedManyWithoutCreatedByInput
    uploadedImages?: UploadedImageCreateNestedManyWithoutUploadedByInput
    blogPosts?: BlogPostCreateNestedManyWithoutAuthorInput
  }

  export type UserProfileUncheckedCreateInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
    isStaff?: boolean
    isActive?: boolean
    dateJoined?: Date | string
    updatedAt?: Date | string
    isVerified?: boolean
    city?: string | null
    state?: string | null
    zipCode?: number | null
    country?: string | null
    address1?: string | null
    address2?: string | null
    securityQuestion?: $Enums.SecurityQuestion | null
    securityAnswer?: string | null
    profileImage?: string | null
    phoneNumber?: string | null
    summery?: string | null
    blogCategories?: BlogCategoryUncheckedCreateNestedManyWithoutCreatedByInput
    blogTags?: BlogTagUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedImages?: UploadedImageUncheckedCreateNestedManyWithoutUploadedByInput
    blogPosts?: BlogPostUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserProfileUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address1?: NullableStringFieldUpdateOperationsInput | string | null
    address2?: NullableStringFieldUpdateOperationsInput | string | null
    securityQuestion?: NullableEnumSecurityQuestionFieldUpdateOperationsInput | $Enums.SecurityQuestion | null
    securityAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    summery?: NullableStringFieldUpdateOperationsInput | string | null
    blogCategories?: BlogCategoryUpdateManyWithoutCreatedByNestedInput
    blogTags?: BlogTagUpdateManyWithoutCreatedByNestedInput
    uploadedImages?: UploadedImageUpdateManyWithoutUploadedByNestedInput
    blogPosts?: BlogPostUpdateManyWithoutAuthorNestedInput
  }

  export type UserProfileUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address1?: NullableStringFieldUpdateOperationsInput | string | null
    address2?: NullableStringFieldUpdateOperationsInput | string | null
    securityQuestion?: NullableEnumSecurityQuestionFieldUpdateOperationsInput | $Enums.SecurityQuestion | null
    securityAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    summery?: NullableStringFieldUpdateOperationsInput | string | null
    blogCategories?: BlogCategoryUncheckedUpdateManyWithoutCreatedByNestedInput
    blogTags?: BlogTagUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedImages?: UploadedImageUncheckedUpdateManyWithoutUploadedByNestedInput
    blogPosts?: BlogPostUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserProfileCreateManyInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
    isStaff?: boolean
    isActive?: boolean
    dateJoined?: Date | string
    updatedAt?: Date | string
    isVerified?: boolean
    city?: string | null
    state?: string | null
    zipCode?: number | null
    country?: string | null
    address1?: string | null
    address2?: string | null
    securityQuestion?: $Enums.SecurityQuestion | null
    securityAnswer?: string | null
    profileImage?: string | null
    phoneNumber?: string | null
    summery?: string | null
  }

  export type UserProfileUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address1?: NullableStringFieldUpdateOperationsInput | string | null
    address2?: NullableStringFieldUpdateOperationsInput | string | null
    securityQuestion?: NullableEnumSecurityQuestionFieldUpdateOperationsInput | $Enums.SecurityQuestion | null
    securityAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    summery?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserProfileUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address1?: NullableStringFieldUpdateOperationsInput | string | null
    address2?: NullableStringFieldUpdateOperationsInput | string | null
    securityQuestion?: NullableEnumSecurityQuestionFieldUpdateOperationsInput | $Enums.SecurityQuestion | null
    securityAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    summery?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlogCategoryCreateInput = {
    name: string
    slug: string
    count?: number
    description?: string | null
    createdBy: UserProfileCreateNestedOneWithoutBlogCategoriesInput
    posts?: BlogPostCreateNestedManyWithoutCategoryInput
  }

  export type BlogCategoryUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    count?: number
    description?: string | null
    createdById: number
    posts?: BlogPostUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type BlogCategoryUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: UserProfileUpdateOneRequiredWithoutBlogCategoriesNestedInput
    posts?: BlogPostUpdateManyWithoutCategoryNestedInput
  }

  export type BlogCategoryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: IntFieldUpdateOperationsInput | number
    posts?: BlogPostUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type BlogCategoryCreateManyInput = {
    id?: number
    name: string
    slug: string
    count?: number
    description?: string | null
    createdById: number
  }

  export type BlogCategoryUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlogCategoryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: IntFieldUpdateOperationsInput | number
  }

  export type BlogTagCreateInput = {
    name: string
    slug: string
    count?: number
    createdBy: UserProfileCreateNestedOneWithoutBlogTagsInput
    posts?: BlogPostCreateNestedManyWithoutTagsInput
  }

  export type BlogTagUncheckedCreateInput = {
    id?: number
    name: string
    slug: string
    count?: number
    createdById: number
    posts?: BlogPostUncheckedCreateNestedManyWithoutTagsInput
  }

  export type BlogTagUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdBy?: UserProfileUpdateOneRequiredWithoutBlogTagsNestedInput
    posts?: BlogPostUpdateManyWithoutTagsNestedInput
  }

  export type BlogTagUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdById?: IntFieldUpdateOperationsInput | number
    posts?: BlogPostUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type BlogTagCreateManyInput = {
    id?: number
    name: string
    slug: string
    count?: number
    createdById: number
  }

  export type BlogTagUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type BlogTagUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdById?: IntFieldUpdateOperationsInput | number
  }

  export type BlogMainPageSectionsCreateInput = {
    section: string
    createdAt?: Date | string
    posts?: BlogPostCreateNestedManyWithoutSectionInput
  }

  export type BlogMainPageSectionsUncheckedCreateInput = {
    id?: number
    section: string
    createdAt?: Date | string
    posts?: BlogPostUncheckedCreateNestedManyWithoutSectionInput
  }

  export type BlogMainPageSectionsUpdateInput = {
    section?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: BlogPostUpdateManyWithoutSectionNestedInput
  }

  export type BlogMainPageSectionsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    section?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    posts?: BlogPostUncheckedUpdateManyWithoutSectionNestedInput
  }

  export type BlogMainPageSectionsCreateManyInput = {
    id?: number
    section: string
    createdAt?: Date | string
  }

  export type BlogMainPageSectionsUpdateManyMutationInput = {
    section?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogMainPageSectionsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    section?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UploadedImageCreateInput = {
    name?: string | null
    image: string
    size?: number
    contentType?: string | null
    width?: number
    height?: number
    thumbnail?: string | null
    uploadedAt?: Date | string
    status?: $Enums.UploadedImageStatus
    notificationSent?: boolean
    uploadedBy: UserProfileCreateNestedOneWithoutUploadedImagesInput
  }

  export type UploadedImageUncheckedCreateInput = {
    id?: number
    name?: string | null
    image: string
    size?: number
    contentType?: string | null
    width?: number
    height?: number
    thumbnail?: string | null
    uploadedAt?: Date | string
    status?: $Enums.UploadedImageStatus
    notificationSent?: boolean
    uploadedById: number
  }

  export type UploadedImageUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: StringFieldUpdateOperationsInput | string
    size?: FloatFieldUpdateOperationsInput | number
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumUploadedImageStatusFieldUpdateOperationsInput | $Enums.UploadedImageStatus
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    uploadedBy?: UserProfileUpdateOneRequiredWithoutUploadedImagesNestedInput
  }

  export type UploadedImageUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: StringFieldUpdateOperationsInput | string
    size?: FloatFieldUpdateOperationsInput | number
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumUploadedImageStatusFieldUpdateOperationsInput | $Enums.UploadedImageStatus
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    uploadedById?: IntFieldUpdateOperationsInput | number
  }

  export type UploadedImageCreateManyInput = {
    id?: number
    name?: string | null
    image: string
    size?: number
    contentType?: string | null
    width?: number
    height?: number
    thumbnail?: string | null
    uploadedAt?: Date | string
    status?: $Enums.UploadedImageStatus
    notificationSent?: boolean
    uploadedById: number
  }

  export type UploadedImageUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: StringFieldUpdateOperationsInput | string
    size?: FloatFieldUpdateOperationsInput | number
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumUploadedImageStatusFieldUpdateOperationsInput | $Enums.UploadedImageStatus
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UploadedImageUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: StringFieldUpdateOperationsInput | string
    size?: FloatFieldUpdateOperationsInput | number
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumUploadedImageStatusFieldUpdateOperationsInput | $Enums.UploadedImageStatus
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
    uploadedById?: IntFieldUpdateOperationsInput | number
  }

  export type BlogPostCreateInput = {
    title: string
    slug: string
    content: string
    excerpt?: string | null
    featuredImage?: string | null
    blogFeaturedImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    status?: $Enums.BlogPostStatus
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    viewCount?: number
    likeCount?: number
    isApproved?: number
    isFeatured?: number
    author: UserProfileCreateNestedOneWithoutBlogPostsInput
    category?: BlogCategoryCreateNestedOneWithoutPostsInput
    section?: BlogMainPageSectionsCreateNestedOneWithoutPostsInput
    tags?: BlogTagCreateNestedManyWithoutPostsInput
  }

  export type BlogPostUncheckedCreateInput = {
    id?: number
    title: string
    slug: string
    content: string
    excerpt?: string | null
    featuredImage?: string | null
    blogFeaturedImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    status?: $Enums.BlogPostStatus
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    viewCount?: number
    likeCount?: number
    isApproved?: number
    isFeatured?: number
    author_id: number
    category_id?: number | null
    blog_section_id?: number | null
    tags?: BlogTagUncheckedCreateNestedManyWithoutPostsInput
  }

  export type BlogPostUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    author?: UserProfileUpdateOneRequiredWithoutBlogPostsNestedInput
    category?: BlogCategoryUpdateOneWithoutPostsNestedInput
    section?: BlogMainPageSectionsUpdateOneWithoutPostsNestedInput
    tags?: BlogTagUpdateManyWithoutPostsNestedInput
  }

  export type BlogPostUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    blog_section_id?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: BlogTagUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type BlogPostCreateManyInput = {
    id?: number
    title: string
    slug: string
    content: string
    excerpt?: string | null
    featuredImage?: string | null
    blogFeaturedImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    status?: $Enums.BlogPostStatus
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    viewCount?: number
    likeCount?: number
    isApproved?: number
    isFeatured?: number
    author_id: number
    category_id?: number | null
    blog_section_id?: number | null
  }

  export type BlogPostUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
  }

  export type BlogPostUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    blog_section_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type EnumSecurityQuestionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SecurityQuestion | EnumSecurityQuestionFieldRefInput<$PrismaModel> | null
    in?: $Enums.SecurityQuestion[] | null
    notIn?: $Enums.SecurityQuestion[] | null
    not?: NestedEnumSecurityQuestionNullableFilter<$PrismaModel> | $Enums.SecurityQuestion | null
  }

  export type BlogCategoryListRelationFilter = {
    every?: BlogCategoryWhereInput
    some?: BlogCategoryWhereInput
    none?: BlogCategoryWhereInput
  }

  export type BlogTagListRelationFilter = {
    every?: BlogTagWhereInput
    some?: BlogTagWhereInput
    none?: BlogTagWhereInput
  }

  export type UploadedImageListRelationFilter = {
    every?: UploadedImageWhereInput
    some?: UploadedImageWhereInput
    none?: UploadedImageWhereInput
  }

  export type BlogPostListRelationFilter = {
    every?: BlogPostWhereInput
    some?: BlogPostWhereInput
    none?: BlogPostWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type BlogCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BlogTagOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UploadedImageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BlogPostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserProfileOrderByRelevanceInput = {
    fields: UserProfileOrderByRelevanceFieldEnum | UserProfileOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserProfileCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    isStaff?: SortOrder
    isActive?: SortOrder
    dateJoined?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    country?: SortOrder
    address1?: SortOrder
    address2?: SortOrder
    securityQuestion?: SortOrder
    securityAnswer?: SortOrder
    profileImage?: SortOrder
    phoneNumber?: SortOrder
    summery?: SortOrder
  }

  export type UserProfileAvgOrderByAggregateInput = {
    id?: SortOrder
    zipCode?: SortOrder
  }

  export type UserProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    isStaff?: SortOrder
    isActive?: SortOrder
    dateJoined?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    country?: SortOrder
    address1?: SortOrder
    address2?: SortOrder
    securityQuestion?: SortOrder
    securityAnswer?: SortOrder
    profileImage?: SortOrder
    phoneNumber?: SortOrder
    summery?: SortOrder
  }

  export type UserProfileMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    role?: SortOrder
    isStaff?: SortOrder
    isActive?: SortOrder
    dateJoined?: SortOrder
    updatedAt?: SortOrder
    isVerified?: SortOrder
    city?: SortOrder
    state?: SortOrder
    zipCode?: SortOrder
    country?: SortOrder
    address1?: SortOrder
    address2?: SortOrder
    securityQuestion?: SortOrder
    securityAnswer?: SortOrder
    profileImage?: SortOrder
    phoneNumber?: SortOrder
    summery?: SortOrder
  }

  export type UserProfileSumOrderByAggregateInput = {
    id?: SortOrder
    zipCode?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type EnumSecurityQuestionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SecurityQuestion | EnumSecurityQuestionFieldRefInput<$PrismaModel> | null
    in?: $Enums.SecurityQuestion[] | null
    notIn?: $Enums.SecurityQuestion[] | null
    not?: NestedEnumSecurityQuestionNullableWithAggregatesFilter<$PrismaModel> | $Enums.SecurityQuestion | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSecurityQuestionNullableFilter<$PrismaModel>
    _max?: NestedEnumSecurityQuestionNullableFilter<$PrismaModel>
  }

  export type UserProfileScalarRelationFilter = {
    is?: UserProfileWhereInput
    isNot?: UserProfileWhereInput
  }

  export type BlogCategoryOrderByRelevanceInput = {
    fields: BlogCategoryOrderByRelevanceFieldEnum | BlogCategoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BlogCategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    count?: SortOrder
    description?: SortOrder
    createdById?: SortOrder
  }

  export type BlogCategoryAvgOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
    createdById?: SortOrder
  }

  export type BlogCategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    count?: SortOrder
    description?: SortOrder
    createdById?: SortOrder
  }

  export type BlogCategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    count?: SortOrder
    description?: SortOrder
    createdById?: SortOrder
  }

  export type BlogCategorySumOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
    createdById?: SortOrder
  }

  export type BlogTagOrderByRelevanceInput = {
    fields: BlogTagOrderByRelevanceFieldEnum | BlogTagOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BlogTagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    count?: SortOrder
    createdById?: SortOrder
  }

  export type BlogTagAvgOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
    createdById?: SortOrder
  }

  export type BlogTagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    count?: SortOrder
    createdById?: SortOrder
  }

  export type BlogTagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    count?: SortOrder
    createdById?: SortOrder
  }

  export type BlogTagSumOrderByAggregateInput = {
    id?: SortOrder
    count?: SortOrder
    createdById?: SortOrder
  }

  export type BlogMainPageSectionsOrderByRelevanceInput = {
    fields: BlogMainPageSectionsOrderByRelevanceFieldEnum | BlogMainPageSectionsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BlogMainPageSectionsCountOrderByAggregateInput = {
    id?: SortOrder
    section?: SortOrder
    createdAt?: SortOrder
  }

  export type BlogMainPageSectionsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BlogMainPageSectionsMaxOrderByAggregateInput = {
    id?: SortOrder
    section?: SortOrder
    createdAt?: SortOrder
  }

  export type BlogMainPageSectionsMinOrderByAggregateInput = {
    id?: SortOrder
    section?: SortOrder
    createdAt?: SortOrder
  }

  export type BlogMainPageSectionsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type EnumUploadedImageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadedImageStatus | EnumUploadedImageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadedImageStatus[]
    notIn?: $Enums.UploadedImageStatus[]
    not?: NestedEnumUploadedImageStatusFilter<$PrismaModel> | $Enums.UploadedImageStatus
  }

  export type UploadedImageOrderByRelevanceInput = {
    fields: UploadedImageOrderByRelevanceFieldEnum | UploadedImageOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UploadedImageCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    size?: SortOrder
    contentType?: SortOrder
    width?: SortOrder
    height?: SortOrder
    thumbnail?: SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    notificationSent?: SortOrder
    uploadedById?: SortOrder
  }

  export type UploadedImageAvgOrderByAggregateInput = {
    id?: SortOrder
    size?: SortOrder
    width?: SortOrder
    height?: SortOrder
    uploadedById?: SortOrder
  }

  export type UploadedImageMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    size?: SortOrder
    contentType?: SortOrder
    width?: SortOrder
    height?: SortOrder
    thumbnail?: SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    notificationSent?: SortOrder
    uploadedById?: SortOrder
  }

  export type UploadedImageMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    image?: SortOrder
    size?: SortOrder
    contentType?: SortOrder
    width?: SortOrder
    height?: SortOrder
    thumbnail?: SortOrder
    uploadedAt?: SortOrder
    status?: SortOrder
    notificationSent?: SortOrder
    uploadedById?: SortOrder
  }

  export type UploadedImageSumOrderByAggregateInput = {
    id?: SortOrder
    size?: SortOrder
    width?: SortOrder
    height?: SortOrder
    uploadedById?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type EnumUploadedImageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadedImageStatus | EnumUploadedImageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadedImageStatus[]
    notIn?: $Enums.UploadedImageStatus[]
    not?: NestedEnumUploadedImageStatusWithAggregatesFilter<$PrismaModel> | $Enums.UploadedImageStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUploadedImageStatusFilter<$PrismaModel>
    _max?: NestedEnumUploadedImageStatusFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type EnumBlogPostStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogPostStatus | EnumBlogPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BlogPostStatus[]
    notIn?: $Enums.BlogPostStatus[]
    not?: NestedEnumBlogPostStatusFilter<$PrismaModel> | $Enums.BlogPostStatus
  }

  export type BlogCategoryNullableScalarRelationFilter = {
    is?: BlogCategoryWhereInput | null
    isNot?: BlogCategoryWhereInput | null
  }

  export type BlogMainPageSectionsNullableScalarRelationFilter = {
    is?: BlogMainPageSectionsWhereInput | null
    isNot?: BlogMainPageSectionsWhereInput | null
  }

  export type BlogPostOrderByRelevanceInput = {
    fields: BlogPostOrderByRelevanceFieldEnum | BlogPostOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type BlogPostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    excerpt?: SortOrder
    featuredImage?: SortOrder
    blogFeaturedImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrder
    status?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    keywords?: SortOrder
    viewCount?: SortOrder
    likeCount?: SortOrder
    isApproved?: SortOrder
    isFeatured?: SortOrder
    author_id?: SortOrder
    category_id?: SortOrder
    blog_section_id?: SortOrder
  }

  export type BlogPostAvgOrderByAggregateInput = {
    id?: SortOrder
    viewCount?: SortOrder
    likeCount?: SortOrder
    isApproved?: SortOrder
    isFeatured?: SortOrder
    author_id?: SortOrder
    category_id?: SortOrder
    blog_section_id?: SortOrder
  }

  export type BlogPostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    excerpt?: SortOrder
    featuredImage?: SortOrder
    blogFeaturedImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrder
    status?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    keywords?: SortOrder
    viewCount?: SortOrder
    likeCount?: SortOrder
    isApproved?: SortOrder
    isFeatured?: SortOrder
    author_id?: SortOrder
    category_id?: SortOrder
    blog_section_id?: SortOrder
  }

  export type BlogPostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    slug?: SortOrder
    content?: SortOrder
    excerpt?: SortOrder
    featuredImage?: SortOrder
    blogFeaturedImage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    publishedAt?: SortOrder
    status?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    keywords?: SortOrder
    viewCount?: SortOrder
    likeCount?: SortOrder
    isApproved?: SortOrder
    isFeatured?: SortOrder
    author_id?: SortOrder
    category_id?: SortOrder
    blog_section_id?: SortOrder
  }

  export type BlogPostSumOrderByAggregateInput = {
    id?: SortOrder
    viewCount?: SortOrder
    likeCount?: SortOrder
    isApproved?: SortOrder
    isFeatured?: SortOrder
    author_id?: SortOrder
    category_id?: SortOrder
    blog_section_id?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type EnumBlogPostStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogPostStatus | EnumBlogPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BlogPostStatus[]
    notIn?: $Enums.BlogPostStatus[]
    not?: NestedEnumBlogPostStatusWithAggregatesFilter<$PrismaModel> | $Enums.BlogPostStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBlogPostStatusFilter<$PrismaModel>
    _max?: NestedEnumBlogPostStatusFilter<$PrismaModel>
  }

  export type BlogCategoryCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<BlogCategoryCreateWithoutCreatedByInput, BlogCategoryUncheckedCreateWithoutCreatedByInput> | BlogCategoryCreateWithoutCreatedByInput[] | BlogCategoryUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BlogCategoryCreateOrConnectWithoutCreatedByInput | BlogCategoryCreateOrConnectWithoutCreatedByInput[]
    createMany?: BlogCategoryCreateManyCreatedByInputEnvelope
    connect?: BlogCategoryWhereUniqueInput | BlogCategoryWhereUniqueInput[]
  }

  export type BlogTagCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<BlogTagCreateWithoutCreatedByInput, BlogTagUncheckedCreateWithoutCreatedByInput> | BlogTagCreateWithoutCreatedByInput[] | BlogTagUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutCreatedByInput | BlogTagCreateOrConnectWithoutCreatedByInput[]
    createMany?: BlogTagCreateManyCreatedByInputEnvelope
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
  }

  export type UploadedImageCreateNestedManyWithoutUploadedByInput = {
    create?: XOR<UploadedImageCreateWithoutUploadedByInput, UploadedImageUncheckedCreateWithoutUploadedByInput> | UploadedImageCreateWithoutUploadedByInput[] | UploadedImageUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: UploadedImageCreateOrConnectWithoutUploadedByInput | UploadedImageCreateOrConnectWithoutUploadedByInput[]
    createMany?: UploadedImageCreateManyUploadedByInputEnvelope
    connect?: UploadedImageWhereUniqueInput | UploadedImageWhereUniqueInput[]
  }

  export type BlogPostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<BlogPostCreateWithoutAuthorInput, BlogPostUncheckedCreateWithoutAuthorInput> | BlogPostCreateWithoutAuthorInput[] | BlogPostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutAuthorInput | BlogPostCreateOrConnectWithoutAuthorInput[]
    createMany?: BlogPostCreateManyAuthorInputEnvelope
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
  }

  export type BlogCategoryUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<BlogCategoryCreateWithoutCreatedByInput, BlogCategoryUncheckedCreateWithoutCreatedByInput> | BlogCategoryCreateWithoutCreatedByInput[] | BlogCategoryUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BlogCategoryCreateOrConnectWithoutCreatedByInput | BlogCategoryCreateOrConnectWithoutCreatedByInput[]
    createMany?: BlogCategoryCreateManyCreatedByInputEnvelope
    connect?: BlogCategoryWhereUniqueInput | BlogCategoryWhereUniqueInput[]
  }

  export type BlogTagUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<BlogTagCreateWithoutCreatedByInput, BlogTagUncheckedCreateWithoutCreatedByInput> | BlogTagCreateWithoutCreatedByInput[] | BlogTagUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutCreatedByInput | BlogTagCreateOrConnectWithoutCreatedByInput[]
    createMany?: BlogTagCreateManyCreatedByInputEnvelope
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
  }

  export type UploadedImageUncheckedCreateNestedManyWithoutUploadedByInput = {
    create?: XOR<UploadedImageCreateWithoutUploadedByInput, UploadedImageUncheckedCreateWithoutUploadedByInput> | UploadedImageCreateWithoutUploadedByInput[] | UploadedImageUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: UploadedImageCreateOrConnectWithoutUploadedByInput | UploadedImageCreateOrConnectWithoutUploadedByInput[]
    createMany?: UploadedImageCreateManyUploadedByInputEnvelope
    connect?: UploadedImageWhereUniqueInput | UploadedImageWhereUniqueInput[]
  }

  export type BlogPostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<BlogPostCreateWithoutAuthorInput, BlogPostUncheckedCreateWithoutAuthorInput> | BlogPostCreateWithoutAuthorInput[] | BlogPostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutAuthorInput | BlogPostCreateOrConnectWithoutAuthorInput[]
    createMany?: BlogPostCreateManyAuthorInputEnvelope
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableEnumSecurityQuestionFieldUpdateOperationsInput = {
    set?: $Enums.SecurityQuestion | null
  }

  export type BlogCategoryUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<BlogCategoryCreateWithoutCreatedByInput, BlogCategoryUncheckedCreateWithoutCreatedByInput> | BlogCategoryCreateWithoutCreatedByInput[] | BlogCategoryUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BlogCategoryCreateOrConnectWithoutCreatedByInput | BlogCategoryCreateOrConnectWithoutCreatedByInput[]
    upsert?: BlogCategoryUpsertWithWhereUniqueWithoutCreatedByInput | BlogCategoryUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: BlogCategoryCreateManyCreatedByInputEnvelope
    set?: BlogCategoryWhereUniqueInput | BlogCategoryWhereUniqueInput[]
    disconnect?: BlogCategoryWhereUniqueInput | BlogCategoryWhereUniqueInput[]
    delete?: BlogCategoryWhereUniqueInput | BlogCategoryWhereUniqueInput[]
    connect?: BlogCategoryWhereUniqueInput | BlogCategoryWhereUniqueInput[]
    update?: BlogCategoryUpdateWithWhereUniqueWithoutCreatedByInput | BlogCategoryUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: BlogCategoryUpdateManyWithWhereWithoutCreatedByInput | BlogCategoryUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: BlogCategoryScalarWhereInput | BlogCategoryScalarWhereInput[]
  }

  export type BlogTagUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<BlogTagCreateWithoutCreatedByInput, BlogTagUncheckedCreateWithoutCreatedByInput> | BlogTagCreateWithoutCreatedByInput[] | BlogTagUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutCreatedByInput | BlogTagCreateOrConnectWithoutCreatedByInput[]
    upsert?: BlogTagUpsertWithWhereUniqueWithoutCreatedByInput | BlogTagUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: BlogTagCreateManyCreatedByInputEnvelope
    set?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    disconnect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    delete?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    update?: BlogTagUpdateWithWhereUniqueWithoutCreatedByInput | BlogTagUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: BlogTagUpdateManyWithWhereWithoutCreatedByInput | BlogTagUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: BlogTagScalarWhereInput | BlogTagScalarWhereInput[]
  }

  export type UploadedImageUpdateManyWithoutUploadedByNestedInput = {
    create?: XOR<UploadedImageCreateWithoutUploadedByInput, UploadedImageUncheckedCreateWithoutUploadedByInput> | UploadedImageCreateWithoutUploadedByInput[] | UploadedImageUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: UploadedImageCreateOrConnectWithoutUploadedByInput | UploadedImageCreateOrConnectWithoutUploadedByInput[]
    upsert?: UploadedImageUpsertWithWhereUniqueWithoutUploadedByInput | UploadedImageUpsertWithWhereUniqueWithoutUploadedByInput[]
    createMany?: UploadedImageCreateManyUploadedByInputEnvelope
    set?: UploadedImageWhereUniqueInput | UploadedImageWhereUniqueInput[]
    disconnect?: UploadedImageWhereUniqueInput | UploadedImageWhereUniqueInput[]
    delete?: UploadedImageWhereUniqueInput | UploadedImageWhereUniqueInput[]
    connect?: UploadedImageWhereUniqueInput | UploadedImageWhereUniqueInput[]
    update?: UploadedImageUpdateWithWhereUniqueWithoutUploadedByInput | UploadedImageUpdateWithWhereUniqueWithoutUploadedByInput[]
    updateMany?: UploadedImageUpdateManyWithWhereWithoutUploadedByInput | UploadedImageUpdateManyWithWhereWithoutUploadedByInput[]
    deleteMany?: UploadedImageScalarWhereInput | UploadedImageScalarWhereInput[]
  }

  export type BlogPostUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<BlogPostCreateWithoutAuthorInput, BlogPostUncheckedCreateWithoutAuthorInput> | BlogPostCreateWithoutAuthorInput[] | BlogPostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutAuthorInput | BlogPostCreateOrConnectWithoutAuthorInput[]
    upsert?: BlogPostUpsertWithWhereUniqueWithoutAuthorInput | BlogPostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: BlogPostCreateManyAuthorInputEnvelope
    set?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    disconnect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    delete?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    update?: BlogPostUpdateWithWhereUniqueWithoutAuthorInput | BlogPostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: BlogPostUpdateManyWithWhereWithoutAuthorInput | BlogPostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: BlogPostScalarWhereInput | BlogPostScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BlogCategoryUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<BlogCategoryCreateWithoutCreatedByInput, BlogCategoryUncheckedCreateWithoutCreatedByInput> | BlogCategoryCreateWithoutCreatedByInput[] | BlogCategoryUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BlogCategoryCreateOrConnectWithoutCreatedByInput | BlogCategoryCreateOrConnectWithoutCreatedByInput[]
    upsert?: BlogCategoryUpsertWithWhereUniqueWithoutCreatedByInput | BlogCategoryUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: BlogCategoryCreateManyCreatedByInputEnvelope
    set?: BlogCategoryWhereUniqueInput | BlogCategoryWhereUniqueInput[]
    disconnect?: BlogCategoryWhereUniqueInput | BlogCategoryWhereUniqueInput[]
    delete?: BlogCategoryWhereUniqueInput | BlogCategoryWhereUniqueInput[]
    connect?: BlogCategoryWhereUniqueInput | BlogCategoryWhereUniqueInput[]
    update?: BlogCategoryUpdateWithWhereUniqueWithoutCreatedByInput | BlogCategoryUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: BlogCategoryUpdateManyWithWhereWithoutCreatedByInput | BlogCategoryUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: BlogCategoryScalarWhereInput | BlogCategoryScalarWhereInput[]
  }

  export type BlogTagUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<BlogTagCreateWithoutCreatedByInput, BlogTagUncheckedCreateWithoutCreatedByInput> | BlogTagCreateWithoutCreatedByInput[] | BlogTagUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutCreatedByInput | BlogTagCreateOrConnectWithoutCreatedByInput[]
    upsert?: BlogTagUpsertWithWhereUniqueWithoutCreatedByInput | BlogTagUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: BlogTagCreateManyCreatedByInputEnvelope
    set?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    disconnect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    delete?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    update?: BlogTagUpdateWithWhereUniqueWithoutCreatedByInput | BlogTagUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: BlogTagUpdateManyWithWhereWithoutCreatedByInput | BlogTagUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: BlogTagScalarWhereInput | BlogTagScalarWhereInput[]
  }

  export type UploadedImageUncheckedUpdateManyWithoutUploadedByNestedInput = {
    create?: XOR<UploadedImageCreateWithoutUploadedByInput, UploadedImageUncheckedCreateWithoutUploadedByInput> | UploadedImageCreateWithoutUploadedByInput[] | UploadedImageUncheckedCreateWithoutUploadedByInput[]
    connectOrCreate?: UploadedImageCreateOrConnectWithoutUploadedByInput | UploadedImageCreateOrConnectWithoutUploadedByInput[]
    upsert?: UploadedImageUpsertWithWhereUniqueWithoutUploadedByInput | UploadedImageUpsertWithWhereUniqueWithoutUploadedByInput[]
    createMany?: UploadedImageCreateManyUploadedByInputEnvelope
    set?: UploadedImageWhereUniqueInput | UploadedImageWhereUniqueInput[]
    disconnect?: UploadedImageWhereUniqueInput | UploadedImageWhereUniqueInput[]
    delete?: UploadedImageWhereUniqueInput | UploadedImageWhereUniqueInput[]
    connect?: UploadedImageWhereUniqueInput | UploadedImageWhereUniqueInput[]
    update?: UploadedImageUpdateWithWhereUniqueWithoutUploadedByInput | UploadedImageUpdateWithWhereUniqueWithoutUploadedByInput[]
    updateMany?: UploadedImageUpdateManyWithWhereWithoutUploadedByInput | UploadedImageUpdateManyWithWhereWithoutUploadedByInput[]
    deleteMany?: UploadedImageScalarWhereInput | UploadedImageScalarWhereInput[]
  }

  export type BlogPostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<BlogPostCreateWithoutAuthorInput, BlogPostUncheckedCreateWithoutAuthorInput> | BlogPostCreateWithoutAuthorInput[] | BlogPostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutAuthorInput | BlogPostCreateOrConnectWithoutAuthorInput[]
    upsert?: BlogPostUpsertWithWhereUniqueWithoutAuthorInput | BlogPostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: BlogPostCreateManyAuthorInputEnvelope
    set?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    disconnect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    delete?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    update?: BlogPostUpdateWithWhereUniqueWithoutAuthorInput | BlogPostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: BlogPostUpdateManyWithWhereWithoutAuthorInput | BlogPostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: BlogPostScalarWhereInput | BlogPostScalarWhereInput[]
  }

  export type UserProfileCreateNestedOneWithoutBlogCategoriesInput = {
    create?: XOR<UserProfileCreateWithoutBlogCategoriesInput, UserProfileUncheckedCreateWithoutBlogCategoriesInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutBlogCategoriesInput
    connect?: UserProfileWhereUniqueInput
  }

  export type BlogPostCreateNestedManyWithoutCategoryInput = {
    create?: XOR<BlogPostCreateWithoutCategoryInput, BlogPostUncheckedCreateWithoutCategoryInput> | BlogPostCreateWithoutCategoryInput[] | BlogPostUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutCategoryInput | BlogPostCreateOrConnectWithoutCategoryInput[]
    createMany?: BlogPostCreateManyCategoryInputEnvelope
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
  }

  export type BlogPostUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<BlogPostCreateWithoutCategoryInput, BlogPostUncheckedCreateWithoutCategoryInput> | BlogPostCreateWithoutCategoryInput[] | BlogPostUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutCategoryInput | BlogPostCreateOrConnectWithoutCategoryInput[]
    createMany?: BlogPostCreateManyCategoryInputEnvelope
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
  }

  export type UserProfileUpdateOneRequiredWithoutBlogCategoriesNestedInput = {
    create?: XOR<UserProfileCreateWithoutBlogCategoriesInput, UserProfileUncheckedCreateWithoutBlogCategoriesInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutBlogCategoriesInput
    upsert?: UserProfileUpsertWithoutBlogCategoriesInput
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutBlogCategoriesInput, UserProfileUpdateWithoutBlogCategoriesInput>, UserProfileUncheckedUpdateWithoutBlogCategoriesInput>
  }

  export type BlogPostUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<BlogPostCreateWithoutCategoryInput, BlogPostUncheckedCreateWithoutCategoryInput> | BlogPostCreateWithoutCategoryInput[] | BlogPostUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutCategoryInput | BlogPostCreateOrConnectWithoutCategoryInput[]
    upsert?: BlogPostUpsertWithWhereUniqueWithoutCategoryInput | BlogPostUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: BlogPostCreateManyCategoryInputEnvelope
    set?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    disconnect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    delete?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    update?: BlogPostUpdateWithWhereUniqueWithoutCategoryInput | BlogPostUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: BlogPostUpdateManyWithWhereWithoutCategoryInput | BlogPostUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: BlogPostScalarWhereInput | BlogPostScalarWhereInput[]
  }

  export type BlogPostUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<BlogPostCreateWithoutCategoryInput, BlogPostUncheckedCreateWithoutCategoryInput> | BlogPostCreateWithoutCategoryInput[] | BlogPostUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutCategoryInput | BlogPostCreateOrConnectWithoutCategoryInput[]
    upsert?: BlogPostUpsertWithWhereUniqueWithoutCategoryInput | BlogPostUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: BlogPostCreateManyCategoryInputEnvelope
    set?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    disconnect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    delete?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    update?: BlogPostUpdateWithWhereUniqueWithoutCategoryInput | BlogPostUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: BlogPostUpdateManyWithWhereWithoutCategoryInput | BlogPostUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: BlogPostScalarWhereInput | BlogPostScalarWhereInput[]
  }

  export type UserProfileCreateNestedOneWithoutBlogTagsInput = {
    create?: XOR<UserProfileCreateWithoutBlogTagsInput, UserProfileUncheckedCreateWithoutBlogTagsInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutBlogTagsInput
    connect?: UserProfileWhereUniqueInput
  }

  export type BlogPostCreateNestedManyWithoutTagsInput = {
    create?: XOR<BlogPostCreateWithoutTagsInput, BlogPostUncheckedCreateWithoutTagsInput> | BlogPostCreateWithoutTagsInput[] | BlogPostUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutTagsInput | BlogPostCreateOrConnectWithoutTagsInput[]
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
  }

  export type BlogPostUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<BlogPostCreateWithoutTagsInput, BlogPostUncheckedCreateWithoutTagsInput> | BlogPostCreateWithoutTagsInput[] | BlogPostUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutTagsInput | BlogPostCreateOrConnectWithoutTagsInput[]
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
  }

  export type UserProfileUpdateOneRequiredWithoutBlogTagsNestedInput = {
    create?: XOR<UserProfileCreateWithoutBlogTagsInput, UserProfileUncheckedCreateWithoutBlogTagsInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutBlogTagsInput
    upsert?: UserProfileUpsertWithoutBlogTagsInput
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutBlogTagsInput, UserProfileUpdateWithoutBlogTagsInput>, UserProfileUncheckedUpdateWithoutBlogTagsInput>
  }

  export type BlogPostUpdateManyWithoutTagsNestedInput = {
    create?: XOR<BlogPostCreateWithoutTagsInput, BlogPostUncheckedCreateWithoutTagsInput> | BlogPostCreateWithoutTagsInput[] | BlogPostUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutTagsInput | BlogPostCreateOrConnectWithoutTagsInput[]
    upsert?: BlogPostUpsertWithWhereUniqueWithoutTagsInput | BlogPostUpsertWithWhereUniqueWithoutTagsInput[]
    set?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    disconnect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    delete?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    update?: BlogPostUpdateWithWhereUniqueWithoutTagsInput | BlogPostUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: BlogPostUpdateManyWithWhereWithoutTagsInput | BlogPostUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: BlogPostScalarWhereInput | BlogPostScalarWhereInput[]
  }

  export type BlogPostUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<BlogPostCreateWithoutTagsInput, BlogPostUncheckedCreateWithoutTagsInput> | BlogPostCreateWithoutTagsInput[] | BlogPostUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutTagsInput | BlogPostCreateOrConnectWithoutTagsInput[]
    upsert?: BlogPostUpsertWithWhereUniqueWithoutTagsInput | BlogPostUpsertWithWhereUniqueWithoutTagsInput[]
    set?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    disconnect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    delete?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    update?: BlogPostUpdateWithWhereUniqueWithoutTagsInput | BlogPostUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: BlogPostUpdateManyWithWhereWithoutTagsInput | BlogPostUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: BlogPostScalarWhereInput | BlogPostScalarWhereInput[]
  }

  export type BlogPostCreateNestedManyWithoutSectionInput = {
    create?: XOR<BlogPostCreateWithoutSectionInput, BlogPostUncheckedCreateWithoutSectionInput> | BlogPostCreateWithoutSectionInput[] | BlogPostUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutSectionInput | BlogPostCreateOrConnectWithoutSectionInput[]
    createMany?: BlogPostCreateManySectionInputEnvelope
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
  }

  export type BlogPostUncheckedCreateNestedManyWithoutSectionInput = {
    create?: XOR<BlogPostCreateWithoutSectionInput, BlogPostUncheckedCreateWithoutSectionInput> | BlogPostCreateWithoutSectionInput[] | BlogPostUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutSectionInput | BlogPostCreateOrConnectWithoutSectionInput[]
    createMany?: BlogPostCreateManySectionInputEnvelope
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
  }

  export type BlogPostUpdateManyWithoutSectionNestedInput = {
    create?: XOR<BlogPostCreateWithoutSectionInput, BlogPostUncheckedCreateWithoutSectionInput> | BlogPostCreateWithoutSectionInput[] | BlogPostUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutSectionInput | BlogPostCreateOrConnectWithoutSectionInput[]
    upsert?: BlogPostUpsertWithWhereUniqueWithoutSectionInput | BlogPostUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: BlogPostCreateManySectionInputEnvelope
    set?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    disconnect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    delete?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    update?: BlogPostUpdateWithWhereUniqueWithoutSectionInput | BlogPostUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: BlogPostUpdateManyWithWhereWithoutSectionInput | BlogPostUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: BlogPostScalarWhereInput | BlogPostScalarWhereInput[]
  }

  export type BlogPostUncheckedUpdateManyWithoutSectionNestedInput = {
    create?: XOR<BlogPostCreateWithoutSectionInput, BlogPostUncheckedCreateWithoutSectionInput> | BlogPostCreateWithoutSectionInput[] | BlogPostUncheckedCreateWithoutSectionInput[]
    connectOrCreate?: BlogPostCreateOrConnectWithoutSectionInput | BlogPostCreateOrConnectWithoutSectionInput[]
    upsert?: BlogPostUpsertWithWhereUniqueWithoutSectionInput | BlogPostUpsertWithWhereUniqueWithoutSectionInput[]
    createMany?: BlogPostCreateManySectionInputEnvelope
    set?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    disconnect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    delete?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    connect?: BlogPostWhereUniqueInput | BlogPostWhereUniqueInput[]
    update?: BlogPostUpdateWithWhereUniqueWithoutSectionInput | BlogPostUpdateWithWhereUniqueWithoutSectionInput[]
    updateMany?: BlogPostUpdateManyWithWhereWithoutSectionInput | BlogPostUpdateManyWithWhereWithoutSectionInput[]
    deleteMany?: BlogPostScalarWhereInput | BlogPostScalarWhereInput[]
  }

  export type UserProfileCreateNestedOneWithoutUploadedImagesInput = {
    create?: XOR<UserProfileCreateWithoutUploadedImagesInput, UserProfileUncheckedCreateWithoutUploadedImagesInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUploadedImagesInput
    connect?: UserProfileWhereUniqueInput
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type EnumUploadedImageStatusFieldUpdateOperationsInput = {
    set?: $Enums.UploadedImageStatus
  }

  export type UserProfileUpdateOneRequiredWithoutUploadedImagesNestedInput = {
    create?: XOR<UserProfileCreateWithoutUploadedImagesInput, UserProfileUncheckedCreateWithoutUploadedImagesInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUploadedImagesInput
    upsert?: UserProfileUpsertWithoutUploadedImagesInput
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutUploadedImagesInput, UserProfileUpdateWithoutUploadedImagesInput>, UserProfileUncheckedUpdateWithoutUploadedImagesInput>
  }

  export type UserProfileCreateNestedOneWithoutBlogPostsInput = {
    create?: XOR<UserProfileCreateWithoutBlogPostsInput, UserProfileUncheckedCreateWithoutBlogPostsInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutBlogPostsInput
    connect?: UserProfileWhereUniqueInput
  }

  export type BlogCategoryCreateNestedOneWithoutPostsInput = {
    create?: XOR<BlogCategoryCreateWithoutPostsInput, BlogCategoryUncheckedCreateWithoutPostsInput>
    connectOrCreate?: BlogCategoryCreateOrConnectWithoutPostsInput
    connect?: BlogCategoryWhereUniqueInput
  }

  export type BlogMainPageSectionsCreateNestedOneWithoutPostsInput = {
    create?: XOR<BlogMainPageSectionsCreateWithoutPostsInput, BlogMainPageSectionsUncheckedCreateWithoutPostsInput>
    connectOrCreate?: BlogMainPageSectionsCreateOrConnectWithoutPostsInput
    connect?: BlogMainPageSectionsWhereUniqueInput
  }

  export type BlogTagCreateNestedManyWithoutPostsInput = {
    create?: XOR<BlogTagCreateWithoutPostsInput, BlogTagUncheckedCreateWithoutPostsInput> | BlogTagCreateWithoutPostsInput[] | BlogTagUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutPostsInput | BlogTagCreateOrConnectWithoutPostsInput[]
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
  }

  export type BlogTagUncheckedCreateNestedManyWithoutPostsInput = {
    create?: XOR<BlogTagCreateWithoutPostsInput, BlogTagUncheckedCreateWithoutPostsInput> | BlogTagCreateWithoutPostsInput[] | BlogTagUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutPostsInput | BlogTagCreateOrConnectWithoutPostsInput[]
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type EnumBlogPostStatusFieldUpdateOperationsInput = {
    set?: $Enums.BlogPostStatus
  }

  export type UserProfileUpdateOneRequiredWithoutBlogPostsNestedInput = {
    create?: XOR<UserProfileCreateWithoutBlogPostsInput, UserProfileUncheckedCreateWithoutBlogPostsInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutBlogPostsInput
    upsert?: UserProfileUpsertWithoutBlogPostsInput
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutBlogPostsInput, UserProfileUpdateWithoutBlogPostsInput>, UserProfileUncheckedUpdateWithoutBlogPostsInput>
  }

  export type BlogCategoryUpdateOneWithoutPostsNestedInput = {
    create?: XOR<BlogCategoryCreateWithoutPostsInput, BlogCategoryUncheckedCreateWithoutPostsInput>
    connectOrCreate?: BlogCategoryCreateOrConnectWithoutPostsInput
    upsert?: BlogCategoryUpsertWithoutPostsInput
    disconnect?: BlogCategoryWhereInput | boolean
    delete?: BlogCategoryWhereInput | boolean
    connect?: BlogCategoryWhereUniqueInput
    update?: XOR<XOR<BlogCategoryUpdateToOneWithWhereWithoutPostsInput, BlogCategoryUpdateWithoutPostsInput>, BlogCategoryUncheckedUpdateWithoutPostsInput>
  }

  export type BlogMainPageSectionsUpdateOneWithoutPostsNestedInput = {
    create?: XOR<BlogMainPageSectionsCreateWithoutPostsInput, BlogMainPageSectionsUncheckedCreateWithoutPostsInput>
    connectOrCreate?: BlogMainPageSectionsCreateOrConnectWithoutPostsInput
    upsert?: BlogMainPageSectionsUpsertWithoutPostsInput
    disconnect?: BlogMainPageSectionsWhereInput | boolean
    delete?: BlogMainPageSectionsWhereInput | boolean
    connect?: BlogMainPageSectionsWhereUniqueInput
    update?: XOR<XOR<BlogMainPageSectionsUpdateToOneWithWhereWithoutPostsInput, BlogMainPageSectionsUpdateWithoutPostsInput>, BlogMainPageSectionsUncheckedUpdateWithoutPostsInput>
  }

  export type BlogTagUpdateManyWithoutPostsNestedInput = {
    create?: XOR<BlogTagCreateWithoutPostsInput, BlogTagUncheckedCreateWithoutPostsInput> | BlogTagCreateWithoutPostsInput[] | BlogTagUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutPostsInput | BlogTagCreateOrConnectWithoutPostsInput[]
    upsert?: BlogTagUpsertWithWhereUniqueWithoutPostsInput | BlogTagUpsertWithWhereUniqueWithoutPostsInput[]
    set?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    disconnect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    delete?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    update?: BlogTagUpdateWithWhereUniqueWithoutPostsInput | BlogTagUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: BlogTagUpdateManyWithWhereWithoutPostsInput | BlogTagUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: BlogTagScalarWhereInput | BlogTagScalarWhereInput[]
  }

  export type BlogTagUncheckedUpdateManyWithoutPostsNestedInput = {
    create?: XOR<BlogTagCreateWithoutPostsInput, BlogTagUncheckedCreateWithoutPostsInput> | BlogTagCreateWithoutPostsInput[] | BlogTagUncheckedCreateWithoutPostsInput[]
    connectOrCreate?: BlogTagCreateOrConnectWithoutPostsInput | BlogTagCreateOrConnectWithoutPostsInput[]
    upsert?: BlogTagUpsertWithWhereUniqueWithoutPostsInput | BlogTagUpsertWithWhereUniqueWithoutPostsInput[]
    set?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    disconnect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    delete?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    connect?: BlogTagWhereUniqueInput | BlogTagWhereUniqueInput[]
    update?: BlogTagUpdateWithWhereUniqueWithoutPostsInput | BlogTagUpdateWithWhereUniqueWithoutPostsInput[]
    updateMany?: BlogTagUpdateManyWithWhereWithoutPostsInput | BlogTagUpdateManyWithWhereWithoutPostsInput[]
    deleteMany?: BlogTagScalarWhereInput | BlogTagScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSecurityQuestionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.SecurityQuestion | EnumSecurityQuestionFieldRefInput<$PrismaModel> | null
    in?: $Enums.SecurityQuestion[] | null
    notIn?: $Enums.SecurityQuestion[] | null
    not?: NestedEnumSecurityQuestionNullableFilter<$PrismaModel> | $Enums.SecurityQuestion | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
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
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[]
    notIn?: $Enums.Role[]
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumSecurityQuestionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SecurityQuestion | EnumSecurityQuestionFieldRefInput<$PrismaModel> | null
    in?: $Enums.SecurityQuestion[] | null
    notIn?: $Enums.SecurityQuestion[] | null
    not?: NestedEnumSecurityQuestionNullableWithAggregatesFilter<$PrismaModel> | $Enums.SecurityQuestion | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumSecurityQuestionNullableFilter<$PrismaModel>
    _max?: NestedEnumSecurityQuestionNullableFilter<$PrismaModel>
  }

  export type NestedEnumUploadedImageStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadedImageStatus | EnumUploadedImageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadedImageStatus[]
    notIn?: $Enums.UploadedImageStatus[]
    not?: NestedEnumUploadedImageStatusFilter<$PrismaModel> | $Enums.UploadedImageStatus
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedEnumUploadedImageStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UploadedImageStatus | EnumUploadedImageStatusFieldRefInput<$PrismaModel>
    in?: $Enums.UploadedImageStatus[]
    notIn?: $Enums.UploadedImageStatus[]
    not?: NestedEnumUploadedImageStatusWithAggregatesFilter<$PrismaModel> | $Enums.UploadedImageStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumUploadedImageStatusFilter<$PrismaModel>
    _max?: NestedEnumUploadedImageStatusFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumBlogPostStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogPostStatus | EnumBlogPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BlogPostStatus[]
    notIn?: $Enums.BlogPostStatus[]
    not?: NestedEnumBlogPostStatusFilter<$PrismaModel> | $Enums.BlogPostStatus
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedEnumBlogPostStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlogPostStatus | EnumBlogPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.BlogPostStatus[]
    notIn?: $Enums.BlogPostStatus[]
    not?: NestedEnumBlogPostStatusWithAggregatesFilter<$PrismaModel> | $Enums.BlogPostStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBlogPostStatusFilter<$PrismaModel>
    _max?: NestedEnumBlogPostStatusFilter<$PrismaModel>
  }

  export type BlogCategoryCreateWithoutCreatedByInput = {
    name: string
    slug: string
    count?: number
    description?: string | null
    posts?: BlogPostCreateNestedManyWithoutCategoryInput
  }

  export type BlogCategoryUncheckedCreateWithoutCreatedByInput = {
    id?: number
    name: string
    slug: string
    count?: number
    description?: string | null
    posts?: BlogPostUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type BlogCategoryCreateOrConnectWithoutCreatedByInput = {
    where: BlogCategoryWhereUniqueInput
    create: XOR<BlogCategoryCreateWithoutCreatedByInput, BlogCategoryUncheckedCreateWithoutCreatedByInput>
  }

  export type BlogCategoryCreateManyCreatedByInputEnvelope = {
    data: BlogCategoryCreateManyCreatedByInput | BlogCategoryCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type BlogTagCreateWithoutCreatedByInput = {
    name: string
    slug: string
    count?: number
    posts?: BlogPostCreateNestedManyWithoutTagsInput
  }

  export type BlogTagUncheckedCreateWithoutCreatedByInput = {
    id?: number
    name: string
    slug: string
    count?: number
    posts?: BlogPostUncheckedCreateNestedManyWithoutTagsInput
  }

  export type BlogTagCreateOrConnectWithoutCreatedByInput = {
    where: BlogTagWhereUniqueInput
    create: XOR<BlogTagCreateWithoutCreatedByInput, BlogTagUncheckedCreateWithoutCreatedByInput>
  }

  export type BlogTagCreateManyCreatedByInputEnvelope = {
    data: BlogTagCreateManyCreatedByInput | BlogTagCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type UploadedImageCreateWithoutUploadedByInput = {
    name?: string | null
    image: string
    size?: number
    contentType?: string | null
    width?: number
    height?: number
    thumbnail?: string | null
    uploadedAt?: Date | string
    status?: $Enums.UploadedImageStatus
    notificationSent?: boolean
  }

  export type UploadedImageUncheckedCreateWithoutUploadedByInput = {
    id?: number
    name?: string | null
    image: string
    size?: number
    contentType?: string | null
    width?: number
    height?: number
    thumbnail?: string | null
    uploadedAt?: Date | string
    status?: $Enums.UploadedImageStatus
    notificationSent?: boolean
  }

  export type UploadedImageCreateOrConnectWithoutUploadedByInput = {
    where: UploadedImageWhereUniqueInput
    create: XOR<UploadedImageCreateWithoutUploadedByInput, UploadedImageUncheckedCreateWithoutUploadedByInput>
  }

  export type UploadedImageCreateManyUploadedByInputEnvelope = {
    data: UploadedImageCreateManyUploadedByInput | UploadedImageCreateManyUploadedByInput[]
    skipDuplicates?: boolean
  }

  export type BlogPostCreateWithoutAuthorInput = {
    title: string
    slug: string
    content: string
    excerpt?: string | null
    featuredImage?: string | null
    blogFeaturedImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    status?: $Enums.BlogPostStatus
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    viewCount?: number
    likeCount?: number
    isApproved?: number
    isFeatured?: number
    category?: BlogCategoryCreateNestedOneWithoutPostsInput
    section?: BlogMainPageSectionsCreateNestedOneWithoutPostsInput
    tags?: BlogTagCreateNestedManyWithoutPostsInput
  }

  export type BlogPostUncheckedCreateWithoutAuthorInput = {
    id?: number
    title: string
    slug: string
    content: string
    excerpt?: string | null
    featuredImage?: string | null
    blogFeaturedImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    status?: $Enums.BlogPostStatus
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    viewCount?: number
    likeCount?: number
    isApproved?: number
    isFeatured?: number
    category_id?: number | null
    blog_section_id?: number | null
    tags?: BlogTagUncheckedCreateNestedManyWithoutPostsInput
  }

  export type BlogPostCreateOrConnectWithoutAuthorInput = {
    where: BlogPostWhereUniqueInput
    create: XOR<BlogPostCreateWithoutAuthorInput, BlogPostUncheckedCreateWithoutAuthorInput>
  }

  export type BlogPostCreateManyAuthorInputEnvelope = {
    data: BlogPostCreateManyAuthorInput | BlogPostCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type BlogCategoryUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: BlogCategoryWhereUniqueInput
    update: XOR<BlogCategoryUpdateWithoutCreatedByInput, BlogCategoryUncheckedUpdateWithoutCreatedByInput>
    create: XOR<BlogCategoryCreateWithoutCreatedByInput, BlogCategoryUncheckedCreateWithoutCreatedByInput>
  }

  export type BlogCategoryUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: BlogCategoryWhereUniqueInput
    data: XOR<BlogCategoryUpdateWithoutCreatedByInput, BlogCategoryUncheckedUpdateWithoutCreatedByInput>
  }

  export type BlogCategoryUpdateManyWithWhereWithoutCreatedByInput = {
    where: BlogCategoryScalarWhereInput
    data: XOR<BlogCategoryUpdateManyMutationInput, BlogCategoryUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type BlogCategoryScalarWhereInput = {
    AND?: BlogCategoryScalarWhereInput | BlogCategoryScalarWhereInput[]
    OR?: BlogCategoryScalarWhereInput[]
    NOT?: BlogCategoryScalarWhereInput | BlogCategoryScalarWhereInput[]
    id?: IntFilter<"BlogCategory"> | number
    name?: StringFilter<"BlogCategory"> | string
    slug?: StringFilter<"BlogCategory"> | string
    count?: IntFilter<"BlogCategory"> | number
    description?: StringNullableFilter<"BlogCategory"> | string | null
    createdById?: IntFilter<"BlogCategory"> | number
  }

  export type BlogTagUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: BlogTagWhereUniqueInput
    update: XOR<BlogTagUpdateWithoutCreatedByInput, BlogTagUncheckedUpdateWithoutCreatedByInput>
    create: XOR<BlogTagCreateWithoutCreatedByInput, BlogTagUncheckedCreateWithoutCreatedByInput>
  }

  export type BlogTagUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: BlogTagWhereUniqueInput
    data: XOR<BlogTagUpdateWithoutCreatedByInput, BlogTagUncheckedUpdateWithoutCreatedByInput>
  }

  export type BlogTagUpdateManyWithWhereWithoutCreatedByInput = {
    where: BlogTagScalarWhereInput
    data: XOR<BlogTagUpdateManyMutationInput, BlogTagUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type BlogTagScalarWhereInput = {
    AND?: BlogTagScalarWhereInput | BlogTagScalarWhereInput[]
    OR?: BlogTagScalarWhereInput[]
    NOT?: BlogTagScalarWhereInput | BlogTagScalarWhereInput[]
    id?: IntFilter<"BlogTag"> | number
    name?: StringFilter<"BlogTag"> | string
    slug?: StringFilter<"BlogTag"> | string
    count?: IntFilter<"BlogTag"> | number
    createdById?: IntFilter<"BlogTag"> | number
  }

  export type UploadedImageUpsertWithWhereUniqueWithoutUploadedByInput = {
    where: UploadedImageWhereUniqueInput
    update: XOR<UploadedImageUpdateWithoutUploadedByInput, UploadedImageUncheckedUpdateWithoutUploadedByInput>
    create: XOR<UploadedImageCreateWithoutUploadedByInput, UploadedImageUncheckedCreateWithoutUploadedByInput>
  }

  export type UploadedImageUpdateWithWhereUniqueWithoutUploadedByInput = {
    where: UploadedImageWhereUniqueInput
    data: XOR<UploadedImageUpdateWithoutUploadedByInput, UploadedImageUncheckedUpdateWithoutUploadedByInput>
  }

  export type UploadedImageUpdateManyWithWhereWithoutUploadedByInput = {
    where: UploadedImageScalarWhereInput
    data: XOR<UploadedImageUpdateManyMutationInput, UploadedImageUncheckedUpdateManyWithoutUploadedByInput>
  }

  export type UploadedImageScalarWhereInput = {
    AND?: UploadedImageScalarWhereInput | UploadedImageScalarWhereInput[]
    OR?: UploadedImageScalarWhereInput[]
    NOT?: UploadedImageScalarWhereInput | UploadedImageScalarWhereInput[]
    id?: IntFilter<"UploadedImage"> | number
    name?: StringNullableFilter<"UploadedImage"> | string | null
    image?: StringFilter<"UploadedImage"> | string
    size?: FloatFilter<"UploadedImage"> | number
    contentType?: StringNullableFilter<"UploadedImage"> | string | null
    width?: IntFilter<"UploadedImage"> | number
    height?: IntFilter<"UploadedImage"> | number
    thumbnail?: StringNullableFilter<"UploadedImage"> | string | null
    uploadedAt?: DateTimeFilter<"UploadedImage"> | Date | string
    status?: EnumUploadedImageStatusFilter<"UploadedImage"> | $Enums.UploadedImageStatus
    notificationSent?: BoolFilter<"UploadedImage"> | boolean
    uploadedById?: IntFilter<"UploadedImage"> | number
  }

  export type BlogPostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: BlogPostWhereUniqueInput
    update: XOR<BlogPostUpdateWithoutAuthorInput, BlogPostUncheckedUpdateWithoutAuthorInput>
    create: XOR<BlogPostCreateWithoutAuthorInput, BlogPostUncheckedCreateWithoutAuthorInput>
  }

  export type BlogPostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: BlogPostWhereUniqueInput
    data: XOR<BlogPostUpdateWithoutAuthorInput, BlogPostUncheckedUpdateWithoutAuthorInput>
  }

  export type BlogPostUpdateManyWithWhereWithoutAuthorInput = {
    where: BlogPostScalarWhereInput
    data: XOR<BlogPostUpdateManyMutationInput, BlogPostUncheckedUpdateManyWithoutAuthorInput>
  }

  export type BlogPostScalarWhereInput = {
    AND?: BlogPostScalarWhereInput | BlogPostScalarWhereInput[]
    OR?: BlogPostScalarWhereInput[]
    NOT?: BlogPostScalarWhereInput | BlogPostScalarWhereInput[]
    id?: IntFilter<"BlogPost"> | number
    title?: StringFilter<"BlogPost"> | string
    slug?: StringFilter<"BlogPost"> | string
    content?: StringFilter<"BlogPost"> | string
    excerpt?: StringNullableFilter<"BlogPost"> | string | null
    featuredImage?: StringNullableFilter<"BlogPost"> | string | null
    blogFeaturedImage?: StringNullableFilter<"BlogPost"> | string | null
    createdAt?: DateTimeFilter<"BlogPost"> | Date | string
    updatedAt?: DateTimeFilter<"BlogPost"> | Date | string
    publishedAt?: DateTimeNullableFilter<"BlogPost"> | Date | string | null
    status?: EnumBlogPostStatusFilter<"BlogPost"> | $Enums.BlogPostStatus
    metaTitle?: StringNullableFilter<"BlogPost"> | string | null
    metaDescription?: StringNullableFilter<"BlogPost"> | string | null
    keywords?: StringNullableFilter<"BlogPost"> | string | null
    viewCount?: IntFilter<"BlogPost"> | number
    likeCount?: IntFilter<"BlogPost"> | number
    isApproved?: IntFilter<"BlogPost"> | number
    isFeatured?: IntFilter<"BlogPost"> | number
    author_id?: IntFilter<"BlogPost"> | number
    category_id?: IntNullableFilter<"BlogPost"> | number | null
    blog_section_id?: IntNullableFilter<"BlogPost"> | number | null
  }

  export type UserProfileCreateWithoutBlogCategoriesInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
    isStaff?: boolean
    isActive?: boolean
    dateJoined?: Date | string
    updatedAt?: Date | string
    isVerified?: boolean
    city?: string | null
    state?: string | null
    zipCode?: number | null
    country?: string | null
    address1?: string | null
    address2?: string | null
    securityQuestion?: $Enums.SecurityQuestion | null
    securityAnswer?: string | null
    profileImage?: string | null
    phoneNumber?: string | null
    summery?: string | null
    blogTags?: BlogTagCreateNestedManyWithoutCreatedByInput
    uploadedImages?: UploadedImageCreateNestedManyWithoutUploadedByInput
    blogPosts?: BlogPostCreateNestedManyWithoutAuthorInput
  }

  export type UserProfileUncheckedCreateWithoutBlogCategoriesInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
    isStaff?: boolean
    isActive?: boolean
    dateJoined?: Date | string
    updatedAt?: Date | string
    isVerified?: boolean
    city?: string | null
    state?: string | null
    zipCode?: number | null
    country?: string | null
    address1?: string | null
    address2?: string | null
    securityQuestion?: $Enums.SecurityQuestion | null
    securityAnswer?: string | null
    profileImage?: string | null
    phoneNumber?: string | null
    summery?: string | null
    blogTags?: BlogTagUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedImages?: UploadedImageUncheckedCreateNestedManyWithoutUploadedByInput
    blogPosts?: BlogPostUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserProfileCreateOrConnectWithoutBlogCategoriesInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutBlogCategoriesInput, UserProfileUncheckedCreateWithoutBlogCategoriesInput>
  }

  export type BlogPostCreateWithoutCategoryInput = {
    title: string
    slug: string
    content: string
    excerpt?: string | null
    featuredImage?: string | null
    blogFeaturedImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    status?: $Enums.BlogPostStatus
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    viewCount?: number
    likeCount?: number
    isApproved?: number
    isFeatured?: number
    author: UserProfileCreateNestedOneWithoutBlogPostsInput
    section?: BlogMainPageSectionsCreateNestedOneWithoutPostsInput
    tags?: BlogTagCreateNestedManyWithoutPostsInput
  }

  export type BlogPostUncheckedCreateWithoutCategoryInput = {
    id?: number
    title: string
    slug: string
    content: string
    excerpt?: string | null
    featuredImage?: string | null
    blogFeaturedImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    status?: $Enums.BlogPostStatus
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    viewCount?: number
    likeCount?: number
    isApproved?: number
    isFeatured?: number
    author_id: number
    blog_section_id?: number | null
    tags?: BlogTagUncheckedCreateNestedManyWithoutPostsInput
  }

  export type BlogPostCreateOrConnectWithoutCategoryInput = {
    where: BlogPostWhereUniqueInput
    create: XOR<BlogPostCreateWithoutCategoryInput, BlogPostUncheckedCreateWithoutCategoryInput>
  }

  export type BlogPostCreateManyCategoryInputEnvelope = {
    data: BlogPostCreateManyCategoryInput | BlogPostCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type UserProfileUpsertWithoutBlogCategoriesInput = {
    update: XOR<UserProfileUpdateWithoutBlogCategoriesInput, UserProfileUncheckedUpdateWithoutBlogCategoriesInput>
    create: XOR<UserProfileCreateWithoutBlogCategoriesInput, UserProfileUncheckedCreateWithoutBlogCategoriesInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutBlogCategoriesInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutBlogCategoriesInput, UserProfileUncheckedUpdateWithoutBlogCategoriesInput>
  }

  export type UserProfileUpdateWithoutBlogCategoriesInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address1?: NullableStringFieldUpdateOperationsInput | string | null
    address2?: NullableStringFieldUpdateOperationsInput | string | null
    securityQuestion?: NullableEnumSecurityQuestionFieldUpdateOperationsInput | $Enums.SecurityQuestion | null
    securityAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    summery?: NullableStringFieldUpdateOperationsInput | string | null
    blogTags?: BlogTagUpdateManyWithoutCreatedByNestedInput
    uploadedImages?: UploadedImageUpdateManyWithoutUploadedByNestedInput
    blogPosts?: BlogPostUpdateManyWithoutAuthorNestedInput
  }

  export type UserProfileUncheckedUpdateWithoutBlogCategoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address1?: NullableStringFieldUpdateOperationsInput | string | null
    address2?: NullableStringFieldUpdateOperationsInput | string | null
    securityQuestion?: NullableEnumSecurityQuestionFieldUpdateOperationsInput | $Enums.SecurityQuestion | null
    securityAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    summery?: NullableStringFieldUpdateOperationsInput | string | null
    blogTags?: BlogTagUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedImages?: UploadedImageUncheckedUpdateManyWithoutUploadedByNestedInput
    blogPosts?: BlogPostUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type BlogPostUpsertWithWhereUniqueWithoutCategoryInput = {
    where: BlogPostWhereUniqueInput
    update: XOR<BlogPostUpdateWithoutCategoryInput, BlogPostUncheckedUpdateWithoutCategoryInput>
    create: XOR<BlogPostCreateWithoutCategoryInput, BlogPostUncheckedCreateWithoutCategoryInput>
  }

  export type BlogPostUpdateWithWhereUniqueWithoutCategoryInput = {
    where: BlogPostWhereUniqueInput
    data: XOR<BlogPostUpdateWithoutCategoryInput, BlogPostUncheckedUpdateWithoutCategoryInput>
  }

  export type BlogPostUpdateManyWithWhereWithoutCategoryInput = {
    where: BlogPostScalarWhereInput
    data: XOR<BlogPostUpdateManyMutationInput, BlogPostUncheckedUpdateManyWithoutCategoryInput>
  }

  export type UserProfileCreateWithoutBlogTagsInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
    isStaff?: boolean
    isActive?: boolean
    dateJoined?: Date | string
    updatedAt?: Date | string
    isVerified?: boolean
    city?: string | null
    state?: string | null
    zipCode?: number | null
    country?: string | null
    address1?: string | null
    address2?: string | null
    securityQuestion?: $Enums.SecurityQuestion | null
    securityAnswer?: string | null
    profileImage?: string | null
    phoneNumber?: string | null
    summery?: string | null
    blogCategories?: BlogCategoryCreateNestedManyWithoutCreatedByInput
    uploadedImages?: UploadedImageCreateNestedManyWithoutUploadedByInput
    blogPosts?: BlogPostCreateNestedManyWithoutAuthorInput
  }

  export type UserProfileUncheckedCreateWithoutBlogTagsInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
    isStaff?: boolean
    isActive?: boolean
    dateJoined?: Date | string
    updatedAt?: Date | string
    isVerified?: boolean
    city?: string | null
    state?: string | null
    zipCode?: number | null
    country?: string | null
    address1?: string | null
    address2?: string | null
    securityQuestion?: $Enums.SecurityQuestion | null
    securityAnswer?: string | null
    profileImage?: string | null
    phoneNumber?: string | null
    summery?: string | null
    blogCategories?: BlogCategoryUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedImages?: UploadedImageUncheckedCreateNestedManyWithoutUploadedByInput
    blogPosts?: BlogPostUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserProfileCreateOrConnectWithoutBlogTagsInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutBlogTagsInput, UserProfileUncheckedCreateWithoutBlogTagsInput>
  }

  export type BlogPostCreateWithoutTagsInput = {
    title: string
    slug: string
    content: string
    excerpt?: string | null
    featuredImage?: string | null
    blogFeaturedImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    status?: $Enums.BlogPostStatus
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    viewCount?: number
    likeCount?: number
    isApproved?: number
    isFeatured?: number
    author: UserProfileCreateNestedOneWithoutBlogPostsInput
    category?: BlogCategoryCreateNestedOneWithoutPostsInput
    section?: BlogMainPageSectionsCreateNestedOneWithoutPostsInput
  }

  export type BlogPostUncheckedCreateWithoutTagsInput = {
    id?: number
    title: string
    slug: string
    content: string
    excerpt?: string | null
    featuredImage?: string | null
    blogFeaturedImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    status?: $Enums.BlogPostStatus
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    viewCount?: number
    likeCount?: number
    isApproved?: number
    isFeatured?: number
    author_id: number
    category_id?: number | null
    blog_section_id?: number | null
  }

  export type BlogPostCreateOrConnectWithoutTagsInput = {
    where: BlogPostWhereUniqueInput
    create: XOR<BlogPostCreateWithoutTagsInput, BlogPostUncheckedCreateWithoutTagsInput>
  }

  export type UserProfileUpsertWithoutBlogTagsInput = {
    update: XOR<UserProfileUpdateWithoutBlogTagsInput, UserProfileUncheckedUpdateWithoutBlogTagsInput>
    create: XOR<UserProfileCreateWithoutBlogTagsInput, UserProfileUncheckedCreateWithoutBlogTagsInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutBlogTagsInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutBlogTagsInput, UserProfileUncheckedUpdateWithoutBlogTagsInput>
  }

  export type UserProfileUpdateWithoutBlogTagsInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address1?: NullableStringFieldUpdateOperationsInput | string | null
    address2?: NullableStringFieldUpdateOperationsInput | string | null
    securityQuestion?: NullableEnumSecurityQuestionFieldUpdateOperationsInput | $Enums.SecurityQuestion | null
    securityAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    summery?: NullableStringFieldUpdateOperationsInput | string | null
    blogCategories?: BlogCategoryUpdateManyWithoutCreatedByNestedInput
    uploadedImages?: UploadedImageUpdateManyWithoutUploadedByNestedInput
    blogPosts?: BlogPostUpdateManyWithoutAuthorNestedInput
  }

  export type UserProfileUncheckedUpdateWithoutBlogTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address1?: NullableStringFieldUpdateOperationsInput | string | null
    address2?: NullableStringFieldUpdateOperationsInput | string | null
    securityQuestion?: NullableEnumSecurityQuestionFieldUpdateOperationsInput | $Enums.SecurityQuestion | null
    securityAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    summery?: NullableStringFieldUpdateOperationsInput | string | null
    blogCategories?: BlogCategoryUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedImages?: UploadedImageUncheckedUpdateManyWithoutUploadedByNestedInput
    blogPosts?: BlogPostUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type BlogPostUpsertWithWhereUniqueWithoutTagsInput = {
    where: BlogPostWhereUniqueInput
    update: XOR<BlogPostUpdateWithoutTagsInput, BlogPostUncheckedUpdateWithoutTagsInput>
    create: XOR<BlogPostCreateWithoutTagsInput, BlogPostUncheckedCreateWithoutTagsInput>
  }

  export type BlogPostUpdateWithWhereUniqueWithoutTagsInput = {
    where: BlogPostWhereUniqueInput
    data: XOR<BlogPostUpdateWithoutTagsInput, BlogPostUncheckedUpdateWithoutTagsInput>
  }

  export type BlogPostUpdateManyWithWhereWithoutTagsInput = {
    where: BlogPostScalarWhereInput
    data: XOR<BlogPostUpdateManyMutationInput, BlogPostUncheckedUpdateManyWithoutTagsInput>
  }

  export type BlogPostCreateWithoutSectionInput = {
    title: string
    slug: string
    content: string
    excerpt?: string | null
    featuredImage?: string | null
    blogFeaturedImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    status?: $Enums.BlogPostStatus
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    viewCount?: number
    likeCount?: number
    isApproved?: number
    isFeatured?: number
    author: UserProfileCreateNestedOneWithoutBlogPostsInput
    category?: BlogCategoryCreateNestedOneWithoutPostsInput
    tags?: BlogTagCreateNestedManyWithoutPostsInput
  }

  export type BlogPostUncheckedCreateWithoutSectionInput = {
    id?: number
    title: string
    slug: string
    content: string
    excerpt?: string | null
    featuredImage?: string | null
    blogFeaturedImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    status?: $Enums.BlogPostStatus
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    viewCount?: number
    likeCount?: number
    isApproved?: number
    isFeatured?: number
    author_id: number
    category_id?: number | null
    tags?: BlogTagUncheckedCreateNestedManyWithoutPostsInput
  }

  export type BlogPostCreateOrConnectWithoutSectionInput = {
    where: BlogPostWhereUniqueInput
    create: XOR<BlogPostCreateWithoutSectionInput, BlogPostUncheckedCreateWithoutSectionInput>
  }

  export type BlogPostCreateManySectionInputEnvelope = {
    data: BlogPostCreateManySectionInput | BlogPostCreateManySectionInput[]
    skipDuplicates?: boolean
  }

  export type BlogPostUpsertWithWhereUniqueWithoutSectionInput = {
    where: BlogPostWhereUniqueInput
    update: XOR<BlogPostUpdateWithoutSectionInput, BlogPostUncheckedUpdateWithoutSectionInput>
    create: XOR<BlogPostCreateWithoutSectionInput, BlogPostUncheckedCreateWithoutSectionInput>
  }

  export type BlogPostUpdateWithWhereUniqueWithoutSectionInput = {
    where: BlogPostWhereUniqueInput
    data: XOR<BlogPostUpdateWithoutSectionInput, BlogPostUncheckedUpdateWithoutSectionInput>
  }

  export type BlogPostUpdateManyWithWhereWithoutSectionInput = {
    where: BlogPostScalarWhereInput
    data: XOR<BlogPostUpdateManyMutationInput, BlogPostUncheckedUpdateManyWithoutSectionInput>
  }

  export type UserProfileCreateWithoutUploadedImagesInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
    isStaff?: boolean
    isActive?: boolean
    dateJoined?: Date | string
    updatedAt?: Date | string
    isVerified?: boolean
    city?: string | null
    state?: string | null
    zipCode?: number | null
    country?: string | null
    address1?: string | null
    address2?: string | null
    securityQuestion?: $Enums.SecurityQuestion | null
    securityAnswer?: string | null
    profileImage?: string | null
    phoneNumber?: string | null
    summery?: string | null
    blogCategories?: BlogCategoryCreateNestedManyWithoutCreatedByInput
    blogTags?: BlogTagCreateNestedManyWithoutCreatedByInput
    blogPosts?: BlogPostCreateNestedManyWithoutAuthorInput
  }

  export type UserProfileUncheckedCreateWithoutUploadedImagesInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
    isStaff?: boolean
    isActive?: boolean
    dateJoined?: Date | string
    updatedAt?: Date | string
    isVerified?: boolean
    city?: string | null
    state?: string | null
    zipCode?: number | null
    country?: string | null
    address1?: string | null
    address2?: string | null
    securityQuestion?: $Enums.SecurityQuestion | null
    securityAnswer?: string | null
    profileImage?: string | null
    phoneNumber?: string | null
    summery?: string | null
    blogCategories?: BlogCategoryUncheckedCreateNestedManyWithoutCreatedByInput
    blogTags?: BlogTagUncheckedCreateNestedManyWithoutCreatedByInput
    blogPosts?: BlogPostUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserProfileCreateOrConnectWithoutUploadedImagesInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutUploadedImagesInput, UserProfileUncheckedCreateWithoutUploadedImagesInput>
  }

  export type UserProfileUpsertWithoutUploadedImagesInput = {
    update: XOR<UserProfileUpdateWithoutUploadedImagesInput, UserProfileUncheckedUpdateWithoutUploadedImagesInput>
    create: XOR<UserProfileCreateWithoutUploadedImagesInput, UserProfileUncheckedCreateWithoutUploadedImagesInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutUploadedImagesInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutUploadedImagesInput, UserProfileUncheckedUpdateWithoutUploadedImagesInput>
  }

  export type UserProfileUpdateWithoutUploadedImagesInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address1?: NullableStringFieldUpdateOperationsInput | string | null
    address2?: NullableStringFieldUpdateOperationsInput | string | null
    securityQuestion?: NullableEnumSecurityQuestionFieldUpdateOperationsInput | $Enums.SecurityQuestion | null
    securityAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    summery?: NullableStringFieldUpdateOperationsInput | string | null
    blogCategories?: BlogCategoryUpdateManyWithoutCreatedByNestedInput
    blogTags?: BlogTagUpdateManyWithoutCreatedByNestedInput
    blogPosts?: BlogPostUpdateManyWithoutAuthorNestedInput
  }

  export type UserProfileUncheckedUpdateWithoutUploadedImagesInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address1?: NullableStringFieldUpdateOperationsInput | string | null
    address2?: NullableStringFieldUpdateOperationsInput | string | null
    securityQuestion?: NullableEnumSecurityQuestionFieldUpdateOperationsInput | $Enums.SecurityQuestion | null
    securityAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    summery?: NullableStringFieldUpdateOperationsInput | string | null
    blogCategories?: BlogCategoryUncheckedUpdateManyWithoutCreatedByNestedInput
    blogTags?: BlogTagUncheckedUpdateManyWithoutCreatedByNestedInput
    blogPosts?: BlogPostUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserProfileCreateWithoutBlogPostsInput = {
    email: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
    isStaff?: boolean
    isActive?: boolean
    dateJoined?: Date | string
    updatedAt?: Date | string
    isVerified?: boolean
    city?: string | null
    state?: string | null
    zipCode?: number | null
    country?: string | null
    address1?: string | null
    address2?: string | null
    securityQuestion?: $Enums.SecurityQuestion | null
    securityAnswer?: string | null
    profileImage?: string | null
    phoneNumber?: string | null
    summery?: string | null
    blogCategories?: BlogCategoryCreateNestedManyWithoutCreatedByInput
    blogTags?: BlogTagCreateNestedManyWithoutCreatedByInput
    uploadedImages?: UploadedImageCreateNestedManyWithoutUploadedByInput
  }

  export type UserProfileUncheckedCreateWithoutBlogPostsInput = {
    id?: number
    email: string
    firstName?: string | null
    lastName?: string | null
    role?: $Enums.Role
    isStaff?: boolean
    isActive?: boolean
    dateJoined?: Date | string
    updatedAt?: Date | string
    isVerified?: boolean
    city?: string | null
    state?: string | null
    zipCode?: number | null
    country?: string | null
    address1?: string | null
    address2?: string | null
    securityQuestion?: $Enums.SecurityQuestion | null
    securityAnswer?: string | null
    profileImage?: string | null
    phoneNumber?: string | null
    summery?: string | null
    blogCategories?: BlogCategoryUncheckedCreateNestedManyWithoutCreatedByInput
    blogTags?: BlogTagUncheckedCreateNestedManyWithoutCreatedByInput
    uploadedImages?: UploadedImageUncheckedCreateNestedManyWithoutUploadedByInput
  }

  export type UserProfileCreateOrConnectWithoutBlogPostsInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutBlogPostsInput, UserProfileUncheckedCreateWithoutBlogPostsInput>
  }

  export type BlogCategoryCreateWithoutPostsInput = {
    name: string
    slug: string
    count?: number
    description?: string | null
    createdBy: UserProfileCreateNestedOneWithoutBlogCategoriesInput
  }

  export type BlogCategoryUncheckedCreateWithoutPostsInput = {
    id?: number
    name: string
    slug: string
    count?: number
    description?: string | null
    createdById: number
  }

  export type BlogCategoryCreateOrConnectWithoutPostsInput = {
    where: BlogCategoryWhereUniqueInput
    create: XOR<BlogCategoryCreateWithoutPostsInput, BlogCategoryUncheckedCreateWithoutPostsInput>
  }

  export type BlogMainPageSectionsCreateWithoutPostsInput = {
    section: string
    createdAt?: Date | string
  }

  export type BlogMainPageSectionsUncheckedCreateWithoutPostsInput = {
    id?: number
    section: string
    createdAt?: Date | string
  }

  export type BlogMainPageSectionsCreateOrConnectWithoutPostsInput = {
    where: BlogMainPageSectionsWhereUniqueInput
    create: XOR<BlogMainPageSectionsCreateWithoutPostsInput, BlogMainPageSectionsUncheckedCreateWithoutPostsInput>
  }

  export type BlogTagCreateWithoutPostsInput = {
    name: string
    slug: string
    count?: number
    createdBy: UserProfileCreateNestedOneWithoutBlogTagsInput
  }

  export type BlogTagUncheckedCreateWithoutPostsInput = {
    id?: number
    name: string
    slug: string
    count?: number
    createdById: number
  }

  export type BlogTagCreateOrConnectWithoutPostsInput = {
    where: BlogTagWhereUniqueInput
    create: XOR<BlogTagCreateWithoutPostsInput, BlogTagUncheckedCreateWithoutPostsInput>
  }

  export type UserProfileUpsertWithoutBlogPostsInput = {
    update: XOR<UserProfileUpdateWithoutBlogPostsInput, UserProfileUncheckedUpdateWithoutBlogPostsInput>
    create: XOR<UserProfileCreateWithoutBlogPostsInput, UserProfileUncheckedCreateWithoutBlogPostsInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutBlogPostsInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutBlogPostsInput, UserProfileUncheckedUpdateWithoutBlogPostsInput>
  }

  export type UserProfileUpdateWithoutBlogPostsInput = {
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address1?: NullableStringFieldUpdateOperationsInput | string | null
    address2?: NullableStringFieldUpdateOperationsInput | string | null
    securityQuestion?: NullableEnumSecurityQuestionFieldUpdateOperationsInput | $Enums.SecurityQuestion | null
    securityAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    summery?: NullableStringFieldUpdateOperationsInput | string | null
    blogCategories?: BlogCategoryUpdateManyWithoutCreatedByNestedInput
    blogTags?: BlogTagUpdateManyWithoutCreatedByNestedInput
    uploadedImages?: UploadedImageUpdateManyWithoutUploadedByNestedInput
  }

  export type UserProfileUncheckedUpdateWithoutBlogPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isStaff?: BoolFieldUpdateOperationsInput | boolean
    isActive?: BoolFieldUpdateOperationsInput | boolean
    dateJoined?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    city?: NullableStringFieldUpdateOperationsInput | string | null
    state?: NullableStringFieldUpdateOperationsInput | string | null
    zipCode?: NullableIntFieldUpdateOperationsInput | number | null
    country?: NullableStringFieldUpdateOperationsInput | string | null
    address1?: NullableStringFieldUpdateOperationsInput | string | null
    address2?: NullableStringFieldUpdateOperationsInput | string | null
    securityQuestion?: NullableEnumSecurityQuestionFieldUpdateOperationsInput | $Enums.SecurityQuestion | null
    securityAnswer?: NullableStringFieldUpdateOperationsInput | string | null
    profileImage?: NullableStringFieldUpdateOperationsInput | string | null
    phoneNumber?: NullableStringFieldUpdateOperationsInput | string | null
    summery?: NullableStringFieldUpdateOperationsInput | string | null
    blogCategories?: BlogCategoryUncheckedUpdateManyWithoutCreatedByNestedInput
    blogTags?: BlogTagUncheckedUpdateManyWithoutCreatedByNestedInput
    uploadedImages?: UploadedImageUncheckedUpdateManyWithoutUploadedByNestedInput
  }

  export type BlogCategoryUpsertWithoutPostsInput = {
    update: XOR<BlogCategoryUpdateWithoutPostsInput, BlogCategoryUncheckedUpdateWithoutPostsInput>
    create: XOR<BlogCategoryCreateWithoutPostsInput, BlogCategoryUncheckedCreateWithoutPostsInput>
    where?: BlogCategoryWhereInput
  }

  export type BlogCategoryUpdateToOneWithWhereWithoutPostsInput = {
    where?: BlogCategoryWhereInput
    data: XOR<BlogCategoryUpdateWithoutPostsInput, BlogCategoryUncheckedUpdateWithoutPostsInput>
  }

  export type BlogCategoryUpdateWithoutPostsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdBy?: UserProfileUpdateOneRequiredWithoutBlogCategoriesNestedInput
  }

  export type BlogCategoryUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: IntFieldUpdateOperationsInput | number
  }

  export type BlogMainPageSectionsUpsertWithoutPostsInput = {
    update: XOR<BlogMainPageSectionsUpdateWithoutPostsInput, BlogMainPageSectionsUncheckedUpdateWithoutPostsInput>
    create: XOR<BlogMainPageSectionsCreateWithoutPostsInput, BlogMainPageSectionsUncheckedCreateWithoutPostsInput>
    where?: BlogMainPageSectionsWhereInput
  }

  export type BlogMainPageSectionsUpdateToOneWithWhereWithoutPostsInput = {
    where?: BlogMainPageSectionsWhereInput
    data: XOR<BlogMainPageSectionsUpdateWithoutPostsInput, BlogMainPageSectionsUncheckedUpdateWithoutPostsInput>
  }

  export type BlogMainPageSectionsUpdateWithoutPostsInput = {
    section?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogMainPageSectionsUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    section?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlogTagUpsertWithWhereUniqueWithoutPostsInput = {
    where: BlogTagWhereUniqueInput
    update: XOR<BlogTagUpdateWithoutPostsInput, BlogTagUncheckedUpdateWithoutPostsInput>
    create: XOR<BlogTagCreateWithoutPostsInput, BlogTagUncheckedCreateWithoutPostsInput>
  }

  export type BlogTagUpdateWithWhereUniqueWithoutPostsInput = {
    where: BlogTagWhereUniqueInput
    data: XOR<BlogTagUpdateWithoutPostsInput, BlogTagUncheckedUpdateWithoutPostsInput>
  }

  export type BlogTagUpdateManyWithWhereWithoutPostsInput = {
    where: BlogTagScalarWhereInput
    data: XOR<BlogTagUpdateManyMutationInput, BlogTagUncheckedUpdateManyWithoutPostsInput>
  }

  export type BlogCategoryCreateManyCreatedByInput = {
    id?: number
    name: string
    slug: string
    count?: number
    description?: string | null
  }

  export type BlogTagCreateManyCreatedByInput = {
    id?: number
    name: string
    slug: string
    count?: number
  }

  export type UploadedImageCreateManyUploadedByInput = {
    id?: number
    name?: string | null
    image: string
    size?: number
    contentType?: string | null
    width?: number
    height?: number
    thumbnail?: string | null
    uploadedAt?: Date | string
    status?: $Enums.UploadedImageStatus
    notificationSent?: boolean
  }

  export type BlogPostCreateManyAuthorInput = {
    id?: number
    title: string
    slug: string
    content: string
    excerpt?: string | null
    featuredImage?: string | null
    blogFeaturedImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    status?: $Enums.BlogPostStatus
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    viewCount?: number
    likeCount?: number
    isApproved?: number
    isFeatured?: number
    category_id?: number | null
    blog_section_id?: number | null
  }

  export type BlogCategoryUpdateWithoutCreatedByInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: BlogPostUpdateManyWithoutCategoryNestedInput
  }

  export type BlogCategoryUncheckedUpdateWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
    posts?: BlogPostUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type BlogCategoryUncheckedUpdateManyWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    description?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type BlogTagUpdateWithoutCreatedByInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    posts?: BlogPostUpdateManyWithoutTagsNestedInput
  }

  export type BlogTagUncheckedUpdateWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    posts?: BlogPostUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type BlogTagUncheckedUpdateManyWithoutCreatedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
  }

  export type UploadedImageUpdateWithoutUploadedByInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: StringFieldUpdateOperationsInput | string
    size?: FloatFieldUpdateOperationsInput | number
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumUploadedImageStatusFieldUpdateOperationsInput | $Enums.UploadedImageStatus
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UploadedImageUncheckedUpdateWithoutUploadedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: StringFieldUpdateOperationsInput | string
    size?: FloatFieldUpdateOperationsInput | number
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumUploadedImageStatusFieldUpdateOperationsInput | $Enums.UploadedImageStatus
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UploadedImageUncheckedUpdateManyWithoutUploadedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: StringFieldUpdateOperationsInput | string
    size?: FloatFieldUpdateOperationsInput | number
    contentType?: NullableStringFieldUpdateOperationsInput | string | null
    width?: IntFieldUpdateOperationsInput | number
    height?: IntFieldUpdateOperationsInput | number
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    uploadedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: EnumUploadedImageStatusFieldUpdateOperationsInput | $Enums.UploadedImageStatus
    notificationSent?: BoolFieldUpdateOperationsInput | boolean
  }

  export type BlogPostUpdateWithoutAuthorInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    category?: BlogCategoryUpdateOneWithoutPostsNestedInput
    section?: BlogMainPageSectionsUpdateOneWithoutPostsNestedInput
    tags?: BlogTagUpdateManyWithoutPostsNestedInput
  }

  export type BlogPostUncheckedUpdateWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    blog_section_id?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: BlogTagUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type BlogPostUncheckedUpdateManyWithoutAuthorInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    blog_section_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BlogPostCreateManyCategoryInput = {
    id?: number
    title: string
    slug: string
    content: string
    excerpt?: string | null
    featuredImage?: string | null
    blogFeaturedImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    status?: $Enums.BlogPostStatus
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    viewCount?: number
    likeCount?: number
    isApproved?: number
    isFeatured?: number
    author_id: number
    blog_section_id?: number | null
  }

  export type BlogPostUpdateWithoutCategoryInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    author?: UserProfileUpdateOneRequiredWithoutBlogPostsNestedInput
    section?: BlogMainPageSectionsUpdateOneWithoutPostsNestedInput
    tags?: BlogTagUpdateManyWithoutPostsNestedInput
  }

  export type BlogPostUncheckedUpdateWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    blog_section_id?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: BlogTagUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type BlogPostUncheckedUpdateManyWithoutCategoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    blog_section_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BlogPostUpdateWithoutTagsInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    author?: UserProfileUpdateOneRequiredWithoutBlogPostsNestedInput
    category?: BlogCategoryUpdateOneWithoutPostsNestedInput
    section?: BlogMainPageSectionsUpdateOneWithoutPostsNestedInput
  }

  export type BlogPostUncheckedUpdateWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    blog_section_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BlogPostUncheckedUpdateManyWithoutTagsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    blog_section_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BlogPostCreateManySectionInput = {
    id?: number
    title: string
    slug: string
    content: string
    excerpt?: string | null
    featuredImage?: string | null
    blogFeaturedImage?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    publishedAt?: Date | string | null
    status?: $Enums.BlogPostStatus
    metaTitle?: string | null
    metaDescription?: string | null
    keywords?: string | null
    viewCount?: number
    likeCount?: number
    isApproved?: number
    isFeatured?: number
    author_id: number
    category_id?: number | null
  }

  export type BlogPostUpdateWithoutSectionInput = {
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    author?: UserProfileUpdateOneRequiredWithoutBlogPostsNestedInput
    category?: BlogCategoryUpdateOneWithoutPostsNestedInput
    tags?: BlogTagUpdateManyWithoutPostsNestedInput
  }

  export type BlogPostUncheckedUpdateWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
    tags?: BlogTagUncheckedUpdateManyWithoutPostsNestedInput
  }

  export type BlogPostUncheckedUpdateManyWithoutSectionInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    excerpt?: NullableStringFieldUpdateOperationsInput | string | null
    featuredImage?: NullableStringFieldUpdateOperationsInput | string | null
    blogFeaturedImage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    publishedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    status?: EnumBlogPostStatusFieldUpdateOperationsInput | $Enums.BlogPostStatus
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    keywords?: NullableStringFieldUpdateOperationsInput | string | null
    viewCount?: IntFieldUpdateOperationsInput | number
    likeCount?: IntFieldUpdateOperationsInput | number
    isApproved?: IntFieldUpdateOperationsInput | number
    isFeatured?: IntFieldUpdateOperationsInput | number
    author_id?: IntFieldUpdateOperationsInput | number
    category_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type BlogTagUpdateWithoutPostsInput = {
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdBy?: UserProfileUpdateOneRequiredWithoutBlogTagsNestedInput
  }

  export type BlogTagUncheckedUpdateWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdById?: IntFieldUpdateOperationsInput | number
  }

  export type BlogTagUncheckedUpdateManyWithoutPostsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    createdById?: IntFieldUpdateOperationsInput | number
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