import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
    // A list of all locales that are supported
    locales: ['en', 'th', 'lo', 'fr'],

    // Used when no locale matches
    defaultLocale: 'en',

    // Always show locale in URL
    localePrefix: 'always'
});

export const config = {
    // Match only internationalized pathnames
    matcher: ['/', '/(th|en|lo|fr)/:path*']
};
