module.exports = [
"[project]/src/lib/prisma.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "prisma",
    ()=>prisma
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@prisma/adapter-pg/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const globalForPrisma = globalThis;
function createPrismaClient() {
    if (!globalForPrisma.pool) {
        globalForPrisma.pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["default"].Pool({
            connectionString: process.env.DATABASE_URL,
            min: 2,
            max: 10,
            idleTimeoutMillis: 60000,
            connectionTimeoutMillis: 5000
        });
    }
    const adapter = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$prisma$2f$adapter$2d$pg$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PrismaPg"](globalForPrisma.pool);
    return new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
        adapter
    });
}
const prisma = globalForPrisma.prisma ?? createPrismaClient();
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = prisma;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/lib/auth.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/providers/credentials.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
const authOptions = {
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$providers$2f$credentials$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])({
            name: "credentials",
            credentials: {
                login: {
                    label: "Login",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                if (!credentials?.login || !credentials?.password) {
                    return null;
                }
                const user = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
                    where: {
                        login: credentials.login
                    },
                    include: {
                        dealer: true
                    }
                });
                if (!user) {
                    return null;
                }
                const isPasswordValid = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$bcryptjs$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].compare(credentials.password, user.password);
                if (!isPasswordValid) {
                    return null;
                }
                return {
                    id: user.id,
                    name: user.name,
                    login: user.login,
                    role: user.role,
                    dealerId: user.dealerId,
                    dealerName: user.dealer?.name || null
                };
            }
        })
    ],
    callbacks: {
        async jwt ({ token, user }) {
            if (user) {
                token.id = user.id;
                token.login = user.login;
                token.role = user.role;
                token.dealerId = user.dealerId;
                token.dealerName = user.dealerName;
            }
            return token;
        },
        async session ({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.login = token.login;
                session.user.role = token.role;
                session.user.dealerId = token.dealerId;
                session.user.dealerName = token.dealerName;
            }
            return session;
        }
    },
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
};
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

/* __next_internal_action_entry_do_not_use__ [{"005924e15a630f63e5a4e2a4213b5022b8e808dd65":"getDashboardStats","005e4ddb3dd2bdb7c66e01527f36923bcdac13075a":"getDealers","007d316d726c2caa5328ba6e3725077b1a231e7e24":"getSuppliers","0092dd734cbeb1457ee18ea16f151f451ed7e44bf7":"getProductCategories","00975dbc6a746ab2442e5f67c98ccb4695707390d6":"getUsers","400da4eceb125861ed24c8870b4857bbad08efa11e":"createProduct","40170c6e7f7c65bce3ec9dedecca4aaca7705597aa":"deleteProduct","4028d390a5eafc5ca88729ee429ce41747ddf314af":"deleteDealer","4044d3c3614a819ad7c47e2bce5ecadb74d4727fe3":"deleteUser","405351a78b1c925b2dedb170a1b38be4c33b689438":"warehouseReturns","405bf7ab47deee661b8c4d7940fb20b50c16da2543":"createUser","406e7bc40d12befbffde1a6ea182f5a60a0e4562b8":"warehouseSend","40702cc101ccd2ba01607320b1c94b6d35093e8e4e":"createClient","40708d8952e5119d12b929546cca902cfa13ec9e6a":"warehouseReceive","4074f166a992c3695952a098396d7d35ff85d6023d":"createSupplier","40a0ac766083a0e0cb0f55a6c657f8caa7c9978c3e":"getClients","40b1df31ca46dfd2d65ff67223b1e04f154bf947ef":"getProducts","40b3ab95e7a5dbc9964208f6ad520c3fe76a133796":"deleteClient","40b699cb21b327e2888dc79c0fbacca5e2f4a2807e":"deleteSupplier","40b7147435cd2b0c7a166e488d247e299eb403cdf5":"getStock","40c43692887f27dc6860c70d56b69668a6b316ea3c":"createDealer","40ed58098506f5fb28efcb10c81cbd72b7d6a85e03":"getDealer","40efffe9ddc041c51b0040977ef505b91177488c45":"getMovements","602056f3fc6bd0ef7cfaffb2fd42dc69c94d2afce2":"updateProduct","603c8db2a1690f8db1bae7bdd53af3c2197a83e87a":"updateUser","60ae88f828d4d47fa0b706a13d32533f4f595c28b7":"updateDealer","60db3e28b7a37235775b4ed70a6600786956c00332":"updateSupplier","60f20978741c5d00c9d1b49f06afa2d2d3dde5c6da":"updateClient"},"",""] */ __turbopack_context__.s([
    "createClient",
    ()=>createClient,
    "createDealer",
    ()=>createDealer,
    "createProduct",
    ()=>createProduct,
    "createSupplier",
    ()=>createSupplier,
    "createUser",
    ()=>createUser,
    "deleteClient",
    ()=>deleteClient,
    "deleteDealer",
    ()=>deleteDealer,
    "deleteProduct",
    ()=>deleteProduct,
    "deleteSupplier",
    ()=>deleteSupplier,
    "deleteUser",
    ()=>deleteUser,
    "getClients",
    ()=>getClients,
    "getDashboardStats",
    ()=>getDashboardStats,
    "getDealer",
    ()=>getDealer,
    "getDealers",
    ()=>getDealers,
    "getMovements",
    ()=>getMovements,
    "getProductCategories",
    ()=>getProductCategories,
    "getProducts",
    ()=>getProducts,
    "getStock",
    ()=>getStock,
    "getSuppliers",
    ()=>getSuppliers,
    "getUsers",
    ()=>getUsers,
    "updateClient",
    ()=>updateClient,
    "updateDealer",
    ()=>updateDealer,
    "updateProduct",
    ()=>updateProduct,
    "updateSupplier",
    ()=>updateSupplier,
    "updateUser",
    ()=>updateUser,
    "warehouseReceive",
    ()=>warehouseReceive,
    "warehouseReturns",
    ()=>warehouseReturns,
    "warehouseSend",
    ()=>warehouseSend
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/prisma.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/index.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/auth.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
async function getSession() {
    const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$auth$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["authOptions"]);
    if (!session?.user) throw new Error("Unauthorized");
    return session.user;
}
async function getDashboardStats() {
    const [products, warehouseStocks, dealerStocks, recentMovements] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].product.findMany({
            select: {
                id: true,
                category: true,
                name: true,
                minStock: true
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].stock.findMany({
            where: {
                locationType: "WAREHOUSE"
            },
            include: {
                product: {
                    select: {
                        category: true,
                        name: true
                    }
                }
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].stock.findMany({
            where: {
                locationType: "DEALER"
            },
            include: {
                product: {
                    select: {
                        category: true,
                        name: true
                    }
                },
                dealer: {
                    select: {
                        name: true
                    }
                }
            }
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].stockMovement.findMany({
            take: 10,
            orderBy: {
                createdAt: "desc"
            },
            include: {
                product: {
                    select: {
                        name: true,
                        category: true
                    }
                },
                dealer: {
                    select: {
                        name: true
                    }
                },
                supplier: {
                    select: {
                        name: true
                    }
                },
                performedBy: {
                    select: {
                        name: true
                    }
                }
            }
        })
    ]);
    const totalWarehouseQty = warehouseStocks.reduce((sum, s)=>sum + s.quantity, 0);
    const totalDealerQty = dealerStocks.reduce((sum, s)=>sum + s.quantity, 0);
    const byCategory = {};
    for (const s of warehouseStocks){
        byCategory[s.product.category] = (byCategory[s.product.category] || 0) + s.quantity;
    }
    const lowStockProducts = warehouseStocks.filter((s)=>{
        const product = products.find((p)=>p.id === s.productId);
        return product && product.minStock > 0 && s.quantity < product.minStock;
    }).map((s)=>{
        const product = products.find((p)=>p.id === s.productId);
        return {
            id: s.productId,
            name: product.name,
            category: product.category,
            minStock: product.minStock,
            warehouseQty: s.quantity
        };
    });
    return {
        totalProducts: products.length,
        totalWarehouseQty,
        totalDealerQty,
        byCategory,
        lowStockProducts,
        recentMovements: recentMovements.map((m)=>({
                id: m.id,
                productName: m.product.name,
                productCategory: m.product.category,
                type: m.type,
                quantity: m.quantity,
                dealerName: m.dealer?.name || null,
                supplierName: m.supplier?.name || null,
                performedByName: m.performedBy.name,
                createdAt: m.createdAt.toISOString()
            }))
    };
}
async function getSuppliers() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].supplier.findMany({
        include: {
            _count: {
                select: {
                    stockMovements: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}
async function createSupplier(data) {
    const user = await getSession();
    if (user.role !== "ADMIN") throw new Error("Forbidden");
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].supplier.create({
        data
    });
}
async function updateSupplier(id, data) {
    const user = await getSession();
    if (user.role !== "ADMIN") throw new Error("Forbidden");
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].supplier.update({
        where: {
            id
        },
        data
    });
}
async function deleteSupplier(id) {
    const user = await getSession();
    if (user.role !== "ADMIN") throw new Error("Forbidden");
    const supplier = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].supplier.findUnique({
        where: {
            id
        },
        include: {
            _count: {
                select: {
                    stockMovements: true
                }
            }
        }
    });
    if (supplier && supplier._count.stockMovements > 0) {
        throw new Error("Bu yetkazib beruvchiga bog'langan harakatlar mavjud");
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].supplier.delete({
        where: {
            id
        }
    });
}
async function getDealers() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].dealer.findMany({
        include: {
            _count: {
                select: {
                    stocks: true,
                    clients: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}
async function getDealer(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].dealer.findUnique({
        where: {
            id
        },
        include: {
            stocks: {
                include: {
                    product: true
                },
                where: {
                    quantity: {
                        gt: 0
                    }
                }
            },
            clients: {
                orderBy: {
                    createdAt: "desc"
                }
            },
            _count: {
                select: {
                    stocks: true,
                    clients: true
                }
            }
        }
    });
}
async function createDealer(data) {
    const user = await getSession();
    if (user.role !== "ADMIN") throw new Error("Forbidden");
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].dealer.create({
        data
    });
}
async function updateDealer(id, data) {
    const user = await getSession();
    if (user.role !== "ADMIN") throw new Error("Forbidden");
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].dealer.update({
        where: {
            id
        },
        data
    });
}
async function deleteDealer(id) {
    const user = await getSession();
    if (user.role !== "ADMIN") throw new Error("Forbidden");
    const dealer = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].dealer.findUnique({
        where: {
            id
        },
        include: {
            _count: {
                select: {
                    stocks: true,
                    clients: true
                }
            }
        }
    });
    if (dealer && (dealer._count.stocks > 0 || dealer._count.clients > 0)) {
        throw new Error("Bu dillerga bog'langan zaxiralar yoki mijozlar mavjud");
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].dealer.delete({
        where: {
            id
        }
    });
}
async function getClients(dealerId) {
    const user = await getSession();
    const where = {};
    if (user.role === "DEALER" && user.dealerId) {
        where.dealerId = user.dealerId;
    } else if (dealerId) {
        where.dealerId = dealerId;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].client.findMany({
        where,
        include: {
            dealer: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}
async function createClient(data) {
    const user = await getSession();
    if (user.role === "DEALER" && user.dealerId !== data.dealerId) {
        throw new Error("Forbidden");
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].client.create({
        data
    });
}
async function updateClient(id, data) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].client.update({
        where: {
            id
        },
        data
    });
}
async function deleteClient(id) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].client.delete({
        where: {
            id
        }
    });
}
async function getProducts(filters) {
    const where = {};
    if (filters?.category) where.category = filters.category;
    if (filters?.search) {
        where.name = {
            contains: filters.search,
            mode: "insensitive"
        };
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].product.findMany({
        where,
        include: {
            stocks: {
                where: {
                    locationType: "WAREHOUSE"
                },
                select: {
                    quantity: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}
async function getProductCategories() {
    const products = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].product.findMany({
        select: {
            category: true
        },
        distinct: [
            "category"
        ],
        orderBy: {
            category: "asc"
        }
    });
    return products.map((p)=>p.category);
}
async function createProduct(data) {
    const user = await getSession();
    if (user.role !== "ADMIN" && user.role !== "WAREHOUSE_MANAGER") {
        throw new Error("Ruxsat yo'q");
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].product.create({
        data
    });
}
async function updateProduct(id, data) {
    const user = await getSession();
    if (user.role !== "ADMIN" && user.role !== "WAREHOUSE_MANAGER") {
        throw new Error("Ruxsat yo'q");
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].product.update({
        where: {
            id
        },
        data
    });
}
async function deleteProduct(id) {
    const user = await getSession();
    if (user.role !== "ADMIN" && user.role !== "WAREHOUSE_MANAGER") {
        throw new Error("Ruxsat yo'q");
    }
    const hasStock = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].stock.findFirst({
        where: {
            productId: id,
            quantity: {
                gt: 0
            }
        }
    });
    if (hasStock) {
        throw new Error("Bu mahsulotning zaxirasi mavjud, avval nolga tushiring");
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].stockMovement.deleteMany({
        where: {
            productId: id
        }
    });
    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].stock.deleteMany({
        where: {
            productId: id
        }
    });
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].product.delete({
        where: {
            id
        }
    });
}
async function getStock(filters) {
    const where = {};
    if (filters?.productId) where.productId = filters.productId;
    if (filters?.locationType) where.locationType = filters.locationType;
    if (filters?.locationId) where.locationId = filters.locationId;
    if (!filters?.locationId && filters?.locationType === "WAREHOUSE") {
        where.locationId = null;
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].stock.findMany({
        where,
        include: {
            product: true,
            dealer: {
                select: {
                    id: true,
                    name: true
                }
            }
        },
        orderBy: {
            product: {
                name: "asc"
            }
        }
    });
}
async function warehouseReceive(data) {
    const user = await getSession();
    if (user.role !== "ADMIN" && user.role !== "WAREHOUSE_MANAGER") {
        throw new Error("Forbidden");
    }
    if (data.quantity <= 0) throw new Error("Miqdor musbat bo'lishi kerak");
    const dbUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: user.id
        }
    });
    if (!dbUser) throw new Error("Foydalanuvchi topilmadi. Iltimos, qayta kiring.");
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
        const existing = await tx.stock.findFirst({
            where: {
                productId: data.productId,
                locationType: "WAREHOUSE",
                locationId: null
            }
        });
        if (existing) {
            await tx.stock.update({
                where: {
                    id: existing.id
                },
                data: {
                    quantity: {
                        increment: data.quantity
                    }
                }
            });
        } else {
            await tx.stock.create({
                data: {
                    productId: data.productId,
                    locationType: "WAREHOUSE",
                    locationId: null,
                    quantity: data.quantity
                }
            });
        }
        await tx.stockMovement.create({
            data: {
                productId: data.productId,
                type: "RECEIVE",
                quantity: data.quantity,
                supplierId: data.supplierId,
                performedById: user.id,
                note: data.note?.trim() || null
            }
        });
        return {
            quantity: data.quantity
        };
    });
}
async function warehouseSend(data) {
    const user = await getSession();
    if (user.role !== "ADMIN" && user.role !== "WAREHOUSE_MANAGER") {
        throw new Error("Forbidden");
    }
    if (data.quantity <= 0) throw new Error("Miqdor musbat bo'lishi kerak");
    const dbUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: user.id
        }
    });
    if (!dbUser) throw new Error("Foydalanuvchi topilmadi. Iltimos, qayta kiring.");
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
        const warehouseStock = await tx.stock.findFirst({
            where: {
                productId: data.productId,
                locationType: "WAREHOUSE",
                locationId: null
            }
        });
        if (!warehouseStock || warehouseStock.quantity < data.quantity) {
            throw new Error("Omborxonada yetarli mahsulot mavjud emas");
        }
        await tx.stock.update({
            where: {
                id: warehouseStock.id
            },
            data: {
                quantity: {
                    decrement: data.quantity
                }
            }
        });
        const dealerStock = await tx.stock.findFirst({
            where: {
                productId: data.productId,
                locationType: "DEALER",
                locationId: data.dealerId
            }
        });
        if (dealerStock) {
            await tx.stock.update({
                where: {
                    id: dealerStock.id
                },
                data: {
                    quantity: {
                        increment: data.quantity
                    }
                }
            });
        } else {
            await tx.stock.create({
                data: {
                    productId: data.productId,
                    locationType: "DEALER",
                    locationId: data.dealerId,
                    quantity: data.quantity
                }
            });
        }
        await tx.stockMovement.create({
            data: {
                productId: data.productId,
                type: "SEND",
                quantity: data.quantity,
                dealerId: data.dealerId,
                performedById: user.id,
                note: data.note?.trim() || null
            }
        });
        return {
            quantity: data.quantity
        };
    });
}
async function warehouseReturns(data) {
    const user = await getSession();
    if (user.role !== "ADMIN" && user.role !== "WAREHOUSE_MANAGER") {
        throw new Error("Forbidden");
    }
    if (data.quantity <= 0) throw new Error("Miqdor musbat bo'lishi kerak");
    const dbUser = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id: user.id
        }
    });
    if (!dbUser) throw new Error("Foydalanuvchi topilmadi. Iltimos, qayta kiring.");
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].$transaction(async (tx)=>{
        // Agar diller tanlansa — diler stockidan ayirish
        if (data.dealerId) {
            const dealerStock = await tx.stock.findFirst({
                where: {
                    productId: data.productId,
                    locationType: "DEALER",
                    locationId: data.dealerId
                }
            });
            if (!dealerStock || dealerStock.quantity < data.quantity) {
                throw new Error("Dillerda yetarli mahsulot mavjud emas");
            }
            await tx.stock.update({
                where: {
                    id: dealerStock.id
                },
                data: {
                    quantity: {
                        decrement: data.quantity
                    }
                }
            });
        }
        // Omborxona stockiga qo'shish
        const warehouseStock = await tx.stock.findFirst({
            where: {
                productId: data.productId,
                locationType: "WAREHOUSE",
                locationId: null
            }
        });
        if (warehouseStock) {
            await tx.stock.update({
                where: {
                    id: warehouseStock.id
                },
                data: {
                    quantity: {
                        increment: data.quantity
                    }
                }
            });
        } else {
            await tx.stock.create({
                data: {
                    productId: data.productId,
                    locationType: "WAREHOUSE",
                    locationId: null,
                    quantity: data.quantity
                }
            });
        }
        await tx.stockMovement.create({
            data: {
                productId: data.productId,
                type: "RETURN",
                quantity: data.quantity,
                dealerId: data.dealerId || null,
                performedById: user.id,
                clientName: data.clientName?.trim() || null,
                clientPhone: data.clientPhone?.trim() || null,
                clientAddress: data.clientAddress?.trim() || null,
                note: data.note?.trim() || null
            }
        });
        return {
            quantity: data.quantity
        };
    });
}
async function getUsers() {
    const user = await getSession();
    if (user.role !== "ADMIN") throw new Error("Forbidden");
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findMany({
        select: {
            id: true,
            name: true,
            login: true,
            role: true,
            phone: true,
            dealerId: true,
            dealer: {
                select: {
                    id: true,
                    name: true
                }
            },
            createdAt: true
        },
        orderBy: {
            createdAt: "desc"
        }
    });
}
async function createUser(data) {
    const user = await getSession();
    if (user.role !== "ADMIN") throw new Error("Forbidden");
    const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            login: data.login
        }
    });
    if (existing) throw new Error("Bu login allaqachon mavjud");
    if (data.role === "DEALER" && !data.dealerId) {
        throw new Error("Diller roli uchun dillerni tanlash majburiy");
    }
    const bcrypt = (await __turbopack_context__.A("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript, async loader)")).default;
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.create({
        data: {
            name: data.name,
            login: data.login,
            password: hashedPassword,
            role: data.role,
            phone: data.phone?.trim() || null,
            dealerId: data.role === "DEALER" ? data.dealerId : null
        }
    });
}
async function updateUser(id, data) {
    const user = await getSession();
    if (user.role !== "ADMIN") throw new Error("Forbidden");
    if (data.login) {
        const existing = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findFirst({
            where: {
                login: data.login,
                NOT: {
                    id
                }
            }
        });
        if (existing) throw new Error("Bu login allaqachon mavjud");
    }
    const updateData = {};
    if (data.name) updateData.name = data.name;
    if (data.login) updateData.login = data.login;
    if (data.phone !== undefined) updateData.phone = data.phone?.trim() || null;
    if (data.role) {
        updateData.role = data.role;
        updateData.dealerId = data.role === "DEALER" ? data.dealerId : null;
    }
    if (data.password && data.password.trim()) {
        const bcrypt = (await __turbopack_context__.A("[project]/node_modules/bcryptjs/index.js [app-rsc] (ecmascript, async loader)")).default;
        updateData.password = await bcrypt.hash(data.password, 10);
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.update({
        where: {
            id
        },
        data: updateData
    });
}
async function deleteUser(id) {
    const user = await getSession();
    if (user.role !== "ADMIN") throw new Error("Forbidden");
    if (user.id === id) throw new Error("O'zingizni o'chira olmaysiz");
    const target = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.findUnique({
        where: {
            id
        },
        include: {
            _count: {
                select: {
                    stockMovements: true
                }
            }
        }
    });
    if (target && target._count.stockMovements > 0) {
        throw new Error("Bu foydalanuvchi harakatlar tarixida mavjud, o'chirib bo'lmaydi");
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].user.delete({
        where: {
            id
        }
    });
}
async function getMovements(filters) {
    const page = filters?.page || 1;
    const limit = filters?.limit || 20;
    const where = {};
    if (filters?.productId) where.productId = filters.productId;
    if (filters?.type) where.type = filters.type;
    if (filters?.dealerId) where.dealerId = filters.dealerId;
    if (filters?.from || filters?.to) {
        where.createdAt = {};
        if (filters?.from) where.createdAt.gte = new Date(filters.from);
        if (filters?.to) {
            const toDate = new Date(filters.to);
            toDate.setHours(23, 59, 59, 999);
            where.createdAt.lte = toDate;
        }
    }
    const [data, total] = await Promise.all([
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].stockMovement.findMany({
            where,
            include: {
                product: {
                    select: {
                        id: true,
                        name: true,
                        category: true
                    }
                },
                dealer: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                supplier: {
                    select: {
                        id: true,
                        name: true
                    }
                },
                performedBy: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            },
            skip: (page - 1) * limit,
            take: limit
        }),
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$prisma$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["prisma"].stockMovement.count({
            where
        })
    ]);
    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getDashboardStats,
    getSuppliers,
    createSupplier,
    updateSupplier,
    deleteSupplier,
    getDealers,
    getDealer,
    createDealer,
    updateDealer,
    deleteDealer,
    getClients,
    createClient,
    updateClient,
    deleteClient,
    getProducts,
    getProductCategories,
    createProduct,
    updateProduct,
    deleteProduct,
    getStock,
    warehouseReceive,
    warehouseSend,
    warehouseReturns,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getMovements
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDashboardStats, "005924e15a630f63e5a4e2a4213b5022b8e808dd65", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getSuppliers, "007d316d726c2caa5328ba6e3725077b1a231e7e24", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createSupplier, "4074f166a992c3695952a098396d7d35ff85d6023d", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateSupplier, "60db3e28b7a37235775b4ed70a6600786956c00332", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteSupplier, "40b699cb21b327e2888dc79c0fbacca5e2f4a2807e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDealers, "005e4ddb3dd2bdb7c66e01527f36923bcdac13075a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getDealer, "40ed58098506f5fb28efcb10c81cbd72b7d6a85e03", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createDealer, "40c43692887f27dc6860c70d56b69668a6b316ea3c", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateDealer, "60ae88f828d4d47fa0b706a13d32533f4f595c28b7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteDealer, "4028d390a5eafc5ca88729ee429ce41747ddf314af", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getClients, "40a0ac766083a0e0cb0f55a6c657f8caa7c9978c3e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createClient, "40702cc101ccd2ba01607320b1c94b6d35093e8e4e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateClient, "60f20978741c5d00c9d1b49f06afa2d2d3dde5c6da", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteClient, "40b3ab95e7a5dbc9964208f6ad520c3fe76a133796", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProducts, "40b1df31ca46dfd2d65ff67223b1e04f154bf947ef", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProductCategories, "0092dd734cbeb1457ee18ea16f151f451ed7e44bf7", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createProduct, "400da4eceb125861ed24c8870b4857bbad08efa11e", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateProduct, "602056f3fc6bd0ef7cfaffb2fd42dc69c94d2afce2", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteProduct, "40170c6e7f7c65bce3ec9dedecca4aaca7705597aa", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getStock, "40b7147435cd2b0c7a166e488d247e299eb403cdf5", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(warehouseReceive, "40708d8952e5119d12b929546cca902cfa13ec9e6a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(warehouseSend, "406e7bc40d12befbffde1a6ea182f5a60a0e4562b8", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(warehouseReturns, "405351a78b1c925b2dedb170a1b38be4c33b689438", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getUsers, "00975dbc6a746ab2442e5f67c98ccb4695707390d6", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createUser, "405bf7ab47deee661b8c4d7940fb20b50c16da2543", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateUser, "603c8db2a1690f8db1bae7bdd53af3c2197a83e87a", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteUser, "4044d3c3614a819ad7c47e2bce5ecadb74d4727fe3", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getMovements, "40efffe9ddc041c51b0040977ef505b91177488c45", null);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/[locale]/(dashboard)/products/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/.next-internal/server/app/[locale]/(dashboard)/products/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/lib/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "0092dd734cbeb1457ee18ea16f151f451ed7e44bf7",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductCategories"],
    "400da4eceb125861ed24c8870b4857bbad08efa11e",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createProduct"],
    "40170c6e7f7c65bce3ec9dedecca4aaca7705597aa",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteProduct"],
    "40b1df31ca46dfd2d65ff67223b1e04f154bf947ef",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProducts"],
    "602056f3fc6bd0ef7cfaffb2fd42dc69c94d2afce2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateProduct"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f5b$locale$5d2f28$dashboard$292f$products$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/[locale]/(dashboard)/products/page/actions.js { ACTIONS_MODULE0 => "[project]/src/lib/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/actions.ts [app-rsc] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f5b$locale$5d2f28$dashboard$292f$products$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__,
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f5b$locale$5d2f28$dashboard$292f$products$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__ca1f740e._.js.map