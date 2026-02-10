(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__50003c52._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/src/messages/ru.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"common":{"appName":"Biznex WM","search":"Поиск...","add":"Добавить","edit":"Редактировать","delete":"Удалить","save":"Сохранить","cancel":"Отмена","confirm":"Подтвердить","actions":"Действия","back":"Назад","loading":"Загрузка...","noData":"Данные не найдены","all":"Все","yes":"Да","no":"Нет","total":"Всего","status":"Статус","date":"Дата","note":"Примечание","success":"Успешно","error":"Ошибка","quantity":"Количество"},"auth":{"login":"Вход","logout":"Выход","loginTitle":"Вход в систему","loginLabel":"Логин","passwordLabel":"Пароль","loginButton":"Войти","loginError":"Неверный логин или пароль"},"nav":{"dashboard":"Главная","products":"Продукты","warehouse":"Склад","warehouseReceive":"Приёмка","warehouseSend":"Отправка","warehouseReturns":"Возвраты","dealers":"Дилеры","clients":"Клиенты","suppliers":"Поставщики","movements":"Журнал движений","users":"Пользователи","settings":"Настройки"},"dashboard":{"title":"Главная","totalProducts":"Всего продуктов","inWarehouse":"На складе","withDealers":"У дилеров","lowStock":"Мало на складе","recentMovements":"Последние движения","byCategory":"По категориям"},"products":{"title":"Продукты","addProduct":"Добавить продукт","category":"Категория","name":"Название","description":"Описание","minStock":"Мин. запас","warehouseQty":"На складе","quantity":"Количество"},"movementType":{"RECEIVE":"Приёмка","SEND":"Отправка","RETURN":"Возврат"},"warehouse":{"title":"Склад","receive":"Приёмка","receiveTitle":"Приёмка от поставщика","receiveDesc":"Добавить продукты на склад","send":"Отправка","sendTitle":"Отправка дилеру","sendDesc":"Отправить продукты со склада дилеру","returns":"Возвраты","returnsTitle":"Приёмка возвратов","returnsDesc":"Принять возвращённые продукты","selectSupplier":"Выберите поставщика","selectDealer":"Выберите дилера","selectDealerOptional":"Выберите дилера (необязательно)","selectProduct":"Выберите продукт","clientInfo":"Данные клиента","clientName":"Имя клиента","clientPhone":"Номер телефона","clientAddress":"Адрес","clearSelection":"Очистить","quantity":"Количество","confirmReceive":"Принять","confirmSend":"Отправить","confirmReturn":"Принять","availableQty":"Доступное кол-во","itemsCount":"продуктов"},"dealers":{"title":"Дилеры","addDealer":"Добавить дилера","name":"Название","contactPerson":"Контактное лицо","phone":"Телефон","address":"Адрес","region":"Регион","stockCount":"Кол-во продуктов","details":"Подробнее"},"clients":{"title":"Клиенты","addClient":"Добавить клиента","name":"Имя","businessName":"Название бизнеса","phone":"Телефон","address":"Адрес","dealer":"Дилер"},"suppliers":{"title":"Поставщики","addSupplier":"Добавить поставщика","name":"Название","contactPerson":"Контактное лицо","phone":"Телефон","address":"Адрес","movementsCount":"Кол-во движений"},"movements":{"title":"Журнал движений","product":"Продукт","type":"Тип","quantity":"Количество","dealer":"Дилер","supplier":"Поставщик","performedBy":"Выполнил","date":"Дата","note":"Примечание"},"users":{"title":"Пользователи","addUser":"Добавить пользователя","name":"Имя","login":"Логин","password":"Пароль","newPassword":"Новый пароль","passwordHint":"Оставьте пустым, чтобы не менять","role":"Роль","phone":"Телефон","dealer":"Дилер","selectRole":"Выберите роль","selectDealer":"Выберите дилера","createdAt":"Создан"},"roles":{"ADMIN":"Администратор","WAREHOUSE_MANAGER":"Кладовщик","DEALER":"Дилер"}});}),
"[project]/src/messages/uz.json (json)", ((__turbopack_context__) => {

__turbopack_context__.v({"common":{"appName":"Biznex WM","search":"Qidirish...","add":"Qo'shish","edit":"Tahrirlash","delete":"O'chirish","save":"Saqlash","cancel":"Bekor qilish","confirm":"Tasdiqlash","actions":"Amallar","back":"Orqaga","loading":"Yuklanmoqda...","noData":"Ma'lumot topilmadi","all":"Barchasi","yes":"Ha","no":"Yo'q","total":"Jami","status":"Holat","date":"Sana","note":"Izoh","success":"Muvaffaqiyatli","error":"Xatolik","quantity":"Miqdor"},"auth":{"login":"Kirish","logout":"Chiqish","loginTitle":"Tizimga kirish","loginLabel":"Login","passwordLabel":"Parol","loginButton":"Kirish","loginError":"Login yoki parol noto'g'ri"},"nav":{"dashboard":"Bosh sahifa","products":"Mahsulotlar","warehouse":"Omborxona","warehouseReceive":"Qabul qilish","warehouseSend":"Yuborish","warehouseReturns":"Qaytarishlar","dealers":"Dillerlar","clients":"Mijozlar","suppliers":"Yetkazib beruvchilar","movements":"Harakatlar jurnali","users":"Foydalanuvchilar","settings":"Sozlamalar"},"dashboard":{"title":"Bosh sahifa","totalProducts":"Jami mahsulotlar","inWarehouse":"Omborxonada","withDealers":"Dillerlarda","lowStock":"Kam zaxira","recentMovements":"So'nggi harakatlar","byCategory":"Kategoriya bo'yicha"},"products":{"title":"Mahsulotlar","addProduct":"Mahsulot qo'shish","category":"Kategoriya","name":"Nomi","description":"Tavsif","minStock":"Min. zaxira","warehouseQty":"Omborxonada","quantity":"Miqdor"},"movementType":{"RECEIVE":"Qabul","SEND":"Yuborish","RETURN":"Qaytarish"},"warehouse":{"title":"Omborxona","receive":"Qabul qilish","receiveTitle":"Yetkazib beruvchidan qabul qilish","receiveDesc":"Mahsulotlarni omborxonaga kiritish","send":"Yuborish","sendTitle":"Dillerga yuborish","sendDesc":"Omborxonadan dillerga mahsulot yuborish","returns":"Qaytarishlar","returnsTitle":"Qaytarishlarni qabul qilish","returnsDesc":"Qaytarilgan mahsulotlarni qabul qilish","selectSupplier":"Yetkazib beruvchini tanlang","selectDealer":"Dillerni tanlang","selectDealerOptional":"Dillerni tanlang (ixtiyoriy)","selectProduct":"Mahsulotni tanlang","clientInfo":"Mijoz ma'lumotlari","clientName":"Mijoz ismi","clientPhone":"Telefon raqami","clientAddress":"Manzil","clearSelection":"Tozalash","quantity":"Miqdor","confirmReceive":"Qabul qilish","confirmSend":"Yuborish","confirmReturn":"Qabul qilish","availableQty":"Mavjud miqdor","itemsCount":"ta mahsulot"},"dealers":{"title":"Dillerlar","addDealer":"Diller qo'shish","name":"Nomi","contactPerson":"Mas'ul shaxs","phone":"Telefon","address":"Manzil","region":"Hudud","stockCount":"Mahsulotlar soni","details":"Batafsil"},"clients":{"title":"Mijozlar","addClient":"Mijoz qo'shish","name":"Ism","businessName":"Biznes nomi","phone":"Telefon","address":"Manzil","dealer":"Diller"},"suppliers":{"title":"Yetkazib beruvchilar","addSupplier":"Yetkazib beruvchi qo'shish","name":"Nomi","contactPerson":"Mas'ul shaxs","phone":"Telefon","address":"Manzil","movementsCount":"Harakatlar soni"},"movements":{"title":"Harakatlar jurnali","product":"Mahsulot","type":"Turi","quantity":"Miqdor","dealer":"Diller","supplier":"Yetkazib beruvchi","performedBy":"Bajargan","date":"Sana","note":"Izoh"},"users":{"title":"Foydalanuvchilar","addUser":"Foydalanuvchi qo'shish","name":"Ism","login":"Login","password":"Parol","newPassword":"Yangi parol","passwordHint":"Bo'sh qoldirsangiz o'zgarmaydi","role":"Rol","phone":"Telefon","dealer":"Diller","selectRole":"Rolni tanlang","selectDealer":"Dillerni tanlang","createdAt":"Yaratilgan"},"roles":{"ADMIN":"Administrator","WAREHOUSE_MANAGER":"Omborchi","DEALER":"Diller"}});}),
"[project]/src/i18n/request.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/server/react-server/getRequestConfig.js [middleware-edge] (ecmascript) <export default as getRequestConfig>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/routing.ts [middleware-edge] (ecmascript)");
;
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$server$2f$react$2d$server$2f$getRequestConfig$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__getRequestConfig$3e$__["getRequestConfig"])(async ({ requestLocale })=>{
    let locale = await requestLocale;
    if (!locale || !__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"].locales.includes(locale)) {
        locale = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"].defaultLocale;
    }
    return {
        locale,
        messages: (await __turbopack_context__.f({
            "../messages/ru.json": {
                id: ()=>"[project]/src/messages/ru.json (json)",
                module: ()=>Promise.resolve().then(()=>__turbopack_context__.i("[project]/src/messages/ru.json (json)"))
            },
            "../messages/uz.json": {
                id: ()=>"[project]/src/messages/uz.json (json)",
                module: ()=>Promise.resolve().then(()=>__turbopack_context__.i("[project]/src/messages/uz.json (json)"))
            }
        }).import(`../messages/${locale}.json`)).default
    };
});
}),
"[project]/src/i18n/routing.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link",
    ()=>Link,
    "getPathname",
    ()=>getPathname,
    "redirect",
    ()=>redirect,
    "routing",
    ()=>routing,
    "usePathname",
    ()=>usePathname,
    "useRouter",
    ()=>useRouter
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/routing/defineRouting.js [middleware-edge] (ecmascript) <export default as defineRouting>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/navigation/react-server/createNavigation.js [middleware-edge] (ecmascript) <export default as createNavigation>");
;
;
const routing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$routing$2f$defineRouting$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__defineRouting$3e$__["defineRouting"])({
    locales: [
        "uz",
        "ru"
    ],
    defaultLocale: "uz"
});
const { Link, redirect, usePathname, useRouter, getPathname } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$navigation$2f$react$2d$server$2f$createNavigation$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$export__default__as__createNavigation$3e$__["createNavigation"])(routing);
}),
"[project]/src/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "default",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-intl/dist/esm/development/middleware/middleware.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-auth/jwt/index.js [middleware-edge] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/i18n/routing.ts [middleware-edge] (ecmascript)");
;
;
;
;
const intlMiddleware = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$intl$2f$dist$2f$esm$2f$development$2f$middleware$2f$middleware$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["default"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"]);
const publicPages = [
    "/login"
];
async function middleware(req) {
    const pathname = req.nextUrl.pathname;
    // Skip API routes
    if (pathname.startsWith("/api")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
    }
    // Check if the page is public
    const pathnameWithoutLocale = pathname.replace(/^\/(uz|ru)/, "") || "/";
    const isPublicPage = publicPages.includes(pathnameWithoutLocale);
    // Apply intl middleware first
    const intlResponse = intlMiddleware(req);
    if (isPublicPage) {
        return intlResponse;
    }
    // Check authentication for protected pages
    const token = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$auth$2f$jwt$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["getToken"])({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });
    if (!token) {
        const locale = pathname.match(/^\/(uz|ru)/)?.[1] || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$i18n$2f$routing$2e$ts__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["routing"].defaultLocale;
        const loginUrl = new URL(`/${locale}/login`, req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(loginUrl);
    }
    return intlResponse;
}
const config = {
    matcher: [
        "/((?!_next|api/auth|favicon.ico|.*\\.).*)"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__50003c52._.js.map