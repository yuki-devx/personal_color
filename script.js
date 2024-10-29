document.addEventListener('DOMContentLoaded', () => {
    // 診断質問データ
    const questions = [
    // 温度判定（Warm/Cool）の質問
    {
        question: "肌の色味は？",
        options: [
            { text: "黄みが強い", values: { warm: 1 } },
            { text: "ピンクっぽい", values: { cool: 1 } },
            { text: "オリーブベージュ", values: { warm: 0.7, deep: 0.3 } },
            { text: "青みがかった色白", values: { cool: 0.8, light: 0.2 } }
        ]
    },
    {
        question: "日焼けすると？",
        options: [
            { text: "小麦色に綺麗に焼ける", values: { warm: 1, deep: 0.3 } },
            { text: "赤くなって跡が残りやすい", values: { cool: 1 } },
            { text: "徐々に自然に色づく", values: { warm: 0.7 } },
            { text: "あまり焼けない", values: { cool: 0.8, light: 0.2 } }
        ]
    },
    // 明度判定（Light/Deep）の質問
    {
        question: "髪の地毛の色は？",
        options: [
            { text: "明るめの茶色", values: { light: 1, warm: 0.3 } },
            { text: "濃い黒", values: { deep: 1 } },
            { text: "やや明るい黒", values: { light: 0.6 } },
            { text: "こげ茶色", values: { deep: 0.8 } }
        ]
    },
    {
        question: "顔立ちの印象は？",
        options: [
            { text: "はっきりした濃い目鼻立ち", values: { deep: 1, highContrast: 0.5 } },
            { text: "優しい薄い目鼻立ち", values: { light: 1, lowContrast: 0.5 } },
            { text: "クッキリした目鼻立ち", values: { deep: 0.7, highContrast: 0.3 } },
            { text: "ふんわりした印象", values: { light: 0.8, soft: 0.2 } }
        ]
    },
    // 彩度判定（Bright/Soft）の質問
    {
        question: "似合うリップの色は？",
        options: [
            { text: "ビビッドなピンク", values: { bright: 1, cool: 0.3 } },
            { text: "シアーなコーラル", values: { soft: 1, warm: 0.3 } },
            { text: "鮮やかなレッド", values: { bright: 0.8, highContrast: 0.2 } },
            { text: "くすみローズ", values: { soft: 0.8, cool: 0.2 } }
        ]
    },
    {
        question: "映えるアイシャドウは？",
        options: [
            { text: "パール・ラメ入り", values: { bright: 1, light: 0.3 } },
            { text: "マット・シックな色", values: { soft: 1, deep: 0.3 } },
            { text: "メタリック", values: { bright: 0.8, cool: 0.2 } },
            { text: "ナチュラル・アースカラー", values: { soft: 0.8, warm: 0.2 } }
        ]
    },
    // コントラスト判定（High/Low）の質問
    {
        question: "肌と髪の色の差は？",
        options: [
            { text: "はっきりとした差がある", values: { highContrast: 1 } },
            { text: "自然なグラデーション", values: { lowContrast: 1 } },
            { text: "やや差がある", values: { highContrast: 0.7 } },
            { text: "似たような明るさ", values: { lowContrast: 0.8 } }
        ]
    },
    {
        question: "目と肌の色の差は？",
        options: [
            { text: "くっきり印象的", values: { highContrast: 1, bright: 0.3 } },
            { text: "やわらかな印象", values: { lowContrast: 1, soft: 0.3 } },
            { text: "やや印象的", values: { highContrast: 0.7 } },
            { text: "なじんでいる", values: { lowContrast: 0.8 } }
        ]
    },
    // 総合的な判定のための質問
    {
        question: "普段からよく言われる印象は？",
        options: [
            { text: "華やか・鮮やか", values: { bright: 1, highContrast: 0.5 } },
            { text: "優しい・ナチュラル", values: { soft: 1, lowContrast: 0.5 } },
            { text: "知的・クール", values: { cool: 0.8, deep: 0.2 } },
            { text: "明るい・活発", values: { warm: 0.8, light: 0.2 } }
        ]
    },
    {
        question: "似合うアクセサリーは？",
        options: [
            { text: "イエローゴールド", values: { warm: 1, bright: 0.3 } },
            { text: "シルバー", values: { cool: 1, bright: 0.3 } },
            { text: "アンティークゴールド", values: { warm: 0.7, soft: 0.3 } },
            { text: "プラチナ", values: { cool: 0.8, light: 0.2 } }
        ]
    }
    ];

    // 診断結果データ
    const results = {
            // Spring Types
    brightSpring: {
        title: "ブライトスプリング",
        subtitle: "明るく鮮やかな春",
        description: `明るく鮮やかな色が似合う、春の太陽のような輝きを持つタイプです。

【あなたの特徴】
・明るく温かみのある肌色
・はっきりとした目の色
・コントラストがはっきりした印象
・若々しく活発な雰囲気

【似合う色】
・明るく鮮やかなイエロー
・ビビッドなオレンジ
・明るいグリーン
・クリアなピンク

【メイクポイント】
・ベースメイク：明るめのイエローベージュ
・チーク：コーラルピンク、オレンジ
・リップ：ビビッドなピンク、オレンジレッド
・アイシャドウ：ゴールド、ピーチ、ライトグリーン

【おすすめコーデ】
・鮮やかな色を主役に
・白を差し色に明るさをプラス
・同系色で統一感を出す

【NGポイント】
・くすんだ色
・グレイッシュな色
・重たい黒

あなたに似合うメイクやファッションのより詳しいアドバイスは、LINE登録で毎日配信中！`,
        palette: ["#FFD700", "#FF4500", "#98FB98", "#FF69B4", "#FFA500"]
    },
    lightSpring: {
        title: "ライトスプリング",
        subtitle: "明るく軽やかな春",
        description: `淡く明るい色が似合う、春の光のような柔らかな輝きを持つタイプです。

【あなたの特徴】
・明るく透明感のある肌色
・優しい印象の目の色
・ナチュラルな印象
・爽やかで可愛らしい雰囲気

【似合う色】
・ライトイエロー
・ペールオレンジ
・ソフトグリーン
・ライトピンク

【メイクポイント】
・ベースメイク：明るい自然なベージュ
・チーク：サーモンピンク、ピーチ
・リップ：コーラル、ピーチピンク
・アイシャドウ：ライトゴールド、ペールピンク

【おすすめコーデ】
・パステル調の色を基調に
・白を効果的に使用
・軽やかな素材選び

【NGポイント】
・重たい色使い
・暗い色
・強すぎるコントラスト

トレンドを取り入れたコーディネートテクニックは、Instagramで毎日更新中！`,
        palette: ["#FFF68F", "#FFDAB9", "#98FB98", "#FFB6C1", "#F0E68C"]
    },
    warmSpring: {
        title: "ウォームスプリング",
        subtitle: "温かみのある春",
        description: `温かみのある明るい色が似合う、春の陽だまりのような柔らかな輝きを持つタイプです。

【あなたの特徴】
・黄みがかった明るい肌色
・温かみのある目の色
・自然な印象
・親しみやすい雰囲気

【似合う色】
・マスタードイエロー
・テラコッタオレンジ
・アップルグリーン
・サーモンピンク

【メイクポイント】
・ベースメイク：イエローベージュ
・チーク：オレンジブラウン、テラコッタ
・リップ：アプリコット、コーラルブラウン
・アイシャドウ：ブロンズ、カッパー

【おすすめコーデ】
・温かみのある色を中心に
・ナチュラルな素材感
・やわらかい質感

【NGポイント】
・冷たい色調
・モノトーン
・暗すぎる色

パーソナルカラーを活かした着こなしテクニックは、LINE登録者限定で配信中！`,
        palette: ["#DAA520", "#FF7F50", "#9ACD32", "#FA8072", "#DEB887"]
    },
    softSpring: {
        title: "ソフトスプリング",
        subtitle: "優しく柔らかな春",
        description: `柔らかで優しい色が似合う、春の霞のような柔らかな雰囲気を持つタイプです。

【あなたの特徴】
・やわらかな明るい肌色
・穏やかな印象の目の色
・ナチュラルな印象
・優しい雰囲気

【似合う色】
・くすみイエロー
・ペールオレンジ
・ミントグリーン
・ダスティピンク

【メイクポイント】
・ベースメイク：ナチュラルベージュ
・チーク：くすみピンク、ソフトコーラル
・リップ：ナチュラルピンク、ペールコーラル
・アイシャドウ：ベージュ、ライトブラウン

【おすすめコーデ】
・柔らかな色調をメインに
・ナチュラルな素材感
・優しい質感

【NGポイント】
・強すぎる色
・暗い色調
・はっきりしたコントラスト

毎日のメイクやコーディネートのお悩みは、公式LINEで解決！`,
        palette: ["#EEE8AA", "#FFDAB9", "#98FF98", "#FFB6C1", "#DEB887"]
    },

    // Summer Types
    brightSummer: {
        title: "ブライトサマー",
        subtitle: "明るく爽やかな夏",
        description: `クリアで爽やかな色が似合う、夏の青空のような清々しい印象を持つタイプです。

【あなたの特徴】
・透明感のある肌色
・はっきりとした目の色
・クリアな印象
・爽やかな雰囲気

【似合う色】
・クリアブルー
・ビビッドピンク
・アクアグリーン
・ライラック

【メイクポイント】
・ベースメイク：ピンクベージュ
・チーク：クリアピンク、ローズ
・リップ：フューシャピンク、ローズレッド
・アイシャドウ：シルバー、パール系

【おすすめコーデ】
・クリアな色味を中心に
・白を効果的に使用
・涼しげな素材感

【NGポイント】
・くすんだ色
・濁った色調
・重たい茶色

トレンド感のある着こなしテクニックは、Instagramをチェック！`,
        palette: ["#00BFFF", "#FF69B4", "#40E0D0", "#DDA0DD", "#87CEEB"]
    },
    lightSummer: {
        title: "ライトサマー",
        subtitle: "明るく淡い夏",
        description: `淡く優しい色が似合う、夏の朝霧のような柔らかな印象を持つタイプです。

【あなたの特徴】
・明るく透明感のある肌色
・やさしい印象の目の色
・ソフトな印象
・エレガントな雰囲気

【似合う色】
・ペールブルー
・ライトピンク
・ペールグリーン
・ラベンダー

【メイクポイント】
・ベースメイク：ライトピンクベージュ
・チーク：ベビーピンク、ライトローズ
・リップ：ピンク、ローズピンク
・アイシャドウ：パールグレー、ペールピンク

【おすすめコーデ】
・淡い色を基調に
・白を効果的に使用
・軽やかな素材感

【NGポイント】
・濃すぎる色
・暗い色調
・コントラストの強い配色

あなたに似合うメイクやファッションのより詳しいアドバイスは、LINE登録で毎日配信中！`,
        palette: ["#B0E0E6", "#FFB6C1", "#98FB98", "#E6E6FA", "#F0F8FF"]
    },

    coolSummer: {
        title: "クールサマー",
        subtitle: "涼しげな夏",
        description: `落ち着いた涼しげな色が似合う、夏の木陰のような清涼感のある印象を持つタイプです。

【あなたの特徴】
・ブルーベースの肌色
・クールな印象の目の色
・知的な印象
・洗練された雰囲気

【似合う色】
・スモーキーブルー
・ダスティピンク
・グレイッシュパープル
・セージグリーン

【メイクポイント】
・ベースメイク：ピンクベージュ
・チーク：グレイッシュピンク、モーブ
・リップ：ローズ、プラム
・アイシャドウ：グレー、スモーキーブルー

【おすすめコーデ】
・グレイッシュな色調をメインに
・落ち着いた配色
・上品な素材感

【NGポイント】
・オレンジ系の暖色
・ビビッドな原色
・黄みの強い色

パーソナルカラーを活かしたメイクテクニックは、LINE登録者限定で配信中！`,
        palette: ["#4682B4", "#DBB2D1", "#778899", "#9370DB", "#B4C7E7"]
    },

    softSummer: {
        title: "ソフトサマー",
        subtitle: "柔らかな夏",
        description: `やわらかで穏やかな色が似合う、夏の夕暮れのような優しい印象を持つタイプです。

【あなたの特徴】
・ソフトな肌色
・穏やかな印象の目の色
・ナチュラルな印象
・優しい雰囲気

【似合う色】
・グレイッシュブルー
・くすみピンク
・ソフトラベンダー
・グレイッシュグリーン

【メイクポイント】
・ベースメイク：ナチュラルピンクベージュ
・チーク：くすみローズ、モーブピンク
・リップ：ナチュラルローズ、モーブ
・アイシャドウ：グレイッシュトーン

【おすすめコーデ】
・くすみカラーを中心に
・ソフトな質感
・ナチュラルな素材感

【NGポイント】
・ビビッドな色
・コントラストの強い配色
・重たい色使い

トレンドを取り入れたコーディネートテクニックは、Instagramで毎日更新中！`,
        palette: ["#B0C4DE", "#E6BCB3", "#D8BFD8", "#90EE90", "#DEB887"]
    },

    // Autumn Types
    brightAutumn: {
        title: "ブライトオータム",
        subtitle: "鮮やかな秋",
        description: `鮮やかで深みのある色が似合う、秋の紅葉のような華やかな印象を持つタイプです。

【あなたの特徴】
・温かみのある健康的な肌色
・はっきりとした目の色
・印象的な顔立ち
・活発な雰囲気

【似合う色】
・バーントオレンジ
・トマトレッド
・フォレストグリーン
・ゴールデンイエロー

【メイクポイント】
・ベースメイク：温かみのあるベージュ
・チーク：テラコッタ、ブリックレッド
・リップ：オレンジレッド、バーガンディ
・アイシャドウ：ブロンズ、ゴールド

【おすすめコーデ】
・深みのある暖色を主役に
・ゴールドアクセサリー
・リッチな素材感

【NGポイント】
・パステルカラー
・冷たい色調
・モノトーン

毎日のメイクやコーディネートのお悩みは、公式LINEで解決！`,
        palette: ["#FF4500", "#FF6347", "#228B22", "#DAA520", "#8B4513"]
    },
    warmAutumn: {
        title: "ウォームオータム",
        subtitle: "温かみのある秋",
        description: `温かみのある深い色が似合う、秋の夕暮れのような温かな印象を持つタイプです。

【あなたの特徴】
・黄みがかった健康的な肌色
・温かみのある目の色
・落ち着いた印象
・自然体な雰囲気

【似合う色】
・キャメル
・テラコッタ
・モスグリーン
・マスタード

【メイクポイント】
・ベースメイク：イエローベージュ
・チーク：ブラウンオレンジ、テラコッタ
・リップ：ブラウンレッド、アースレッド
・アイシャドウ：ブロンズ、アースカラー

【おすすめコーデ】
・アースカラーを基調に
・温かみのある素材
・ナチュラルな質感

【NGポイント】
・ビビッドな色
・パステルカラー
・シルバー系アクセサリー

パーソナルカラーを活かした着こなしテクニックは、LINE登録者限定で配信中！`,
        palette: ["#D2691E", "#CD853F", "#556B2F", "#DAA520", "#8B4513"]
    },

    deepAutumn: {
        title: "ディープオータム",
        subtitle: "深みのある秋",
        description: `深くて落ち着いた色が似合う、秋の深い森のような重厚な印象を持つタイプです。

【あなたの特徴】
・深みのある肌色
・濃い目の色
・印象的な顔立ち
・大人っぽい雰囲気

【似合う色】
・バーガンディ
・ダークブラウン
・ダークグリーン
・ディープパープル

【メイクポイント】
・ベースメイク：オークル系
・チーク：バーガンディ、ダークブラウン
・リップ：ワインレッド、ディープレッド
・アイシャドウ：ダークブラウン、ボルドー

【おすすめコーデ】
・深い色を主役に
・シックな配色
・重厚な素材感

【NGポイント】
・淡い色
・明るすぎる色
・軽やかな素材

トレンド感のある着こなしテクニックは、Instagramをチェック！`,
        palette: ["#800000", "#654321", "#006400", "#483D8B", "#8B0000"]
    },

    softAutumn: {
        title: "ソフトオータム",
        subtitle: "柔らかな秋",
        description: `落ち着いた柔らかい色が似合う、秋の霧のような穏やかな印象を持つタイプです。

【あなたの特徴】
・やわらかな温かみのある肌色
・穏やかな目の色
・ナチュラルな印象
・優しい雰囲気

【似合う色】
・くすみカーキ
・アンティークゴールド
・くすみグリーン
・ソフトブラウン

【メイクポイント】
・ベースメイク：ナチュラルオークル
・チーク：くすみオレンジ、アンティークローズ
・リップ：くすみピンク、アースブラウン
・アイシャドウ：マットブラウン、カーキ

【おすすめコーデ】
・くすみカラーをメインに
・ナチュラルな素材感
・やわらかい質感

【NGポイント】
・ビビッドな色
・クリアな色
・光沢の強い素材

あなたに似合うメイクやファッションのより詳しいアドバイスは、LINE登録で毎日配信中！`,
        palette: ["#6B8E23", "#DAA520", "#556B2F", "#8B7355", "#CD853F"]
    },

    // Winter Types
    brightWinter: {
        title: "ブライトウィンター",
        subtitle: "鮮やかな冬",
        description: `鮮やかでクリアな色が似合う、冬の澄んだ空のようなクリアな印象を持つタイプです。

【あなたの特徴】
・透明感のある肌色
・はっきりとした目の色
・くっきりとした顔立ち
・印象的な雰囲気

【似合う色】
・ロイヤルブルー
・マゼンタ
・エメラルドグリーン
・ピュアホワイト

【メイクポイント】
・ベースメイク：ピンクベージュ
・チーク：ビビッドピンク、フューシャ
・リップ：マゼンタ、ビビッドレッド
・アイシャドウ：シルバー、ネイビー

【おすすめコーデ】
・ビビッドカラーを主役に
・モノトーンをベースに
・シャープな素材感

【NGポイント】
・くすんだ色
・アースカラー
・ナチュラルテイスト

パーソナルカラーを活かしたメイクテクニックは、LINE登録者限定で配信中！`,
        palette: ["#4169E1", "#FF00FF", "#00C957", "#FFFFFF", "#000000"]
    },
    coolWinter: {
        title: "クールウィンター",
        subtitle: "涼しげな冬",
        description: `クールで洗練された色が似合う、冬の氷のような凛とした印象を持つタイプです。

【あなたの特徴】
・ブルーベースの透明感のある肌色
・クールな印象の目の色
・シャープな顔立ち
・知的な雰囲気

【似合う色】
・アイスブルー
・シルバーグレー
・アイシーピンク
・ピュアホワイト

【メイクポイント】
・ベースメイク：ピンクベージュ
・チーク：ローズピンク、コールドピンク
・リップ：ブルーレッド、ローズピンク
・アイシャドウ：シルバー、アイスブルー

【おすすめコーデ】
・クールな色調をメインに
・シルバーアクセサリー
・シャープな素材感

【NGポイント】
・オレンジ系の暖色
・アースカラー
・ナチュラルテイスト

トレンド感のある着こなしテクニックは、Instagramをチェック！`,
        palette: ["#ADD8E6", "#C0C0C0", "#FFE4E1", "#FFFFFF", "#4169E1"]
    },

    deepWinter: {
        title: "ディープウィンター",
        subtitle: "深みのある冬",
        description: `深くて鮮やかな色が似合う、冬の夜空のような神秘的な印象を持つタイプです。

【あなたの特徴】
・コントラストの強い肌色
・濃い目の色
・印象的な顔立ち
・シャープな雰囲気

【似合う色】
・ダークネイビー
・ワインレッド
・ダークパープル
・ジェットブラック

【メイクポイント】
・ベースメイク：ピンクオークル
・チーク：ボルドー、ダークローズ
・リップ：ディープレッド、ワインレッド
・アイシャドウ：ダークグレー、ネイビー

【おすすめコーデ】
・深い色を主役に
・モノトーンベース
・上質な素材感

【NGポイント】
・ベージュ系
・パステルカラー
・ナチュラルテイスト

あなたに似合うメイクやファッションのより詳しいアドバイスは、LINE登録で毎日配信中！`,
        palette: ["#000080", "#8B0000", "#483D8B", "#000000", "#4B0082"]
    },

    softWinter: {
        title: "ソフトウィンター",
        subtitle: "柔らかな冬",
        description: `落ち着いた洗練された色が似合う、冬の朝もやのような静かな印象を持つタイプです。

【あなたの特徴】
・ソフトな青みの肌色
・穏やかな目の色
・端正な顔立ち
・落ち着いた雰囲気

【似合う色】
・スモーキーネイビー
・グレイッシュパープル
・ダスティピンク
・チャコールグレー

【メイクポイント】
・ベースメイク：ニュートラルベージュ
・チーク：グレイッシュピンク、モーブ
・リップ：スモーキーピンク、プラム
・アイシャドウ：グレー、スモーキーブルー

【おすすめコーデ】
・グレイッシュカラーをメインに
・落ち着いた配色
・マットな素材感

【NGポイント】
・ビビッドな色
・暖かみの強い色
・光沢の強い素材

パーソナルカラーを活かした着こなしテクニックは、LINE登録者限定で配信中！`,
        palette: ["#4F4F4F", "#8B8589", "#DBB2D1", "#36454F", "#67729D"]
    }
    };

    let currentQuestion = 0;
    let answers = {
        warm: 0,
        cool: 0,
        light: 0,
        deep: 0,
        bright: 0,
        soft: 0,
        highContrast: 0,
        lowContrast: 0
    };

    // 画面要素の取得
    const screens = {
        start: document.getElementById('start'),
        quiz: document.getElementById('quiz'),
        result: document.getElementById('result')
    };

    // 画面遷移関数
    function showScreen(screenName) {
        Object.values(screens).forEach(screen => {
            screen.classList.remove('active');
        });
        screens[screenName].classList.add('active');
    }

    // 進捗バーの更新
    function updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        const totalQuestions = questions.length;
        const currentProgress = ((currentQuestion + 1) / totalQuestions) * 100;
    
        // プログレスバーのアニメーション
        progressFill.style.transition = 'width 0.3s ease';
        progressFill.style.width = `${currentProgress}%`;
    
        // 進捗テキストの更新
        progressText.textContent = `Question ${currentQuestion + 1}/${totalQuestions}`;
    
        // プログレスバーの色をグラデーションで変化させる（オプション）
        const hue = (currentProgress * 1.2); // 色相を進捗に応じて変化
        progressFill.style.background = `linear-gradient(45deg, 
            hsl(${hue}, 100%, 80%), 
            hsl(${hue + 20}, 100%, 70%)
        )`;
    }

    // 質問の表示
    function showQuestion() {
    const question = questions[currentQuestion];
    const questionElement = document.getElementById('question');
    const optionsContainer = document.querySelector('.options-container');

    // フェードアウト
    questionElement.style.opacity = '0';
    optionsContainer.style.opacity = '0';

    setTimeout(() => {
        questionElement.textContent = question.question;
        // 新しい選択肢を表示する前に、コンテナの中身を空にする（これによって自動的にスタイルもリセット）
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'option-button';
            button.textContent = option.text;
            button.addEventListener('click', () => {
                selectAnswer(option.values);
            });
            optionsContainer.appendChild(button);
        });

        // フェードイン
        questionElement.style.opacity = '1';
        optionsContainer.style.opacity = '1';
    }, 300);

    updateProgress();
    }

    // 回答の選択
    function selectAnswer(values) {
        // 各値を加算
        Object.entries(values).forEach(([key, value]) => {
            answers[key] = (answers[key] || 0) + value;
        });
        
        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion();
                updateProgress();
            } else {
                document.querySelector('.progress-fill').style.width = '100%';
                setTimeout(() => {
                    showResult();
                }, 300);
            }
        }, 200);
    }

    // 結果の判定
    function determineResult() {
        const total = questions.length;
    
        // 各特性のスコアを正規化（0〜1の範囲に）
        const scores = {
            temperature: normalizeScore(answers.warm, answers.cool),
            value: normalizeScore(answers.light, answers.deep),
            chroma: normalizeScore(answers.bright, answers.soft),
            contrast: normalizeScore(answers.highContrast, answers.lowContrast)
        };

        // 判定基準値（閾値）
        const threshold = 0.5;

        // 各軸での判定
        const type = {
            temperature: scores.temperature > threshold ? 'warm' : 'cool',
            value: scores.value > threshold ? 'light' : 'deep',
            chroma: scores.chroma > threshold ? 'bright' : 'soft',
            contrast: scores.contrast > threshold ? 'high' : 'low'
        };

        // デバッグ用ログ
        console.log('Scores:', scores);
        console.log('Type:', type);

        return determineColorType(type);
    }

    // スコアの正規化関数
    function normalizeScore(positive, negative) {
        const total = positive + negative;
        return total === 0 ? 0.5 : positive / total;
    }

    // 16タイプの判定関数
    function determineColorType(type) {
        // 季節の判定
        let season;
        if (type.temperature === 'warm') {
            season = type.value === 'light' ? 'spring' : 'autumn';
        } else {
            season = type.value === 'light' ? 'summer' : 'winter';
        }
    
        // サブタイプの判定
        let subType;
        if (type.chroma === 'bright' && type.contrast === 'high') {
            subType = 'bright';
        } else if (type.chroma === 'bright' && type.contrast === 'low') {
            subType = 'light';
        } else if (type.chroma === 'soft' && type.contrast === 'high') {
            subType = 'deep';
        } else {
            subType = 'soft';
        }
    
        // 最終的なタイプの決定
        const typeMap = {
            spring: {
                bright: 'brightSpring',
                light: 'lightSpring',
                deep: 'warmSpring',
                soft: 'softSpring'
            },
            summer: {
                bright: 'brightSummer',
                light: 'lightSummer',
                deep: 'coolSummer',
                soft: 'softSummer'
            },
            autumn: {
                bright: 'brightAutumn',
                light: 'warmAutumn',
                deep: 'deepAutumn',
                soft: 'softAutumn'
            },
            winter: {
                bright: 'brightWinter',
                light: 'coolWinter',
                deep: 'deepWinter',
                soft: 'softWinter'
            }
        };
    
        return typeMap[season][subType];
    }

    // 結果の表示
    function showResult() {
        const resultType = determineResult();
    const result = results[resultType];
    
    // 結果画面の要素を取得
    const resultContent = document.querySelector('.result-content');
    const resultBox = document.querySelector('.result-box');
    
    // アニメーション用にクラスをリセット
    resultContent.classList.remove('reveal');
    resultBox.classList.remove('reveal');

    // 結果タイプのヘッダー部分
    const headerHTML = `
        <div class="result-type-header">
            <h2 class="result-type-title">${result.title}</h2>
            <p class="result-type-subtitle">${result.subtitle}</p>
        </div>
    `;

    // カラーパレットの生成
    const paletteHTML = `
        <div class="color-palette">
            ${result.palette.map(color => `
                <div class="color-sample" style="background-color: ${color}">
                    <div class="color-tooltip">${color}</div>
                </div>
            `).join('')}
        </div>
    `;

    // 説明文を整形
    const descriptionHTML = `
        <div class="result-description">
            ${result.description.split('\n\n').map(paragraph => 
                paragraph.startsWith('【') 
                    ? `<div class="description-section">
                         <h3 class="section-title">${paragraph.split('】')[0].substring(1)}</h3>
                         <p>${paragraph.split('】')[1]}</p>
                       </div>`
                    : `<p>${paragraph}</p>`
            ).join('')}
        </div>
    `;

    // CTAセクションの強化
    const ctaHTML = `
    <div class="cta-section">
        <p class="cta-message">＼ より詳しいアドバイスが欲しい方へ ／</p>
        <div class="cta-buttons-container">
            <a id="line-toroku" class="cta-button line-button">
                <div class="button-inner">
                    <span class="button-icon">📱</span>
                    <div class="button-text-container">
                        <span class="text-main">LINE登録で詳しい解説をGET！</span>
                        <span class="text-sub">パーソナルカラー診断書をプレゼント</span>
                    </div>
                </div>
            </a>
            <a id="insta-ok" class="cta-button instagram-button">
                <div class="button-inner">
                    <span class="button-icon">📸</span>
                    <div class="button-text-container">
                        <span class="text-main">Instagramをフォロー</span>
                        <span class="text-sub">毎日更新！トレンドメイク＆コーデ</span>
                    </div>
                </div>
            </a>
            <button class="cta-button restart-button">
                <div class="button-inner">
                    <span class="button-icon">🔄</span>
                    <div class="button-text-container">
                        <span class="text-main">もう一度診断する</span>
                        <span class="text-sub">違う季節の自分を見つけよう！</span>
                    </div>
                </div>
            </button>
        </div>
    </div>
`;

    // $(document).on("click", "#line-toroku, #insta-ok", function(){
    //     alert('サンプルです');
    // });

    // 結果コンテンツを更新
    resultBox.innerHTML = headerHTML + paletteHTML + descriptionHTML;
    
    // CTA部分を更新
    document.querySelector('.cta-container').innerHTML = ctaHTML;

    // 画面遷移とアニメーション
    showScreen('result');
    
    // アニメーション用クラスを追加
    setTimeout(() => {
        resultContent.classList.add('reveal');
        resultBox.classList.add('reveal');
    }, 100);

    // カラーパレットのアニメーション
    const colorSamples = document.querySelectorAll('.color-sample');
    colorSamples.forEach((sample, index) => {
        setTimeout(() => {
            sample.classList.add('reveal');
        }, 500 + (index * 100));
    });

    // ResultPresenterの初期化と実行
    const resultPresenter = new ResultPresenter();
    resultPresenter.initialize();
    resultPresenter.animateResults();
    }


    // イベントリスナーの設定
    // 診断開始時の初期化処理を追加
    document.getElementById('startButton').addEventListener('click', () => {
        currentQuestion = 0;
        answers = {
            warm: 0,
            cool: 0,
            light: 0,
            deep: 0,
            bright: 0,
            soft: 0,
            highContrast: 0,
            lowContrast: 0
        };
        showScreen('quiz');
        document.querySelector('.progress-fill').style.width = '0%';
        setTimeout(() => {
            showQuestion();
            updateProgress();
        }, 100);
    });

    // スパークルエフェクトの生成
    function createSparkles() {
        const container = document.querySelector('.sparkles');
        for (let i = 0; i < 50; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = `${Math.random() * 100}%`;
            sparkle.style.top = `${Math.random() * 100}%`;
            sparkle.style.animationDelay = `${Math.random() * 5}s`;
            container.appendChild(sparkle);
        }
    }

    // 結果表示の拡張機能
class ResultPresenter {
    constructor() {
        this.currentSection = 0;
        this.isAnimating = false;
        this.sections = [];
    }

    // 結果表示の初期化
    initialize() {
        this.sections = document.querySelectorAll('.description-section');
        this.addInteractiveEffects();
        this.setupScrollEffects();
        this.initializeColorPalette();
    }

    // インタラクティブ効果の追加
    addInteractiveEffects() {
        // セクションのホバーエフェクト
        this.sections.forEach(section => {
            section.addEventListener('mouseenter', () => {
                if (!this.isAnimating) {
                    section.style.transform = 'translateY(-5px)';
                    section.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                }
            });

            section.addEventListener('mouseleave', () => {
                if (!this.isAnimating) {
                    section.style.transform = 'translateY(0)';
                    section.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
                }
            });
        });

        // カラーパレットのインタラクション強化
        const colorSamples = document.querySelectorAll('.color-sample');
        colorSamples.forEach(sample => {
            sample.addEventListener('click', () => {
                this.showColorDetail(sample);
            });
        });
    }

    // スクロールエフェクトの設定
    setupScrollEffects() {
        const resultBox = document.querySelector('.result-box');
        let lastScrollTop = 0;

        resultBox.addEventListener('scroll', () => {
            const scrollTop = resultBox.scrollTop;
            const sections = document.querySelectorAll('.description-section');

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.8 && rect.bottom > 0) {
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }
            });

            lastScrollTop = scrollTop;
        });
    }

    // カラーパレットの初期化
    initializeColorPalette() {
        const palette = document.querySelector('.color-palette');
        if (!palette) return;

        // カラーサンプルのアニメーション
        const samples = palette.querySelectorAll('.color-sample');
        samples.forEach((sample, index) => {
            setTimeout(() => {
                sample.classList.add('reveal');
                this.addColorSampleInteraction(sample);
            }, index * 100);
        });
    }

    // カラーサンプルのインタラクション
    addColorSampleInteraction(sample) {
        const color = sample.style.backgroundColor;
        const tooltip = sample.querySelector('.color-tooltip');

        // クリックでカラーコードをコピー
        sample.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(color).then(() => {
                this.showToast('カラーコードをコピーしました！');
                sample.classList.add('copied');
                setTimeout(() => sample.classList.remove('copied'), 1000);
            });
        });

        // ホバーエフェクトの強化
        sample.addEventListener('mouseenter', () => {
            if (tooltip) {
                tooltip.style.opacity = '1';
                tooltip.style.visibility = 'visible';
            }
        });

        sample.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.style.opacity = '0';
                tooltip.style.visibility = 'hidden';
            }
        });
    }

    // トースト通知の表示
    showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.textContent = message;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 2000);
    }

    // 結果のアニメーション表示
    animateResults() {
        const resultContent = document.querySelector('.result-content');
        const sections = resultContent.querySelectorAll('.description-section');

        // ヘッダーのアニメーション
        const header = document.querySelector('.result-type-header');
        header.style.opacity = '0';
        header.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            header.style.opacity = '1';
            header.style.transform = 'translateY(0)';
        }, 300);

        // セクションの順次表示
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';

            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, 500 + (index * 200));
        });

        // CTAセクションのアニメーション
        const cta = document.querySelector('.cta-section');
        cta.style.opacity = '0';
        cta.style.transform = 'translateY(20px)';

        setTimeout(() => {
            cta.style.opacity = '1';
            cta.style.transform = 'translateY(0)';
        }, 1000 + (sections.length * 200));
    }
}

// showResult関数の拡張
const originalShowResult = showResult;
// function showResult() {
//     originalShowResult();
//     const resultPresenter = new ResultPresenter();
//     resultPresenter.initialize();
//     resultPresenter.animateResults();
// }

// トースト通知のスタイル
const style = document.createElement('style');
style.textContent = `
    .toast-notification {
        position: fixed;
        bottom: -100px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        font-size: 14px;
        z-index: 1000;
        transition: bottom 0.3s ease-in-out;
    }

    .toast-notification.show {
        bottom: 20px;
    }

    .color-sample.copied {
        animation: pulse 0.3s ease-in-out;
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
    // 初期化
    createSparkles();

        // リスタート機能を追加

        function restartQuiz() {
            // 状態をリセット
            currentQuestion = 0;
            answers = {
                warm: 0,
                cool: 0,
                light: 0,
                deep: 0,
                bright: 0,
                soft: 0,
                highContrast: 0,
                lowContrast: 0
            };
            
            // プログレスバーをリセット
            const progressFill = document.querySelector('.progress-fill');
            if (progressFill) {
                progressFill.style.width = '0%';
            }
            
            // スタート画面に戻る
            showScreen('start');
        }
// 追加リストアイテムクリック時
$(document).on('click', '.restart-button', function() {
    restartQuiz();
});

});
