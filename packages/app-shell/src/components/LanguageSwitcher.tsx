import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css';

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'hi', name: 'हिंदी', flag: '🇮🇳' }
    ];

    const changeLanguage = (languageCode: string) => {
        i18n.changeLanguage(languageCode);
    };

    return (
        <div className="language-switcher">
            <select
                value={i18n.language}
                onChange={(e) => changeLanguage(e.target.value)}
                className="language-select"
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                    </option>
                ))}
            </select>
        </div>
    );
};
