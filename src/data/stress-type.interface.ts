export enum StressType {
  LIEBLINGSMENSCH = 'lm',
  PERFEKTIONIST = 'pf',
  SUPERHELD = 'sh',
  SELBSTZWEIFLER = 'sz',
  BODYGUARD = 'bg',
  SPRINTER = 'sp'
}

export interface Statement {
  text: string,
  stressType: StressType,
  orderKey?: number,
  rating?: number
}

export const statements: Array<Statement> = [
  {
    text: 'Fehler sind eine Katastrophe.',
    stressType: StressType.PERFEKTIONIST
  },
  {
    text: 'Ich will, dass alle mich mögen.',
    stressType: StressType.LIEBLINGSMENSCH
  },
  {
    text: 'Wenn ich könnte, würde ich am liebsten alles selbst erledigen.',
    stressType: StressType.SUPERHELD
  },
  {
    text: 'Es ist schrecklich, wenn etwas nicht nach Plan läuft.',
    stressType: StressType.BODYGUARD
  },
  {
    text: 'Ich habe zu wenig Zeit.',
    stressType: StressType.SPRINTER
  },
  {
    text: 'Ich werde das nicht schaffen.',
    stressType: StressType.SELBSTZWEIFLER
  },
  {
    text: 'Alles was ich tue muss immer richtig sein.',
    stressType: StressType.PERFEKTIONIST
  },
  {
    text: 'Ich muss für andere da sein und ihnen helfen.',
    stressType: StressType.LIEBLINGSMENSCH
  },
  {
    text: 'Meine Mitmenschen müssen sich 100% auf mich verlassen können.',
    stressType: StressType.PERFEKTIONIST
  },
  {
    text: 'Ich muss immer alle ToDo\'s erledigen.',
    stressType: StressType.SPRINTER
  },
  {
    text: 'Geduld ist einfach nicht meine Stärke.',
    stressType: StressType.SPRINTER
  },
  {
    text: 'Es ist sehr unangenehm, wenn ich nicht weiss, was passiert.',
    stressType: StressType.BODYGUARD
  },
  {
    text: 'Kritik ist schlimm und sehr unangenehm.',
    stressType: StressType.LIEBLINGSMENSCH
  },
  {
    text: 'Andere zu enttäuschen, ist schrecklich.',
    stressType: StressType.LIEBLINGSMENSCH
  },
  {
    text: 'Das ist zu viel für mich.',
    stressType: StressType.SELBSTZWEIFLER
  },
  {
    text: 'Höher, schneller, weiter.',
    stressType: StressType.SPRINTER
  },
  {
    text: 'Hilfe zu bekommen, ist ein Zeichen von Schwäche.',
    stressType: StressType.SUPERHELD
  },
  {
    text: 'Es ist mir unangenehm, mich auf andere verlassen zu müssen.',
    stressType: StressType.SUPERHELD
  },
  {
    text: 'Ich darf nichts aufschieben.',
    stressType: StressType.SPRINTER
  },
  {
    text: 'Wenn meine Leistung nicht die allerbeste ist, bin ich nicht zufrieden und werte mich ab.',
    stressType: StressType.PERFEKTIONIST
  },
  {
    text: 'Ich möchte alles kontrollieren.',
    stressType: StressType.BODYGUARD
  },
  {
    text: 'Ich habe dauernd im Kopf, was alles schiefgehen könnte.',
    stressType: StressType.BODYGUARD
  },
  {
    text: 'Ich halte das nicht aus.',
    stressType: StressType.SELBSTZWEIFLER
  },
  {
    text: 'Wenn ich etwas abgebe, wird es schiefgehen.',
    stressType: StressType.SUPERHELD
  },
  {
    text: 'Wenn ich mich für etwas entscheide, dann muss ich mir wirklich sicher sein.',
    stressType: StressType.BODYGUARD
  },
  {
    text: 'Diese(r) Stress / Druck / Anspannung / Erwartung macht mich fertig.',
    stressType: StressType.SELBSTZWEIFLER
  },
  {
    text: 'Ich brauche keine HIlfe von anderen.',
    stressType: StressType.SUPERHELD
  },
  {
    text: 'Schwierigkeiten müssen vermieden werden.',
    stressType: StressType.SELBSTZWEIFLER
  },
  {
    text: 'Es ist schlimm, wenn andere mich nicht mögen oder von mir enttäuscht sind.',
    stressType: StressType.LIEBLINGSMENSCH
  },
  {
    text: 'Es ist nicht in Ordnung, wenn ich etwas nicht schaffe oder einhalten kann (Verabredungen, Versprechen, ...).',
    stressType: StressType.PERFEKTIONIST
  },
]

export interface StressTypeResult {
  [StressType.PERFEKTIONIST]: number,
  [StressType.LIEBLINGSMENSCH]: number,
  [StressType.SELBSTZWEIFLER]: number,
  [StressType.SUPERHELD]: number,
  [StressType.BODYGUARD]: number,
  [StressType.SPRINTER]: number,
}
