export const nav = {
  "common.nav.home": "Главная",
  "common.nav.categories": "Категории",
  "common.nav.topics": "Темы",
  "common.nav.trending": "В тренде",
  "common.nav.random": "Случайный",
  "common.nav.about": "О нас",
} as const;

export const footer = {
  "common.footer.features": "Функции",
  "common.footer.resources": "Ресурсы",
  "common.footer.legal": "Юридическая информация",
  "common.footer.privacy": "Политика конфиденциальности",
  "common.footer.terms": "Условия использования",
  "common.footer.copyright": "Все права защищены.",
  "common.footer.madeWith": "Сделано с ❤️ для любителей эмодзи",
  "common.footer.description":
    "Лучшая коллекция эмодзи. Просматривайте, ищите и копируйте тысячи эмодзи мгновенно. 100% бесплатно, без регистрации.",
  "common.footer.allEmojisAvailable": "Все эмодзи доступны",
  "common.footer.browse": "Обзор",
  "common.footer.allEmojis": "Все эмодзи",
  "common.footer.categories": "Категории",
  "common.footer.trending": "В тренде",
  "common.footer.favorites": "Избранное",
  "common.footer.aboutUs": "О нас",
  "common.footer.contact": "Контакты",
  "common.footer.faq": "Частые вопросы",
  "common.footer.blog": "Блог",
  "common.footer.disclaimer": "Отказ от ответственности",
  "common.footer.privacyPolicy": "Политика конфиденциальности",
  "common.footer.termsOfService": "Условия использования",
  "common.footer.smartSearch": "Умный поиск",
  "common.footer.oneClickCopy": "Копирование в один клик",
  "common.footer.multiLanguage": "Многоязычность",
  "common.footer.copyrightText": "Все права защищены.",
  "common.footer.freeNoLoginInstant":
    "100% Бесплатно · Без регистрации · Мгновенное копирование",
  "common.footer.free": "100% Бесплатно",
  "common.footer.noLogin": "Без регистрации",
  "common.footer.instantCopy": "Мгновенное копирование",
} as const;

export const trust = {
  "common.trust.largeCollection": "3000+ Эмодзи",
  "common.trust.instantCopy": "Мгновенное копирование",
  "common.trust.freeForever": "100% Бесплатно",
  "common.trust.noLogin": "Вход не требуется",
  "common.trust.anonymous": "100% Анонимно",
  "common.trust.secure": "Безопасно и зашифровано",
  "common.trust.usersTrust": "1M+ Пользователей доверяют",
} as const;

export const categoryNames = {
  "common.category.all": "Все эмодзи",
  "common.category.smileys-emotion": "Смайлики и эмоции",
  "common.category.people-body": "Люди и тело",
  "common.category.animals-nature": "Животные и природа",
  "common.category.food-drink": "Еда и напитки",
  "common.category.travel-places": "Путешествия и места",
  "common.category.activities": "Деятельность",
  "common.category.objects": "Объекты",
  "common.category.symbols": "Символы",
  "common.category.flags": "Флаги",
} as const;

export const search = {
  "common.search.placeholder": "Поиск эмодзи...",
  "common.search.copied": "Скопировано!",
  "common.search.copy": "Нажмите для копирования",
  "common.search.try": "Попробуйте:",
  "common.search.popular": "Популярные",
  "common.search.trending": "В тренде",
} as const;

export const tabs = {
  "common.tabs.all": "Все",
  "common.tabs.smileys": "Смайлики",
  "common.tabs.people": "Люди",
  "common.tabs.animals": "Животные",
  "common.tabs.food": "Еда",
  "common.tabs.travel": "Путешествия",
  "common.tabs.activities": "Деятельность",
  "common.tabs.objects": "Объекты",
  "common.tabs.symbols": "Символы",
} as const;

export const header = {
  "common.header.categories": "Категории",
  "common.header.topics": "Темы",
  "common.header.allEmojis": "Все эмодзи",
  "common.header.all": "Все",
  "common.header.emojiTopics": "Темы эмодзи",
  "common.header.language": "Язык",
  "common.header.openMenu": "Открыть меню",
  "common.header.closeMenu": "Закрыть меню",
} as const;

export const common = {
  ...nav,
  ...footer,
  ...trust,
  ...categoryNames,
  ...search,
  ...tabs,
  ...header,
} as const;
