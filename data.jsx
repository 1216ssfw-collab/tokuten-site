// ============ セールス系テンプレート特典データ ============
// card 1 は実物の表紙画像。card 2〜5 は同スタイルの仮表紙（cover オブジェクト）。
const BENEFITS = [
  {
    id: 1,
    coverImg: "assets/cover-hearing.png",
    pdf: "assets/hearing-70.pdf",
    title: "売れる人は「提案」より「質問」が9割…相手が自分から欲しくなるヒアリングの黄金テンプレート",
    report: "営業ヒアリング質問70選",
    desc: "相手の現状・理想・障害・緊急性を自然な会話の中で引き出し、「売り込まなくても欲しくなる」状態をつくるための質問設計と順番を、そのまま商談で使える形にまとめたヒアリングテンプレート。",
  },
  {
    id: 2,
    coverImg: "assets/cover-kentou.png",
    cover: {
      num: "2",
      hook: {
        l1: "ただ言い返すだけで、",
        l2: [{ t: "最後は" }, { t: "『また検討します』", e: true }, { t: "の人へ。" }],
      },
      titlePre: "営業切り返し", titleNum: "100", titlePost: "選",
      subMain: [{ t: "言い負かす切り返しではなく、" }, { t: "相手が", em: "納得", t2: "して進みたくなる返し方" }],
      subSmall: ["商談・無料相談・クロージングで使える", "反論処理テンプレート"],
      steps: [
        { label: "価格", icon: "price" }, { label: "比較", icon: "compare" },
        { label: "時期", icon: "time" }, { label: "信頼", icon: "trust" },
        { label: "決裁", icon: "decision" }, { label: "不要", icon: "no" },
      ],
      bottom: "断り文句別に“切り返しの型”までわかる実践資料",
    },
    pdf: "assets/kentou-taisho.pdf",
    title: "「検討します」で終わらせない…相手の迷いを整理して“決められる状態”に変える対処法テンプレート",
    report: "「検討します」対処法 完全マスターテンプレート",
    desc: "押し返すのではなく、相手の迷いを「本音を引き出す→整理する→必要性を高める→次の一手を決める」の順で整理し、“決められる状態”をつくる営業トーク集。無料相談・商談でそのまま使える切り返しテンプレート15選つき。",
  },
  {
    id: 3,
    coverImg: "assets/cover-seiyaku.png",
    pdf: "assets/seiyaku-jissen.pdf",
    cover: {
      num: "3",
      hook: {
        l1: "うまいセリフを覚えても、",
        l2: [{ t: "商談の" }, { t: "『流れ』", e: true }, { t: "で迷う人へ。" }],
      },
      titlePre: "成約スクリプト", titleNum: "5", titlePost: "型",
      subMain: [{ t: "営業タイプ別に、" }, { t: "相手が", em: "これは自分に必要だ", t2: "と気づく順番" }],
      subSmall: ["無料相談・体験・BtoB商談・セミナー後・説明会で使える", "“売れる会話の流れ”テンプレート集"],
      steps: [
        { label: "無料相談", icon: "talk" }, { label: "体験", icon: "idea" },
        { label: "BtoB商談", icon: "trust" }, { label: "セミナー後", icon: "show" },
        { label: "説明会", icon: "clipboard" },
      ],
      bottom: "必要性に気づく“流れ”を設計するための実践資料",
    },
    title: "営業タイプ別・成約スクリプト完全版…相手が「これは自分に必要だ」と気づく“売れる会話の流れ”テンプレート集",
    report: "成約スクリプト完全版（営業タイプ別）",
    desc: "無料相談・体験セッション・BtoB商談・セミナー後相談・説明会の5タイプ別に、相手が「これは自分に必要だ」と気づく順番でトークを設計。うまいセリフを覚えるのではなく“売れる会話の流れ”をそのまま使える実践テンプレート集。",
  },
  {
    id: 4,
    coverImg: "assets/cover-shinri.png",
    driveId: "1hZYSgvfIzqFFdbT97VQvr3AqLoVQzFOl",
    cover: {
      num: "4",
      hook: {
        l1: "売り込まずに、",
        l2: [{ t: "相手の" }, { t: "『本音』", e: true }, { t: "を引き出す人へ。" }],
      },
      titlePre: "実戦心理学", titleNum: "50", titlePost: "選",
      subMain: [{ t: "心理戦ではなく、" }, { t: "相手の", em: "意思決定", t2: "を整理する営業術" }],
      subSmall: ["本音・必要性・判断基準を引き出す", "営業心理テンプレート集"],
      steps: [
        { label: "信頼関係", icon: "trust" }, { label: "ヒアリング", icon: "talk" },
        { label: "価値訴求", icon: "idea" }, { label: "クロージング", icon: "decision" },
      ],
      bottom: "納得して選べる状態を作るための実践資料",
    },
    title: "営業で使える実戦心理学・行動経済学50選…売り込まずに相手の本音・必要性・判断基準を引き出す営業心理テンプレート",
    report: "営業で使える実戦心理学・行動経済学50選",
    desc: "営業は心理戦ではなく「相手の意思決定を整理する仕事」。信頼関係→ヒアリング→価値訴求→クロージングの4ステップに沿って、相手の本音・必要性・判断基準を引き出し、納得して選べる状態をつくる心理学・行動経済学のテンプレート集。",
  },
];

window.SITE_DATA = { BENEFITS };
