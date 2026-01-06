export const topic = {
  "topic.indexTitle": "Темы эмодзи",
  "topic.indexDescription":
    "Изучите красивые комбинации эмодзи, организованные по темам. Нажмите на любую тему, чтобы просмотреть её эмодзи-арт и комбинации.",
  "topic.tapToCopy": "Нажмите для копирования",
  "topic.longPress": "Долгое нажатие для выбора нескольких",
  "topic.relatedTopics": "Связанные темы",
  "topic.primaryEmoji": "основной эмодзи",
  "topic.primaryEmojis": "основных эмодзи",
  "topic.combinations": "комбинация",
  "topic.combinationsCount": "{count} комбинация{plural}",
  "topic.noResults": "Комбинации не найдены для",
  "topic.popularity": "Популярность:",
  "topic.browseEmojis":
    "Просматривайте и копируйте комбинации эмодзи {topicName}.",
  "topic.clickToCopy": "Нажмите на любую комбинацию, чтобы скопировать её.",
  "topic.browseCategory":
    "Просматривайте и копируйте {categoryName}. Нажмите на любой эмодзи, чтобы скопировать его.",
} as const;

export const category = {
  "category.browseAndCopy":
    "Просматривайте и копируйте {categoryName}. Нажмите на любой эмодзи, чтобы скопировать его.",
} as const;

export const topicPage = {
  "topicPage.features.mainTitle": "Функции",
  "topicPage.features.mainTitle2": "Всё, что вам нужно",
  "topicPage.features.mainTitle3": "Для превосходства эмодзи",
  "topicPage.features.mainDesc":
    "Мощные инструменты для открытия, организации и эффективного использования эмодзи.",
  "topicPage.features.browseTitle": "Просмотр всех категорий",
  "topicPage.features.browseSubtitle": "Изучите все типы эмодзи",
  "topicPage.features.browseDesc":
    "Просматривайте эмодзи, организованные по категориям: Смайлики, Сердца, Жесты, Природа, Еда, Активности, Путешествия, Предметы и Символы.",
  "topicPage.features.browseList": [
    "9 основных категорий",
    "Сотни подкатегорий",
    "Лёгкая навигация",
    "Быстрый доступ к избранному",
  ],
  "topicPage.features.searchTitle": "Умный поиск",
  "topicPage.features.searchSubtitle": "Мгновенно находите эмодзи",
  "topicPage.features.searchDesc":
    "Ищите эмодзи по названию, ключевому слову или описанию. Наш умный поиск находит идеальный эмодзи для любой ситуации.",
  "topicPage.features.searchList": [
    "Поиск по ключевому слову",
    "Соответствие синонимов",
    "Мгновенные результаты",
    "История поиска",
  ],
  "topicPage.features.copyTitle": "Копирование в один клик",
  "topicPage.features.copySubtitle": "Копируйте одним касанием",
  "topicPage.features.copyDesc":
    "Нажмите на любой эмодзи, чтобы мгновенно скопировать его в буфер обмена. Вставьте куда угодно - в чаты, соцсети, документы и многое другое.",
  "topicPage.features.copyList": [
    "Мгновенное копирование",
    "Уведомление о копировании",
    "Режим пакетного копирования",
    "Горячие клавиши",
  ],
  "topicPage.features.favoritesTitle": "Коллекция избранного",
  "topicPage.features.favoritesSubtitle": "Сохраните любимые эмодзи",
  "topicPage.features.favoritesDesc":
    "Создайте личную коллекцию любимых эмодзи. Получите мгновенный доступ к ним в разделе избранного.",
  "topicPage.features.favoritesList": [
    "Безлимитное избранное",
    "Быстрый доступ",
    "Синхронизация между устройствами",
    "Возможность экспорта",
  ],
  "topicPage.features.privacyTitle": "Конфиденциальность превыше всего",
  "topicPage.features.privacyDesc":
    "Без отслеживания, без сбора данных. Ваш просмотр остаётся полностью конфиденциальным.",
  "topicPage.features.speedTitle": "Сверхбыстрый",
  "topicPage.features.speedDesc":
    "Оптимизировано для скорости. Находите и копируйте эмодзи за миллисекунды.",
  "topicPage.features.mobileTitle": "Дружелюбный к мобильным",
  "topicPage.features.mobileDesc":
    "Идеально работает на всех устройствах - телефоне, планшете или компьютере.",
  "topicPage.features.updatedTitle": "Всегда обновляется",
  "topicPage.features.updatedDesc":
    "Новые эмодзи добавляются регулярно по мере выпуска Unicode.",
  "topicPage.features.langTitle": "Многоязычный",
  "topicPage.features.langDesc":
    "Поддержка нескольких языков и региональных вариантов эмодзи.",
  "topicPage.features.noAccountTitle": "Аккаунт не нужен",
  "topicPage.features.noAccountDesc":
    "Используйте сразу без регистрации. Без входа, без паролей.",
} as const;

export const topics = {
  ...topic,
  ...topicPage,
} as const;
