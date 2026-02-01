import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import '../globals.css';

const locales = ['en', 'th', 'lo', 'fr'];

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout(props: Props) {
    const params = await props.params;
    const { locale } = params;

    // Ensure that the incoming `locale` is valid
    if (!locales.includes(locale)) {
        notFound();
    }

    // Providing all messages to the client side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <Navbar />
                    <main>{props.children}</main>
                    <Footer />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
