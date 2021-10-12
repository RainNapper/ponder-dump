import { Map } from 'immutable';

export interface IKanaV {
  A: string
  I: string
  U: string
  E: string
  O: string
}

export interface IKanaY {
  YA: string
  YU: string
  YO: string
}

const VKana: IKanaV = {
  A: "あ",
  I: "い",
  U: "う",
  E: "え",
  O: "お",
}

const KKana: IKanaV & IKanaY = {
  A: "か",
  I: "き",
  U: "く",
  E: "け",
  O: "こ",
  YA: "きゃ",
  YU: "きゅ",
  YO: "きょ",
}

const GKana: IKanaV & IKanaY = {
  A: "が",
  I: "ぎ",
  U: "ぐ",
  E: "げ",
  O: "ご",
  YA: "ぎゃ",
  YU: "ぎゅ",
  YO: "ぎょ",
}

const SKana: IKanaV & IKanaY = {
  A: "さ",
  I: "し",
  U: "す",
  E: "せ",
  O: "そ",
  YA: "しゃ",
  YU: "しゅ",
  YO: "しょ",
}

const ZKana: IKanaV = {
  A: "ざ",
  I: "じ",
  U: "ず",
  E: "ぜ",
  O: "ぞ",
}

const TKana: IKanaV & IKanaY = {
  A: "た",
  I: "ち",
  U: "つ",
  E: "て",
  O: "と",
  YA: "ちゃ",
  YU: "ちゅ",
  YO: "ちょ",
}

const DKana: IKanaV & IKanaY = {
  A: "だ",
  I: "ぢ",
  U: "づ",
  E: "で",
  O: "ど",
  YA: "ぢゃ",
  YU: "ぢゅ",
  YO: "ぢょ",
}

const NKana: IKanaV & IKanaY = {
  A: "な",
  I: "に",
  U: "ぬ",
  E: "ね",
  O: "の",
  YA: "にゃ",
  YU: "にゅ",
  YO: "にょ",
}

const HKana: IKanaV & IKanaY = {
  A: "は",
  I: "ひ",
  U: "ふ",
  E: "へ",
  O: "ほ",
  YA: "ひゃ",
  YU: "ひゅ",
  YO: "ひょ",
}

const BKana: IKanaV & IKanaY = {
  A: "ば",
  I: "び",
  U: "ぶ",
  E: "べ",
  O: "ぼ",
  YA: "びゃ",
  YU: "びゅ",
  YO: "びょ",
}

const PKana: IKanaV & IKanaY = {
  A: "ぱ",
  I: "ぴ",
  U: "ぷ",
  E: "ぺ",
  O: "ぽ",
  YA: "ぴゃ",
  YU: "ぴゅ",
  YO: "ぴょ",
}

const MKana: IKanaV & IKanaY = {
  A: "ま",
  I: "み",
  U: "む",
  E: "め",
  O: "も",
  YA: "みゃ",
  YU: "みゅ",
  YO: "みょ",
}

const YKana: IKanaV = {
  A: "や",
  I: "",
  U: "ゆ",
  E: "",
  O: "よ",
}

const RKana: IKanaV & IKanaY = {
  A: "ら",
  I: "り",
  U: "る",
  E: "れ",
  O: "ろ",
  YA: "りゃ",
  YU: "りゅ",
  YO: "りょ",
}

const WKana: IKanaV = {
  A: "わ",
  I: "",
  U: "",
  E: "",
  O: "を",
}

export interface IKana {
  V: IKanaV;
  K: IKanaV & IKanaY;
  G: IKanaV & IKanaY;
  S: IKanaV & IKanaY;
  Z: IKanaV;
  T: IKanaV & IKanaY;
  D: IKanaV & IKanaY;
  N: IKanaV & IKanaY;
  H: IKanaV & IKanaY;
  B: IKanaV & IKanaY;
  P: IKanaV & IKanaY;
  M: IKanaV & IKanaY;
  Y: IKanaV;
  R: IKanaV & IKanaY;
  W: IKanaV;
}

const Kana: IKana = {
  V: VKana,
  K: KKana,
  G: GKana,
  S: SKana,
  Z: ZKana,
  T: TKana,
  D: DKana,
  N: NKana,
  H: HKana,
  B: BKana,
  P: PKana,
  M: MKana,
  Y: YKana,
  R: RKana,
  W: WKana
}

const consonants: IKanaV[] = [
  Kana.V,
  Kana.K,
  Kana.G,
  Kana.S,
  Kana.Z,
  Kana.T,
  Kana.D,
  Kana.N,
  Kana.H,
  Kana.B,
  Kana.P,
  Kana.M,
  Kana.Y,
  Kana.R,
  Kana.W,
]

const reverseMapMut: { [key: string]: IKanaV } = {}
consonants.forEach(c => {
  reverseMapMut[c.A] = c
  reverseMapMut[c.I] = c
  reverseMapMut[c.U] = c
  reverseMapMut[c.E] = c
  reverseMapMut[c.O] = c
});
const reverseMap = Map(reverseMapMut);
export {
  Kana,
  reverseMap,
};
