import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'ja' | 'en';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple dictionary for key UI terms
const translations: Record<string, Record<Language, string>> = {
    // Navigation
    'nav.home': { ja: 'HOME', en: 'HOME' },
    'nav.about': { ja: 'ABOUT', en: 'ABOUT' },
    'nav.works': { ja: 'WORKS', en: 'WORKS' },
    'nav.schedule': { ja: 'SCHEDULE', en: 'SCHEDULE' },
    'nav.videos': { ja: 'VIDEOS', en: 'VIDEOS' },
    'nav.lesson': { ja: 'LESSON', en: 'LESSON' },
    'nav.contact': { ja: 'CONTACT', en: 'CONTACT' },

    // Home
    'home.scroll': { ja: 'SCROLL', en: 'SCROLL' },
    'home.view_more': { ja: 'VIEW MORE', en: 'VIEW MORE' },

    // Contact
    'contact.name': { ja: 'お名前', en: 'Name' },
    'contact.email': { ja: 'メールアドレス', en: 'Email' },
    'contact.message': { ja: 'メッセージ', en: 'Message' },
    'contact.send': { ja: '送信', en: 'Send' },
    'contact.sending': { ja: '送信中...', en: 'Sending...' },
    'contact.sent': { ja: '送信完了', en: 'Sent' },

    // Lesson
    'lesson.title': { ja: 'LESSON', en: 'LESSON' },
    'lesson.description': {
        ja: '初心者からプロフェッショナルを目指す方まで、一人ひとりの目標と感性に寄り添った丁寧な指導を行います。東京・奈良を拠点に、国内・海外での経験を活かしたアドバイスをさせていただきます。オンラインレッスンにも対応していますので、お気軽にご相談ください。',
        en: 'I provide careful instruction tailored to each individual\'s goals and sensibilities, from beginners to those aiming for a professional career. Based in Tokyo and Nara, I offer advice drawing on my experience in Japan and abroad. Online lessons are also available, so please feel free to consult with me.'
    },
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
    const [language, setLanguage] = useState<Language>('ja');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ja' ? 'en' : 'ja');
    };

    const t = (key: string): string => {
        return translations[key]?.[language] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
