import React from 'react';
import { IKanaV, Kana } from '../lib/kana';

interface KanaButton {
  kana: string;
  onPress: () => void;
}
const KanaButton = ({ kana, onPress }: KanaButton) => {
  const onClick: React.MouseEventHandler<HTMLSpanElement> = (event) => {
    onPress();
  }
  return <span onClick={onClick} style={{ width: "3em", height: "3em" }}>
    <span style={{ width: "3em", height: "3em", padding: "10dp" }}>
      {kana}
    </span>
  </span>
}

export interface VowelKeyboardProps {
  consonant: IKanaV;
  onPress: (kana: string) => void;
}
const VowelKeyboard = ({ consonant, onPress }: VowelKeyboardProps) => {
  const buildKanaButton = (kana: string) => <KanaButton kana={kana} onPress={() => onPress(kana)} />
  return <div>
    <div>
      {buildKanaButton(consonant.U)}
    </div>
    <div>
      {buildKanaButton(consonant.I)}
      {buildKanaButton(consonant.A)}
      {buildKanaButton(consonant.E)}
    </div>
    <div>
      {buildKanaButton(consonant.O)}
    </div>
  </div>
}

export default VowelKeyboard
