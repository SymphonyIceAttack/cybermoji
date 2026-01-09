import type { FAQPage, WithContext } from "schema-dts";
import type { LanguageType } from "@/lib/translations";

interface FAQStructuredDataProps {
  lang: LanguageType;
}

export function FAQStructuredData({ lang }: FAQStructuredDataProps) {
  const faqSchema: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: getFAQItems(lang),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />
  );
}

interface FAQItem {
  "@type": "Question";
  name: string;
  acceptedAnswer: {
    "@type": "Answer";
    text: string;
  };
}

function getFAQItems(lang: LanguageType): FAQItem[] {
  const faqData: Record<LanguageType, Array<{ q: string; a: string }>> = {
    en: [
      {
        q: "How many emojis are available?",
        a: "Cybermoji features thousands of emojis across all categories. We regularly update our collection to include new emoji releases from Unicode as soon as they become available.",
      },
      {
        q: "Can I copy multiple emojis at once?",
        a: "Yes! You can click on multiple emojis to add them to your clipboard. Simply click each emoji you want, then paste them all at once wherever you need them.",
      },
      {
        q: "Do the emojis work on all devices?",
        a: "Yes! Our emojis are standard Unicode characters that work on all modern devices - iPhone, Android, Windows, Mac, and Linux. However, older devices may not display the newest emojis.",
      },
      {
        q: "Can I search for emojis by keyword?",
        a: "Absolutely! Use the search bar to find emojis by keyword, name, or description. Try searching for concepts like 'happy', 'fire', 'love', or 'party' to find relevant emojis.",
      },
      {
        q: "Where can I use these emojis?",
        a: "You can use our emojis anywhere that supports Unicode characters: social media (Twitter, Facebook, Instagram, TikTok), messaging apps (WhatsApp, Telegram, Discord), emails, documents, and websites.",
      },
      {
        q: "Why don't some emojis show up correctly?",
        a: "Emoji display depends on your device's operating system and browser. Newer emojis may not appear on older devices. Try updating your OS or using a different device/browser if an emoji looks like a question mark or box.",
      },
      {
        q: "Are these emojis free to use?",
        a: "Yes! All emojis in our collection are standard Unicode characters, which are free to use. There are no copyright restrictions on using emojis in your communications.",
      },
      {
        q: "Can I use these emojis in my app or website?",
        a: "Yes! Since these are standard Unicode characters, you can use them freely in your applications and websites without any licensing requirements.",
      },
      {
        q: "Is Cybermoji free to use?",
        a: "Yes! Cybermoji is completely free. All features including search, browsing, favorites, and copying emojis are available at no cost.",
      },
      {
        q: "Do I need to create an account?",
        a: "No account is required! You can browse, search, and copy emojis immediately without any registration or login.",
      },
      {
        q: "How do I save my favorite emojis?",
        a: "Click the star icon on any emoji to add it to your favorites collection. Your favorites are saved in your browser for quick access on future visits.",
      },
      {
        q: "Does Cybermoji work on mobile?",
        a: "Yes! Cybermoji is fully responsive and works perfectly on all devices including smartphones and tablets.",
      },
    ],
    zh: [
      {
        q: "有多少个表情可用？",
        a: "Cybermoji 提供涵盖所有类别的数千个表情。我们会定期更新集合，以便在 Unicode 发布新表情后立即将其添加进来。",
      },
      {
        q: "我可以一次复制多个表情吗？",
        a: "是的！您可以点击多个表情将它们添加到剪贴板。只需点击您想要的表情，然后一次性粘贴到任何需要的地方。",
      },
      {
        q: "表情在所有设备上都能使用吗？",
        a: "是的！我们的表情是标准的 Unicode 字符，可以在所有现代设备上使用——iPhone、Android、Windows、Mac 和 Linux。但是，较旧的设备可能无法显示最新的表情。",
      },
      {
        q: "我可以按关键词搜索表情吗？",
        a: "当然可以！使用搜索栏按关键词、名称或描述查找表情。尝试搜索 'happy'、'fire'、'love' 或 'party' 等概念来找到相关的表情。",
      },
      {
        q: "在哪里可以使用这些表情？",
        a: "您可以在任何支持 Unicode 字符的地方使用我们的表情：社交媒体（Twitter、Facebook、Instagram、TikTok）、即时通讯应用（WhatsApp、Telegram、Discord）、电子邮件、文档和网站。",
      },
      {
        q: "为什么某些表情显示不正确？",
        a: "表情显示取决于您设备的操作系统和浏览器。较新的表情可能不会出现在较旧的设备上。如果表情显示为问号或方框，请尝试更新操作系统或使用其他设备/浏览器。",
      },
      {
        q: "这些表情可以免费使用吗？",
        a: "是的！我们集合中的所有表情都是标准的 Unicode 字符，可以免费使用。在您的通讯中使用表情没有版权限制。",
      },
      {
        q: "我可以在我的应用或网站中使用这些表情吗？",
        a: "是的！由于这些是标准的 Unicode 字符，您可以在应用程序和网站中自由使用它们，无需任何许可要求。",
      },
      {
        q: "Cybermoji 可以免费使用吗？",
        a: "是的！Cybermoji 完全免费。所有功能包括搜索、浏览、收藏和复制表情均可免费使用。",
      },
      {
        q: "我需要创建账户吗？",
        a: "不需要账户！您可以立即浏览、搜索和复制表情，无需任何注册或登录。",
      },
      {
        q: "如何保存我喜欢的表情？",
        a: "点击任何表情上的星号图标将其添加到收藏夹。您的收藏保存在浏览器中，以便将来快速访问。",
      },
      {
        q: "Cybermoji 可以在移动设备上使用吗？",
        a: "是的！Cybermoji 完全响应式，可以在包括智能手机和平板电脑在内的所有设备上完美运行。",
      },
    ],
    fr: [
      {
        q: "Combien d'emoji sont disponibles ?",
        a: "Cybermoji propose des milliers d'emoji dans toutes les catégories. Nous mettons régulièrement à jour notre collection pour inclure les nouvelles versions d'emoji Unicode dès qu'elles sont disponibles.",
      },
      {
        q: "Puis-je copier plusieurs emoji à la fois ?",
        a: "Oui ! Vous pouvez cliquer sur plusieurs emoji pour les ajouter à votre presse-papiers. Cliquez simplement sur chaque emoji que vous voulez, puis collez-les tous en une seule fois où vous en avez besoin.",
      },
      {
        q: "Les emoji fonctionnent-ils sur tous les appareils ?",
        a: "Oui ! Nos emoji sont des caractères Unicode standard qui fonctionnent sur tous les appareils modernes - iPhone, Android, Windows, Mac et Linux. Cependant, les appareils plus anciens peuvent ne pas afficher les emoji les plus récents.",
      },
      {
        q: "Puis-je rechercher des emoji par mot-clé ?",
        a: "Absolument ! Utilisez la barre de recherche pour trouver des emoji par mot-clé, nom ou description. Essayez de rechercher des concepts comme 'happy', 'fire', 'love' ou 'party' pour trouver des emoji pertinents.",
      },
      {
        q: "Où puis-je utiliser ces emoji ?",
        a: "Vous pouvez utiliser nos emoji partout qui prend en charge les caractères Unicode : réseaux sociaux (Twitter, Facebook, Instagram, TikTok), applications de messagerie (WhatsApp, Telegram, Discord), e-mails, documents et sites Web.",
      },
      {
        q: "Pourquoi certains emoji ne s'affichent-ils pas correctement ?",
        a: "L'affichage des emoji dépend du système d'exploitation et du navigateur de votre appareil. Les emoji plus récents peuvent ne pas apparaître sur les appareils plus anciens. Essayez de mettre à jour votre système d'exploitation ou d'utiliser un autre appareil/navigateur si un emoji ressemble à un point d'interrogation ou une boîte.",
      },
      {
        q: "Ces emoji sont-ils gratuits à utiliser ?",
        a: "Oui ! Tous les emoji de notre collection sont des caractères Unicode standard, qui sont gratuits à utiliser. Il n'y a pas de restrictions de copyright sur l'utilisation des emoji dans vos communications.",
      },
      {
        q: "Puis-je utiliser ces emoji dans mon application ou site Web ?",
        a: "Oui ! Comme ce sont des caractères Unicode standard, vous pouvez les utiliser librement dans vos applications et sites Web sans aucune exigence de licence.",
      },
      {
        q: "Cybermoji est-il gratuit ?",
        a: "Oui ! Cybermoji est completamente gratuit. Toutes les fonctionnalités包括 la recherche, la navigation, les favoris et la copie d'emoji sont disponibles sans frais.",
      },
      {
        q: "Dois-je créer un compte ?",
        a: "Aucun compte requis ! Vous pouvez naviguer, rechercher et copier des emoji immédiatement sans inscription ni connexion.",
      },
      {
        q: "Comment puis-je enregistrer mes emoji favoris ?",
        a: "Cliquez sur l'icône étoile sur n'importe quel emoji pour l'ajouter à votre collection de favoris. Vos favoris sont enregistrés dans votre navigateur pour un accès rapide lors de vos prochaines visites.",
      },
      {
        q: "Cybermoji fonctionne-t-il sur mobile ?",
        a: "Oui ! Cybermoji est entièrement réactif et fonctionne parfaitement sur tous les appareils, y compris les smartphones et les tablettes.",
      },
    ],
    es: [
      {
        q: "¿Cuántos emoji están disponibles?",
        a: "Cybermoji presenta miles de emoji en todas las categorías. Actualizamos regularmente nuestra colección para incluir los nuevos lanzamientos de emoji de Unicode tan pronto como estén disponibles.",
      },
      {
        q: "¿Puedo copiar varios emoji a la vez?",
        a: "¡Sí! Puedes hacer clic en varios emoji para agregarlos a tu portapapeles. Simplemente haz clic en cada emoji que quieras y luego pégalos todos de una vez donde los necesites.",
      },
      {
        q: "¿Los emoji funcionan en todos los dispositivos?",
        a: "¡Sí! Nuestros emoji son caracteres Unicode estándar que funcionan en todos los dispositivos modernos: iPhone, Android, Windows, Mac y Linux. Sin embargo, los dispositivos más antiguos pueden no mostrar los emoji más recientes.",
      },
      {
        q: "¿Puedo buscar emoji por palabra clave?",
        a: "¡Claro! Usa la barra de búsqueda para encontrar emoji por palabra clave, nombre o descripción. Intenta buscar conceptos como 'happy', 'fire', 'love' o 'party' para encontrar emoji relevantes.",
      },
      {
        q: "¿Dónde puedo usar estos emoji?",
        a: "Puedes usar nuestros emoji en cualquier lugar que admita caracteres Unicode: redes sociales (Twitter, Facebook, Instagram, TikTok), aplicaciones de mensajería (WhatsApp, Telegram, Discord), correos electrónicos, documentos y sitios web.",
      },
      {
        q: "¿Por qué algunos emoji no se muestran correctamente?",
        a: "La visualización de emoji depende del sistema operativo y navegador de tu dispositivo. Es posible que los emoji más recientes no aparezcan en dispositivos más antiguos. Intenta actualizar tu sistema operativo o usar un dispositivo/navegador diferente si un emoji se ve como un signo de interrogación o cuadro.",
      },
      {
        q: "¿Estos emoji son gratuitos para usar?",
        a: "¡Sí! Todos los emoji de nuestra colección son caracteres Unicode estándar, que son gratuitos para usar. No hay restricciones de derechos de autor sobre el uso de emoji en tus comunicaciones.",
      },
      {
        q: "¿Puedo usar estos emoji en mi aplicación o sitio web?",
        a: "¡Sí! Como estos son caracteres Unicode estándar, puedes usarlos libremente en tus aplicaciones y sitios web sin ningún requisito de licencia.",
      },
      {
        q: "¿Cybermoji es gratuito?",
        a: "¡Sí! Cybermoji es completamente gratuito. Todas las funciones, incluyendo búsqueda, navegación, favoritos y copia de emoji, están disponibles sin costo.",
      },
      {
        q: "¿Necesito crear una cuenta?",
        a: "¡No se requiere cuenta! Puedes navegar, buscar y copiar emoji inmediatamente sin registro ni inicio de sesión.",
      },
      {
        q: "¿Cómo guardo mis emoji favoritos?",
        a: "Haz clic en el icono de estrella en cualquier emoji para agregarlo a tu colección de favoritos. Tus favoritos se guardan en tu navegador para acceso rápido en visitas futuras.",
      },
      {
        q: "¿Cybermoji funciona en dispositivos móviles?",
        a: "¡Sí! Cybermoji es completamente responsivo y funciona perfectamente en todos los dispositivos, incluyendo teléfonos inteligentes y tabletas.",
      },
    ],
    de: [
      {
        q: "Wie viele Emoji sind verfügbar?",
        a: "Cybermoji bietet Tausende von Emoji in allen Kategorien. Wir aktualisieren unsere Sammlung regelmäßig, um neue Emoji-Veröffentlichungen von Unicode aufzunehmen, sobald sie verfügbar sind.",
      },
      {
        q: "Kann ich mehrere Emoji auf einmal kopieren?",
        a: "Ja! Sie können auf mehrere Emoji klicken, um sie zu Ihrer Zwischenablage hinzuzufügen. Klicken Sie einfach auf jedes gewünschte Emoji und fügen Sie sie dann alle auf einmal ein.",
      },
      {
        q: "Funktionieren die Emoji auf allen Geräten?",
        a: "Ja! Unsere Emoji sind Standard-Unicode-Zeichen, die auf allen modernen Geräten funktionieren - iPhone, Android, Windows, Mac und Linux. Ältere Geräte zeigen möglicherweise die neuesten Emoji nicht an.",
      },
      {
        q: "Kann ich Emoji nach Schlüsselwort suchen?",
        a: "Absolut! Verwenden Sie die Suchleiste, um Emoji nach Schlüsselwort, Name oder Beschreibung zu finden. Versuchen Sie, nach Konzepten wie 'happy', 'fire', 'love' oder 'party' zu suchen, um relevante Emoji zu finden.",
      },
      {
        q: "Wo kann ich diese Emoji verwenden?",
        a: "Sie können unsere Emoji überall verwenden, wo Unicode-Zeichen unterstützt werden: soziale Medien (Twitter, Facebook, Instagram, TikTok), Messaging-Apps (WhatsApp, Telegram, Discord), E-Mails, Dokumente und Websites.",
      },
      {
        q: "Warum werden einige Emoji nicht korrekt angezeigt?",
        a: "Die Emoji-Anzeige hängt von Ihrem Geräte-Betriebssystem und Browser ab. Neuere Emoji werden auf älteren Geräten möglicherweise nicht angezeigt. Versuchen Sie, Ihr Betriebssystem zu aktualisieren oder ein anderes Gerät/ einen anderen Browser zu verwenden, wenn ein Emoji wie ein Fragezeichen oder Kästchen aussieht.",
      },
      {
        q: "Sind diese Emoji kostenlos zu verwenden?",
        a: "Ja! Alle Emoji in unserer Sammlung sind Standard-Unicode-Zeichen, die kostenlos zu verwenden sind. Es gibt keine Urheberrechtsbeschränkungen für die Verwendung von Emoji in Ihrer Kommunikation.",
      },
      {
        q: "Kann ich diese Emoji in meiner App oder Website verwenden?",
        a: "Ja! Da dies Standard-Unicode-Zeichen sind, können Sie sie frei in Ihren Anwendungen und Websites ohne Lizenzanforderungen verwenden.",
      },
      {
        q: "Ist Cybermoji kostenlos?",
        a: "Ja! Cybermoji ist completely kostenlos. Alle Funktionen einschließlich Suche, Browsen, Favoriten und Kopieren von Emoji sind ohne Kosten verfügbar.",
      },
      {
        q: "Muss ich ein Konto erstellen?",
        a: "Kein Konto erfordert! Sie können sofort Emoji durchsuchen, suchen und kopieren ohne Registrierung oder Anmeldung.",
      },
      {
        q: "Wie speichere ich meine Lieblings-Emoji?",
        a: "Klicken Sie auf das Sternsymbol auf einem beliebigen Emoji, um es zu Ihrer Favoritensammlung hinzuzufügen. Ihre Favoriten werden in Ihrem Browser für schnellen Zugriff bei zukünftigen Besuchen gespeichert.",
      },
      {
        q: "Funktioniert Cybermoji auf dem Handy?",
        a: "Ja! Cybermoji ist vollständig reaktionsfähig und funktioniert perfekt auf allen Geräten einschließlich Smartphones und Tablets.",
      },
    ],
    ja: [
      {
        q: "何個の絵文字が利用可能ですか？",
        a: "Cybermoji は全カテゴリの何千もの絵文字を提供します。Unicode による新しい絵文字のリリースが利用可能になり次第、定期的にコレクションを更新して追加しています。",
      },
      {
        q: "複数の絵文字を一度にコピーできますか？",
        a: "はい！複数の絵をクリックしてクリップボードに追加できます。 원하는絵文字を順番にクリックしてから、必要な場所に一度にすべて貼り付けるだけです。",
      },
      {
        q: "絵文字はすべてのデバイスで動作しますか？",
        a: "はい！私たちの絵文字は、すべての最新デバイス（iPhone、Android、Windows、Mac、Linux）で動作する標準の Unicode 文字です。ただし古いデバイスでは最新の絵文字が表示されない場合があります。",
      },
      {
        q: "キーワードで絵文字を検索できますか？",
        a: "もちろんです！検索バーを使用して、キーワード、名前、または説明で絵文字を検索してください。'happy'、'fire'、'love'、'party' などの概念を検索して、関連する絵文字を見つけてみましょう。",
      },
      {
        q: "どこでこれらの絵文字を使用できますか？",
        a: "Unicode 文字をサポートする場所ならどこでも絵文字を使用できます：ソーシャルメディア（Twitter、Facebook、Instagram、TikTok）、メッセージングアプリ（WhatsApp、Telegram、Discord）、メール、ドキュメント、ウェブサイトなど。",
      },
      {
        q: "一部の絵文字が正しく表示されないのはなぜですか？",
        a: "絵文字の表示は、デバイスのオペレーティングシステムとブラウザに依存します。新しい絵文字は古いデバイスに表示されない場合があります。絵文字が疑問符や四角形に見える場合は、OS を更新するか、別のデバイス/ブラウザを試してください。",
      },
      {
        q: "これらの絵文字は無料で使用できますか？",
        a: "はい！私たちのコレクションのすべての絵文字は、無料で使用できる標準の Unicode 文字です。コミュニケーションで絵文字を使用することに対する著作権制限はありません。",
      },
      {
        q: "これらの絵文字をアプリやウェブサイトで使用できますか？",
        a: "はい！これらは標準の Unicode 文字なので、ライセンス要件なしでアプリケーションやサイトで自由に 사용할ことができます。",
      },
      {
        q: "Cybermoji は無料で使用できますか？",
        a: "はい！Cybermoji は完全に無料です。検索、閲覧、お気に入りの保存、絵文字のコピーを含むすべての機能が無料で利用可能です。",
      },
      {
        q: "アカウントを作成する必要がありますか？",
        a: "アカウントは不要です！登録やログインなしに、即座に絵文字を閲覧、検索、コピーできます。",
      },
      {
        q: "お気に入り絵文字を保存するにはどうすればよいですか？",
        a: "任意のお絵文字の星アイコンをクリックして、お気に入りコレクションに追加します。お気に入りはブラウザに保存され、将来のアクセス時に素早く利用できるようになります。",
      },
      {
        q: "Cybermoji はモバイルで動作しますか？",
        a: "はい！Cybermoji は完全にレスポンシブで、スマートフォンやタブレットを含むすべてのデバイスで完璧に動作します。",
      },
    ],
    ko: [
      {
        q: "사용 가능한 이모지는 몇 개인가요?",
        a: "Cybermoji는 모든 카테고리에 수천 개의 이모지를 제공합니다. Unicode에서 새로운 이모지 릴리스가 제공되면 즉시 컬렉션을 업데이트합니다.",
      },
      {
        q: "여러 이모지를 한 번에 복사할 수 있나요?",
        a: "네! 여러 이모지를 클릭하여 클립보드에 추가할 수 있습니다. 원하는 이모지를 순서대로 클릭한 다음 필요한 곳에 한 번에 모두 붙여넣으세요.",
      },
      {
        q: "이모지는 모든 기기에서 작동하나요?",
        a: "네! 우리의 이모지는 모든 최신 기기(iPhone, Android, Windows, Mac, Linux)에서 작동하는 표준 유니코드 문자입니다. 그러나 이전 기기에서는 최신 이모지가 표시되지 않을 수 있습니다.",
      },
      {
        q: "키워드로 이모지를 검색할 수 있나요?",
        a: "물론입니다! 검색창을 사용하여 키워드, 이름 또는 설명으로 이모지를 검색하세요. 'happy', 'fire', 'love', 'party' 등의 개념을 검색하여 관련 이모지를 찾아보세요.",
      },
      {
        q: "이 이모지는 어디에서 사용할 수 있나요?",
        a: "유니코드 문자를 지원하는 곳이면 어디서나 이모지를 사용할 수 있습니다: 소셜 미디어(Twitter, Facebook, Instagram, TikTok), 메시징 앱(WhatsApp, Telegram, Discord), 이메일, 문서, 웹사이트 등.",
      },
      {
        q: "일부 이모지가 올바르게 표시되지 않는 이유는 무엇인가요?",
        a: "이모지 표시는 기기의 운영체제와 브라우저에 따라 다릅니다. 최신 이모지는 이전 기기에 표시되지 않을 수 있습니다. 이모지가 물음표나 상자로 보이면 OS를 업데이트하거나 다른 기기/브라우저를 사용해 보세요.",
      },
      {
        q: "이 이모지는 무료로 사용할 수 있나요?",
        a: "네! 컬렉션의 모든 이모지는 무료로 사용할 수 있는 표준 유니코드 문자입니다. 커뮤니케이션에서 이모지를 사용하는 것에 대한 저작권 제한은 없습니다.",
      },
      {
        q: "이 이모지를 앱이나 웹사이트에서 사용할 수 있나요?",
        a: "네! 이것들은 표준 유니코드 문자이므로 라이선스 요구 사항 없이 앱과 웹사이트에서 자유롭게 사용할 수 있습니다.",
      },
      {
        q: "Cybermoji는 무료인가요?",
        a: "네! Cybermoji는 완전히 무료입니다. 검색, 탐색, 즐겨찾기, 이모지 복사를 포함한 모든 기능이 비용 없이 이용 가능합니다.",
      },
      {
        q: "계정을 만들어야 하나요?",
        a: "계정이 필요하지 않습니다! 등록이나 로그인 없이 즉시 이모지를 탐색, 검색, 복사할 수 있습니다.",
      },
      {
        q: "즐겨찾기 이모지는 어떻게 저장하나요?",
        a: "任意의 이모지에서 별 아이콘을 클릭하여 즐겨찾기 컬렉션에 추가합니다. 즐겨찾기는 브라우저에 저장되어 향후 방문 시 빠르게 액세스할 수 있습니다.",
      },
      {
        q: "Cybermoji는 모바일에서 작동하나요?",
        a: "네! Cybermoji는 완전히 반응형이며 스마트폰 및 태블릿을 포함한 모든 기기에서 완벽하게 작동합니다.",
      },
    ],
    pt: [
      {
        q: "Quantos emojis estão disponíveis?",
        a: "O Cybermoji apresenta milhares de emojis em todas as categorias. Regularmente atualizamos nossa coleção para incluir novos lançamentos de emojis do Unicode assim que ficam disponíveis.",
      },
      {
        q: "Posso copiar vários emojis de uma vez?",
        a: "Sim! Você pode clicar em vários emojis para adicioná-los à sua área de transferência. Basta clicar em cada emoji que você deseja e colá-los todos de uma vez onde precisar.",
      },
      {
        q: "Os emojis funcionam em todos os dispositivos?",
        a: "Sim! Nossos emojis são caracteres Unicode padrão que funcionam em todos os dispositivos modernos - iPhone, Android, Windows, Mac e Linux. No entanto, dispositivos mais antigos podem não exibir os emojis mais recentes.",
      },
      {
        q: "Posso pesquisar emojis por palavra-chave?",
        a: "Absolutamente! Use a barra de pesquisa para encontrar emojis por palavra-chave, nome ou descrição. Tente pesquisar conceitos como 'happy', 'fire', 'love' ou 'party' para encontrar emojis relevantes.",
      },
      {
        q: "Onde posso usar esses emojis?",
        a: "Você pode usar nossos emojis em qualquer lugar que suporte caracteres Unicode: mídias sociais (Twitter, Facebook, Instagram, TikTok), aplicativos de mensagens (WhatsApp, Telegram, Discord), e-mails, documentos e sites.",
      },
      {
        q: "Por que alguns emojis não são exibidos corretamente?",
        a: "A exibição de emojis depende do sistema operacional e navegador do seu dispositivo. Emojis mais recentes podem não aparecer em dispositivos mais antigos. Tente atualizar seu sistema operacional ou usar um dispositivo/navegador diferente se um emoji parecer um ponto de interrogação ou caixa.",
      },
      {
        q: "Esses emojis são gratuitos para usar?",
        a: "Sim! Todos os emojis em nossa coleção são caracteres Unicode padrão, que são gratuitos para usar. Não há restrições de direitos autorais sobre o uso de emojis em suas comunicações.",
      },
      {
        q: "Posso usar esses emojis no meu aplicativo ou site?",
        a: "Sim! Como esses são caracteres Unicode padrão, você pode usá-los livremente em seus aplicativos e sites sem quaisquer requisitos de licenciamento.",
      },
      {
        q: "O Cybermoji é gratuito?",
        a: "Sim! O Cybermoji é completamente gratuito. Todos os recursos, incluindo pesquisa, navegação, favoritos e cópia de emojis, estão disponíveis sem custo.",
      },
      {
        q: "Preciso criar uma conta?",
        a: "Nenhuma conta é necessária! Você pode navegar, pesquisar e copiar emojis imediatamente sem registro ou login.",
      },
      {
        q: "Como salvo meus emojis favoritos?",
        a: "Clique no ícone de estrela em qualquer emoji para adicioná-lo à sua coleção de favoritos. Seus favoritos são salvos no seu navegador para acesso rápido em visitas futuras.",
      },
      {
        q: "O Cybermoji funciona no celular?",
        a: "Sim! O Cybermoji é totalmente responsivo e funciona perfeitamente em todos os dispositivos, incluindo smartphones e tablets.",
      },
    ],
    ru: [
      {
        q: "Сколько эмодзи доступно?",
        a: "Cybermoji предлагает тысячи эмодзи во всех категориях. Мы регулярно обновляем нашу коллекцию, чтобы включать новые выпуски эмодзи от Unicode, как только они становятся доступными.",
      },
      {
        q: "Могу ли я скопировать несколько эмодзи сразу?",
        a: "Да! Вы можете нажать на несколько эмодзи, чтобы добавить их в буфер обмена. Просто нажмите на каждый эмодзи, который хотите, затем вставьте их все сразу туда, где они вам нужны.",
      },
      {
        q: "Эмодзи работают на всех устройствах?",
        a: "Да! Наши эмодзи — это стандартные символы Unicode, которые работают на всех современных устройствах — iPhone, Android, Windows, Mac и Linux. Однако на старых устройствах могут не отображаться новейшие эмодзи.",
      },
      {
        q: "Могу ли я искать эмодзи по ключевому слову?",
        a: "Конечно! Используйте панель поиска для поиска эмодзи по ключевому слову, названию или описанию. Попробуйте искать такие понятия, как 'happy', 'fire', 'love' или 'party', чтобы найти соответствующие эмодзи.",
      },
      {
        q: "Где можно использовать эти эмодзи?",
        a: "Вы можете использовать наши эмодзи везде, где поддерживаются символы Unicode: социальные сети (Twitter, Facebook, Instagram, TikTok), мессенджеры (WhatsApp, Telegram, Discord), электронная почта, документы и веб-сайты.",
      },
      {
        q: "Почему некоторые эмодзи отображаются некорректно?",
        a: "Отображение эмодзи зависит от операционной системы и браузера вашего устройства. Новейшие эмодзи могут не отображаться на старых устройствах. Попробуйте обновить ОС или использовать другое устройство/браузер, если эмодзи выглядит как вопросительный знак или квадрат.",
      },
      {
        q: "Эти эмодзи бесплатны для использования?",
        a: "Да! Все эмодзи в нашей коллекции — это стандартные символы Unicode, которые бесплатны для использования. Нет ограничений авторского права на использование эмодзи в ваших коммуникациях.",
      },
      {
        q: "Могу ли я использовать эти эмодзи в своём приложении или сайте?",
        a: "Да! Поскольку это стандартные символы Unicode, вы можете свободно использовать их в своих приложениях и веб-сайтах без каких-либо лицензионных требований.",
      },
      {
        q: "Cybermoji бесплатен?",
        a: "Да! Cybermoji полностью бесплатен. Все функции, включая поиск, просмотр, избранное и копирование эмодзи, доступны бесплатно.",
      },
      {
        q: "Нужно ли создавать аккаунт?",
        a: "Аккаунт не требуется! Вы можете просматривать, искать и копировать эмодзи немедленно без регистрации или входа.",
      },
      {
        q: "Как сохранить избранные эмодзи?",
        a: "Нажмите на значок звезды на любом эмодзи, чтобы добавить его в коллекцию избранного. Ваши избранные сохраняются в браузере для быстрого доступа при будущих посещениях.",
      },
      {
        q: "Cybermoji работает на мобильных?",
        a: "Да! Cybermoji полностью адаптивен и отлично работает на всех устройствах, включая смартфоны и планшеты.",
      },
    ],
    ar: [
      {
        q: "كم عدد الإيموجي المتاحة؟",
        a: "يقدم Cybermoji آلاف الإيموجي في جميع الفئات. نقوم بتحديث مجموعتنا بانتظام لتشمل إصدارات الإيموجي الجديدة من Unicode حال توفرها.",
      },
      {
        q: "هل يمكنني نسخ عدة إيموجي دفعة واحدة؟",
        a: "نعم! يمكنك النقر فوق عدة إيموجي لإضافتها إلى الحافظة. ما عليك سوى النقر فوق كل إيموجي تريده ثم لصقها جميعًا دفعة واحدة في أي مكان تحتاجه.",
      },
      {
        q: "هل تعمل الإيموجي على جميع الأجهزة؟",
        a: "نعم! إيموجي هي أحرف Unicode قياسية تعمل على جميع الأجهزة الحديثة - iPhone و Android و Windows و Mac و Linux. ومع ذلك، قد لا تعرض الأجهزة الأقدم أحدث الإيموجي.",
      },
      {
        q: "هل يمكنني البحث عن الإيموجي بالكلمة المفتاحية؟",
        a: "بالتأكيد! استخدم شريط البحث للعثور على الإيموجي بالكلمة المفتاحية أو الاسم أو الوصف. حاول البحث عن مفاهيم مثل 'happy' أو 'fire' أو 'love' أو 'party' للعثور على الإيموجي ذات الصلة.",
      },
      {
        q: "أين يمكنني استخدام هذه الإيموجي؟",
        a: "يمكنك استخدام إيموجي في أي مكان يدعم أحرف Unicode: وسائل التواصل الاجتماعي (Twitter و Facebook و Instagram و TikTok) وتطبيقات المراسلة (WhatsApp و Telegram و Discord) والبريد الإلكتروني والمستندات ومواقع الويب.",
      },
      {
        q: "لماذا لا تظهر بعض الإيموجي بشكل صحيح؟",
        a: "يعتمد عرض الإيموجي على نظام التشغيل والمتصفح الخاص بجهازك. قد لا تظهر الإيموجي الأحدث على الأجهزة الأقدم. حاول تحديث نظام التشغيل أو استخدام جهاز/متصفح مختلف إذا كان الإيموجي يبدو كعلامة استفهام أو مربع.",
      },
      {
        q: "هل هذه الإيموجي مجانية للاستخدام؟",
        a: "نعم! جميع الإيموجي في مجموعتنا هي أحرف Unicode قياسية، وهي مجانية للاستخدام. لا توجد قيود حقوق طبع ونشر على استخدام الإيموجي في اتصالاتك.",
      },
      {
        q: "هل يمكنني استخدام هذه الإيموجي في تطبيقي أو موقعي؟",
        a: "نعم! نظرًا لأنها أحرف Unicode قياسية، يمكنك استخدامها بحرية في تطبيقاتك ومواقعك دون أي متطلبات ترخيص.",
      },
      {
        q: "هل Cybermoji مجاني للاستخدام؟",
        a: "نعم! Cybermoji مجاني تمامًا. جميع الميزات بما في ذلك البحث والتصفح والمفضلة ونسخ الإيموجي متاحة بدون تكلفة.",
      },
      {
        q: "هل أحتاج إلى إنشاء حساب؟",
        a: "لا يلزم وجود حساب! يمكنك تصفح والبحث ونسخ الإيموجي فورًا دون تسجيل أو تسجيل دخول.",
      },
      {
        q: "كيف أحفظ الإيموجي المفضلة لدي؟",
        a: "انقر فوق أيقونة النجمة على أي إيموجي لإضافتها إلى مجموعة المفضلة لديك. يتم حفظ المفضلة في متصفحك للوصول السريع في الزيارات المستقبلية.",
      },
      {
        q: "هل Cybermoji يعمل على الهاتف المحمول؟",
        a: "نعم! Cybermoji متجاوب بالكامل ويعمل بشكل مثالي على جميع الأجهزة بما في ذلك الهواتف الذكية والأجهزة اللوحية.",
      },
    ],
  };

  const items = faqData[lang] || faqData.en;

  return items.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  }));
}
